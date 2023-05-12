import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import { useLocation } from "react-router-dom";
import AllRoute from "./AllRoute";
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname == "/adminDashboard" ||
      location.pathname == "/admin" ? null : (
        <Navbar />
      )}
      <ToastContainer />
      <AllRoute />
    </>
  );
}
export default App;
