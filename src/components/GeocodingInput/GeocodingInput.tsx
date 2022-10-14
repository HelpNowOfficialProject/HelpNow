import {
    Alert,
    AlertIcon,
    Box,
    CircularProgress,
    FormLabel,
    IconButton,
    Input,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ILocation } from "../../types/post";

interface IGeocodingInputProps {
    onAddressSearch: (address: ILocation) => void;
}
export default function GeocodingInput({
    onAddressSearch,
}: IGeocodingInputProps) {
    const toast = useToast();
    const [value, setValue] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const geocode = async (counter: number): Promise<void> => {
        if (!value || isDisabled) return;
        setIsDisabled(true);
        try {
            const request = await axios.get(
                `https://geocode.xyz/${value}?json=1`,
                {
                    headers: {
                        "User-Agent":
                            "Mozilla/5.0 (Windows; U; Windows NT 6.2) AppleWebKit/536.1.1 (KHTML, like Gecko) Chrome/29.0.819.0 Safari/536.1.1",
                    },
                }
            );
            if (request) {
                const data = request.data;
                if (data.latt && data.longt) {
                    onAddressSearch({
                        latitude: parseFloat(data.latt),
                        longitude: parseFloat(data.longt),
                    });
                } else {
                    toast({
                        title: "Niestety - wystąpił błąd",
                        description:
                            "Nie udało się pobrać lokalizacji lub jest ona błędna",
                        status: "warning",
                        isClosable: true,
                    });
                }
            }
        } catch (err) {
            if (counter < 5) {
                geocode(counter + 1);
                return;
            }
            toast({
                title: "Niestety - wystąpił błąd",
                description: "Nie udało się pobrać lokalizacji",
                status: "warning",
                isClosable: true,
            });
        }
        setIsDisabled(false);
    };

    return (
        <Box display="flex" flexDir={"column"} my={5}>
            <Alert status="warning">
                <AlertIcon />
                Eksperymentalna funkcja - wyszukiwanie po adresie (nie zawsze
                działa, ponieważ korzystamy z darmowego API)
            </Alert>
            <Box display="flex" my="12px" gap={2}>
                <Input
                    variant="filled"
                    placeholder="Jasło, ul. Wolności 2"
                    isDisabled={isDisabled}
                    onChange={handleValueChange}
                />

                <IconButton
                    colorScheme="blue"
                    aria-label="Szukaj"
                    disabled={isDisabled}
                    icon={
                        isDisabled ? (
                            <CircularProgress
                                isIndeterminate
                                color="blue.800"
                                size={8}
                            />
                        ) : (
                            <FaSearch />
                        )
                    }
                    onClick={() => geocode(0)}
                />
            </Box>
        </Box>
    );
}
