import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    Highlight,
} from "@chakra-ui/react";

export default function Content() {
    return (
        <Stack bgColor="gray.700">
            <Container
                maxW={"5xl"}
                py={12}
                bgColor="gray.600"
                rounded="20px"
                mt={6}
            >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Stack spacing={4}>
                        <Heading>
                            <Highlight
                                query="Now"
                                styles={{
                                    px: "6",
                                    py: "1",
                                    rounded: "full",
                                    bg: "#8bffca",
                                    color: "var(--chakra-colors-chakra-body-bg)",
                                }}
                            >
                                Czym jest HelpNow
                            </Highlight>
                            ?
                        </Heading>
                        <Text color={"gray.400"} fontSize={"lg"}>
                            Jest to aplikacja służąca do szybkiej pomocy ludzią
                            w twojej okolicy z problemami codziennego życia.
                            Wystarczy kilka kliknięć, żeby utworzyć prośbę o
                            pomoc. Najważniejsze zalety naszej aplikacji:
                        </Text>
                        <Stack direction={"row"} align={"center"}>
                            <Flex
                                w={8}
                                h={8}
                                align={"center"}
                                justify={"center"}
                                rounded={"full"}
                            ></Flex>
                            <Text
                                fontWeight={"bold"}
                                borderBottom="1px,solid,white"
                            >
                                Wystarczy połączenie z internetem, żeby urzywać
                                aplikacji{" "}
                            </Text>
                        </Stack>

                        <Stack direction={"row"} align={"center"}>
                            <Flex
                                w={8}
                                h={8}
                                align={"center"}
                                justify={"center"}
                                rounded={"full"}
                            ></Flex>
                            <Text fontWeight={"bold"}>
                                Szybkie działanie zarówno na komputerze jak i
                                telefonie
                            </Text>
                        </Stack>

                        <Stack direction={"row"} align={"center"}>
                            <Flex
                                w={8}
                                h={8}
                                align={"center"}
                                justify={"center"}
                                rounded={"full"}
                            ></Flex>
                            <Text fontWeight={"bold"}>
                                Aplikacja jest darmowa{" "}
                            </Text>
                        </Stack>
                    </Stack>

                    <Flex>
                        <Image
                            margin="auto"
                            rounded={"md"}
                            alt={"feature image"}
                            src={`${process.env.PUBLIC_URL}/3.png`}
                            objectFit={"cover"}
                            height={300}
                        />
                    </Flex>
                </SimpleGrid>
            </Container>
        </Stack>
    );
}
