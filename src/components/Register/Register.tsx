import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, writeBatch } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiFillPhone } from "react-icons/ai";
import { MapContainer } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { ILocation } from "../../types/post";
import GeocodingInput from "../GeocodingInput/GeocodingInput";
import MapComponent from "../MapComponent/MapComponent";

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
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.replaceAll(/[^()+\d ]*$/g, ""));
  };

  const handleMarkerPosition = (newLocation: ILocation) => {
    setMarkerPosition(newLocation);
  };
  const getIPLocation = async () => {
    const { data } = await axios.get("https://ipwho.is/");
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
          title: "Ostrze??enie",
          description:
            "Nie uda??o si?? pobra?? lokalizacji! Pr??buj?? jeszcze raz...",
          status: "warning",
          isClosable: true,
        });
      }
    );
  };

  const handleRegister = async () => {
    let errorMessage = "";
    if (password !== passwordConfirm) {
      errorMessage = "Has??a musz?? si?? zgadza??!";
    } else if (!emailValidation.test(email)) {
      errorMessage = "Niepoprawny e-mail";
    } else if (!/\d/.test(password)) {
      errorMessage = "Has??o powinno zawiera?? przynajmniej 1 liczb??!";
    } else if (password.length < 6) {
      errorMessage = "Za s??abe has??o! (Powinno mie?? przynajmniej 6 znak??w)";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        phoneNumber
      )
    ) {
      errorMessage =
        "Niepoprawny numer telefonu (pami??taj o numerze kierunkowym kraju!)";
    }

    if (errorMessage) {
      toast({
        title: "B????dy podczas rejestracji",
        description: errorMessage,
        status: "error",
        isClosable: true,
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        const batch = writeBatch(db);
        const newDoc = batch.set(doc(db, "users", user.user.uid), {
          uid: user.user.uid,
          name: name,
          surname: surname,
        });

        batch.set(doc(db, "users", user.user.uid, "address", "address"), {
          uid: user.user.uid,
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
        });

        batch.set(doc(db, "users", user.user.uid, "address", "phoneNumber"), {
          uid: user.user.uid,
          phoneNumber: phoneNumber,
        });

        await batch.commit();

        await auth.signOut();

        toast({
          title: "Dzi??kujemy!",
          description: `Konto ${email} zosta??o utworzone! Mo??esz si?? teraz zalogowa??`,
          status: "success",
          isClosable: true,
        });

        navigate("/auth/login");
        // navigate("/app");
      })
      .catch((err: any) => {
        let errorMessage = `Kod: ${err.code}; ${err.message}`;
        if (err.code === "auth/email-already-in-use") {
          errorMessage = "Posiadasz ju?? konto!";
        } else if (err.code === "auth/weak-password") {
          errorMessage = "Za s??abe has??o! (Powinno mie?? przynajmniej 6 znak??w)";
        }
        toast({
          title: "B????d podczas rejestracji",
          description: errorMessage,
          status: "error",
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    getIPLocation().then((location) => {
      setMarkerPosition(location);
    });
    locateMe();
  }, []);

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
          placeholder="Imi??"
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
            <InputLeftElement pointerEvents="none" children={<AiFillPhone />} />
            <Input
              placeholder="Numer telefonu"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              variant={`filled`}
              type={"tel"}
            />
          </InputGroup>

          <FormHelperText>
            Prosz?? poda?? te?? numer kierunkowy (dla Polski - +48){" "}
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
            placeholder="Has??o"
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
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </IconButton>
          </InputRightElement>
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="Potwierd?? has??o"
            type={showPasswordConfirm ? "text" : "password"}
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            variant={`filled`}
          />
          <InputRightElement width="3rem">
            <IconButton
              size="sm"
              onClick={() => setShowPasswordConfirm((prev) => !prev)}
              aria-label={""}
            >
              {showPasswordConfirm ? <AiFillEye /> : <AiFillEyeInvisible />}
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <FormLabel mt="30px">Adres</FormLabel>
      <Alert status="info">
        <AlertIcon />
        Adres jest u??ywany do okre??lania odleg??o??ci od miejsca pomocy
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
      <Flex flexDir={`row`} gap={`5px`}>
        <Button onClick={handleRegister}>Zarejestruj</Button>
        <Link to="../login">
          <Button>Zaloguj si??</Button>
        </Link>
      </Flex>
    </Container>
  );
}
