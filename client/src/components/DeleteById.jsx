import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Loading from "./Loading"; // Import the Loading component

const DeleteById = ({ ticketNumber, deleteTicketById }) => {
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isOpen = () => setOpenModal(true);
    const isClose = () => setOpenModal(false);

    const DeleteTicket = () => {
        setIsLoading(true);

        setTimeout(() => {
            deleteTicketById(ticketNumber);
        }, 1000); // Simulate deletion time
    };

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

        window.addEventListener("keydown", handleKeyDown);

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [openModal]);

    return (
        <>
            <button
                onClick={isOpen}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                            transition duration-200 flex items-center justify-center"
                >
                <Trash2 className="w-4 h-4" />
            </button>


            {openModal && (
                <div 
                  onClick={isClose}
                  className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white p-6 rounded shadow-md w-96 select-none">
                        {isLoading ? (
                            <Loading onComplete={() => setOpenModal(false)} />
                        ) : (
                            <>
                                <h1 className="text-gray-400">Confirmation</h1>
                                <hr className="text-gray-300" />
                                <p className="mt-2 text-gray-600">
                                    Are you sure you want to delete <strong>Ticket #{ticketNumber}</strong>?
                                </p>

                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        onClick={isClose}
                                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={DeleteTicket}
                                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200 ml-2"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteById;
