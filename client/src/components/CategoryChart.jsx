import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  CartesianGrid,
} from "recharts";
import PropTypes from "prop-types";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg p-2 rounded-md text-gray-900 text-sm font-semibold">
        {payload[0].payload.name}: {payload[0].value}
      </div>
    );
  }
  return null;
};

const CategoryBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-4 text-gray-500 text-lg font-semibold">
        No data available
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Analysis</h2>
      <ResponsiveContainer width="100%" height={Math.max(400, data.length * 35)}>
        <BarChart data={sortedData} layout="vertical" barCategoryGap={30}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis type="number" stroke="#555" />
          <YAxis
            dataKey="name"
            type="category"
            width={200}
            interval={0}
            stroke="#333"
            tick={{ fontSize: 14, fontWeight: "bold" }}
            className="uppercase"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Legend />
          <Bar
            dataKey="value"
            fill="url(#gradient)"
            barSize={30}
            radius={[8, 8, 8, 8]}
          >
            <LabelList dataKey="value" position="insideLeft" fill="#fff" fontSize={14} fontWeight="bold" />
          </Bar>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

CategoryBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CategoryBarChart;
