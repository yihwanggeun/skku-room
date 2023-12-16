import Mainpage from "./Pages/Mainpage";
import Layout from "./\bComponent/Layout/Layout";
import Navi from "./\bComponent/Layout/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddRoomPage from "./Pages/AddRoomPage";
import ShareRoomPage from "./Pages/ShareRoomPage";
import ContractPage from "./Pages/ContractPage";
import InitialPage from "./Pages/InitialPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ContractRoomPage from "./Pages/ContractRoomPage";
import YourRequestPage from "./Pages/YourRequestPage";
import YourRoomPage from "./Pages/YourRoomPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="main" element={<Layout><Mainpage /></Layout>} />
        <Route path="shareroom" element={<Layout><ShareRoomPage /></Layout>} />
        <Route path="addroom" element={<Layout><AddRoomPage /></Layout>} />
        <Route path="contract" element={<Layout><ContractPage /></Layout>} />
        <Route path="contract/room/:contractId" element={<Layout><ContractRoomPage /></Layout>} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="yourrequest" element={<Layout><YourRequestPage /></Layout>} />
        <Route path="yourroom" element={<Layout><YourRoomPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
