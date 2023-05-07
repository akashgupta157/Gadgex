import { ToastContainer } from "react-toastify";
import Allroute from "./Allroute";
import Navbar from "./Components/Navbar";
import { useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#00e8be",
    },
  },
});
function App() {
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      {location.pathname == "/admindashboard" ||
      location.pathname == "/admin" ? null : (
        <Navbar />
      )}
      <ToastContainer />
      <Allroute />
    </ThemeProvider>
  );
}
export default App;
