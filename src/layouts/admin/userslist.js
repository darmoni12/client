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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useRowSelect } from "react-table";

// Usering page components
import User from "./user";

function UseringInformation(props) {
  console.log("props",props)
  const userShow = props.lst.map(x=><User
    isConfirmed = {x.isConfirmed}
    username={x.username}
    email={x.email}
    id = {x._id}
  />)
  console.log(userShow)

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          {props.name}
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {userShow}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default UseringInformation;
