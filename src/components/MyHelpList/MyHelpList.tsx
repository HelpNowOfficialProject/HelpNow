import { Box, Flex, Text } from "@chakra-ui/react";
import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
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
    if (docs.length < 1) {
      docs = [];
    }
    const docsRef = collection(db, "posts");
    const q = query(docsRef, where(documentId(), "in", docs));

    const myPosts = await getDocs(q);
    setPosts(myPosts.docs.map((e) => ({ ...e.data(), uuid: e.id } as IPost)));

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
    <Box width={`100%`} mt={`10px`}>
      {posts && posts.length > 0 ? (
        <Flex width={"100%"} flexWrap={"wrap"} gap={`10px`}>
          {posts.map((doc: IPost) => {
            return (
              <SmallPost post={doc} homeAddress={myAddress as ILocation} />
            );
          })}
        </Flex>
      ) : (
        <Text>Jeszcze nie zadeklarowano pomocy!</Text>
      )}
    </Box>
  );
}
