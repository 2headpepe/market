import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { Provider} from "react-redux";
import { store } from "./store";

import "./index.css";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PostInfoPage from "./pages/PostInfoPage/PostInfoPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminUsersPage from "./pages/AdminPage/pages/AdminUsersPage/AdminUsersPage";
import AdminWithdrawsPage from "./pages/AdminPage/pages/AdminWithdrawsPage/AdminWithdrawsPage";
import AdminDepositsPage from "./pages/AdminPage/pages/AdminDepositsPage/AdminDepositsPage";
import AdminCategoriesPage from "./pages/AdminPage/pages/AdminCategoriesPage/AdminCategoriesPage";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/register"
        element={<RegisterPage />}
      ></Route>
      <Route
        path="/login"
        element={<LoginPage />}
      ></Route>
     
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path=":postId"
        element={<PostInfoPage />}
      ></Route>

      <Route
        path="/admin"
        element={<PrivateRoute><AdminPage /></PrivateRoute>}
      >
        <Route path="users" element={<PrivateRoute><AdminUsersPage/></PrivateRoute>}/>
        <Route path="categories" element={<PrivateRoute><AdminCategoriesPage/></PrivateRoute>}/>
        <Route path="withdraws" element={<PrivateRoute><AdminWithdrawsPage/></PrivateRoute>}/>
        <Route path="deposits" element={<PrivateRoute><AdminDepositsPage/></PrivateRoute>}/>
        {/* <Route path="" element={<PrivateRoute><AdminPage /></PrivateRoute>}></Route>           */}
      </Route> 
      <Route
      path="*"
      element={
        <PrivateRoute>
          <LandingPage />
        </PrivateRoute>
      }
    ></Route>
    </Routes>
  </BrowserRouter>
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

