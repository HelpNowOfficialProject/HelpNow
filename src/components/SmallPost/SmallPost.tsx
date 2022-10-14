import {
    Box,
    Slider,
    Tag,
    TagLabel,
    Text,
    Flex,
    SliderThumb,
    Tooltip,
    SliderTrack,
    SliderFilledTrack,
    SliderMark,
    Heading,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, useNavigate } from "react-router-dom";
import { IPost } from "../../types/post";

interface ISmallPost {
    post: IPost;
}

export default function SmallPost(props: ISmallPost) {
    const navigate = useNavigate();

    const navigateToBigPost = () => {
        navigate(`post/${props.post.uuid}`);
    };

    return (
        <>
            <Box
                bgColor={`hsl(220deg 26% 18%)`}
                rounded={`10px`}
                padding={`30px`}
                w={`200px`}
                maxW={"200px"}
                onClick={navigateToBigPost}
                cursor="pointer"
            >
                <Box>
                    <Heading size={`lg`}>{props.post.title}</Heading>
                </Box>
                <Flex
                    flexDir={`row`}
                    gap={`5px`}
                    width={"max-content"}
                    // minW={`100px`}
                >
                    {props.post.tags.map((elem, index) => {
                        return (
                            <Tag>
                                <TagLabel>{elem}</TagLabel>
                            </Tag>
                        );
                    })}
                </Flex>
                <Slider
                    id="slider"
                    defaultValue={props.post.dangerLevel}
                    min={0}
                    max={10}
                    colorScheme="teal"
                    mb={"10px"}
                    mt={`50px`}
                    isReadOnly
                    value={props.post.dangerLevel}
                >
                    <SliderMark value={1} mt="1" fontSize="sm" ml={`-20px`}>
                        0
                    </SliderMark>
                    <SliderMark value={10} mt="1" fontSize="sm" ml={`-10px`}>
                        10
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                        hasArrow
                        bg="teal.500"
                        color="white"
                        placement="top"
                        isOpen={true}
                        mb="-5px"
                        ml="-17px"
                        label={`${props.post.dangerLevel}`}
                    >
                        <SliderThumb opacity={0} />
                    </Tooltip>

                    <SliderThumb display={"none"} />
                </Slider>
            </Box>
        </>
    );
}
