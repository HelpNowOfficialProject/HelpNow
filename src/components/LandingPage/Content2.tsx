import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Flex,
    IconButton,
    Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Content2() {
    return (
        <Stack bgColor="gray.700">
            <Heading as="h1" textAlign="center" fontSize="5xl" mt={6}>
                {" "}
                Kim jesteśmy?
            </Heading>

            <Flex direction="row" justifyContent="center">
                <Center py={6}>
                    <Box
                        bgColor="gray.800"
                        boxShadow={"2xl"}
                        rounded={"lg"}
                        p={6}
                        textAlign={"center"}
                        m={1}
                        maxW="200px"
                        h="400px"
                    >
                        <Avatar
                            src={`${process.env.PUBLIC_URL}/avatars/arciiix.webp`}
                            size={"2xl"}
                            mb={3}
                        />
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            Artur
                        </Heading>
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            Nowak
                        </Heading>
                        <Text textAlign={"center"}>
                            Project Manager, Full-Stack Developer, Team Leader,
                            Architect
                        </Text>
                        <a
                            href="https://github.com/Arciiix"
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            <IconButton
                                mt={3}
                                icon={
                                    <Image
                                        src={`${process.env.PUBLIC_URL}/github.png`}
                                        width={5}
                                    />
                                }
                                aria-label="GitHub"
                            ></IconButton>
                        </a>
                    </Box>
                </Center>

                <Center py={6}>
                    <Box
                        bgColor="gray.800"
                        boxShadow={"2xl"}
                        rounded={"lg"}
                        p={6}
                        textAlign={"center"}
                        m={1}
                        maxW="200px"
                        h="400px"
                    >
                        <Avatar
                            src={`${process.env.PUBLIC_URL}/avatars/wojtek.webp`}
                            size={"2xl"}
                            mb={3}
                        />
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            {" "}
                            Wojciech Wróblewski{" "}
                        </Heading>
                        <Text textAlign={"center"}>
                            Front-end Developer, UX designer, Proposer
                        </Text>
                        <a
                            href="https://github.com/wojtekwro29"
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            <IconButton
                                mt={3}
                                icon={
                                    <Image
                                        src={`${process.env.PUBLIC_URL}/github.png`}
                                        width={5}
                                    />
                                }
                                aria-label="GitHub"
                            ></IconButton>
                        </a>
                    </Box>
                </Center>
            </Flex>
            <Flex direction="row" justifyContent="center">
                <Center py={6}>
                    <Box
                        bgColor="gray.800"
                        boxShadow={"2xl"}
                        rounded={"lg"}
                        p={6}
                        textAlign={"center"}
                        m={1}
                        maxW="200px"
                        h="350px"
                    >
                        <Avatar
                            src={`${process.env.PUBLIC_URL}/avatars/greatMat.webp`}
                            size={"2xl"}
                            mb={3}
                        />
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            {" "}
                            Mateusz Krok{" "}
                        </Heading>
                        <Text textAlign={"center"}>Validation, idea</Text>
                        <a
                            href="https://github.com/greatMat299"
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            <IconButton
                                mt={3}
                                icon={
                                    <Image
                                        src={`${process.env.PUBLIC_URL}/github.png`}
                                        width={5}
                                    />
                                }
                                aria-label="GitHub"
                            ></IconButton>
                        </a>
                    </Box>
                </Center>

                <Center py={6}>
                    <Box
                        bgColor="gray.800"
                        boxShadow={"2xl"}
                        rounded={"lg"}
                        p={6}
                        textAlign={"center"}
                        m={1}
                        maxW="200px"
                        h="350px"
                    >
                        <Avatar
                            src={`${process.env.PUBLIC_URL}/avatars/TrollYou.webp`}
                            size={"2xl"}
                            mb={3}
                        />
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            {" "}
                            Robert Zarzecki{" "}
                        </Heading>
                        <Text textAlign={"center"}>
                            Landing page, UX designer
                        </Text>
                        <a
                            href="https://github.com/Trolju"
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            <IconButton
                                mt={3}
                                icon={
                                    <Image
                                        src={`${process.env.PUBLIC_URL}/github.png`}
                                        width={5}
                                    />
                                }
                                aria-label="GitHub"
                            ></IconButton>
                        </a>
                    </Box>
                </Center>
            </Flex>
            <Center py={6}>
                <Box
                    bgColor="gray.800"
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    p={6}
                    textAlign={"center"}
                    m={1}
                    maxW="200px"
                    h="300px"
                >
                    <Avatar
                        src={`${process.env.PUBLIC_URL}/avatars/81.webp`}
                        size={"2xl"}
                        mb={3}
                    />
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                        {" "}
                        Paweł Walas{" "}
                    </Heading>
                    <Text textAlign={"center"}>Mental Coach, E2E Tester</Text>
                    <a
                        href="https://github.com/ThisIs81"
                        target={"_blank"}
                        rel="noreferrer"
                    >
                        <IconButton
                            mt={3}
                            icon={
                                <Image
                                    src={`${process.env.PUBLIC_URL}/github.png`}
                                    width={5}
                                />
                            }
                            aria-label="GitHub"
                        ></IconButton>
                    </a>
                </Box>
            </Center>
        </Stack>
    );
}
