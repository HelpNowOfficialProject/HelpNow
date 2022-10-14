import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import app from "../../firebase";
import SmallPost from "../SmallPost/SmallPost";
import { IPost } from "../../types/post";
import { Box, Container, Flex } from "@chakra-ui/react";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function HelpList() {
    const [value, loading, error] = useCollection(
        collection(getFirestore(app), "posts"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    if (loading) return <LoadingPage />;
    if (error) {
        // TODO: Error page
        return <h1>error</h1>;
    }

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
                    {value.docs.map((doc) => {
                        // <div>{JSON.stringify(doc.data())}, </div>
                        let data = { ...doc.data(), uuid: doc.id } as IPost;
                        return <SmallPost post={data} />;
                    })}
                    {/* </Flex> */}
                </Flex>
            )}
        </Box>
    );
}
