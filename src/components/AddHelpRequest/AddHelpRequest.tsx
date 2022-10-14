// Formularz dodawnie posta

import {
  Button,
  Container,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Switch,
  Tooltip,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { ILocation, IPost } from "../../types/post";
import GeocodingInput from "../GeocodingInput/GeocodingInput";
import LoadingPage from "../LoadingPage/LoadingPage";
import MapComponent from "../MapComponent/MapComponent";

import styles from "./AddHelpRequest.module.css";

//
export default function AddHelpRequest() {
  const toast = useToast();
  const posts = collection(db, "posts");
  const navigate = useNavigate();
  const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const [initialLocation, setInitialLocation] = useState<ILocation>({
    latitude: 49.946357895803885,
    longitude: 18.607068901955323,
  });
  const [markerPosition, setMarkerPosition] = useState<ILocation>({
    latitude: 49.946357895803885,
    longitude: 18.607068901955323,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [tagError, setTagError] = useState("");

  const [sliderValue, setSliderValue] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

  const [isVoluntary, setIsVoluntary] = useState(true);

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

    if (!currentTag) {
      setTagError("Tag nie może być pusty!");
      return;
    }

    //checks if the tag has spaces
    else if (/\s/.test(newTag)) {
      setTagError("Tag nie może mieć spacji!");
      return;
    }
    //checks if the tag has special characters
    else if (specialChar.test(newTag)) {
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
    setTitleError("");
    setDescriptionError("");

    if (!title) {
      setTitleError("Brakuje tytułu!");
      return;
    } else if (!description) {
      setDescriptionError("Brakuje Opisu!");
      return;
    } else if (tags.length === 0) {
      setTagError("Brakuje tagów!");
      return;
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
    };

    await addDoc(posts, newPost);

    setIsLoading(false);

    toast({
      title: "Sukces!",
      description: "Pomyślnie utworzono",
      status: "success",
      isClosable: true,
    });

    navigate("/");
  };

  const getIPLocation = async () => {
    const { data } = await axios.get("http://ipwho.is/");
    return { latitude: data.latitude, longitude: data.longitude };
  };

  useEffect(() => {
    getIPLocation().then((location) => {
      setMarkerPosition(location);
    });
    locateMe();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <>
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
            {titleError && (
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
                  <AlertTitle>Nie można dodać tytułu!</AlertTitle>
                  <AlertDescription>{titleError}</AlertDescription>
                </Box>
              </Alert>
            )}
          </Box>
          <Box mb={`40px`}>
            <FormLabel>Opis</FormLabel>
            <Textarea
              onChange={handleDescriptionChange}
              value={description}
              variant={"filled"}
            ></Textarea>
            {descriptionError && (
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
                  <AlertTitle>Nie można dodać opisu!</AlertTitle>
                  <AlertDescription>{descriptionError}</AlertDescription>
                </Box>
              </Alert>
            )}
          </Box>
          <Box mb="40px">
            <FormLabel>Adres</FormLabel>
            <div className={styles.map}>
              <MapContainer
                // @ts-ignore
                center={[initialLocation.latitude, initialLocation.longitude]}
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
              colorScheme="teal"
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
            <Button onClick={handlePostAdd}>Wyślij</Button>
            <Link to="/">
              <Button colorScheme={`red`}>Odrzuć</Button>
            </Link>
          </Box>
        </FormControl>
      </Container>
    </>
  );
}
