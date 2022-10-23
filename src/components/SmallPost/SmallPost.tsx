import {
  Badge,
  Box,
  Flex,
  FormLabel,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { ILocation, IPost } from "../../types/post";
import calculateDistance from "../utils/calculateDistance";
import { getDistanceColor, getEmergencyLevel } from "../utils/getColor";

interface ISmallPost {
  post: IPost;
  homeAddress: ILocation;
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
        w={`300px`}
        maxW={"300px"}
        onClick={navigateToBigPost}
        cursor="pointer"
      >
        <Flex w={"100%"} flexDir={`row`} justifyContent={`space-between`}>
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
          <Badge
            colorScheme={getDistanceColor(
              calculateDistance(
                props.post.address,
                props.homeAddress as ILocation
              )
            )}
            variant={`subtle`}
            display="flex"
            alignItems={`center`}
            rounded={`5px`}
          >
            {Math.round(
              calculateDistance(
                props.post.address,
                props.homeAddress as ILocation
              )
            )}{" "}
            km
          </Badge>
        </Flex>
        <Flex flexDir={`row`} justifyContent={`space-between`}>
          <Heading size={`lg`} width={`90%`}>
            {props.post.title}
          </Heading>
        </Flex>
        <Flex
          flexDir={`row`}
          gap={`5px`}
          // width={"max-content"}
          my={3}
          flexWrap={"wrap"}
          // minW={`100px`}
          width={"100%"}
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
        <Box mt={`30px`}>
          <FormLabel mb={0}>
            Poziom zagrożenia: {props.post.dangerLevel} / 10
          </FormLabel>
          {/* <Text textAlign={"center"} fontSize="lg" fontWeight={"bold"}>{props.post.dangerLevel}</Text> */}
          <Slider
            id="slider"
            defaultValue={props.post.dangerLevel}
            min={0}
            max={10}
            mt={0}
            colorScheme={getEmergencyLevel(props.post.dangerLevel)}
            isReadOnly
            value={props.post.dangerLevel}
          >
            <SliderMark value={1} mt="1" fontSize="sm" ml={`-25px`}>
              0
            </SliderMark>
            <SliderMark value={10} mt="1" fontSize="sm" ml={`-10px`}>
              10
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            {/* <Tooltip
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
            </Tooltip> */}

            <SliderThumb display={"none"} />
          </Slider>
        </Box>
      </Box>
    </>
  );
}
