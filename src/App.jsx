import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Profile from "./pages/Profile";
import ApplicationForm from "./pages/ApplicationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/administrator" element={<Admin />} />

        <Route path="/" element={<Home />} />

        <Route path="/apply" element={<Apply />} />

        <Route path="/apply/form" element={<ApplicationForm />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;