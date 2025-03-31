import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const Loading = ({ onComplete }: { onComplete: () => void }) => {
  const [status, setStatus] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("done");

      setTimeout(() => {
        onComplete(); // Close modal after showing "Done"
      }, 500);
    }, 1000); // Simulate loading time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center">
      {status === "loading" ? (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-red-500"
        >
          <Loader2 className="w-10 h-10 animate-spin" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-green-500"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>
      )}

      <p className="mt-2 text-lg font-semibold text-gray-700">
        {status === "loading" ? "Deleting..." : "Done!"}
      </p>
    </div>
  );
};

export default Loading;
