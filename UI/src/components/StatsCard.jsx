import CountUp from "./ui/CountUp";

export default function StatsCard({ title, value, color, anmation }) {
  return (
    <div className={`p-6 rounded-2xl shadow-lg ${color}`}>
      <p className="text-black font-semibold">{title}</p>
      {anmation ? (
        <CountUp
          from={0}
          to={value}
          separator=","
          direction="up"
          duration={1}
          className="text-2xl font-bold"
        />
      ) : (
        <h3 className="text-2xl font-bold">{value}</h3>
      )}
    </div>
  );
}
