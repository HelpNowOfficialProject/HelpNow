import { Box, Flex, Text } from "@chakra-ui/react";
import {
    collection,
    doc,
    DocumentData,
    documentId,
    getDocs,
    query,
    QuerySnapshot,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import { ILocation, IPost } from "../../types/post";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import SmallPost from "../SmallPost/SmallPost";

export default function MyHelpList() {
    const [acceptedPosts, loading, error] = useCollectionData(
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

    const getPosts = async () => {
        if (!acceptedPosts) return;

        setIsLoading(true);

        let docs = acceptedPosts.map((e) => e.id);
        const docsRef = collection(db, "posts");
        let myPosts: QuerySnapshot<DocumentData> | any = { docs: [] };
        if (docs.length) {
            const q = query(docsRef, where(documentId(), "in", docs));
            myPosts = await getDocs(q);
        }

        setPosts(
            myPosts.docs.map(
                (e: DocumentData) => ({ ...e.data(), uuid: e.id } as IPost)
            )
        );

        setIsLoading(false);
    };

    useEffect(() => {
        getPosts();
    }, [acceptedPosts]);

    if (loading || isLoading || addressLoading) return <LoadingPage />;
    if (error || addressError) {
        return (
            <ErrorPage
                name={"Nieznany błąd"}
                description="Wystąpił błąd podczas pobierania listy postów z zadeklarowaną przez Ciebie pomocą"
            />
        );
    }

    return (
        <Flex
            className="roxie"
            width={`100%`}
            mt={`10px`}
            justifyContent={`space-between`}
        >
            {posts && posts.length > 0 ? (
                <Flex
                    width={"100%"}
                    flexWrap={"wrap"}
                    gap={`10px`}
                    justifyItems={"center"}
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
                <Text>Nic tu nie ma!</Text>
            )}
        </Flex>
    );
}
