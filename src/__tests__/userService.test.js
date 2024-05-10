import {
  login,
  logout,
  register,
  checkAuth,
  getRank,
  getUserNumber,
  getUserByPage,
  getUserByKeyword
} from "../service/user"
import {
  setTokenCookie,
  deleteTokenCookie,
  setCookie,
  delCookie
} from "../utility/cookie"
import { root_url, postRequest, getRequest, postRequest_noToken } from "../utility/fetch"

jest.mock("../utility/cookie")
jest.mock("../utility/fetch")
describe("login", () => {
  it("should call postRequest_noToken with the correct URL, data, and callback", () => {
    const values = { username: "user", password: "pass" }
    const callback = jest.fn()
    const result = { data: { token: "abc123" } }
    postRequest_noToken.mockImplementationOnce((url, data, cb) => {
      cb(result)
    })
    login(values, callback)
    expect(postRequest_noToken).toHaveBeenCalledWith(
      root_url + "/api/login",
      values,
      expect.any(Function)
    )
    expect(setCookie).toHaveBeenCalledWith("token", "abc123", 60000)
    expect(callback).toHaveBeenCalledWith(result)
  })
})

describe("logout", () => {
  it("should call delCookie with the 'token' cookie name", () => {
    logout()
    expect(delCookie).toHaveBeenCalledWith("token")
  })
})

describe("register", () => {
  it("should call postRequest_noToken with the correct URL, data, and callback", () => {
    const values = { username: "user", password: "pass" }
    const callback = jest.fn()
    register(values, callback)
    expect(postRequest_noToken).toHaveBeenCalledWith(
      root_url + "/api/register",
      values,
      callback
    )
  })
})

describe("checkAuth", () => {
  it("should call postRequest with the correct URL and callback", () => {
    const callback = jest.fn()
    checkAuth(callback)
    expect(postRequest).toHaveBeenCalledWith(
      root_url + "/api/checkAuth",
      null,
      callback
    )
  })
})

describe("getRank", () => {
  it("should call getRequest with the correct URL and query parameters", () => {
    const pageSize = 10
    const pageIndex = 1
    const callback = jest.fn()
    getRank(pageSize, pageIndex, callback)
    expect(getRequest).toHaveBeenCalledWith(
      root_url + "/api/getRank?pageSize=10&pageIndex=1",
      callback
    )
  })
})

describe("getUserNumber", () => {
  it("should call getRequest with the correct URL and callback", () => {
    const callback = jest.fn()
    getUserNumber(callback)
    expect(getRequest).toHaveBeenCalledWith(
      root_url + "/api/getUserNumber",
      callback
    )
  })
})

describe("getUserByPage", () => {
  it("should call getRequest with the correct URL and query parameters", () => {
    const pageIndex = 1
    const pageSize = 10
    const callback = jest.fn()
    getUserByPage(pageIndex, pageSize, callback)
    expect(getRequest).toHaveBeenCalledWith(
      root_url + "/api/getUserByPage?pageIndex=1&pageSize=10",
      callback
    )
  })
})

describe("getUserByKeyword", () => {
  it("should call getRequest with the correct URL and query parameter", () => {
    const keyword = "user"
    const callback = jest.fn()
    getUserByKeyword(keyword, callback)
    expect(getRequest).toHaveBeenCalledWith(
      root_url + "/api/getUserByKeyword?keyword=user",
      callback
    )
  })
})
