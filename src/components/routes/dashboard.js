import React from "react";
import StickyHeadTable from "../stickyHeadTable";
import "../../App.css";

function Dashboard({ StickyHeadTable }) {
  const [transactions: data, setTransactions: setData] = StickyHeadTable();

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
