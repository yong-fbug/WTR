import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const COLORS = ["#1E40AF", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#EC4899"];

const TicketCharts = ({ amPmChartData, ticketStatusData, ticketTechData }) => {
  return (
    <div className="mt-60 p-6 max-w-6xl mx-auto">
      {/* Combined Tickets by Time of Day & Ticket Status */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Ticket Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Tickets by Time of Day */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">By Time of Day</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={amPmChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  className="font-semibold"
                >
                  {amPmChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#007BFF", "#FF8C00"][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-gray-700 text-sm font-semibold">
              {amPmChartData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: ["#007BFF", "#FF8C00"][index] }}></span>
                  <span>{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Status */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">By Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ticketStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  className="font-semibold"
                >
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#00C49F", "#FF8042"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-gray-700 text-sm font-semibold">
              {ticketStatusData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: ["#00C49F", "#FF8042"][index % 4] }}></span>
                  <span>{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Assigned to Tech */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Tickets Assigned to Tech</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={ticketTechData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
            <XAxis 
              dataKey="name" 
              stroke="#4B5563" 
              angle={-45} 
              textAnchor="end" 
              interval={0} 
              tick={{ fontSize: 12 }} 
              tickFormatter={(name) => (name.length > 10 ? `${name.slice(0, 10)}...` : name)}
            />
            <YAxis />
            <Tooltip 
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-md text-xs text-gray-700">
                      <p className="font-semibold">{payload[0].payload.name}</p>
                      <p>Tickets: {payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }} 
            />
            <Bar 
              dataKey="value" 
              barSize={40} 
              fill="#1E40AF" 
              className="hover:opacity-80 transition-opacity duration-300" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TicketCharts;
