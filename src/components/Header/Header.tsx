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
    <Container w={`100%`} m={`0`} mt={`15px`} justifyContent={`space-between`}>
      <Flex w="100%" justifyContent="space-between">
        <Flex gap={2} alignItems={"center"} w={`50%`}>
          <Link to="/">
            <Image
              src={`${process.env.PUBLIC_URL}/logo.png`}
              width={"4em"}
              borderRadius={20}
            />
          </Link>
          <Heading>HelpNow</Heading>
        </Flex>
        <Flex gap="2px" alignItems="center" w={`50%`}>
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
      </Flex>
    </Container>
  );
}
