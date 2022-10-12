import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HelpList from "../HelpList/HelpList";
import LogOut from "../LogOut/LogOut";

export default function Home() {
  return (
    <Box>
      <HelpList />
      <Link to="addPost">
        <Button>Dodaj post</Button>
      </Link>
      <LogOut />
    </Box>
  );
}
