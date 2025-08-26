import { motion } from "framer-motion";
import { AuthStore } from "../store/authStore";
import { Loader2, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";

const ResetPassword = () => {
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const { isLoading, error, message, resetPassword } = AuthStore();
  const { token } = useParams();
  const navigate=useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if(password!=confirmpassword)
    {
        alert("Password do not match")
        return
    }
    console.log("password and token in reset password", { password, token })
    try {
        await resetPassword(password,token)
        toast.success("password reset successfully.Redirect to Login Page....")
        setTimeout(()=>{
            navigate('/login')
        },2000)
        
    } catch (error) {
        toast.error(error.message || "error in resetting password")
        
    }
  };
  return (
    <motion.div
      className=" max-w-md  w-full bg-gray-800 backdrop-blur-xl bg-opacity-40 shadow-lg overflow-hidden rounded-xl "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="m-4">
        <h2 className=" bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text font-bold text-center text-2xl mb-4">
          Reset Password
        </h2>
         {error && <p className="text-red-500 font-semibold mt-3">{error}</p>}
          {message && <p className="text-green-300 font-semibold mt-3">{message}</p>}
        <form onSubmit={(e) => handlesubmit(e)}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => {
              setconfirmpassword(e.target.value);
            }}
          />

          <motion.button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-800 bg-opacity-15  py-3 text-white font-bold text-xl shadow-2xl outline-none hover:from-green-600 hover:to-emerald-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 px-4 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm mt-4 mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.5 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto size-7" />
            ) : (
              "set new Password"
            )}
          </motion.button>
        </form>
      </div>

    </motion.div>
  );
};

export default ResetPassword;
