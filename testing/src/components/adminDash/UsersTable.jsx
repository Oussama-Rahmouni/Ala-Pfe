import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import "./adminStyle.css";

const UsersTable = () => {
  const queryClient = useQueryClient();
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Approve",
      selector: (row) => row.approve,
      sortable: true,
      format: (row) => (
        <button onClick={() => handleApprove(row.id)}>Approve</button>
      ),
    },
    {
      name: "Reject",
      selector: (row) => row.reject,
      sortable: true,
      format: (row) => (
        <button onClick={() => handleReject(row.id)}>Reject</button>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 2,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 3,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },

    {
      id: 4,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 5,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 6,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 7,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 8,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 9,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 10,
      name: "khalil",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
    {
      id: 11,
      name: "oussama",
      email: "oussama@gmail.com",
      status: "not yet",
      approuve: <button>approuve</button>,
      reject: <button>reject</button>,
    },
  ];

  const [records, setRecords] = useState(data);

  const handleFilter = (event) => {
    const newData = data.filter((row) => {
      return row.name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase());
    });
    setRecords(newData);
  };

  const approvalMutation = useMutation(
    (id) => axios.post(`/api/users/approve/${id}`),
    {
      onSuccess: () => {
        // Optionally refetch user data or update a specific query if needed
        queryClient.invalidateQueries("users");
      },
    }
  );

  const rejectionMutation = useMutation(
    (id) => axios.post(`/api/users/reject/${id}`),
    {
      onSuccess: () => {
        // Optionally refetch user data or update a specific query if needed
        queryClient.invalidateQueries("users");
      },
    }
  );

  const handleApprove = (id) => {
    approvalMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectionMutation.mutate(id);
  };
  return (
    <div className="jdid">
      <div className="text-end">
        <input type="text" onChange={handleFilter} />
      </div>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        className="table"
        fixedHeader
        pagination
      ></DataTable>
    </div>
  );
};

export default UsersTable;
