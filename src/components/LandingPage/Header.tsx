import {
    Highlight,
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <Container maxW={"3xl"}>
                <Stack textAlign={"center"} py={{ base: 20, md: 36 }}>
                    <Heading>
                        Witaj w aplikacji
                        <Heading
                            as={"h1"}
                            size="4xl"
                            lineHeight="tall"
                            fontWeight={900}
                            color={"#8bffca"}
                        >
                            {/* Background color loga */}
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
                                HelpNow
                            </Highlight>
                        </Heading>
                    </Heading>
                    <Text color={"gray.500"} py={4}>
                        Używaj tej aplikacji, żeby pomagać innym ludziom oraz
                        otrzymywać pomoc kiedy jej potrzebujesz. Zarejestruj się
                        już dziś używając przycisku niżej
                    </Text>
                    <Stack spacing={3} align={"center"} py={6}>
                        <Link to="/auth/register">
                            <Button
                                color="black"
                                bg={"green.200"}
                                rounded={"full"}
                                size="lg"
                                _hover={{
                                    bg: "green.400",
                                }}
                            >
                                Dołącz już teraz
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
