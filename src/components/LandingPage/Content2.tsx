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
                        h="275px"
                    >
                        <Avatar src={""} size={"2xl"} />
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            {" "}
                            Artur Nowak{" "}
                        </Heading>
                        <Text textAlign={"center"}> Full-Stack Developer </Text>
                        <a
                            href="https://github.com/Arciiix"
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            <IconButton
                                mt={3}
                                icon={
                                    <Image
                                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
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
                        h="275px"
                    >
                        <Avatar src={""} size={"2xl"} />
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            {" "}
                            Wojciech Wróblewski{" "}
                        </Heading>
                        <Text textAlign={"center"}> Full-Stack Developer</Text>
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
                        h="275px"
                    >
                        <Avatar src={""} size={"2xl"} />
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            {" "}
                            Mateusz Krok{" "}
                        </Heading>
                        <Text textAlign={"center"}> Front-End Developer </Text>
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
                        h="275px"
                    >
                        <Avatar src={""} size={"2xl"} />
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            {" "}
                            Paweł Walas{" "}
                        </Heading>
                        <Text textAlign={"center"}> Shadow Master </Text>
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
                    h="275px"
                >
                    <Avatar src={""} size={"2xl"} />
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                        {" "}
                        Robert Zarzecki{" "}
                    </Heading>
                    <Text textAlign={"center"}> Project Designer </Text>
                </Box>
            </Center>
        </Stack>
    );
}
