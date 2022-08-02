/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";


// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import EditUser from "./editUser";
// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

import store from "store"

function User({ username, email, id, isConfirmed }) {

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();
  const secondbutton = isConfirmed ?
    <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={() =>
      {
      store.dispatch({type:"change other user",user:id});
      navigate('/edit-user',{id})
      }
    } >
      <Icon>edit</Icon>&nbsp;edit
    </MDButton>
    :
    <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={() =>
      axios.post(`http://localhost:2400/admin/confirmUser`, { _id: id }, { withCredentials: true })
    } >
      <Icon>edit</Icon>&nbsp;confirm
    </MDButton>;

  const thirdbutton =  isConfirmed ?
  <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={() =>
    <EditUser></EditUser>
    
  } >
    <Icon>message</Icon>&nbsp;chat
  </MDButton>
  : []

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      // mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {username}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={() => {
                axios.post(`http://localhost:2400/admin/deleteUser`, { _id: id }, { withCredentials: true })
                  .then((res) => {
                    navigate("/admin");
                  })
              }}
              >
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>

            {secondbutton}
            {thirdbutton}

          </MDBox>

        </MDBox>
        <MDBox mb={1} lineHeight={0}>

        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {email}
            </MDTypography>
          </MDTypography>
        </MDBox>

      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of User
User.defaultProps = {
  noGutter: false,
};

// Typechecking props for the User
User.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default User;
