/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

import MDButton from "components/MDButton";

import axios from "axios";

import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";



const statusDict = {
  returned: <MDBadge badgeContent="returned" color="success" variant="gradient" size="sm" />,
  rejected: <MDBadge badgeContent="rejected" color="primary" variant="gradient" size="sm" />,
  confirmed: <MDBadge badgeContent="confirmed" color="text" variant="gradient" size="sm" />,
  waitingToConfirm: <MDBadge badgeContent="waiting to confirm" color="secondary" variant="gradient" size="sm" />
}

function getAction(status, loanId) {
  if (status == "waitingToConfirm") {
    return (
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <MDButton variant="text" color="info" onClick={() => {
              console.log("confirm loanid:", loanId)
              axios.post(
                `http://localhost:2400/user/confirmLoan`,
                { loanId },
                { withCredentials: true }
              )
                .then(res => res.data)
                .then((data) => {
                  if (data.success) {
                    console.log(data)
                    // navigate("/admin")
                  }
                  else {alert(data.msg)}
                })
            }} >confirm</MDButton>
            <MDButton variant="text" color="primary" onClick={() => {
              console.log("reject loanid:", loanId)
              axios.post(
                `http://localhost:2400/user/rejectLoan`,
                { loanId },
                { withCredentials: true }
              )
              .then(res => res.data)
              .then((data) => {
                if (data.success) {
                  console.log(data)
                  // navigate("/admin")
                }
                else alert(data.msg)
              })
            }} >reject</MDButton>
          </Grid>
        </MDBox>
      </MDBox>
    )
  }
}

function getStatus(x) {
  if (x.isReturned) return "returned"
  if (x.isRejected) return "rejected"
  if (x.isConfirmed) return "confirmed"
  return "waitingToConfirm"
}

export default function Data({ username }) {
  const [loans, setLoans] = useState([
    // {
    //   "_id": "62e92308651038453dd56e11",
    //   "info": "i am the admin, please help !",
    //   "borrower": "admin",
    //   "loaner": "yes",
    //   "dateCreated": "Tue Aug 02 2022 16:13:44 GMT+0300 (שעון ישראל (קיץ))",
    //   "amount": 35,
    //   "dateToReturn": "Tue Aug 09 2022 16:13:44 GMT+0300 (שעון ישראל (קיץ))",
    //   "isConfirmed": true,
    //   "isRejected": false,
    //   "isReturned": false,
    //   "__v": 0
    // },
    // {
    //   "_id": "62e9236e651038453dd56e24",
    //   "info": "dear admin, help me please ...",
    //   "borrower": "yes",
    //   "loaner": "admin",
    //   "dateCreated": "Tue Aug 02 2022 16:15:26 GMT+0300 (שעון ישראל (קיץ))",
    //   "amount": 210,
    //   "dateToReturn": "Tue Aug 09 2022 16:15:26 GMT+0300 (שעון ישראל (קיץ))",
    //   "isConfirmed": false,
    //   "isRejected": false,
    //   "isReturned": false,
    //   "__v": 0
    // },
    // {
    //   "_id": "62ea4522f34cf43d6b181864",
    //   "info": "loan checking...",
    //   "borrower": "admin",
    //   "loaner": "yes",
    //   "dateCreated": "Wed Aug 03 2022 12:51:30 GMT+0300 (שעון ישראל (קיץ))",
    //   "amount": 5,
    //   "dateToReturn": "Wed Aug 10 2022 12:51:30 GMT+0300 (שעון ישראל (קיץ))",
    //   "isConfirmed": true,
    //   "isRejected": false,
    //   "isReturned": true,
    //   "__v": 0,
    //   "returnedDate": "Wed Aug 03 2022 12:56:18 GMT+0300 (שעון ישראל (קיץ))"
    // }
  ])

  useEffect(() => {
    axios(`http://localhost:2400/user/getLoans`, { withCredentials: true })
      .then(res => res.data.loans)
      .then((res) => {
        console.log(res)
        setLoans(res)
      });
  }, []);

  return {
    loanerColumns: [
      { Header: "borrower", accessor: "borrower", align: "left" },
      { Header: "amount", accessor: "amount", align: "left" },
      { Header: "info", accessor: "info", align: "left" },
      { Header: "date Created", accessor: "dateCreated", align: "center" },
      { Header: "date To Return", accessor: "dateToReturn", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    loanerRows: loans
      .filter(x=> x.loaner == username)
      .map(x => {
        const temp = getStatus(x)
        x.dateCreated = x.dateCreated.split(" ").slice(1, 4).toString()
        x.dateToReturn = x.dateToReturn.split(" ").slice(1, 4).toString()
        x.status = statusDict[temp]
        x.action = getAction(temp, x._id)
        return x
      })
  }
}