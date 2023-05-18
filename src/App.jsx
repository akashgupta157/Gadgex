import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import { useLocation } from "react-router-dom";
import AllRoute from "./AllRoute";
import Footer from "./Components/Footer";
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
