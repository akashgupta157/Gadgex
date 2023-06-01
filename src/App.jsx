import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import AllRoute from "./Allroute";
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname == "/adminDashboard" ? null : <Navbar />}
      <ToastContainer />
      <AllRoute />
      {location.pathname == "/adminDashboard" ? null : <Footer />}
    </>
  );
}
export default App;
