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
import MyHelpList from "../MyHelpList/MyHelpList";

export default function Home() {
  return (
    <Container minW={`100%`} mt={`10px`}>
      <Flex flexDirection={"column"} my={12}>
        <Heading>Pomogę w:</Heading>
        <MyHelpList />
      </Flex>

      <Flex flexDirection={"column"} my={12}>
        <Heading>Wszystkie posty:</Heading>
        <HelpList />
      </Flex>
    </Container>
  );
}
