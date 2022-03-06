import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./components/page/adminPage/AdminPage";
import BasketPage from "./components/page/basketPage/BasketPage";
import NotFoundPage from "./components/page/NotFoundPage";
import { Main } from "./layout/Main";
import ProductList from "./layout/ProductList";
import LogOut from "./layout/LogOut";
import ForgotPasswordPage from "./components/page/forgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/page/resetPasswordPage/ResetPasswordPage";
import MainPage from "./components/page/mainPage/MainPage";
import ProtectRoute from "./components/common/ProtectRoute";

const App: FC = () => {
  console.log(process.env.PORT);
  
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Main />}>
          <Route index element={<MainPage />} />
          <Route path=":category" element={<ProductList />}>
            <Route path=":manufacturerId" element={<ProductList />}>
              <Route path=":id" element={<ProductList />} />
            </Route>
          </Route>
          <Route
            path="admin/*"
            element={
              <ProtectRoute>
                <AdminPage />
              </ProtectRoute>
            }
          />
          <Route path="basket" element={<BasketPage />} />
          <Route path="logOut" element={<LogOut />} />
        </Route>
        <Route path="recoverPass" element={<ForgotPasswordPage />} />
        <Route path="reset" element={<ResetPasswordPage />}>
          <Route path=":token" element={<ResetPasswordPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
