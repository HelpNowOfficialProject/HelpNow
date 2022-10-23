import {
  Box,
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
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import Footer from "../LandingPage/Footer";
export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Container
      minW={`100%`}
      pt={`10px`}
      display="grid"
      gridTemplateRows={"1fr auto"}
      minH={"calc(100vh - 80px)"} // Header
    >
      <Flex flexDir={"column"}>
        <SearchBar value={searchValue} setValue={setSearchValue} />
        <Tabs variant="enclosed" mt={4}>
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
                <HelpList type={PostTypes.DECLARED} q={searchValue} />
                {/* <MyHelpList /> */}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDirection={"column"} my={12}>
                <Heading textAlign={"center"} mb={4}>
                  Najbliższe
                </Heading>
                <HelpList type={PostTypes.CLOSEST} q={searchValue} />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDirection={"column"} my={12}>
                <Heading textAlign={"center"} mb={4}>
                  Wszystkie posty
                </Heading>
                <HelpList type={PostTypes.ALL} q={searchValue} />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDirection={"column"} my={12}>
                <Heading textAlign={"center"} mb={4}>
                  Moje posty
                </Heading>
                <HelpList type={PostTypes.MINE} q={searchValue} />
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      {/* So that footer doesn't overlay the content */}
      {/* <MadeWithHeart /> */}
      <Box w={"100%"}>
        <Footer />
      </Box>
    </Container>
  );
}
