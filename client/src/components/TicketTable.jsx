import React, { useEffect, useState } from "react";
import DeleteAllButton from "./DeleteAllButton"; // Ensure this component remains intact
import DeleteById from "./DeleteById"; // Ensure this component remains intact
import { Edit, X } from "lucide-react";
import { Listbox } from "@headlessui/react";

const TicketTable = ({
  filteredTickets,
  handleStatusChange,
  handleTechChange,
  clearStorage,
  deleteTicketById,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const uniqueTechs = [
    ...new Set(filteredTickets.map((ticket) => ticket["Assigned Tech Support"])),
  ];

  const handleOpen = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null);
  };

  const handleChange = (e) => {
    setSelectedTicket({ ...selectedTicket, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    handleStatusChange(selectedTicket.index, selectedTicket["Status"]);
    handleTechChange(
      selectedTicket.index,
      selectedTicket["Assigned Tech Support"]
    );
    handleClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClose]);

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-118 bg-white  
      rounded-lg shadow-lg select-none ">
      <table className="min-w-full border-collapse w-full ">
        {/* Table Head */}
        <thead className="bg-gray-100 sticky top-0 shadow-md">
          <tr className="text-left">
            {[
              "Ticket Number",
              "Date Submitted",
              "Requestor Email",
              "Status",
              "Assigned Tech Support",
              "Category",
              "Sub-Category",
              "Sub-Sub-Category",
              "Edit",
            ].map((header, i) => (
              <th key={i} className="p-3 font-semibold">{header}</th>
            ))}
            <th className="p-3 text-center">
              <DeleteAllButton clearStorage={clearStorage} />
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {filteredTickets.map((ticket, index) => (
            <tr key={index} className="border-t border-gray-300 hover:bg-gray-50 transition">
              {Object.values(ticket).map((value, i) => (
                <td key={i} className="p-3">{value}</td>
              ))}
              <td className="p-3 text-center">
                <button
                  onClick={() => handleOpen({ ...ticket, index })}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                            transition duration-200 flex items-center justify-center select-none" 
                >
                  <Edit className="w-4 h-4"/>
                </button>
              </td>
              <td className="flex justify-center p-2 mt-3 select-none">
                <DeleteById
                  ticketNumber={ticket["Ticket Number"]}
                  deleteTicketById={deleteTicketById}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
  <div 
    onClick={handleClose}
    className="fixed inset-0 flex items-center justify-center 
               bg-white bg-opacity-40 backdrop-blur-md z-50 transition-opacity duration-300"
  >
    <div 
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-6 rounded-2xl shadow-xl w-96 h-auto min-h-[200px] relative 
                 border border-gray-200"
    >

            {/* Close Button */}
            <button 
              onClick={handleClose} 
              className="absolute top-3 right-3 text-gray-400 
                        hover:text-black transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Ticket
            </h2>

            {selectedTicket && (
            <>
              {/* Status Field */}
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Status
              </label>
              <Listbox
                value={selectedTicket.Status}
                onChange={(value) =>
                  setSelectedTicket({ ...selectedTicket, Status: value })
                }
              >
                <div className="relative">
                  <Listbox.Button
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg bg-white 
                                focus:ring-2 focus:ring-blue-400 outline-none transition 
                                cursor-pointer hover:bg-gray-100 text-left"
                  >
                    {selectedTicket.Status}
                  </Listbox.Button>
                  <Listbox.Options
                    className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg 
             shadow-lg z-10 focus:outline-none max-h-60 overflow-y-auto will-change-transform"
                  >
                    <Listbox.Option
                      value="Open"
                      className={({ active }) =>
                        `cursor-pointer select-none py-2 px-3 ${
                          active ? "bg-blue-100" : ""
                        }`
                      }
                    >
                      Open
                    </Listbox.Option>
                    <Listbox.Option
                      value="Closed"
                      className={({ active }) =>
                        `cursor-pointer select-none py-2 px-3 ${
                          active ? "bg-blue-100" : ""
                        }`
                      }
                    >
                      Closed
                    </Listbox.Option>
                  </Listbox.Options>
                </div>
              </Listbox>

              {/* Assigned Tech Support Field */}
              <label className="block mb-2 mt-5 text-gray-700 text-sm font-medium">
                Assigned Tech Support
              </label>
              <Listbox
                value={selectedTicket["Assigned Tech Support"]}
                onChange={(value) =>
                  setSelectedTicket({ ...selectedTicket, "Assigned Tech Support": value })
                }
              >
                <div className="relative">
                  <Listbox.Button
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg bg-white 
                                focus:ring-2 focus:ring-blue-400 outline-none transition 
                                cursor-pointer hover:bg-gray-100 text-left"
                  >
                    {selectedTicket["Assigned Tech Support"]}
                  </Listbox.Button>
                  <Listbox.Options
                    className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg 
                              shadow-lg z-10 focus:outline-none max-h-60 overflow-y-auto"
                  >
                    {uniqueTechs.map((tech, i) => (
                      <Listbox.Option
                        key={i}
                        value={tech}
                        className={({ active }) =>
                          `cursor-pointer select-none py-2 px-3 ${
                            active ? "bg-blue-100" : ""
                          }`
                        }
                      >
                        {tech}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
                            </Listbox>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="w-full py-2 mt-7 bg-green-500 text-white rounded-lg 
                            hover:bg-green-600 transition shadow-md"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
