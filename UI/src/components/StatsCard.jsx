const colors = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
};

export default function StatsCard({ title, value, color = "blue" }) {
  return (
    <div className={`p-6 rounded-2xl shadow-lg ${colors[color]}`}>
      <p className="text-gray-200 font-semibold">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
