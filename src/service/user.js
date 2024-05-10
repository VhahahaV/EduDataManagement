import { setTokenCookie, deleteTokenCookie, setCookie, delCookie } from "../utility/cookie";
import { root_url, postRequest, getRequest, postRequest_noToken } from "../utility/fetch";

export const login = (values, callback) => {
  postRequest_noToken(root_url + "/api/login", values, (result) => {
    console.log(result)
    setCookie("token", result.data.token, 1000 * 60);
    callback(result);
  });
}

export const logout = () => {
  delCookie("token");
}

export const register = (values, callback) => {
  postRequest_noToken(root_url + "/api/register", values, callback);
}

export const checkAuth = (callback) => {
  postRequest(root_url + "/api/checkAuth", null, callback);
}

export const getRank = (pageSize, pageIndex, callback) => {
  getRequest(root_url + "/api/getRank" + `?pageSize=${pageSize}&pageIndex=${pageIndex}`, callback);
}

export const getUserNumber = (callback) => {
  getRequest(root_url + "/api/getUserNumber", callback);
}

export const getUserByPage = (pageIndex, pageSize, callback) => {
  getRequest(root_url + "/api/getUserByPage" + `?pageIndex=${pageIndex}&pageSize=${pageSize}`, callback);
}

export const getUserByKeyword = (keyword, callback) => {
  getRequest(root_url + "/api/getUserByKeyword" + `?keyword=${keyword}`, callback);
}