import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  Highlight,
} from "@chakra-ui/react";

export default function Content() {
  return (
    <Stack bgColor="gray.700">
      <Container maxW={"5xl"} py={12} bgColor="gray.600" rounded="20px" mt={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Stack spacing={4} w="100%">
            <Heading>
              <Highlight
                query="Now"
                styles={{
                  mx: 1,
                  px: "6",
                  py: "1",
                  rounded: "full",
                  bg: "#8bffca",
                  color: "var(--chakra-colors-chakra-body-bg)",
                }}
              >
                Co to HelpNow
              </Highlight>
              ?
            </Heading>
            <Text color={"gray.400"} fontSize={"lg"} px={3}>
              Aplikacja polega na tworzeniu{" "}
              <strong>„postów z zapytaniem o pomoc”.</strong> W takowym poście
              podaje się takie informacje, jak{" "}
              <strong>opis problemu, lokalizacja, stopień zagrożenia</strong>,
              czy nawet informacja o tym, czy jesteśmy skorzy do{" "}
              <strong>zapłaty drobnego wynagrodzenia</strong>. Po utworzeniu
              takiego ogłoszenia jest ono{" "}
              <strong>widoczne dla pozostałych użytkowników</strong>. Zapytania
              o pomoc są podzielone na różne <strong>sekcje</strong> – od tych,
              które znajdują się <strong>najbliżej</strong>, aż po te, które są{" "}
              <strong>najnowsze</strong>. Kiedy utworzymy taką prośbę, inni
              użytkownicy mogą <strong>deklarować swore wsparcie</strong>. Po
              zadeklarowaniu pomocy takowe posty wyświetlają się w oddzielnej
              sekcji. Osoby, które zgłosiły chęć pomocy,{" "}
              <strong>mogą zadzwonić do osoby potrzebującej</strong> – widoczny
              jest jej <strong>numer telefonu</strong> (ale tylko dla osób,
              które zadeklarowały pomoc). Gdy dane zlecenie zostanie wykonane
              lub znajdzie się wystarczająca liczba osób chętne wziąć w nim
              udział, <strong>autor może oznaczyć go jako wykonane</strong>.
              Wtedy zniknie on z ogólnej tablicy ogłoszeń oraz przeniesie się do
              oddzielnej sekcji – zarówno u autora, jak i „pomocników”.
            </Text>
          </Stack>

          <Flex>
            <Image
              margin="auto"
              rounded={"md"}
              alt={"feature image"}
              src={`${process.env.PUBLIC_URL}/full.jpg`}
              objectFit={"cover"}
              height={300}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </Stack>
  );
}
