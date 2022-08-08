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
import axios from "axios";
import { useState, useEffect } from "react";


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
// , Redirect
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
    const [users, setUsers] = useState([])
    const [info, setInfo] = useState("");
    const [amount, setAmount] = useState("");
    const [sendTo, setSendTo] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios(`http://localhost:2400/message/getUsersContact`, { withCredentials: true })
            .then(res => res.data.msg)
            .then((res) => {
                // console.log(res)
                setUsers(res.map(x => ({
                    label: x.username,
                    _id: x._id
                })
                ))
            });
    }, []);
    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        send money
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput
                                type="number"
                                label="amount"
                                onChange={(event) => setAmount(event.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="text"
                                label="info"
                                onChange={(event) => setInfo(event.target.value)}
                                fullWidth
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={users}
                                onChange={(event, newValue) => {
                                    setSendTo(newValue._id);
                                }}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="User to send" />}
                            />

                        </MDBox>

                        <MDBox mt={4} mb={1}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                fullWidth
                                onClick={() => {
                                    // console.log(amount, sendTo);
                                    axios.post(
                                        `http://localhost:2400/user/makeTransactions`,
                                        {
                                            amount,
                                            _id: sendTo,
                                            info
                                        },
                                        { withCredentials: true }
                                    )
                                        .then((res) => {
                                            navigate("/home");
                                        })

                                }
                                }
                            >
                                send
                            </MDButton>
                        </MDBox>

                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout >
    );
}

export default Basic;
