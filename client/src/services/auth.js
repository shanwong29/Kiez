import axios from "axios";

const signup = (username, password, street, houseNumber, city, postalCode) => {
  return axios
    .post("/api/auth/signup", {
      username: username,
      password: password,
      street: street,
      houseNumber: houseNumber,
      city: city,
      postalCode: postalCode
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
