import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AddMovie from "./components/Movies/AddMovies";
import Movies from "./components/Movies/Movies";
import AdminProfile from "./profile/AdminProfile";
import UserProfile from "./profile/UserProfile";
import { adminActions, userActions } from "./store/index";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Header />
        <section style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            {!isUserLoggedIn && !isAdminLoggedIn && (
              <>
                <Route path="/admin" element={<Admin />} />
                <Route path="/auth" element={<Auth />} />
              </>
            )}
            {isUserLoggedIn && !isAdminLoggedIn && (
              <>
                <Route path="/user" element={<UserProfile />} />
                <Route path="/booking/:id" element={<Booking />} />
              </>
            )}
            {isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Route path="/add" element={<AddMovie />} />
                <Route path="/user-admin" element={<AdminProfile />} />
              </>
            )}
          </Routes>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;