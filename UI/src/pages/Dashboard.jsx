import StatsCard from "../components/StatsCard";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import ModalComp from "../components/ModalComp";
import UserList from "./adminDashboard/UserList";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
        <h1 className="text-3xl font-semibold tracking-tight mb-10 text-gray-900">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard title="Tickets Open" value={128} color="bg-blue-200" />
          <StatsCard title="Tickets Closed" value={432} color="bg-green-200" />
          <StatsCard
            title="Pending Requests"
            value={56}
            color="bg-yellow-200"
          />
          <StatsCard title="New Users" value={24} color="bg-purple-200" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <LineChart
              title="Ticket Trends"
              data={[10, 20, 30, 25, 40, 35, 50]}
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
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
        <div className="h-px bg-gray-300 shadow-sm my-6"></div>
        <div className="mb-5">
          <UserList />
        </div>
      </div>
    </>
  );
}
