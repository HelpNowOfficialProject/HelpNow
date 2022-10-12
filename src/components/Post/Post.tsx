import {
    Button,
    Container,
    Box,
    Tag,
    Text,
    Heading,
    Flex,
    Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";

export default function Post() {
    return (
        <>
            <Container>
                <Flex
                    className="titleBox"
                    mt={`10px`}
                    mb={`15px`}
                    flexDir={`row`}
                >
                    <Heading width={`100%`}>Tytuł</Heading>
                    {/* //TODO - Title loading */}
                    <AiFillDollarCircle size={`3em`} color={`#FEB2B2`} />
                    {/* //TODO - Color change on dollar */}
                </Flex>
                <Box className="tagBox" mb={`10px`}>
                    {/* //TODO - Tag loading */}
                    <Tag>Tag</Tag>
                </Box>
                <Box className="descBox" mb={`20px`}>
                    <Text variant={`filled`}>Opis</Text>
                    {/* //TODO - Description loading */}
                </Box>
                {/* //TODO - Maybe map */}
                {/* //TODO - Killometer indicator */}
                <Flex className="buttonBox" width={`100%`} gap={`10px`}>
                    <Button
                        className="takeOfferBtn"
                        width={`100%`}
                        colorScheme={`green`}
                    >
                        Przyjmij ofertę
                    </Button>
                    <Link to={`/`} style={{ width: `100%` }}>
                        <Button
                            className="denyOfferBtn"
                            width={`100%`}
                            colorScheme={`red`}
                        >
                            Cofnij
                        </Button>
                    </Link>
                </Flex>
            </Container>
        </>
    );
}
