import { Route, Routes } from "react-router-dom";
import RegisterComponent from "../components/RegisterComponent";
import LoginComponent from "../components/LoginComponent";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/login" element={<LoginComponent />} />
        </Routes>
    );
};

export default RoutesApp;