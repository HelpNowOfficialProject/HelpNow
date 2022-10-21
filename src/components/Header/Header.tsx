import {
    Flex,
    Image,
    Box,
    Tooltip,
    IconButton,
    Button,
    Heading,
    Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import LogOut from "../LogOut/LogOut";

export default function Header() {
    return (
        <Flex
            w={`100%`}
            px={`16px`}
            mt={`15px`}
            justifyContent={`space-between`}
        >
            {/* <Flex w="100vw" justifyContent="space-between"> */}
            <Link to="/app">
                <Flex gap={2} alignItems={"center"}>
                    <Image
                        src={`${process.env.PUBLIC_URL}/2.png`}
                        width={"4em"}
                        borderRadius={20}
                    />

                    <Heading>HelpNow</Heading>
                </Flex>
            </Link>
            <Flex gap="2px" alignItems="center">
                <Box mr={`10px`} ml={`10px`}>
                    <Tooltip label="Dodaj post">
                        <Link to="post/add">
                            <IconButton
                                aria-label="Dodaj post"
                                icon={<FaPlus />}
                                // size={"lg"}
                                as={Button}
                            />
                        </Link>
                    </Tooltip>
                </Box>
                <Flex flexDir={`row`}>
                    {/* <Box><Button mr={`10px`}>Dodaj post</Button></Box> */}
                    <Box textAlign={`right`}>
                        <LogOut />
                    </Box>
                </Flex>
            </Flex>
            {/* </Flex> */}
        </Flex>
    );
}
