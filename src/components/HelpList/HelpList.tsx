import { getFirestore, collection, doc } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import app, { auth, db } from "../../firebase";
import SmallPost from "../SmallPost/SmallPost";
import { ILocation, IPost } from "../../types/post";
import { Box, Container, Flex } from "@chakra-ui/react";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function HelpList() {
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "posts"),
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

  if (loading || addressLoading) return <LoadingPage />;
  if (error || addressError) {
    return (
      <ErrorPage
        name={"Nieznany błąd"}
        description="Wystąpił błąd podczas pobierania listy postów"
      />
    );
  }

  console.log(value?.docs[0].data());

  return (
    <Box width={`100%`} mt={`10px`}>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <Flex
          // breakpointCols={3}
          // className="my-masonry-grid"
          // columnClassName="my-masonry-grid_column"
          width={"100%"}
          flexWrap={"wrap"}
          gap={`10px`}
        >
          {/* <Flex flexDir={`row`} gap={`10px`} flexWrap={"wrap"}> */}
          {/* Collection:{" "} */}
          {value.docs
            .sort(
              (a, b) =>
                parseFloat(b.data()?.timestamp?.seconds || 0) -
                parseFloat(a.data()?.timestamp?.seconds || 0)
            )
            .map((doc) => {
              // <div>{JSON.stringify(doc.data())}, </div>
              let data = { ...doc.data(), uuid: doc.id } as IPost;
              return (
                <SmallPost post={data} homeAddress={myAddress as ILocation} />
              );
            })}
          {/* </Flex> */}
        </Flex>
      )}
    </Box>
  );
}
