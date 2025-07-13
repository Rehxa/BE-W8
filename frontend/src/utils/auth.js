import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("authToken");

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

export const getAuthUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
