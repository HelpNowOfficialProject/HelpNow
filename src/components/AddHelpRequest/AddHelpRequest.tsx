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
} from "@chakra-ui/react";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { ILocation, IPost } from "../../types/post";
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

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [tagError, setTagError] = useState("");

  const [sliderValue, setSliderValue] = useState(5);
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
    if (!currentTag) {
      setTagError("Tag nie może być pusty!");
      return;
    }
    //checks if the tag has spaces
    else if(/\s/.test(currentTag)){
      setTagError("Tag nie może mieć spacji!");
      return;
    }
    //checks if the tag has special characters
    else if(specialChar.test(currentTag)){
      setTagError("Tag nie może mieć znaków specjalnych!");
      return;
    }
    else if(currentTag[0].toUpperCase() == currentTag[0]){
      setTagError("Tag nie może zaczynać się od dużej litery!");
      return;
    }
    // Check if the tag exists already
    if (tags.find((e) => e === currentTag)) {
      setTagError("Tag musi być unikatowy!");
      return;
    }
    setTags((prev: string[]) => {
      return [...prev, currentTag];
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

  const handlePostAdd = async () => {
    let errorMessage = "";
    // TODO: Add tag validation

    if(!title){
      errorMessage = "Brakuje tytułu!";
    }
    else if(!description){
      errorMessage = "Brakuje opisu!";
    }
    else if(title[0].toUpperCase() === title[0]){
      errorMessage = "Tytuł nie może zaczynać się od dużej litery!";
    }

    if(errorMessage){
      toast({
        title: "Błąd!",
        description: errorMessage,
        status: "error",
        isClosable: true,
      }); return;
    }
    setIsLoading(true);

    const newPost: IPost = {
      authorId: auth.currentUser?.uid as string,
      title,
      description,
      address: {
        // TODO: Fix it
        latitude: 49.946357895803885,
        longitude: 18.607068901955323,
      },
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
      <Container mb="20px">
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
            {/* <Input variant={`filled`}></Input>
            <Alert status="error">Tutaj nie dziala na razie</Alert>
            <FormHelperText>Format: miasto ulica numer</FormHelperText> */}
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
          </Box>

          <Box mb={`40px`}>
            <FormLabel>Tagi</FormLabel>
            <Box mb={`10px`}>
              {tags.map((elem, index) => {
                return (
                  <Tag>
                    <TagLabel>{elem}</TagLabel>
                    <TagCloseButton onClick={() => removeTag(index)} />
                  </Tag>
                );
              })}
            </Box>
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
              defaultValue={1}
              min={0}
              max={10}
              colorScheme="teal"
              onChange={(v) => setSliderValue(v)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              mb={"40px"}
              mt={`40px`}
            >
              <SliderMark value={0} mt="1" fontSize="sm">
                0
              </SliderMark>
              <SliderMark value={5} mt="1" fontSize="sm">
                5
              </SliderMark>
              <SliderMark value={10} mt="1" fontSize="sm">
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
              <Button bgColor="red.600">Odrzuć</Button>
            </Link>
          </Box>
        </FormControl>
      </Container>
    </>
  );
}
