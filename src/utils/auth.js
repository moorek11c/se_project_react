import { BASE_URL } from "./constants";

export const login = async ({ email, password }) => {
  console.log("Email:", email, "Password:", password);

  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    // Parse the JSON body
    const data = await response.json();

    if (!data || !data.user || !data.token) {
      throw new Error("User data is incomplete or missing");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
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

    return data;
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

  return response.json();
};

// logging out

export const logout = () => {
  localStorage.removeItem("token");
};
