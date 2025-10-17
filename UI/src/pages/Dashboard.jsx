import StatsCard from "../components/StatsCard";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import TicketTable from "../components/TicketTable";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Tickets Open" value={128} color="blue" />
        <StatsCard title="Tickets Closed" value={432} color="green" />
        <StatsCard title="Pending Requests" value={56} color="yellow" />
        <StatsCard title="New Users" value={24} color="purple" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart
          title="Ticket Trends"
          data={[10, 20, 30, 25, 40, 35, 50]}
        />
        <PieChart
          title="Ticket Status Distribution"
          data={[
            { name: "Open", value: 128 },
            { name: "Closed", value: 432 },
            { name: "Pending", value: 56 },
          ]}
        />
      </div>

      {/* Ticket Table */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Tickets</h2>
        <TicketTable />
      </div>
    </div>
  );
}
