import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import WithAuth from "./components/WithAuth/WithAuth";
import WithoutAuth from "./components/WithoutAuth/WithoutAuth";
import AddHelpRequest from "./AddHelpRequest";

const theme = extendTheme({
    initialColorMode: "dark",
    useSystemColorMode: false,
});

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={"dark"} />
            <BrowserRouter>
                <Routes>
                    <Route path="auth" element={<WithoutAuth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="*" element={<WithAuth />}>
                        <Route path="" element={<Home />} />
                        <Route path="addpost" element={<AddHelpRequest />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
