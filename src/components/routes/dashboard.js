import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import { generateRequestId } from "../../Services";
import axios from "axios";
import StickyHeadTable from "../stickyHeadTable";
import "../../App.css";

function Dashboard({ Sidebar }) {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("sessionId");
    if (!isAuthenticated) {
      navigate.push("/"); // Redirect user to login page
    } else {
      getTransactions();
    }
  }, [navigate]);

  const getTransactions = async () => {
    try {
      const transactionsRequest = {
        requestBody: {
          sessionId: sessionStorage.sessionId,
          permissionId: "2",
          serviceName: "getAllTransactions",
        },
        requestHeader: {
          schemaVersion: "1.0",
          requestId: generateRequestId(),
          timestamp: Date.now(),
        },
      };

      const response = await axios.post(
        config.billingServer + "/adminservices/getAllTransactions",
        transactionsRequest
      );

      const { statusMessage, bills } = response.data.responseBody;
      console.log("Response.responseBody: ", response.data.responseBody);

      if (statusMessage === "SUCCESS") {
        console.log("bills" + JSON.stringify(bills));
        setTransactions(bills);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tableHeaders = [
    { label: "Partner ID", value: "partnerId" },
    { label: "Partner Name", value: "partnerName" },
    { label: "Created Date", value: "createdDate" },
    { label: "Number of Bills", value: "NumberOfBills" },
    { label: "Number of Paid Bills", value: "NumberOfPaidBills" },
    { label: "Number of Unpaid Bills", value: "NumberOfUnpaidBills" },
  ];

  return (
    <div className="table-container">
      <StickyHeadTable headers={tableHeaders} data={transactions} />
    </div>
  );
}

export default Dashboard;
