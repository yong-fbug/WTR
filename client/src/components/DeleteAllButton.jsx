import React, { useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';

const DeleteAllButton = ({ clearStorage }) => {
    const [open, setOpen] = useState(false);
    const confirmButtonRef = useRef(null); // Create a ref for the confirm button

    const Modal = () => setOpen(true);
    const CancelModal = () => setOpen(false);

    useEffect(() => {
        if (!open) return;

        // Focus the confirm button when the modal opens
        setTimeout(() => {
            if (confirmButtonRef.current) {
                confirmButtonRef.current.focus();
            }
        }, 50);

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                clearStorage();
                setOpen(false);
            } else if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open]);

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
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <hr className="text-gray-300" />
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete all tickets? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={CancelModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>

              <button
                ref={confirmButtonRef} // Auto-focus this button
                onClick={() => {
                  clearStorage();
                  setOpen(false);
                }}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAllButton;
