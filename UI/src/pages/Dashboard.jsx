import StatsCard from "../components/StatsCard";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import ReusableTable from "../components/ReusableTable";
import { useEffect, useState } from "react";
import userService from "../service/userService";
import ModalComp from "../components/ModalComp";
import RowActions from "../components/RowActions";
import { showConfirm } from "../components/Confirm";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone Number",
      accessorKey: "phone_number",
    },
    {
      header: "Organization",
      accessorKey: "affiliated_org_name",
    },
    {
      header: "Status",
      accessorKey: "is_approved",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            row.original.is_approved
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.is_approved ? "Active" : "Pending"}
        </span>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <RowActions
          row={row}
          bgClass=" text-white"
          actions={[
            {
              label: "Edit",
              className: "bg-blue-600 text-white hover:bg-blue-700",
              onClick: (data) => console.log("Edit", data),
            },
            {
              label: "Delete",
              className: "bg-red-600 text-white hover:bg-red-700",
              onClick: (data) => console.log("Delete", data),
              show: (data) => data.is_approved, // conditional display
            },
            {
              label: "Approve",
              className: "bg-purple-600 text-white hover:bg-purple-700",
              onClick: (data) => handleApprove(data.id),
              show: (data) => !data.is_approved,
            },
          ]}
        />
      ),
    },
  ];

  async function handleApprove(userId) {
    const confirmed = await showConfirm({
      title: "Approve User",
      message: "Are you sure you want to approve this user?",
      okText: "Approve",
      cancelText: "Cancel",
      variant: "ok",
    });

    if (confirmed) {
      try {
        const response = await userService.ApproveUser(userId);
        console.log("User approved:", response);
        getAllUsers(); // Refresh the user list
      } catch (error) {
        console.error("Error approving user:", error);
      }
    } else {
      console.log("User canceled.");
    }
  }

  const getAllUsers = async () => {
    try {
      const response = await userService.GetAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <h1 className="text-3xl font-semibold tracking-tight mb-10 text-gray-900">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard title="Tickets Open" value={128} color="blue" />
          <StatsCard title="Tickets Closed" value={432} color="green" />
          <StatsCard title="Pending Requests" value={56} color="yellow" />
          <StatsCard title="New Users" value={24} color="purple" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <LineChart
              title="Ticket Trends"
              data={[10, 20, 30, 25, 40, 35, 50]}
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <PieChart
              title="Ticket Status Distribution"
              data={[
                { name: "Open", value: 128 },
                { name: "Closed", value: 432 },
                { name: "Pending", value: 56 },
              ]}
            />
          </div>
        </div>

        {/* Reusable Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-10">
          <h2 className="text-xl font-medium mb-4 text-gray-900">User List</h2>
          <ReusableTable columns={columns} data={users} />
        </div>
      </div>

      {/* Modal */}
      <ModalComp
        open={open}
        onClose={() => setOpen(false)}
        size="lg"
        header={<h2 className="text-lg font-semibold">My Modal</h2>}
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        }
      >
        <p>This is fully customizable modal content. Put anything here!</p>
      </ModalComp>
    </>
  );
}
