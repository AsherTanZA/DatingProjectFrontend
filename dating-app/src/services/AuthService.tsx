import axios from "axios";

interface Register {
  name: String;
  username: String;
  email: String;
  password: String;
}

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth";

export const registerAPICall = (registerObj: Register) => {
  return axios.post(AUTH_REST_API_BASE_URL + "/register", registerObj);
};

export const loginAPICall = (usernameOrEmail: String, password: String) =>
  axios.post(AUTH_REST_API_BASE_URL + "/login", { usernameOrEmail, password });

export const storeToken = (token: any) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username: any, role: any) => {
  sessionStorage.setItem("authenticatedUser", username);
  sessionStorage.setItem("role", role);
};

export const gettheUsername = async (username: any) => {
  if (username == null) {
    console.error("No user is logged in yet.");
    return null;
  } else if (username.includes("@")) {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/get-username",
        {
          params: { email: username }, // match @RequestParam("email") in your controller
        }
      );
      return response.data; // assuming backend returns username as plain string
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  } else {
    return username;
  }
};

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");

  if (username == null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const isAdminUser = () => {
  let role = sessionStorage.getItem("role");

  if (role != null && role === "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
};
