import { getRequest, getRequest_noToken, postRequest, postRequest_file, root_url } from "../utility/fetch"

export const getStudents = (callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/student", callback)
}