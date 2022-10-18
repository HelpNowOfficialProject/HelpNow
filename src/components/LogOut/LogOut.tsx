import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

export default function LogOut() {
    const [value, loading, error] = useDocumentData(
        doc(db, "users", (auth.currentUser as any).uid as string)
    );

    const logUserOut = async () => {
        signOut(auth);
    };
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<MdArrowDropDown />}
                colorScheme="green"
            >
                {value ? value.name : "HelpNow"}
            </MenuButton>
            <MenuList>
                <MenuItem
                    // as={Button}
                    onClick={logUserOut}
                    // position="absolute"
                    // top="0"
                    // right="15px"
                    // colorScheme="red"
                >
                    Wyloguj się
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
