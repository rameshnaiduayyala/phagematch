export default function TicketTable() {
  const tickets = [
    { id: 1, title: "Login issue", status: "Open", priority: "High" },
    { id: 2, title: "Dashboard bug", status: "Closed", priority: "Medium" },
    { id: 3, title: "API integration", status: "Pending", priority: "Low" },
  ];

  return (
    <table className="min-w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b border-gray-700">ID</th>
          <th className="px-4 py-2 border-b border-gray-700">Title</th>
          <th className="px-4 py-2 border-b border-gray-700">Status</th>
          <th className="px-4 py-2 border-b border-gray-700">Priority</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} className="hover:bg-gray-700">
            <td className="px-4 py-2 border-b border-gray-700">{ticket.id}</td>
            <td className="px-4 py-2 border-b border-gray-700">{ticket.title}</td>
            <td className="px-4 py-2 border-b border-gray-700">{ticket.status}</td>
            <td className="px-4 py-2 border-b border-gray-700">{ticket.priority}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
