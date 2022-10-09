import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function LogOut() {
  const logUserOut = async () => {
    signOut(auth);
  };
  return <Button onClick={logUserOut}>Wyloguj się</Button>;
}
