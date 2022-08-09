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
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

import { useState, useEffect } from "react";

import Balance from "./balance";

import store from "store";


function Overview() {
  const [details, setdetails] = useState({})
  useEffect(() => {
    var user = store.getState().user
    delete user.isAdmin
    delete user.isConfirmed
    setdetails(user)
  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <MDBox mb={2} />
      <Header>
        
        <MDBox >
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

              <ProfileInfoCard

                title={details.username}
                description=""
                info=
                {details}
                social={[
                ]}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>

        </MDBox>
        <Balance/>

        </MDBox>
      </Header>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
