import StatsCard from "../components/StatsCard";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import ReusableTable from "../components/ReusableTable";
import { useEffect, useState } from "react";
import userService from "../service/userService";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => info.getValue(),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors">
          Edit
        </button>
      ),
    },
  ];

  const data = [
    { id: 1, name: "Ramesh", email: "ramesh@example.com" },
    { id: 2, name: "Anita", email: "anita@example.com" },
  ];

  const getAllUsers = async () => {
    try {
      const response = await userService.GetAllUsers();
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-white-50 text-gray-800 font-sans">
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
        <ReusableTable columns={columns} data={data} />
      </div>
    </div>
  );
}
