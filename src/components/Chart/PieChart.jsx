import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import useAppContext from "../../hooks/useAppContext";

const ExpensePieChart = () => {
  const { topExpenses } = useAppContext();

  const COLORS = {
    entertainment: "#FF9304",
    food: "#A000FF",
    travel: "#FDE006",
  };

 

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={topExpenses}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
        >
        {topExpenses.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
        ))}
        </Pie>
   
        <Legend
          formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          wrapperStyle={{ fontSize: "12px", color: "white" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
