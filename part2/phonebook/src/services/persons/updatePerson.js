import axios from "axios";

export const updatePerson = (id, number) => {
  return axios
    .patch(`api/persons/${id}`, {
      number: `${number}`,
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
};
