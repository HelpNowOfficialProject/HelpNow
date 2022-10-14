import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HelpList from "../HelpList/HelpList";
import LogOut from "../LogOut/LogOut";
import { FaPlus } from "react-icons/fa";

export default function Home() {
    return (
        <Container minW={`100%`} mt={`10px`}>
            <Flex w="100%" justifyContent="space-between">
                <Heading>HelpNow</Heading>
                <Flex gap="2px" alignItems="center">
                    <Box>
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
            </Flex>
            <HelpList />
        </Container>
    );
}
