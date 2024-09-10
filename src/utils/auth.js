import { BASE_URL } from "./constants";
import { handleResponse } from "./constants";

// login
export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    if (!data || !data.user || !data.token) {
      throw new Error("User data is incomplete or missing");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// register
export const register = async ({ name, avatar, email, password }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return handleResponse(response);
};

// authorize
export const authorize = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

// check token
export const checkToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject("No token provided");
  }

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error checking token:", error);
    throw error;
  }
};

// edit profile
export const editProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Token is not provided");
    return;
  }
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(),
  });

  return handleResponse(response);
};

// logging out
export const logout = () => {
  localStorage.removeItem("token");
};

// Helper function for auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
