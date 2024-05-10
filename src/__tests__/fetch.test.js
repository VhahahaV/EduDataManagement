import { getRequest, postRequest, postRequest_file, getRequest_noToken, postRequest_noToken } from '../utility/fetch' // 替换为你的文件路径
import { getCookie } from '../utility/cookie'

jest.mock('../utility/cookie')
describe('getRequest', () => {
  beforeEach(() => {
    // 在每个测试之前，重置 fetch 的模拟实现
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    })
  })

  afterEach(() => {
    jest.restoreAllMocks() // 恢复所有被模拟的函数
  })

  it('should make a GET request with the correct parameters', async () => {
    const url = 'https://example.com/api'
    const token = 'your-token'
    const callback = jest.fn()

    getCookie.mockReturnValue(token) // 修改这里，使其同步返回一个 token

    await getRequest(url, callback) // 使用 async/await 等待异步操作完成

    const headers = {
      Authorization: `Bearer ${await getCookie()}`, // 使用 await 等待 getCookie 函数返回的实际 token 值
      'Content-Type': 'application/json',
    }

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      credentials: 'include',
      headers,
    })
  })

  it('should call the callback function with the response data', async () => {
    const url = 'https://example.com/api'
    const data = { message: 'Success' }
    const callback = jest.fn()

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    await getRequest(url, callback)


    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(data)
      done()
    }, 0)
  })

  it('should log an error if the request fails', async () => {
    const url = 'https://example.com/api'
    const error = new Error('Request failed')
    console.log = jest.fn() // 模拟 console.log 函数

    global.fetch = jest.fn().mockRejectedValue(error)

    await getRequest(url, jest.fn())

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith(error)
      done()
    }, 0)
  })
})

describe('postRequest', () => {
  beforeEach(() => {
    console.error = jest.fn()
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should make a POST request with the correct parameters', async () => {
    const url = 'https://example.com/api'
    const values = { key: 'value' }
    const token = 'your-token'
    const callback = jest.fn()

    getCookie.mockReturnValue(token)

    await postRequest(url, values, callback)

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: JSON.stringify(values),
      credentials: 'include',
      headers,
    })
  })

  it('should call the callback function with the response data', async () => {
    const url = 'https://example.com/api'
    const values = { key: 'value' }
    const data = { message: 'Success' }
    const callback = jest.fn()

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    await postRequest(url, values, callback)

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(data)
      done()
    }, 0)
  })

  it('should log an error if the request fails', async () => {
    const url = 'https://example.com/api'
    const values = { key: 'value' }
    const error = new Error('Request failed')
    console.log = jest.fn()

    global.fetch = jest.fn().mockRejectedValue(error)

    await postRequest(url, values, jest.fn())

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith(error)
      done()
    }, 0)
  })
})

describe('postRequest_file', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should make a POST request with the correct parameters', async () => {
    const url = 'https://example.com/api'
    const values = new FormData()
    const token = 'your-token'
    const callback = jest.fn()

    getCookie.mockReturnValue(token)

    await postRequest_file(url, values, callback)

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: values,
      credentials: 'include',
      headers,
    })
  })

  it('should call the callback function with the response data', async () => {
    const url = 'https://example.com/api'
    const values = new FormData()
    const data = { message: 'Success' }
    const callback = jest.fn()

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    await postRequest_file(url, values, callback)

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(data)
      done()
    }, 0)
  })

  it('should log an error if the request fails', async () => {
    const url = 'https://example.com/api'
    const values = new FormData()
    const error = new Error('Request failed')
    console.log = jest.fn()

    global.fetch = jest.fn().mockRejectedValue(error)

    await postRequest_file(url, values, jest.fn())

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith(error)
      done()
    }, 0)
  })
})


describe('getRequest_noToken', () => {
  beforeEach(() => {
    console.error = jest.fn()
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should make a GET request with the correct parameters', async () => {
    const url = 'https://example.com/api'
    const callback = jest.fn()

    await getRequest_noToken(url, callback)

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      credentials: 'include',
    })
  })

  it('should call the callback function with the response data', async () => {
    const url = 'https://example.com/api'
    const data = { message: 'Success' }
    const callback = jest.fn()

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    await getRequest_noToken(url, callback)

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(data)
      done()
    }, 0)
  })

  it('should log an error if the request fails', async () => {
    const url = 'https://example.com/api'
    const error = new Error('Request failed')
    console.log = jest.fn()

    global.fetch = jest.fn().mockRejectedValue(error)

    await getRequest_noToken(url, jest.fn())

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith(error)
      done()
    }, 0)
  })
})
describe('postRequest_noToken', () => {
  beforeEach(() => {
    console.error = jest.fn()
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should make a POST request with the correct parameters', async () => {
    const url = 'https://example.com/api'
    const values = { key: 'value' }
    const callback = jest.fn()

    await postRequest_noToken(url, values, callback)

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: JSON.stringify(values),
      credentials: 'include',
    })
  })

  it('should call the callback function with the response data', async () => {
    const url = 'https://example.com/api'
    const values = { key: 'value' }
    const data = { message: 'Success' }
    const callback = jest.fn()

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    await postRequest_noToken(url, values, callback)

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(data)
      done()
    }, 0)
  })

  it('should log an error if the request fails', async () => {
    const url = 'https://example.com/api'
    const values = { key: 'value' }
    const error = new Error('Request failed')
    console.log = jest.fn()

    global.fetch = jest.fn().mockRejectedValue(error)

    await postRequest_noToken(url, values, jest.fn())

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith(error)
      done()
    }, 0)
  })
})
