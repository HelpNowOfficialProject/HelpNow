import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HelpList from "../HelpList/HelpList";
import LogOut from "../LogOut/LogOut";
import { FaPlus } from "react-icons/fa";
import MyHelpList from "../MyHelpList/MyHelpList";
import PostTypes from "../../types/types";

export default function Home() {
    return (
        <Container minW={`100%`} mt={`10px`}>
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Pomogę w...</Tab>
                    <Tab>Wszystkie posty</Tab>
                    <Tab>Moje posty</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex flexDirection={"column"} my={12}>
                            <Heading textAlign={"center"} mb={4}>
                                Pomogę w
                            </Heading>
                            <HelpList type={PostTypes.DECLARED} />
                            {/* <MyHelpList /> */}
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex flexDirection={"column"} my={12}>
                            <Heading textAlign={"center"} mb={4}>
                                Wszystkie posty
                            </Heading>
                            <HelpList type={PostTypes.ALL} />
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex flexDirection={"column"} my={12}>
                            <Heading textAlign={"center"} mb={4}>
                                Moje posty
                            </Heading>
                            <HelpList type={PostTypes.MINE} />
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}
