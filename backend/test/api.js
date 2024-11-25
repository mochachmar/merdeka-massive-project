import axios from "axios";

export const getImage = async () => {
  const image = await axios.get("");
  return;
};

export const getJenis = async (q) => {
  const jenis = await axios.get(q);
  return;
};
