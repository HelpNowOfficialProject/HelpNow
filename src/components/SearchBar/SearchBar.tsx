import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

interface ISearchBar {
  value: string;
  setValue: (text: string) => void;
}
export default function SearchBar({ value, setValue }: ISearchBar) {
  return (
    <>
      <FormControl>
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaSearch />} />
            <Input
              placeholder="Wyszukaj"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </InputGroup>
        </Box>
        <FormHelperText>
          Aby wyszukiwać tylko po tagach, poprzedź swoją frazę hashtagiem
        </FormHelperText>
      </FormControl>
    </>
  );
}
