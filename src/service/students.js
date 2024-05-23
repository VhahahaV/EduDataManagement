import { getRequest, getRequest_noToken, postRequest, postRequest_file, root_url } from "../utility/fetch"

export const getStudents = (callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/student", callback)
}

export const getStudentsCourseData = (callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/student_course_data", callback)
}

export const getStudentCourseDataById = (id, callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/student_course_data/" + id, callback)
}

export const getStudentCourseDataByCourseId = (id, callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/student_course_data?student_course_data.course.id=" + id, callback)
}

export const getStudentCourseDataByStudentId = (id, callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/student_course_data?student_course_data.student.id=" + id, callback)
}

export const getClasses = (callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/course", callback)
}

export const getClassById = (id, callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/course/" + id, callback)
}

export const getClassStudentById = (id, callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/student_course_data/?student_course_data.course.id=" + id, callback)
}

export const getAllTeachers = (callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/teacher", callback)
}

export const getCourseTeachers = (callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/courseTeacher", callback)
}

export const getAnnouncements = (callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/announcement", callback)
}

export const getAnnouncementById = (id, callback) => {
  getRequest_noToken("http://202.120.40.86:14642/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource/announcement/" + id, callback)
}