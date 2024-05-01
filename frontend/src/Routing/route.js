import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminHome from "../Admin/AdminHome/AdminHome";
import UserHome from "../User/UserHome/UserHome";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import PublicRoute from "./PublicRoute";
import AddCafe from "../Admin/AddCafe/AddCafe";
import CafeList from "../Admin/CafeList/CafeList";
import UserCafeList from "../User/UserCafeList/UserCafeList";
import CafeDetail from "../User/CafeDetail/CafeDetail";
import CafeDetailAdmin from "../Admin/CafeDetail/CafeDetailAdmin";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/cafe-list" element={<CafeList />} />
          <Route path="/admin/add-cafe" element={<AddCafe />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/cafe-list" element={<UserCafeList />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin", "user"]} />}>
          <Route path="/cafe/detail/:cafeId" element={<CafeDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
