import { getRequest, postRequest, root_url } from "../utility/fetch"


export const getCommentByProblemId = (problemId, callback) => {
  getRequest(root_url + "/api/getCommentByProblemId?problemId=" + problemId, callback)
}

// export const updateAnnouncement = (values, callback) => {
//   postRequest(root_url + "/api/modifyAnnouncement", values, callback)
// }

// export const deleteAnnouncement = (values, callback) => {
//   postRequest(root_url + "/api/deleteAnnouncement", values, callback)
// }

export const addComment = (values, callback) => {
  postRequest(root_url + "/api/addComment", values, callback)
}