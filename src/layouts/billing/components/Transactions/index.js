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
import axios from "axios";
// import Divider from "@mui/material/Divider";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import { useState, useEffect } from "react";

function Transactions() {
  // let transactions;
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {

    axios("http://localhost:2400/user/getUserTransactions", { withCredentials: true }).then((res) => {
      setTransactions(res.data.msg);
    }, []);

  });
  const showtransactions = transactions.map((x) => (
    <Transaction
      color={x.amount < 0 ? "error" : "success"}
      icon={x.amount < 0 ? "expand_more" : "expand_less"}
      name={x.member}
      description={x.info}
      date={x.date}
      value={`${x.amount} $`}
    />
  ));
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {showtransactions}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
