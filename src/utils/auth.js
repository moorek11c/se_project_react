import { BASE_URL } from "./constants";

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// registration

export const register = async ({ name, avatar, email, password }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return response.json();
};

// authorization

export const authorize = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
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

    if (!response.ok) {
      throw new Error("Token validation failed");
    }

    const data = await response.json();
    console.log("fetch data", data);

    return data; // or data.user if that's what you need
  } catch (error) {
    console.error("Error checking token:", error);
    throw error;
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const updateProfile = async (name, avatar) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, avatar }),
  });

  return response.json();
};

// logging out

export const logout = () => {
  localStorage.removeItem("token"); // Remove token from local storage
};
