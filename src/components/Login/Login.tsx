import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
    Link as ChakraLink,
    Container,
    Flex,
    IconButton,
    Heading,
    Image,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import style from "./Login.module.css";
export default function Login() {
    const toast = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        // TODO: Better way to achieve that - maybe a little text under the inputs
        if (!email) {
            toast({
                title: "Błąd podczas logowania",
                description: "Podaj e-mail",
                status: "error",
                isClosable: true,
            });
            return;
        } else if (!password) {
            toast({
                title: "Błąd podczas logowania",
                description: "Podaj hasło",
                status: "error",
                isClosable: true,
            });
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                navigate("/");
            })
            .catch((err: any) => {
                let errorMessage = `Kod: ${err.code}; ${err.message}`;
                if (err.code === "auth/invalid-email") {
                    errorMessage = "Niepoprawny e-mail";
                } else if (err.code === "auth/user-not-found") {
                    errorMessage = "Twoje konto nie istnieje!";
                } else if (err.code === "auth/wrong-password") {
                    errorMessage = "Złe hasło!";
                }
                toast({
                    title: "Błąd podczas logowania",
                    description: errorMessage,
                    status: "error",
                });
            });
    };

    return (
        <Container className={style.containerWrapper} mt={5}>
            <Flex flexDir="column" width={"100%"} justifyContent={"center"} alignItems={"center"} gap={5}>
            <Image src={`${process.env.PUBLIC_URL}/3.png`} height={200} width={200} rounded={`20px`}></Image>
            {/* <Heading>HelpNow</Heading> */}
            <Heading>Logowanie</Heading>
            </Flex>
            <Flex
                className={style.container}
                m={`auto`}
                mt={`20px`}
                rounded={`20px`}
                p={`20px`}
                px={`40px`}
                bgColor={`hsl(220deg 26% 18%)`}
                width={`100%`}
                justifyContent={`center`}
            >
                <Flex flexDir={`column`} gap={`5px`} width={`100%`} mb={`20px`}>
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
                                    <AiFillEyeInvisible />
                                ) : (
                                    <AiFillEye />
                                )}
                            </IconButton>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                <Flex flexDir={`column`} gap={`10px`}>
                    <Button onClick={handleLogin}>Zaloguj</Button>
                    <Link to="../register">
                        <Button>Zarejestruj się</Button>
                    </Link>
                </Flex>
            </Flex>
        </Container>
    );
}
