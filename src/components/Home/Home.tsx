import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LogOut from "../LogOut/LogOut";

export default function Home() {
  return (
    <>
      <Link to="addPost">
        <Button>Dodaj post</Button>
      </Link>
      <LogOut />
    </>
  );
}
