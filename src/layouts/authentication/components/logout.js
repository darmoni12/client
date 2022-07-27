import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import store from "../../../store";

function Logout() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        store.dispatch({ type: "logout" });
        navigate("/home");
      }}
    />
  );
}

export default Logout;
