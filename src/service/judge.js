import { getRequest, postRequest, root_url } from "../utility/fetch"

export const getJudgeResults = (pageIndex, pageSize, callback) => {
  getRequest(root_url + "/api/getJudgeResult" + `?pageIndex=${pageIndex}&pageSize=${pageSize}`, callback)
}

export const getJudgeDetail = (id, callback) => {
  getRequest(root_url + "/api/getJudgeDetail" + `?id=${id}`, callback)
}

export const submitAnswer = (code, language, problemId) => {
  postRequest(root_url + "/api/submitAnswer",
    { code: code, language: language, problemId: problemId },
    (result) => {
      console.log(result)
    })
}

export const getJudgeStatusByPage = (pageIndex, pageSize, callback) => {
  getRequest(root_url + "/api/getJudgeStatusByPage" + `?pageIndex=${pageIndex}&pageSize=${pageSize}`, callback)
}

export const getJudgeStatusNumber = (callback) => {
  getRequest(root_url + "/api/getJudgeResultNumber", callback)
}

export const getJudgeStatusNumberByUser = (callback) => {
  getRequest(root_url + "/api/getJudgeResultNumberByUser", callback)
}

export const getCodeById = (id, callback) => {
  getRequest(root_url + "/api/getCodeById" + `?id=${id}`, callback)
}

export const getAnsweredProblemByPage = (callback) => {
  getRequest(root_url + "/api/getAnsweredProblem", callback)
}