import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
    AlertIcon,
    Alert,
    FormLabel,
    Container,
    Flex,
    IconButton,
    FormHelperText,
    FormControl,
    InputLeftElement,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import GeocodingInput from "../GeocodingInput/GeocodingInput";
import MapComponent from "../MapComponent/MapComponent";
import { ILocation } from "../../types/post";
import axios from "axios";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { AiFillEye, AiFillEyeInvisible, AiFillPhone } from "react-icons/ai";

export default function Register() {
    const toast = useToast();
    const navigate = useNavigate();
    const users = collection(db, "users");

    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [surname, setSurname] = useState("");
    //const [address, setAddress] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [initialLocation, setInitialLocation] = useState<ILocation>({
        latitude: 49.946357895803885,
        longitude: 18.607068901955323,
    });
    const [markerPosition, setMarkerPosition] = useState<ILocation>({
        latitude: 49.946357895803885,
        longitude: 18.607068901955323,
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handlePasswordConfirmChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordConfirm(e.target.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value);
    };
    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhoneNumber(e.target.value.replaceAll(/^[-()\d ]*/g, ""));
    };

    const handleMarkerPosition = (newLocation: ILocation) => {
        setMarkerPosition(newLocation);
    };
    const getIPLocation = async () => {
        const { data } = await axios.get("http://ipwho.is/");
        return { latitude: data.latitude, longitude: data.longitude };
    };

    const handleLocationChange = (location: ILocation) => {
        setMarkerPosition(location);
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

    const handleRegister = async () => {
        let errorMessage = "";
        if (password !== passwordConfirm) {
            errorMessage = "Hasła muszą się zgadzać!";
        } else if (!emailValidation.test(email)) {
            errorMessage = "Niepoprawny e-mail";
        } else if (!/\d/.test(password)) {
            errorMessage = "Hasło powinno zawierać przynajmniej 1 liczbę!";
        } else if (password.length < 6) {
            errorMessage =
                "Za słabe hasło! (Powinno mieć przynajmniej 6 znaków)";
        } else if (
            !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                phoneNumber
            )
        ) {
            errorMessage =
                "Niepoprawny numer telefonu (pamiętaj o numerze kierunkowym kraju!)";
        }

        if (errorMessage) {
            toast({
                title: "Błędy podczas rejestracji",
                description: errorMessage,
                status: "error",
                isClosable: true,
            });
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (user) => {
                const newDoc = await setDoc(doc(db, "users", user.user.uid), {
                    uid: user.user.uid,
                    name: name,
                    surname: surname,
                });

                const addressRef = collection(
                    db,
                    "users",
                    user.user.uid,
                    "address"
                );
                await setDoc(
                    doc(db, "users", user.user.uid, "address", "address"),
                    {
                        uid: user.user.uid,
                        latitude: markerPosition.latitude,
                        longitude: markerPosition.longitude,
                    }
                );
                console.log(user);
                navigate("/app");
            })
            .catch((err: any) => {
                let errorMessage = `Kod: ${err.code}; ${err.message}`;
                if (err.code === "auth/email-already-in-use") {
                    errorMessage = "Posiadasz już konto!";
                } else if (err.code === "auth/weak-password") {
                    errorMessage =
                        "Za słabe hasło! (Powinno mieć przynajmniej 6 znaków)";
                }
                toast({
                    title: "Błąd podczas rejestracji",
                    description: errorMessage,
                    status: "error",
                    isClosable: true,
                });
            });
    };

    return (
        <Container
            bgColor={`hsl(220deg 26% 18%)`}
            rounded={`20px`}
            padding={`20px`}
            mt={`20px`}
            mb={`20px`}
        >
            <Flex flexDir={`column`} gap={`5px`}>
                <Input
                    placeholder="Imię"
                    value={name}
                    onChange={handleNameChange}
                    variant={`filled`}
                />

                <Input
                    placeholder="Nazwisko"
                    value={surname}
                    onChange={handleSurnameChange}
                    variant={`filled`}
                />

                <FormControl mb={4}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<AiFillPhone />}
                        />
                        <Input
                            placeholder="Numer telefonu"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            variant={`filled`}
                            type={"tel"}
                        />
                    </InputGroup>

                    <FormHelperText>
                        Proszę podać też numer kierunkowy (dla Polski - +48){" "}
                    </FormHelperText>
                </FormControl>

                <Input
                    placeholder="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    variant={`filled`}
                    type={"email"}
                />

                <InputGroup>
                    <Input
                        placeholder="Hasło"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        variant={`filled`}
                    />
                    <InputRightElement width="3rem">
                        <IconButton
                            size="sm"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={""}
                        >
                            {showPassword ? (
                                <AiFillEye />
                            ) : (
                                <AiFillEyeInvisible />
                            )}
                        </IconButton>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder="Potwierdź hasło"
                        type={showPasswordConfirm ? "text" : "password"}
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                        variant={`filled`}
                    />
                    <InputRightElement width="3rem">
                        <IconButton
                            size="sm"
                            onClick={() =>
                                setShowPasswordConfirm((prev) => !prev)
                            }
                            aria-label={""}
                        >
                            {showPasswordConfirm ? (
                                <AiFillEye />
                            ) : (
                                <AiFillEyeInvisible />
                            )}
                        </IconButton>
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <FormLabel mt="30px">Adres</FormLabel>
            <Alert status="info">
                <AlertIcon />
                Adres jest używany do określania odległości od miejsca pomocy
            </Alert>
            <Box mb="20px">
                <div
                    style={{
                        width: "100%",
                        height: "400px",
                        margin: "15px 0px",
                    }}
                >
                    <MapContainer
                        // @ts-ignore
                        center={[
                            initialLocation.latitude,
                            initialLocation.longitude,
                        ]}
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
            <Flex flexDir={`row`} gap={`5px`}>
                <Button onClick={handleRegister}>Zarejestruj</Button>
                <Link to="../login">
                    <Button>Zaloguj się</Button>
                </Link>
            </Flex>
        </Container>
    );
}
