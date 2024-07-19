import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Arrival from "./routes/Arrival";
import Items from "./routes/ItemComponent";
import Consumption from "./routes/Consumtion";
import Alerts from "./routes/Alerts";
import LoginForm from "./routes/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Logs from "./routes/Logs";
import Home from "./routes/Home";
import About from "./routes/About";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("auth ", isAuthenticated)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          // Verify token with the server
          const response = await axios.get("http://localhost:5000/api/login/verify", {
            headers: {
              "Authorization": `Bearer ${token}` // Correct format for Authorization header
            }
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
          console.log("no token")
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <>
      <Router>
        <div className="flex w-full relative font-mono">
          <div className="h-svh top-0 left-0 fixed">
            <Navbar loggedIn = {isAuthenticated} setLoggedIn = {setIsAuthenticated}/>
          </div>
          <div className="flex w-full">
            <div className="w-[200px] h-svh"></div>
            <div className="flex-1 w-full p-8">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                  path="/stock-arrival"
                  element={
                    <PrivateRoute>
                      <Arrival />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/stock-consumption"
                  element={
                    <PrivateRoute>
                      <Consumption />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/items"
                  element={
                    <PrivateRoute>
                      <Items />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/alerts"
                  element={
                    <PrivateRoute>
                      <Alerts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/logs"
                  element={
                    <PrivateRoute>
                      <Logs />
                    </PrivateRoute>
                  }
                />
                <Route
                  path= "/log-details/:id"
                  element={
                    <PrivateRoute>
                      <Logs />
                    </PrivateRoute>
                  }
                />
                <Route
                  path= "/"
                  element={
                      <Home loggedIn = {isAuthenticated} setLoggedIn = {setIsAuthenticated}/>
                  }
                />
                <Route
                  path= "/about"
                  element={
                      <About />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;