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

// react-router-dom components
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// import store from "store"

function Cover() {
    const navigate = useNavigate();
    const props = useLocation().state;
    // console.log("edit user", props)
    const [username, setusername] = useState(props.username);
    const [email, setemail] = useState(props.email);
    const [firstName, setfirstName] = useState(props.firstName);
    const [lastName, setlastName] = useState(props.lastName);
    const [image, setImage] = useState(props.image);

    // useEffect(() => {
    //     axios(`http://localhost:2400/user/details`, { withCredentials: true })
    //         .then(res => res.data.msg)
    //         .then((res) => {
    //             // setUser(res)
    //             setusername(res.username)
    //             setemail(res.email)
    //             setfirstName(res.firstName)
    //             setlastName(res.lastName)
    //             setImage(res.image)
    //         })
    // }, []);


    return (
        <CoverLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="Username"
                                value={username}
                                onChange={(event) => setusername(event.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="FirstName"
                                value={firstName}
                                onChange={(event) => setfirstName(event.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="LastName"
                                value={lastName}
                                onChange={(event) => setlastName(event.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(event) => setemail(event.target.value)}
                                fullWidth
                            />
                        </MDBox>

                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="image"
                                value={image}
                                onChange={(event) => setImage(event.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                fullWidth
                                onClick={() => {
                                    axios.post(///post patch
                                        `http://localhost:2400/user/updateDetails`,
                                        {
                                            username,
                                            email,
                                            firstName,
                                            lastName
                                        },
                                        { withCredentials: true }
                                    )
                                        // .then((res) => res.data)
                                        .then((data) => {
                                            navigate("/profile")
                                        })

                                }
                                }

                            >
                                change
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
        </CoverLayout>
    );
}

export default Cover;
