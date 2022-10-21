import { Button, Flex, Heading } from "@chakra-ui/react";
import { AiFillWarning } from "react-icons/ai";
import { Link } from "react-router-dom";
interface IErrorProps {
  name?: string;
  description?: string;
}
export default function ErrorPage({ name, description }: IErrorProps) {
  return (
    <Flex
      textAlign="center"
      py={10}
      px={6}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      height={"100%"}
    >
      <AiFillWarning size={"200px"} color={"#F6AD55"} />
      <Heading
        as={"h1"}
        size="4xl"
        mt={3}
        mb={3}
        bgColor="red.300"
        backgroundClip="text"
      >
        {name || " 404"}
      </Heading>
      <Heading
        as={"h2"}
        size="md"
        mt={3}
        mb={3}
        bgColor="white"
        backgroundClip="text"
      >
        {description ||
          "Strona, której szukasz, może mieć zmienioną nazwę lub jest chwilowo niedostępna."}
      </Heading>
      <Link to="/">
        <Button mt={3} mb={2} p={6} colorScheme="red" variant="solid">
          Wróć do strony głównej
        </Button>
      </Link>
    </Flex>
  );
}
