import axios from "axios";

export const updatePerson = (id, number, name) => {
  axios
    .put(`http://localhost:3001/persons/${id}`, {
      name: `${name}`,
      number: `${number}`,
    })
    .then((response) => console.log(response));
};
