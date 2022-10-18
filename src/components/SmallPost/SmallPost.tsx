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
  Alert,
  AlertIcon,
  FormLabel,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
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
        padding={`15px`}
        pt={`10px`}
        w={`200px`}
        maxW={"200px"}
        onClick={navigateToBigPost}
        cursor="pointer"
      >
        <Box>
          <Text fontSize={`md`} mb={`5px`}>
            Dodano:{" "}
            <ReactTimeAgo
              date={
                new Date(
                  (props?.post?.timestamp?.seconds ||
                    new Date().getTime() / 1000) * 1000
                )
              }
              locale={`pl-PL`}
              timeStyle={`twitter`}
            />
          </Text>
          <Heading size={`lg`}>{props.post.title}</Heading>
        </Box>
        <Flex
          flexDir={`row`}
          gap={`5px`}
          // width={"max-content"}
          my={3}
          flexWrap={"wrap"}
          // minW={`100px`}
          width={"100%"}
        >
          {props.post.tags.map((elem, index) => {
            return (
              <Tag>
                <TagLabel>{elem}</TagLabel>
              </Tag>
            );
          })}
        </Flex>
        <Box mt={`30px`}>
          <FormLabel>Poziom zagrożenia</FormLabel>
          <Slider
            id="slider"
            defaultValue={props.post.dangerLevel}
            min={0}
            max={10}
            colorScheme="teal"
            mb={"10px"}
            mt={`30px`}
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
      </Box>
    </>
  );
}
