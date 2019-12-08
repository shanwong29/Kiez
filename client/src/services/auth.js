import axios from "axios";

const signup = (username, street, houseNumber, city, postalCode, password) => {
  return axios
    .post("/api/auth/signup", {
      username: username,
      street: street,
      houseNumber: houseNumber,
      city: city,
      postalCode: postalCode,
      password: password
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const login = (username, password) => {
  return axios
    .post("/api/auth/login", {
      username: username,
      password: password
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  axios.delete("/api/auth/logout");
};

export { signup, login, logout };
