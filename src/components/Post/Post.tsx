// TODO - Change to small post design
import {
  Button,
  Container,
  Box,
  Tag,
  Text,
  Heading,
  Flex,
  Icon,
  useToast,
  TagLabel,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
  FormLabel,
} from "@chakra-ui/react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import { IPost } from "../../types/post";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage/ErrorPage";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { parseJsonText } from "typescript";
import ReactTimeAgo from "react-time-ago";

export default function Post() {
  const toast = useToast();
  const { id } = useParams();

  const [value, loading, error] = useDocumentData(doc(db, "posts", id ?? ""));
  const [authorName, setAuthorName] = useState("");
  const [post, setPost] = useState<IPost>();

  const handleValueChange = async () => {
    setPost(value as unknown as IPost);

    const author = await getDoc(
      doc(db, "users", (value as unknown as IPost).authorId as string)
    );
    let { name, surname } = author.data() as any;
    setAuthorName(`${name} ${surname}`);
  };

  useEffect(() => {
    if (value) {
      handleValueChange();
    }
  }, [value]);

  if (error) {
    return <ErrorPage />;
  }

  if (loading || !post) return <LoadingPage />;

  console.log(post);

  return (
    <Flex padding={3} flexDirection={"column"}>
      <Container
        bgColor={`hsl(220deg 26% 18%)`}
        rounded={`20px`}
        padding={`20px`}
        mt={`20px`}
      >
        <Text fontSize={`md`}>
          Dodano:{" "}
          <ReactTimeAgo
            date={
              new Date(
                (post?.timestamp?.seconds || new Date().getTime() / 1000) * 1000
              )
            }
            locale={`pl-PL`}
            timeStyle={`twitter`}
          />
        </Text>
        <Text fontSize="md">{authorName}</Text>
        <Flex className="titleBox" mb={`15px`} flexDir={`row`}>
          <Heading width={`100%`}>{(post as IPost).title}</Heading>
          <Tooltip
            label={
              (post as IPost).isVoluntary
                ? "Otrzymasz wynagrodzenie"
                : "Charytatywna pomoc"
            }
          >
            <span>
              {" "}
              <AiFillDollarCircle
                size={`3em`}
                color={(post as IPost).isVoluntary ? "#68D391" : "#FEB2B2"}
              />
            </span>
          </Tooltip>
        </Flex>
        <Flex className="tagBox" mb={`10px`} gap={`5px`}>
          {((post as IPost).tags ?? []).map((elem, index) => {
            return (
              <Tag>
                <TagLabel>{elem}</TagLabel>
              </Tag>
            );
          })}
        </Flex>
        <Box className="descBox" mb={`20px`}>
          <Text variant={`filled`}>{(post as IPost).description}</Text>
        </Box>
        {/* //TODO - Maybe map */}
        {/* //TODO - Killometer indicator */}

        <div
          style={{
            height: 400,
            width: "100%",
          }}
        >
          <MapContainer
            // @ts-ignore
            center={[
              (post as IPost).address.latitude,
              (post as IPost).address.longitude,
            ]}
            zoom={13}
            scrollWheelZoom={true}
            style={{
              height: "100%",
            }}
          >
            <Marker
              position={[
                (post as IPost).address.latitude,
                (post as IPost).address.longitude,
              ]}
            ></Marker>
            <TileLayer
              // @ts-ignore
              attribution="&copy; HelpNow"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
          </MapContainer>
        </div>
        <Box mb={`15px`} mt={`20px`}>
          <FormLabel>Stopień zagrożenia</FormLabel>
          <Slider
            id="slider"
            defaultValue={post.dangerLevel}
            min={0}
            max={10}
            colorScheme="teal"
            mb={"15px"}
            mt={`30px`}
            isReadOnly
            value={post.dangerLevel}
          >
            <SliderMark value={1} mt="1" fontSize="sm" ml={`-50px`}>
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
              label={`${post.dangerLevel}`}
            >
              <SliderThumb opacity={0} />
            </Tooltip>

            <SliderThumb display={"none"} />
          </Slider>
        </Box>
        <Flex className="buttonBox" width={`100%`} gap={`10px`}>
          <Button className="takeOfferBtn" width={`100%`} colorScheme={`green`}>
            Przyjmij
          </Button>
          <Link to={`/`} style={{ width: `100%` }}>
            <Button className="denyOfferBtn" width={`100%`} colorScheme={`red`}>
              Odrzuć
            </Button>
          </Link>
        </Flex>
      </Container>
    </Flex>
  );
}
