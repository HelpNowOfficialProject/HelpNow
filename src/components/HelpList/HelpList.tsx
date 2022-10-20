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
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import PostTypes from "../../types/types";
import { useEffect, useState } from "react";

interface IHelpList {
    type: PostTypes;
}
export default function HelpList({ type }: IHelpList) {
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
                postsToSet = myPosts.docs.map(
                    (e: DocumentData) => ({ ...e.data(), uuid: e.id } as IPost)
                );
                break;
                case PostTypes.MINE:
                    postsToSet = (value as any).docs.map(
                        (e: DocumentData) => ({ ...e.data(), uuid: e.id } as IPost)
                    ).filter((e: IPost) => e.authorId === (auth.currentUser as any).uid);
                    break;
            case PostTypes.ALL:
                postsToSet = (value as any).docs.map(
                    (e: DocumentData) => ({ ...e.data(), uuid: e.id } as IPost)
                ).filter((e: IPost) => e.authorId !== (auth.currentUser as any).uid);
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
            justifyContent={"center"}
        >
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value &&
                (posts && posts.length > 0 ? (
                    <Flex
                        width={"100%"}
                        flexWrap={"wrap"}
                        gap={`10px`}
                        justifyItems={"center"}
                        justifyContent={"center"}

                        // alignItems={"center"}
                    >
                        {posts.map((doc: IPost) => {
                            return (
                                <SmallPost
                                    post={doc}
                                    homeAddress={myAddress as ILocation}
                                />
                            );
                        })}
                    </Flex>
                ) : (
                    <Text>Jeszcze nie zadeklarowano pomocy!</Text>
                ))}
        </Box>
    );
}
