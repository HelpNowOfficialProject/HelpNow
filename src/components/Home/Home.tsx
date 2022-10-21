import {
    Container,
    Flex,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import HelpList from "../HelpList/HelpList";
import PostTypes from "../../types/types";
export default function Home() {
    return (
        <Container minW={`100%`} mt={`10px`}>
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Pomogę w...</Tab>
                    <Tab>Najbliższe</Tab>
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
                                Najbliższe
                            </Heading>
                            <HelpList type={PostTypes.CLOSEST} />
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
            {/* <MadeWithHeart /> */}
        </Container>
    );
}
