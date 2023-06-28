import axios from "axios";

const baseUrl = "http://localhost:3000";

export default async function getSubjects() {
  const resp = await axios.get(`${baseUrl}/subjects`)
  return resp.data  
};