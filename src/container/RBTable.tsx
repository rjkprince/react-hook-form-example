import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

const columns = [
  {
    dataField: "id",
    text: "Bank ID",
  },
  {
    dataField: "ifsc",
    text: "IFSC",
  },
  {
    dataField: "bank_name",
    text: "Bank Name",
  },
  {
    dataField: "branch",
    text: "Branch",
  },
  {
    dataField: "city",
    text: "City",
  },
  {
    dataField: "district",
    text: "District",
  },
  {
    dataField: "state",
    text: "State",
  },
  {
    dataField: "address",
    text: "Address",
  },
];

export default function RBTable() {
  const [currPage, setcurrPage] = useState(1);
  const [currSizePerPage, setcurrSizePerPage] = useState(10);
  const [data, setData] = useState([{}]);
  const options = {
    onSizePerPageChange: (sizePerPage: number, page: number) => {
      setcurrSizePerPage(sizePerPage);
    },
    onPageChange: (page: number, sizePerPage: number) => {
      setcurrPage(page);
    },
  };

  useEffect(() => {
    axios
      .get(
        `https://fylebankbackend.herokuapp.com/api/branches?limit=${currSizePerPage}&offset=${
          (currPage - 1) * currSizePerPage + 1
        }`
      )
      .then((res) => {
        setData(res.data.banks);
      });
  }, [currSizePerPage, currPage]);

  return (
    <div className="RBTable">
      <BootstrapTable
        keyField="id"
        remote
        data={data}
        columns={columns}
        pagination={paginationFactory({
          ...options,
          totalSize: 100,
          sizePerPage: currSizePerPage,
          page: currPage,
        })}
      />
    </div>
  );
}
