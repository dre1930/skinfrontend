/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentStatus = () => {
  const [status, setStatus] = useState("pending"); // "success", "pending", "failed"
  const navigate = useNavigate();

  // Verify payment when component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");
    if (reference) {
      const verifyPayment = async (ref) => {
        try {
          const res = await axios.get(`http://localhost:5000/api/payments/verify/${reference}`
            ,);
          
          console.log(res.data);

          if (res.data.status === "success") {
            setStatus("success");
            toast.success("successful")
          } else if (res.data.status === "pending") {
            setStatus("pending");
          } else {
            setStatus("failed");
            toast.error("failed")
          }
        } catch (err) {
          console.error(err);
          setStatus("failed");
        }
      };
      verifyPayment(reference);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {status === "success" && (
        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 flex items-center justify-center bg-green-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      )}

      {status === "pending" && (
        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 flex items-center justify-center bg-yellow-400 rounded-full animate-pulse">
            <span className="text-white font-bold text-lg">…</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Pending</h1>
          <p className="text-gray-600">Your payment is being processed...</p>
        </div>
      )}

      {status === "failed" && (
        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 flex items-center justify-center bg-red-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Failed</h1>
          <p className="text-gray-600">Please try again or contact support.</p>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;*/
