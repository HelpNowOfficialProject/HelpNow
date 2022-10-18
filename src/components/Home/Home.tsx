import { Container } from "@chakra-ui/react";
import HelpList from "../HelpList/HelpList";
import Header from "../Header/Header";

export default function Home() {
    return (
        <Container minW={`100%`} mt={`10px`}>
            <HelpList />
        </Container>
    );
}
