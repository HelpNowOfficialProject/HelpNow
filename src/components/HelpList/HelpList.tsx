import {
    collection,
    doc,
    DocumentData,
    documentId,
    getDocs,
    getFirestore,
    query,
    QuerySnapshot,
    where,
} from "firebase/firestore";
import {
    useCollection,
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";
import app, { auth, db } from "../../firebase";
import SmallPost from "../SmallPost/SmallPost";
import { ILocation, IPost } from "../../types/post";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import PostTypes from "../../types/types";
import { useEffect, useMemo, useState } from "react";
import calculateDistance from "../utils/calculateDistance";

interface IHelpList {
    type: PostTypes;
    q: string;
}
export default function HelpList({ type, q }: IHelpList) {
    const [value, loading, error] = useCollection(
        collection(getFirestore(app), "posts"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    const [acceptedPosts, loading2, error2] = useCollectionData(
        collection(db, "users", (auth.currentUser as any).uid, "acceptedPosts"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    const [myAddress, addressLoading, addressError] = useDocumentData(
        doc(
            db,
            "users",
            (auth.currentUser as any).uid as string,
            "address",
            "address"
        )
    );
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<IPost[]>([]);

    const filteredPosts = useMemo(() => {
        if (q.includes("#")) {
            return posts.filter((e) =>
                e.tags.some((elem) =>
                    elem.toLowerCase().includes(q.slice(1).toLowerCase())
                )
            );
        }
        return q
            ? posts.filter((e) => {
                  return (
                      e.title.toLowerCase().includes(q.toLowerCase()) ||
                      e.description.toLowerCase().includes(q.toLowerCase()) ||
                      e.tags.some((elem) =>
                          elem.toLowerCase().includes(q.toLowerCase())
                      )
                  );
              })
            : posts;
    }, [posts, q]);

    const anyLoading = loading || loading2 || addressLoading || isLoading;
    const anyError = error || error2 || addressError;

    const getPosts = async () => {
        if (!acceptedPosts) return;
        setIsLoading(true);
        let postsToSet: IPost[] = [];
        switch (type) {
            case PostTypes.DECLARED:
                let docs = acceptedPosts.map((e) => e.id);
                const docsRef = collection(db, "posts");
                let myPosts: QuerySnapshot<DocumentData> | any = { docs: [] };
                if (docs.length) {
                    const q = query(docsRef, where(documentId(), "in", docs));
                    myPosts = await getDocs(q);
                }
                postsToSet = myPosts.docs
                    .map(
                        (e: DocumentData) =>
                            ({ ...e.data(), uuid: e.id } as IPost)
                    )
                    .sort((a: IPost, b: IPost) => {
                        return (
                            calculateDistance(
                                a.address as ILocation,
                                myAddress as ILocation
                            ) -
                            calculateDistance(
                                b.address as ILocation,
                                myAddress as ILocation
                            )
                        );
                    });
                break;
            case PostTypes.MINE:
                postsToSet = (value as any).docs
                    .map(
                        (e: DocumentData) =>
                            ({ ...e.data(), uuid: e.id } as IPost)
                    )
                    .filter(
                        (e: IPost) =>
                            e.authorId === (auth.currentUser as any).uid
                    );
                break;
            case PostTypes.CLOSEST:
                postsToSet = (value as any).docs
                    .map(
                        (e: DocumentData) =>
                            ({ ...e.data(), uuid: e.id } as IPost)
                    )
                    .filter(
                        (e: IPost) =>
                            e.authorId !== (auth.currentUser as any).uid
                    )
                    .sort((a: IPost, b: IPost) => {
                        return (
                            calculateDistance(
                                a.address as ILocation,
                                myAddress as ILocation
                            ) -
                            calculateDistance(
                                b.address as ILocation,
                                myAddress as ILocation
                            )
                        );
                    });
                break;
            case PostTypes.ALL:
                postsToSet = (value as any).docs
                    .map(
                        (e: DocumentData) =>
                            ({ ...e.data(), uuid: e.id } as IPost)
                    )
                    .filter(
                        (e: IPost) =>
                            e.authorId !== (auth.currentUser as any).uid
                    );
                break;
        }

        setPosts(postsToSet);

        setIsLoading(false);
    };

    useEffect(() => {
        getPosts();
    }, [acceptedPosts]);

    if (anyLoading) return <LoadingPage />;
    if (anyError) {
        return (
            <ErrorPage
                name={"Nieznany błąd"}
                description="Wystąpił błąd podczas pobierania listy postów"
            />
        );
    }

    return (
        <Box
            // width={`100%`}
            mt={`10px`}
            display="flex"
            // justifyContent={"center"}
            alignContent={"center"}
            flexDir={"column"}
        >
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value &&
                (filteredPosts && filteredPosts.length > 0 ? (
                    <>
                        <Flex
                            width={"100%"}
                            flexWrap={"wrap"}
                            gap={`10px`}
                            justifyItems={"center"}
                            justifyContent={"center"}

                            // alignItems={"center"}
                        >
                            {filteredPosts.filter((e) => !e.isCompleted)
                                .length === 0 ? (
                                <Text>Nic tu nie ma!</Text>
                            ) : (
                                filteredPosts
                                    .filter((e) => !e.isCompleted)
                                    .map((doc: IPost) => {
                                        return (
                                            <SmallPost
                                                post={doc}
                                                homeAddress={
                                                    myAddress as ILocation
                                                }
                                            />
                                        );
                                    })
                            )}
                        </Flex>

                        {(type === PostTypes.MINE ||
                            type === PostTypes.DECLARED) && (
                            <>
                                <Heading textAlign={"center"} my={4}>
                                    Wykonane
                                </Heading>
                                <Flex
                                    width={"100%"}
                                    flexWrap={"wrap"}
                                    gap={`10px`}
                                    justifyItems={"center"}
                                    justifyContent={"center"}

                                    // alignItems={"center"}
                                >
                                    {filteredPosts.filter((e) => e.isCompleted)
                                        .length === 0 ? (
                                        <Text>Nic tu nie ma!</Text>
                                    ) : (
                                        filteredPosts
                                            .filter((e) => e.isCompleted)
                                            .map((doc: IPost) => {
                                                return (
                                                    <SmallPost
                                                        post={doc}
                                                        homeAddress={
                                                            myAddress as ILocation
                                                        }
                                                    />
                                                );
                                            })
                                    )}
                                </Flex>
                            </>
                        )}
                    </>
                ) : (
                    <Text>Nic tu nie ma!</Text>
                ))}
        </Box>
    );
}
