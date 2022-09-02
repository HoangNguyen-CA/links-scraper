import axios from "axios";
import EmbeddedData from "models/EmbeddedData";

export const getEmbeddedData = async (text: string) => {
  const res = await axios.post<EmbeddedData[]>(
    "https://882j6754y6.execute-api.us-east-1.amazonaws.com/",
    { text }
  );
  return res.data;
};
