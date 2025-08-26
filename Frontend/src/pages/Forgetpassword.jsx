import { motion } from "framer-motion";
import { useState } from "react";
import { AuthStore } from "../store/authStore";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import Input from "../components/Input";
import { Link} from "react-router-dom";
import toast from "react-hot-toast";
const Forgetpassword = () => {
  const [email, setemail] = useState("");
  const [issubmit, setisubmit] = useState(false);
  const { isLoading, forgetpassword, error } = AuthStore();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
await forgetpassword(email);
toast.success("Link send to your account")
setisubmit(true)
      
    } catch (error) {
      
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md bg-gray-800 bg-opacity-20 w-full  backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden "
    >
      <div className="p-10">
        <h1 className="text-3xl  font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent text-center mb-6">
          Forget Password
        </h1>
        {!issubmit ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <p className="text-gray-500 mb-4 text-center">
              {" "}
              enter you email address to reset Password
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {error && <p className="text-red-500 font-semibold mt-3">{error}</p>}
            <motion.button
              className="w-full bg-gradient-to-r from-green-500 to-emerald-800 bg-opacity-15  py-3 text-white font-bold text-lg shadow-2xl outline-none hover:from-green-600 hover:to-emerald-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 px-4 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm  mt-5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.5 }}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <Loader2 className="m-auto size-15 animate-spin" />
              ) : (
                "Send Email"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 50, stiffness: "300" }}
              className="size-16 mx-auto bg-green-600 flex justify-center items-center mb-6 rounded-full"
            >
              <Mail className="size-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              {" "}
              if you've an account for {email}, you'll recieve an link to reset
              password
            </p>
          </div>
        )}
      </div>
      <div className="py-4 px-8 bg-gray-900 flex justify-center bg-opacity-50    gap-2">
        <Link to={"/login"} className=" text-green-400 text-sm hover:underline">
            <ArrowLeft className="size-6 mr-2"/> Login
        </Link>
      </div>
    </motion.div>
  );
};

export default Forgetpassword;
