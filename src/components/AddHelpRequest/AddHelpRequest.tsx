// Formularz dodawnie posta

import {
  Button,
  Container,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
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
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { IPost } from "../../types/post";

//
export default function AddHelpRequest() {
  const toast = useToast();
  const posts = collection(db, "posts");
  const navigate = useNavigate();

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
    // TODO: Add validation

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

    toast({
      title: "Sukces!",
      description: "Pomyślnie utworzono",
      status: "success",
      isClosable: true,
    });

    navigate("/");
  };

  return (
    <>
      <Container>
        <Text fontSize="4xl">Dodaj post o pomoc</Text>
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
          <Box mb={`40px`}>
            <FormLabel>Adres</FormLabel>
            <Input variant={`filled`}></Input>
            <Alert status="error">Tutaj nie dziala na razie</Alert>
            <FormHelperText>Format: miasto ulica numer</FormHelperText>
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
