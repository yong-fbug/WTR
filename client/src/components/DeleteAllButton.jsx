import React, { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import Loading from "./Loading"; // Import the Loading component

const DeleteAllButton = ({ clearStorage }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const confirmButtonRef = useRef(null);

    const Modal = () => setOpen(true);
    const CancelModal = () => setOpen(false);

    useEffect(() => {
        if (!open) return;

        setTimeout(() => {
            if (confirmButtonRef.current) {
                confirmButtonRef.current.focus();
            }
        }, 500);

        const handleKeyDown = (event) => {
            if (!open || isLoading) return;
            if (event.key === "Enter") {
                event.preventDefault();
                handleDelete();
            } else if (event.key === "Escape") {
                CancelModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, isLoading]);

    const handleDelete = () => {
        setIsLoading(true);
        setTimeout(() => {
            clearStorage();
        }, 2000); // Simulate delete process
    };

    return (
        <>
            <button
                onClick={Modal}
                className="text-red-700 hover:text-red-900 transition duration-200 cursor-pointer focus:outline-none"
            >
                <Trash2 className="w-10 h-5 inline-block text-red-700 hover:text-red-900 duration-200 cursor-pointer" />
                Delete All?
            </button>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-[99999] ">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96 z-50 relative">
                        {isLoading ? (
                            <Loading onComplete={() => setOpen(false)} />
                        ) : (
                            <>
                                <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                                <hr className="text-gray-300 my-2" />
                                <p className="mt-7 text-gray-600 text-center">
                                    Are you sure you want to delete all tickets? This action cannot be undone.
                                </p>

                                <div className="mt-15 flex justify-end gap-2">
                                    <button
                                        onClick={CancelModal}
                                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        ref={confirmButtonRef}
                                        onClick={handleDelete}
                                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200 ml-2"
                                    >
                                        Delete
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

export default DeleteAllButton;