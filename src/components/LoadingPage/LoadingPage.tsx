import { Box, Button, Center, ScaleFade, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function LoadingPage() {
    const [displayHelper, setDisplayHelper] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayHelper(true);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Center h="100vh" display="flex" flexDirection="column" gap={5}>
            <Loading />
            <ScaleFade initialScale={0.9} in={displayHelper}>
                <Box
                    display="flex"
                    flexDir={"column"}
                    justifyContent="center"
                    gap="4px"
                    alignItems="center"
                >
                    <Text fontSize="lg">
                        Trwa to zbyt długo... być może dany element nie
                        istnieje?
                    </Text>
                    <Link to="/">
                        <Button colorScheme={"purple"}>
                            Wróć do strony głównej
                        </Button>
                    </Link>
                </Box>
            </ScaleFade>
        </Center>
    );
}
