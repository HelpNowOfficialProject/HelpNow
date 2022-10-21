import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import WithAuth from "./components/WithAuth/WithAuth";
import WithoutAuth from "./components/WithoutAuth/WithoutAuth";
import AddHelpRequest from "./components/AddHelpRequest/AddHelpRequest";

import "leaflet/dist/leaflet";
import Post from "./components/Post/Post";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LandingPage from "./components/LandingPage/LandingPage";

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
                    <Route path="app" element={<WithAuth />}>
                        <Route path="" element={<Home />} />
                        <Route path="post/add" element={<AddHelpRequest />} />
                        <Route path={`post/:id`} element={<Post />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
