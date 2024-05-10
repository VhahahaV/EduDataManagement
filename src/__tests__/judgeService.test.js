import { getJudgeResults, getJudgeDetail, submitAnswer } from "../service/judge"
import { getRequest, postRequest, root_url } from "../utility/fetch"

jest.mock("../utility/fetch")

describe("getJudgeResults", () => {
  it("should call getRequest with the correct URL", () => {
    const callback = jest.fn()
    getJudgeResults(callback)
    expect(getRequest).toHaveBeenCalledWith(root_url + "/api/getJudgeResult", callback)
  })
})

describe("getJudgeDetail", () => {
  it("should call getRequest with the correct URL and query parameter", () => {
    const id = 123
    const callback = jest.fn()
    getJudgeDetail(id, callback)
    expect(getRequest).toHaveBeenCalledWith(root_url + "/api/getJudgeDetail?id=123", callback)
  })
})

describe("submitAnswer", () => {
  it("should call postRequest with the correct URL and data", () => {
    const code = "console.log('Hello, world!');"
    const language = "javascript"
    const problemId = 456
    submitAnswer(code, language, problemId)
    expect(postRequest).toHaveBeenCalledWith(
      root_url + "/api/submitAnswer",
      { code: code, language: language, problemId: problemId },
      expect.any(Function)
    )
  })
})

