import { Box } from "@mui/material";
import Routes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/userContext";
import { ScrollRestoration } from "react-router-dom";


const App = () => {
  return (
    <UserContextProvider>
   


    <Box>
        <ToastContainer position="top-right"/>
      <Routes />
    
    </Box>
 
    </UserContextProvider>
  );
};

export default App;
