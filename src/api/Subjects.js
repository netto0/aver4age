import axios from "axios";

const baseUrl = "http://localhost:3000";

async function getSubjects() {
  const resp = await axios.get(`${baseUrl}/subjects`);
  return resp.data;
}

async function getSubject(id) {
  const resp = await axios.get(`${baseUrl}/subjects/${id}`)
  return resp.data;
}

async function deleteSubject(id) {
  const resp = await axios.delete(`${baseUrl}/subjects/${id}`)
  return resp.data;
}

async function addSubject(
  name,
  semester,
  ava1 = null,
  ava2 = null,
  ava3 = null,
  ava4 = null,
  pim = null,
  exam = null,
  summerGrade = null
) {
  const postBody = {
    name: name,
    semester: semester,
    ava1: ava1,
    ava2: ava2,
    ava3: ava3,
    ava4: ava4,
    pim: pim,
    exam: exam,
    summerSchoolGrade: summerGrade,
  };
  const resp = await axios.post(`${baseUrl}/subjects`, postBody);
  return resp.data;
}

async function editSubject(
  id,
  name,
  semester,
  ava1,
  ava2,
  ava3,
  ava4,
  pim,
  exam,
  summerGrade
) {
  const reqBody = {
    name: name,
    semester: semester,
    ava1: ava1,
    ava2: ava2,
    ava3: ava3,
    ava4: ava4,
    pim: pim,
    exam: exam,
    summerSchoolGrade: summerGrade,
  };
  const resp = await axios.put(`${baseUrl}/subjects/${id}`, reqBody);
  return resp.data;
}

export { getSubjects, getSubject, addSubject, editSubject, deleteSubject };
