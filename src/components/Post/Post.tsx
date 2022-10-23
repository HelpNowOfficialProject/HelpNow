// TODO - Change to small post design
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
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
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useCollectionData,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { auth, db } from "../../firebase";
import { ILocation, IPost } from "../../types/post";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loading from "../Loading/Loading";
import LoadingPage from "../LoadingPage/LoadingPage";
import calculateDistance from "../utils/calculateDistance";
import { getDistanceColor, getEmergencyLevel } from "../utils/getColor";

export default function Post() {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [value, loading, error] = useDocument(doc(db, "posts", id ?? ""));
  const [myAddress, addressLoading, addressError] = useDocumentData(
    doc(
      db,
      "users",
      (auth.currentUser as any).uid as string,
      "address",
      "address"
    )
  );
  const [myPosts, myPostsLoading, myPostsError] = useCollectionData(
    collection(
      db,
      "users",
      (auth.currentUser as any).uid as string,
      "acceptedPosts"
    )
  );

  const [isLoadingChangingStatus, setIsLoadingChangingStatus] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [post, setPost] = useState<IPost>();
  const [phoneNumber, setPhoneNumber] = useState("");

  const getPhoneNumber = async () => {
    const phoneNumber = await getDoc(
      doc(db, "posts", (value as any).id, "secret", "phoneNumber")
    );
    setPhoneNumber(phoneNumber?.data()?.phoneNumber || "");
  };

  const handleValueChange = async () => {
    if (!value || !value.data()) return;
    setPost({
      ...((value as any).data() as unknown as IPost),
      uuid: value?.id,
    });

    const author = await getDoc(
      doc(
        db,
        "users",
        ((value as any).data() as unknown as IPost).authorId as string
      )
    );
    let { name, surname } = author.data() as any;
    setAuthorName(`${name} ${surname}`);

    if ((myPosts as any[]).find((e) => e.id === value.id)) {
      await getPhoneNumber();
    } else {
      setPhoneNumber("");
    }
  };

  const handleAccept = async () => {
    setIsLoadingChangingStatus(true);
    await setDoc(
      doc(
        db,
        "users",
        (auth.currentUser as any).uid as string,
        "acceptedPosts",
        (post as IPost).uuid as string
      ),
      {
        id: post?.uuid,
        uid: (auth.currentUser as any).uid,
      }
    );
    toast({
      title: "Zaakceptowano",
      description: "Zgłoszono chęć pomocy!",
      status: "success",
      isClosable: true,
    });

    await getPhoneNumber();
    setIsLoadingChangingStatus(false);
    // navigate("/app");
  };

  const handleDismiss = async () => {
    setIsLoadingChangingStatus(true);
    if (myPosts?.find((e) => e.id === (post as IPost).uuid)) {
      await deleteDoc(
        doc(
          db,
          "users",
          (auth.currentUser as any).uid as string,
          "acceptedPosts",
          (post as IPost).uuid as string
        )
      );
      toast({
        title: "Ostrzeżenie",
        description: "Anulowano chęć pomocy!",
        status: "info",
        isClosable: true,
      });
    }

    setIsLoadingChangingStatus(false);
    navigate("/app");
    return;
  };

  const handleCompleted = async () => {
    if (!post) return;
    setIsLoadingChangingStatus(true);
    await updateDoc(doc(db, "posts", (value as DocumentData).id), {
      isCompleted: !post.isCompleted,
    });
    setIsLoadingChangingStatus(false);
  };

  const handleDelete = async () => {
    setIsLoadingChangingStatus(true);

    await deleteDoc(doc(db, "posts", (value as DocumentData).id));
    navigate("/app");
    toast({
      title: "Usunięto post!",
      status: "success",
      isClosable: true,
    });

    setIsLoadingChangingStatus(false);
  };

  useEffect(() => {
    if (value) {
      handleValueChange();
    }
  }, [value, myPosts]);

  if (error || myPostsError || addressError) {
    return <ErrorPage />;
  }

  if (loading || addressLoading || !post || myPostsLoading)
    return <LoadingPage />;

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
        {post.authorId === (auth as any).currentUser.uid ? (
          <Text fontSize="md">
            <b>Ja</b> ({authorName})
          </Text>
        ) : (
          <Text fontSize="md">{authorName}</Text>
        )}
        <Flex className="titleBox" mb={`15px`} flexDir={`row`}>
          <Heading width={`100%`}>{(post as IPost).title}</Heading>
          <Tooltip
            label={
              (post as IPost).isVoluntary
                ? "Charytatywna pomoc"
                : "Otrzymasz wynagrodzenie"
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

        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/maps/dir/?api=1&origin=${
            (myAddress as ILocation).latitude
          },${(myAddress as ILocation).longitude}&destination=${
            (post.address as ILocation).latitude
          }, ${(post.address as ILocation).longitude}`}
          style={{ marginTop: "3px", width: "100%" }}
        >
          <Button mt={4} width={"100%"}>
            Nawiguj do
          </Button>
        </a>
        <Flex justifyContent={"center"} gap={2} my={4}>
          <Text>Odległość od Twojego adresu zamieszkania</Text>{" "}
          <Badge
            colorScheme={getDistanceColor(
              calculateDistance(post.address, myAddress as ILocation)
            )}
            variant={`subtle`}
            display="flex"
            alignItems={`center`}
            rounded={`5px`}
          >
            {Math.round(
              calculateDistance(post.address, myAddress as ILocation)
            )}{" "}
            km
          </Badge>
        </Flex>
        <Box mb={`15px`} mt={`20px`}>
          <FormLabel>Stopień zagrożenia</FormLabel>
          <Slider
            id="slider"
            defaultValue={post.dangerLevel}
            min={0}
            max={10}
            colorScheme={getEmergencyLevel(post.dangerLevel)}
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
        {(myPosts as any[]).find((e) => e.id === post.uuid) && (
          <Alert status="success" variant="left-accent" m={2} my={5}>
            <AlertIcon />
            <Flex flexDir={`column`}>
              <Box>Zgłoszono chęć pomocy! </Box>
              <Box>{phoneNumber ? `Numer telefonu: ${phoneNumber}` : ""}</Box>
            </Flex>
          </Alert>
        )}
        {isLoadingChangingStatus ? (
          <Loading />
        ) : post.authorId === (auth as any).currentUser.uid ? (
          <Flex className="buttonBox" w={`100%`} gap={`10px`}>
            <Button
              className={`markAsCompletedBtn`}
              width={`100%`}
              colorScheme={`green`}
              onClick={handleCompleted}
            >
              {post.isCompleted ? (
                <Text fontSize={`xs`}>Oznacz jako niewykonany</Text>
              ) : (
                <Text>Oznacz jako wykonany</Text>
              )}
            </Button>
            <Button
              className={`deletePostBtn`}
              w={`100%`}
              colorScheme={`red`}
              onClick={handleDelete}
            >
              <MdDelete />
              Usuń Post
            </Button>
          </Flex>
        ) : (
          <Flex className="buttonBox" width={`100%`} gap={`10px`}>
            <Button
              className="takeOfferBtn"
              width={`100%`}
              colorScheme={`green`}
              onClick={handleAccept}
              disabled={(myPosts as any[]).find((e) => e.id === post.uuid)}
            >
              Przyjmij
            </Button>

            <Button
              className="denyOfferBtn"
              width={`100%`}
              colorScheme={`red`}
              onClick={handleDismiss}
              disabled={!(myPosts as any[]).find((e) => e.id === post.uuid)}
            >
              Odrzuć
            </Button>
          </Flex>
        )}
        <Link to={`/app`} style={{ width: `100%` }}>
          <Button width={`100%`} colorScheme={`gray`} my={2}>
            Wróć do strony głównej
          </Button>
        </Link>
      </Container>
    </Flex>
  );
}
