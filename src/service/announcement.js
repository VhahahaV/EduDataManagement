import { getRequest, postRequest, root_url } from "../utility/fetch"

export const getAnnouncement = (callback) => {
  getRequest(root_url + "/api/getAnnouncement", callback)
}

export const getAnnouncementById = (id, callback) => {
  getRequest(root_url + "/api/getAnnouncementById?id=" + id, callback)
}

export const updateAnnouncement = (values, callback) => {
  postRequest(root_url + "/api/modifyAnnouncement", values, callback)
}

export const deleteAnnouncement = (values, callback) => {
  postRequest(root_url + "/api/deleteAnnouncement", values, callback)
}

export const addAnnouncement = (values, callback) => {
  postRequest(root_url + "/api/addAnnouncement", values, callback)
}