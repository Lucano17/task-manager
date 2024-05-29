import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Home page</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks" element={<h1>Tasks page</h1>} />
            <Route path="/add-tasks" element={<h1>New task</h1>} />
            <Route path="/task/:id" element={<h1>Upgrade task</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
        
      
    </>
  );
}

export default App;
