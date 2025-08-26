import { create } from "zustand";
import axios from "axios";

const base_URL = "auth-mern-delta.vercel.app/api/auth";
axios.defaults.withCredentials = true; // for set the cookies in frontend and backend and send the cookies from frontend to backend
export const AuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: false,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${base_URL}/signup`, {
        email,
        password,
        name,
      });
      console.log("response in signup", response);
      set({
        user: response.data.newUser,
        isAuthenticated: true,
        isLoading: false,
      });
      console.log("response in sign after set", response);
    } catch (error) {
      set({
        error: error.response.data.message || "Error in signing UP",
        isLoading: false,
      });
      throw error;
    }
  },
  verifyuseremail: async (code) => {
    set({ isLoading: true, error: null });
    console.log("verifying email with code in authstore:", code);
    try {
      console.log("code in authstore in try block", code);
      console.log("sending request to", `${base_URL}/verify_email`, { code });

      const res = await axios.post(
        `${base_URL}/verify_email`,
        { code },
        { withCredentials: true }
      );
      set({
        isLoading: false,
        error: null,
        user: res.data.user,
        isAuthenticated: true,
      });
      console.log("response.data in verify email", res.data);
      return res.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "error verifying email",
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${base_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.newUser,
        isAuthenticated: true,
        isLoading: false,
      });
      console.log("response in login  after set", response);
    } catch (error) {
      set({
        error: error.response.data.message || "error in login",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${base_URL}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "error in logout",
      });
    }
  },

  verifyUser: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.get(`${base_URL}/check-auth`);
      console.log("response in check-auth", res);
      set({
        user: res.data.user,
        isCheckingAuth: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ isCheckingAuth: false, error: null, isAuthenticated: false });
    }
  },
  forgetpassword: async (email) => {
    set({ isLoading: true, error: null });
    console.log("forget password email in authStore:", email);
    try {
      console.log(`${email} in try block`);
      const response = await axios.post(`${base_URL}/forget_password`, {
        email,
      });
      console.log("response in forget password in try block", response);
      set({ message: response.data.message, isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "error in forget password",
      });
      throw error;
    }
  },
  resetPassword: async (password, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${base_URL}/reset_password/${token}`, {
        password,
      });
      set({ isLoading: false, error: null, message: response.data.message });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "error in forget password",
      });
      throw error;
    }
  },
}));
