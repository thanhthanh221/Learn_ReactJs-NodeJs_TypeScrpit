import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin, Login } from "../pages";

const RoutesProject = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesProject;
