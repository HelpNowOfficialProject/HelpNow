// Formularz dodawnie posta

import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { ILocation, IPost } from "../../types/post";
import GeocodingInput from "../GeocodingInput/GeocodingInput";
import LoadingPage from "../LoadingPage/LoadingPage";
import MapComponent from "../MapComponent/MapComponent";
import { getEmergencyLevel } from "../utils/getColor";

import styles from "./AddHelpRequest.module.css";

//
export default function AddHelpRequest() {
  const toast = useToast();
  const posts = collection(db, "posts");
  const navigate = useNavigate();
  const specialCharTag = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const specialCharOther = /[`#@$%^&*_+\=\[\]{};':\\|<>\/]/;
  const cancelRef = useRef();

  const [markerPosition, setMarkerPosition] = useState<ILocation>({
    latitude: 49.946357895803885,
    longitude: 18.607068901955323,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [tagError, setTagError] = useState("");

  const [sliderValue, setSliderValue] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

  const [isVoluntary, setIsVoluntary] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleMarkerPosition = (newLocation: ILocation) => {
    setMarkerPosition(newLocation);
  };

  const locateMe = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMarkerPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (_) => {
        getIPLocation().then((location) => {
          setMarkerPosition(location);
        });
        toast({
          title: "Ostrzeżenie",
          description:
            "Nie udało się pobrać lokalizacji! Próbuję jeszcze raz...",
          status: "warning",
          isClosable: true,
        });
      }
    );
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const addTag = () => {
    setTagError("");

    let newTag =
      currentTag[0].toUpperCase() + currentTag.slice(1).toLowerCase();

    //doesn't work for some reason
    if (currentTag === "") {
      setTagError("Tag nie może być pusty!");
      return;
    } else if (tags.length === 8) {
      setTagError("Nie może być więcej niż 8 tagów!");
      return;
    } else if (currentTag.length > 15) {
      setTagError("Tag nie może mieć więcej niż 15 znaków");
      return;
    }

    //checks if the tag has spaces
    else if (/\s/.test(newTag)) {
      setTagError("Tag nie może mieć spacji!");
      return;
    }
    //checks if the tag has special characters
    else if (specialCharTag.test(newTag)) {
      setTagError("Tag nie może mieć znaków specjalnych!");
      return;
    }

    // Check if the tag exists already
    if (tags.find((e) => e === newTag)) {
      setTagError("Tag musi być unikatowy!");
      return;
    }
    setTags((prev: string[]) => {
      return [...prev, newTag];
    });
    setCurrentTag("");
  };

  const removeTag = (i: number) => {
    setTags((prev) => {
      return prev.filter((e, index) => index !== i);
    });
  };

  const handleVoluntaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVoluntary(e.target.checked);
  };

  const handleLocationChange = (location: ILocation) => {
    setMarkerPosition(location);
  };

  const handlePostAdd = async () => {
    let errorMessage = "";

    if (!title) {
      errorMessage = "Brakuje tytułu!";
    } else if (title.length > 48) {
      errorMessage = "Tytuł nie może mieć więcej niż 48 znaków";
    } else if (specialCharOther.test(title)) {
      errorMessage = "Tytuł nie może zawierać znaków specjalnych";
    } else if (title[0].toLowerCase() === title[0]) {
      errorMessage = "Tytuł musi być z dużej litery";
    } else if (!description) {
      errorMessage = "Brakuje opisu!";
    } else if (description.length > 256) {
      errorMessage = "Opis nie może mieć więcej niż 256 znaków";
    } else if (specialCharOther.test(description)) {
      errorMessage = "Opis nie może zawierać znaków specjalnych";
    } else if (tags.length === 0) {
      errorMessage = "Brakuje tagów!";
    }

    if (errorMessage) {
      toast({
        title: "Błąd!",
        description: errorMessage,
        status: "error",
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);

    const newPost: IPost = {
      authorId: auth.currentUser?.uid as string,
      title,
      description,
      address: markerPosition,
      tags,
      dangerLevel: sliderValue,
      isVoluntary,
      timestamp: new Date(),
      isCompleted: false,
    };

    await addDoc(posts, newPost);

    setIsLoading(false);

    toast({
      title: "Sukces!",
      description: "Pomyślnie utworzono",
      status: "success",
      isClosable: true,
    });

    navigate("/app");
  };

  const getIPLocation = async () => {
    const { data } = await axios.get("https://ipwho.is/");
    return { latitude: data.latitude, longitude: data.longitude };
  };

  const getHomeAddress = async () => {
    const address = await getDoc(
      doc(
        db,
        "users",
        (auth.currentUser as any).uid as string,
        "address",
        "address"
      )
    );
    if (!address.data()) return;
    const { latitude, longitude } = address.data() as ILocation;
    setMarkerPosition({
      latitude,
      longitude,
    });
  };

  const onDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const onDialogClose = () => {
    setIsDialogOpen(false);
  };
  const goHome = () => {
    onDialogClose();
    navigate("/app");
  };

  useEffect(() => {
    // getIPLocation().then((location) => {
    //   setMarkerPosition(location);
    // });
    // locateMe();
    getHomeAddress();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Wróć
            </AlertDialogHeader>

            <AlertDialogBody>
              Czy na pewno chcesz wrócić do strony głównej? Odrzuci to
              niezapisane zmiany.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onDialogClose}>
                Anuluj
              </Button>
              <Button colorScheme="red" onClick={goHome} ml={3}>
                Wróć
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Container
        mt={`20px`}
        mb="20px"
        bgColor={`hsl(220deg 26% 18%)`}
        p={`20px`}
        rounded={`10px`}
      >
        <Text fontSize="4xl">Dodaj prośbę o pomoc</Text>
        <FormControl>
          <Box mb={`40px`}>
            <FormLabel>Tytuł</FormLabel>
            <Input
              variant={`filled`}
              onChange={handleTitleChange}
              value={title}
            ></Input>
          </Box>
          <Box mb={`40px`}>
            <FormLabel>Opis</FormLabel>
            <Textarea
              onChange={handleDescriptionChange}
              value={description}
              variant={"filled"}
            ></Textarea>
          </Box>
          <Box mb="40px">
            <FormLabel>Adres</FormLabel>
            <div className={styles.map}>
              <MapContainer
                // @ts-ignore
                center={[markerPosition.latitude, markerPosition.longitude]}
                zoom={13}
                scrollWheelZoom={true}
                style={{
                  height: "100%",
                }}
              >
                <MapComponent
                  markerPosition={markerPosition}
                  handleMarkerPosition={handleMarkerPosition}
                />
              </MapContainer>
            </div>

            <Button onClick={locateMe}>Zlokalizuj mnie!</Button>

            <GeocodingInput onAddressSearch={handleLocationChange} />
          </Box>

          <Box mb={`40px`}>
            <FormLabel>Tagi</FormLabel>
            <Flex mb={`10px`} gap={`5px`}>
              {tags.map((elem, index) => {
                return (
                  <Tag>
                    <TagLabel>{elem}</TagLabel>
                    <TagCloseButton onClick={() => removeTag(index)} />
                  </Tag>
                );
              })}
            </Flex>
            <Input
              variant={`filled`}
              className={`tagInput`}
              value={currentTag}
              onChange={handleTagChange}
              mb={`10px`}
            ></Input>
            {tagError && (
              <Alert
                status="error"
                borderRadius={`10px`}
                mb="10px"
                display={"flex"}
              >
                <Box display="flex">
                  <AlertIcon />
                </Box>
                <Box>
                  <AlertTitle>Nie można dodać nowego tagu!</AlertTitle>
                  <AlertDescription>{tagError}</AlertDescription>
                </Box>
              </Alert>
            )}
            <Button onClick={addTag}>Dodaj Tagi</Button>
          </Box>
          <Box>
            <FormLabel>Poziom zagrożenia</FormLabel>

            <Slider
              id="slider"
              defaultValue={sliderValue}
              min={1}
              max={10}
              colorScheme={getEmergencyLevel(sliderValue)}
              onChange={(v) => setSliderValue(v)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              mb={"40px"}
              mt={`40px`}
            >
              <SliderMark value={1} mt="1" fontSize="sm">
                1
              </SliderMark>
              <SliderMark value={5} mt="1" fontSize="sm">
                5
              </SliderMark>
              <SliderMark value={10} mt="1" ml={`-10px`} fontSize="sm">
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
                isOpen={showTooltip}
                label={`${sliderValue}`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Box>
          <Box my={"20px"} display="flex" justifyContent={"space-between"}>
            <FormLabel>Czy liczysz na darmową pomoc?</FormLabel>
            <Switch
              isChecked={isVoluntary}
              onChange={handleVoluntaryChange}
            ></Switch>
          </Box>
          <Box display="flex" justifyContent={"space-between"}>
            <Button colorScheme={`red`} onClick={onDialogOpen}>
              Wróć
            </Button>
            <Button onClick={handlePostAdd}>Dodaj post</Button>
          </Box>
        </FormControl>
      </Container>
    </>
  );
}
