import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, updateUserRequest, getUserTasksCountRequest, deleteUserRequest } from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status
        //  === 200 && res.data
        ) {
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response?.data);
      setErrors(error.response?.data?.message || ["An error occurred"]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
      } else {
        throw new Error("No data in response");
      }
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response?.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response?.data?.message || "An error occurred"]);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = async (updatedUser) => {
    try {
      const res = await updateUserRequest(updatedUser);
      if (res.data) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error acá chango: Update user error"]);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await deleteUserRequest(userId);
      if (res.status === 204) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setErrors([error.response?.data?.message || "Delete user error"]);
    }
  };
  
  const getUserTasksCount = async () => {
    try {
      const res = await getUserTasksCountRequest();
      return res.data.tasksCount;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        console.log("No hay token")
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) setIsAuthenticated(false);
          setIsAuthenticated(true);
          setUser(res.data);
        
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuthentication();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, updateUser, deleteUser, loading, user, isAuthenticated, errors, getUserTasksCount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
