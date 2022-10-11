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
} from "@chakra-ui/react";
import { useState } from "react";

//
export default function AddHelpRequest() {
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");
    const [tagError, setTagError] = useState("");

    const [sliderValue, setSliderValue] = useState(5);
    const [showTooltip, setShowTooltip] = useState(false);

    const [isVoluntary, setIsVoluntary] = useState(true);

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTag(e.target.value);
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

    return (
        <>
            <Container>
                <FormControl>
                    <Box mb={`40px`}>
                        <FormLabel>Tytuł</FormLabel>
                        <Input variant={`filled`}></Input>
                    </Box>
                    <Box mb={`40px`}>
                        <FormLabel>Opis</FormLabel>
                        <Textarea></Textarea>
                    </Box>
                    <Box mb={`40px`}>
                        <FormLabel>Adres</FormLabel>
                        <Input variant={`filled`}></Input>
                        <FormHelperText>
                            Format: miasto ulica numer
                        </FormHelperText>
                    </Box>
                    <Box mb={`40px`}>
                        <FormLabel>Tagi</FormLabel>
                        <Box mb={`10px`}>
                            {tags.map((elem, index) => {
                                return (
                                    <Tag>
                                        <TagLabel>{elem}</TagLabel>
                                        <TagCloseButton
                                            onClick={() => removeTag(index)}
                                        />
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
                            >
                                <AlertIcon />
                                <AlertTitle>
                                    Nie można dodać nowego tagu!
                                </AlertTitle>
                                <AlertDescription>{tagError}</AlertDescription>
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
                    <Box
                        my={"20px"}
                        display="flex"
                        justifyContent={"space-between"}
                    >
                        <FormLabel>Czy liczysz na darmową pomoc?</FormLabel>
                        <Switch
                            isChecked={isVoluntary}
                            onChange={handleVoluntaryChange}
                        ></Switch>
                    </Box>
                    <Button>Wyślij</Button>
                </FormControl>
            </Container>
        </>
    );
}
