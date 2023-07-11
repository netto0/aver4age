import axios from "axios";

const baseUrl = "https://json-server-ten-pied.vercel.app/subjects";

async function getSubjects() {
  const resp = await axios.get(baseUrl);
  return resp.data;
}

async function getSubject(id) {
  const resp = await axios.get(`${baseUrl}/${id}`)
  return resp.data;
}

async function deleteSubject(id) {
  const resp = await axios.delete(`${baseUrl}/${id}`)
  return resp.data;
}

async function addSubject(
  name,
  semester,
  ava1,
  ava2,
  ava3,
  ava4,
  sum,
  pim,
  exam,
  average,
  need,
  summerSchoolGrade,
  finalAverage,
  situation
) {
  const reqBody = {
    name: name,
    semester: semester,
    ava1: ava1,
    ava2: ava2,
    ava3: ava3,
    ava4: ava4,
    sum: sum,
    pim: pim,
    exam: exam,
    average: average,
    need: need,
    summerSchoolGrade: summerSchoolGrade,
    finalAverage: finalAverage,
    situation: situation
  };
  const resp = await axios.post(`${baseUrl}/subjects`, reqBody);
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
  sum,
  pim,
  exam,
  average,
  need,
  summerSchoolGrade,
  finalAverage,
  situation
) {
  const reqBody = {
    name: name,
    semester: semester,
    ava1: ava1,
    ava2: ava2,
    ava3: ava3,
    ava4: ava4,
    sum: sum,
    pim: pim,
    exam: exam,
    average: average,
    need: need,
    summerSchoolGrade: summerSchoolGrade,
    finalAverage: finalAverage,
    situation: situation
  };
  const resp = await axios.put(`${baseUrl}/subjects/${id}`, reqBody);
  return resp.data;
}

export { getSubjects, getSubject, addSubject, editSubject, deleteSubject };
