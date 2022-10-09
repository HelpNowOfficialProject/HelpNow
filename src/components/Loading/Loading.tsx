import { CircularProgress, Text, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack>
      <CircularProgress isIndeterminate />
      <Text fontSize="3xl">Loading...</Text>
    </VStack>
  );
}
