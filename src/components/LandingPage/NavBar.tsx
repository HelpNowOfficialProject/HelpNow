import { Box, Flex, Button, Stack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

export default function Navbar() {
    return (
        <>
            <Box bg="gray.900" px={5} py={3}>
                <Flex
                    h={20}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box>
                        <Image
                            src={`${process.env.PUBLIC_URL}/2.png`}
                            height="80px"
                            width="80px"
                            rounded={`20px`}
                        ></Image>
                    </Box>

                    <Flex alignItems={"center"}>
                        <Stack direction="row" align="center">
                            <Link to="/auth/login">
                                <Button
                                    fontSize={"xl"}
                                    variant={"solid"}
                                    colorScheme={"green"}
                                >
                                    {auth.currentUser
                                        ? "Przejdź do aplikacji"
                                        : "Zaloguj się"}
                                </Button>
                            </Link>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
