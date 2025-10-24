export default function StatsCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-2xl shadow-lg ${color}`}>
      <p className="text-black font-semibold">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
