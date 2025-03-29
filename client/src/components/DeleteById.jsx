import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const DeleteById = ({ ticketNumber, deleteTicketById }) => {
    const [openModal, setOpenModal] = useState(false)

    const isOpen = () => {
        setOpenModal(true)
    }
    const isClose = () => {
        setOpenModal(false)
    }

    const DeleteTicket = () => {
        deleteTicketById(ticketNumber)
        setOpenModal(false)
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!openModal) return;

            if (event.key === "Enter") {
                 event.preventDefault();
                 DeleteTicket();
            } else if (event.key === "Escape") {
                isClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [openModal]);
    
  return (
    
    <>
        <button
          onClick={isOpen}
          className="bg-red-500 text-white px-2 py-2 rounded 
          flex items-center gap-2 hover:bg-red-600 transition focus:outline -none"
        >
        <Trash2 className="w-4 h-4" />
        Delete
        </button>

        { openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h1 className="text-gray-400">Confirmation</h1>
                <hr className="text-gray-300" />
                <p className="mt-2 text-gray-600">Are you sure you want to delete <strong>Ticket #{ticketNumber} </strong>?</p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={isClose}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                        Cancel
                    </button>

                    <button
                      onClick={DeleteTicket}
                      className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200 ml-2'"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )}
    </>
  );
};

export default DeleteById;
