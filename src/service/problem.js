import { getRequest, postRequest, postRequest_file, root_url } from "../utility/fetch"

export const getProblems = (callback) => {
  getRequest(root_url + "/api/getProblems", callback)
}

export const getProblemById = (id, callback) => {
  getRequest(root_url + "/api/getProblemById?id=" + id, callback)
}

export const modifyProblem = (values, callback) => {
  postRequest(root_url + "/api/modifyProblem", values, callback)
}

export const deleteProblem = (values, callback) => {
  postRequest(root_url + "/api/deleteProblem", values, callback)
}

export const addProblem = (values, callback) => {
  postRequest(root_url + "/api/addProblem", values, callback)
}

export const uploadTestCase = (problemId, values, callback) => {
  postRequest_file(root_url + "/api/addTestCase", values, callback)
}

export const deleteTestCase = (values, callback) => {
  postRequest(root_url + "/api/deleteTestCase", values, callback)
}

export const getProblemStaticsById = (id, callback) => {
  getRequest(root_url + "/api/getProblemStaticsById?id=" + id, callback)
}

