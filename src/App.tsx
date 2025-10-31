import { BrowserRouter, Routes, Route} from "react-router-dom";
import InvitePage from "./pages/InvitePage";
import PrezentPage from "./pages/PrezentPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitePage />} />
        <Route path="/prezents" element={<PrezentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
