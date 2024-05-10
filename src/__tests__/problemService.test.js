import {
  getProblems,
  getProblemById,
  modifyProblem,
  addProblem,
  uploadTestCase
} from "../service/problem"
import { getRequest, postRequest, postRequest_file, root_url } from "../utility/fetch"

jest.mock("../utility/fetch")

describe("Fetch Utility", () => {
  describe("getProblems", () => {
    it("should call getRequest with the correct URL", () => {
      const callback = jest.fn()
      getProblems(callback)
      expect(getRequest).toHaveBeenCalledWith(root_url + "/api/getProblems", callback)
    })
  })

  describe("getProblemById", () => {
    it("should call getRequest with the correct URL and query parameter", () => {
      const id = 123
      const callback = jest.fn()
      getProblemById(id, callback)
      expect(getRequest).toHaveBeenCalledWith(root_url + "/api/getProblemById?id=123", callback)
    })
  })

  describe("modifyProblem", () => {
    it("should call postRequest with the correct URL and data", () => {
      const values = { id: 456, title: "Problem Title" }
      const callback = jest.fn()
      modifyProblem(values, callback)
      expect(postRequest).toHaveBeenCalledWith(
        root_url + "/api/modifyProblem",
        values,
        callback
      )
    })
  })

  describe("addProblem", () => {
    it("should call postRequest with the correct URL and data", () => {
      const values = { title: "New Problem" }
      const callback = jest.fn()
      addProblem(values, callback)
      expect(postRequest).toHaveBeenCalledWith(
        root_url + "/api/addProblem",
        values,
        callback
      )
    })
  })

  describe("uploadTestCase", () => {
    it("should call postRequest_file with the correct URL and data", () => {
      const problemId = 789
      const values = { file: "testcase.txt" }
      const callback = jest.fn()
      uploadTestCase(problemId, values, callback)
      expect(postRequest_file).toHaveBeenCalledWith(
        root_url + "/api/addTestCase",
        values,
        callback
      )
    })
  })
})
