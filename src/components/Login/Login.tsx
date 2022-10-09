import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

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
    <div>
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
      <Button onClick={handleLogin}>Zaloguj</Button>
    </div>
  );
}
