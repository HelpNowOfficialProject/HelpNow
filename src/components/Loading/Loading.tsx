import { CircularProgress, Text, VStack } from "@chakra-ui/react";

export default function Loading() {
    return (
        <VStack>
            <CircularProgress isIndeterminate />
            <Text fontSize="4xl">Ładowanie...</Text>
        </VStack>
    );
}
