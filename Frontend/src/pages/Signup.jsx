import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Passwordstringmeter from "../components/Passwordstringmeter";
import { AuthStore } from "../store/authStore";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const {signup,error,isLoading}=AuthStore();

  const handlesumite = async (e) => {
    e.preventDefault();
    try {
      await signup(email,password,name);
      console.log("user signup successfully");
      navigate('/verify-email')
      
    } catch (error) {
      console.log("error in signup uI",error)
      
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
        <h1 className="text-3xl  font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent text-center mb-6">
          Create Account
        </h1>
        <form onSubmit={handlesumite}>
          <Input
            icon={User}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            {error && <p className="text-red-500 font-semibold mt-3">{error}</p>}
            <Passwordstringmeter password={password} />
          <motion.button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-800 bg-opacity-15  py-3 text-white font-bold text-xl shadow-2xl outline-none hover:from-green-600 hover:to-emerald-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 px-4 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm  mt-5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.5 }}
            disabled={isLoading}
          >
           {isLoading ? <Loader2 className="m-auto size-15 animate-spin"/>: " Sign Up"}
          </motion.button>
        </form>

      </div>
      <div className="py-4 px-8 bg-gray-900 flex justify-center bg-opacity-50    gap-2">
        <p className="text-gray-400 text-sm"> Already have an account?{"  "}</p>
        <Link to={"/login"} className=" text-green-400 text-sm hover:underline">
          Login
        </Link>
      </div>
    </motion.div>
  );
}

export default Signup;
