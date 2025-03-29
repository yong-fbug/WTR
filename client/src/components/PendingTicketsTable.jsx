import React from "react";

const PendingTicketsTable = ({ totalTickets, weekdayTickets, pendingTechData = [] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-gray-900">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 font-mono">Tickets Overview</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700 font-semibold text-left">
              <th className="py-3 px-4">Tech</th>
              <th className="py-3 px-4">Pending</th>
              <th className="py-3 px-4">Total Tickets</th>
              <th className="py-3 px-4">Monday</th>
              <th className="py-3 px-4">Tuesday</th>
              <th className="py-3 px-4">Wednesday</th>
              <th className="py-3 px-4">Thursday</th>
              <th className="py-3 px-4">Friday</th>
            </tr>
          </thead>
          <tbody>
            {pendingTechData.length > 0 ? (
              pendingTechData.map((entry, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-100 hover:bg-gray-300" : "bg-white hover:bg-gray-200"
                  }
                >
                  <td className="py-3 px-4 text-gray-700">{entry.tech}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.count}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.totalTickets}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.mondayTickets}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.tuesdayTickets}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.wednesdayTickets}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.thursdayTickets}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.fridayTickets}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-4">No Tickets Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingTicketsTable;
