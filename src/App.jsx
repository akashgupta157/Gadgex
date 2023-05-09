import { ToastContainer } from "react-toastify";
import Allroute from "./Allroute";
import Navbar from "./Components/Navbar";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname == "/admindashboard" ||
      location.pathname == "/admin" ? null : (
        <Navbar />
      )}
      <ToastContainer />
      <Allroute />
    </>
  );
}
export default App;
