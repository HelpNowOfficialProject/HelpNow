import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    setName(e.target.value)
  };
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value)
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
      errorMessage = "Za słabe hasło! (Powinno mieć przynajmniej 6 znaków)";
    }

    if(errorMessage){
      toast({
        title: "Błędy podczas rejestracji",
        description: errorMessage,
        status: "error",
        isClosable: true,
      }); return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        navigate("/");
      })
      .catch((err: any) => {
        let errorMessage = `Kod: ${err.code}; ${err.message}`;
        if (err.code === "auth/email-already-in-use") {
          errorMessage = "Posiadasz już konto!";
        } else if (err.code === "auth/weak-password") {
          errorMessage = "Za słabe hasło! (Powinno mieć przynajmniej 6 znaków)";
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
    <div>
      <Input
        placeholder="Imię"
        value={name}
        onChange={handleNameChange}
      />

      <Input
        placeholder="Nazwisko"
        value={surname}
        onChange={handleSurnameChange}
      />

      <Input
        placeholder="E-mail"
        value={email}
        onChange={handleEmailChange}
        type={"email"}
      />

      <InputGroup>
        <Input
          placeholder="Hasło"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Ukryj" : "Pokaż"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup>
        <Input
          placeholder="Potwierdź hasło"
          type={showPasswordConfirm ? "text" : "password"}
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
          >
            {showPasswordConfirm ? "Ukryj" : "Pokaż"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button onClick={handleRegister} mt="20px">
        Zarejestruj
      </Button>
      <Box mt="20px">
        <ChakraLink>
          <Link to="../login">Zaloguj się</Link>
        </ChakraLink>
      </Box>
    </div>
  );
}

