import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { AuthStore } from "../store/authStore";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {login,isLoading,error}=AuthStore();
  const navigate=useNavigate();

  const handlesubmit = async(e) => {
    e.preventDefault();
    try {
      await login(email,password)
      console.log("user logged in successfully");
      navigate('/')
    } catch (error) {
      console.log("error logging in", error);
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
        <h1 className=" bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text font-bold text-center text-2xl mb-4">
          Welcome Back
        </h1>
        <form onSubmit={(e) => handlesubmit(e)}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <Link to={"/forget-password"}>
            <p className="text-green-500 text-xs hover:underline">
              Forget password ?
            </p>
          </Link>
          {error && <p className="text-red-500 font-semibold mt-3">{error}</p>}

          <motion.button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-800 bg-opacity-15  py-3 text-white font-bold text-xl shadow-2xl outline-none hover:from-green-600 hover:to-emerald-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 px-4 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm mt-4 mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.5 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto size-7" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="py-4 px-8 bg-gray-900 flex justify-center bg-opacity-50    gap-2">
        <p className="text-gray-400 text-sm"> don't have an account?{"  "}</p>
        <Link
          to={"/signup"}
          className=" text-green-400 text-sm hover:underline"
        >
          SignUp
        </Link>
      </div>
    </motion.div>
  );
}

export default Login;
