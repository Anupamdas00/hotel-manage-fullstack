import { useEffect } from "react";

export const Toast = ({ message, type, onClose } ) => {
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 p-4 text-white bg-green-500"
      : "fixed top-4 right-4 p-4 text-white bg-red-500";

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000);
        return () => clearTimeout(timer)
    },[])

  return (
    <div className={styles}>
      <div className="flex items-center justify-between">
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
};
