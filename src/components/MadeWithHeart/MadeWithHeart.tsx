import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Link,
    Flex,
} from "@chakra-ui/react";

export default function MadeWithHeart() {
    return (
        <>
            <Alert status="success" justifyContent={"center"}>
                <AlertIcon>❤</AlertIcon>
                <Flex flexDir="column">
                    <AlertTitle>Made with ❤️ by:</AlertTitle>
                    <AlertDescription>
                        <Link href="https://github.com/Arciiix" isExternal>
                            Artur Nowak
                        </Link>
                        ,{" "}
                        <Link href="https://github.com/wojtekwro29" isExternal>
                            Wojciech Wróblewski
                        </Link>
                        ,{" "}
                        <Link href="https://github.com/greatMat299" isExternal>
                            Mateusz Krok
                        </Link>
                        ,{" "}
                        <Link href="https://github.com/Trolju" isExternal>
                            Robert Zarzecki
                        </Link>
                        ,{" "}
                        <Link href="https://github.com/ThisIs81" isExternal>
                            Paweł Walas
                        </Link>
                        .
                    </AlertDescription>
                </Flex>
            </Alert>
        </>
    );
}
