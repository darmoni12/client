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

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

import axios from "axios";
import { useState, useEffect } from "react";


// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import store from "../../store";
import UsersList from "./userslist"

// const user = store.getstate().user

function Overview() {    
    const [pendingUsers, setPendingUsers] = useState([])
    const [activeUsers, setActiveUsers] = useState([])

    useEffect(() => {
        axios(`http://localhost:2400/admin/getPendingUsers`, { withCredentials: true })
            .then(res => res.data.users)
            .then((res) => {
                setPendingUsers(res)
            });
    }, []);

    useEffect(() => {
        axios(`http://localhost:2400/message/getUsersContact`, { withCredentials: true })
            .then(res => res.data.msg)
            .then((res) => {
                setActiveUsers(res)
            });
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mb={2} />
            <Header>
                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} xl={4}>
                            <UsersList name='pending users' lst = {pendingUsers}></UsersList>
                        </Grid>
                        <Grid item xs={12} xl={4}>
                            <UsersList name='active users' lst = {activeUsers}></UsersList>
                        </Grid>
                    </Grid>
                </MDBox>

            </Header>
            <Footer />
        </DashboardLayout>
    );
}

export default Overview;