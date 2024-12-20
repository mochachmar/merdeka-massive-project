// store/FetchDataWithAxios.jsx
import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000/api/auth' : '/api/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  // State untuk user biasa
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // State untuk admin
  admin: null,
  isAdminAuthenticated: false,
  adminError: null,
  isAdminLoading: false,
  adminMessage: null,

  // Fungsi signup user biasa
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/create-with-email`, { email, password, name });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error signing up', isLoading: false });
      throw error;
    }
  },

  // Fungsi login user biasa
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/sign-in`, { email, password });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message || 'Error logging in', isLoading: false });
      throw error;
    }
  },

  // Fungsi logout user biasa
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      if (response.data.success) {
        set({ user: null, isAuthenticated: false, error: null, isLoading: false });
      }
    } catch (error) {
      set({ error: 'Error logging out', isLoading: false });
      throw error;
    }
  },

  // Fungsi verify email user
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/email-code`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error verifying email', isLoading: false });
      throw error;
    }
  },

  // Fungsi checkAuth user
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  // Fungsi forgotPassword user
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Error sending reset password email',
      });
      throw error;
    }
  },

  // Fungsi resetPassword user
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/new-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Error resetting password',
      });
      throw error;
    }
  },

  // Fungsi login admin
  loginAdmin: async (email, password) => {
    set({ isAdminLoading: true, adminError: null });
    try {
      const response = await axios.post(`${API_URL}/sign-in-admin`, { email, password }, { withCredentials: true });
      if (response.data.success) {
        set({
          isAdminAuthenticated: true,
          admin: response.data.admin, // Pastikan admin data termasuk email dan username
          adminError: null,
          isAdminLoading: false,
        });
      }
    } catch (error) {
      set({
        adminError: error.response?.data?.message || 'Gagal login sebagai admin.',
        isAdminLoading: false,
      });
      throw error;
    }
  },

  // Fungsi logout admin
  logoutAdmin: async () => {
    set({ isAdminLoading: true, adminError: null });
    try {
      const response = await axios.post(`${API_URL}/logout-admin`, {}, { withCredentials: true });
      if (response.data.success) {
        set({
          admin: null,
          isAdminAuthenticated: false,
          adminError: null,
          isAdminLoading: false,
        });
      }
    } catch (error) {
      set({ adminError: 'Error logging out admin', isAdminLoading: false });
      throw error;
    }
  },

  // Fungsi checkAuth untuk admin
  checkAuthAdmin: async () => {
    set({ isAdminLoading: true, adminError: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth-admin`, { withCredentials: true });
      if (response.data.success && response.data.user.role === 'admin') {
        set({
          isAdminAuthenticated: true,
          admin: response.data.user,
          isAdminLoading: false,
        });
      } else {
        set({
          isAdminAuthenticated: false,
          admin: null,
          isAdminLoading: false,
        });
      }
    } catch (error) {
      set({
        isAdminAuthenticated: false,
        admin: null,
        isAdminLoading: false,
      });
    }
  },

  // Fungsi mengganti kata sandi admin
  changeAdminPassword: async (oldPassword, newPassword, confirmPassword) => {
    set({ isAdminLoading: true, adminError: null });
    try {
      const response = await axios.put(`${API_URL}/admin/change-password`, { oldPassword, newPassword, confirmPassword }, { withCredentials: true });
      if (response.data.success) {
        set({ isAdminLoading: false });
        return response.data;
      } else {
        set({ isAdminLoading: false, adminError: response.data.message || 'Gagal mengganti kata sandi.' });
        throw new Error(response.data.message || 'Gagal mengganti kata sandi.');
      }
    } catch (error) {
      set({ isAdminLoading: false, adminError: error.response?.data?.message || 'Gagal mengganti kata sandi.' });
      throw error;
    }
  },

  resetAdminState: () => {
    set({
      admin: null,
      isAdminAuthenticated: false,
      adminError: null,
      isAdminLoading: false,
      adminMessage: null,
    });
  },
}));
