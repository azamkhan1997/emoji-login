import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { Home, Layout, Login, Register, Data } from "./pages";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/data" element={<Data />} />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
