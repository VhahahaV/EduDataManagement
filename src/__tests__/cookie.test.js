import { setCookie, getCookie, delCookie } from '../utility/cookie'

describe('setCookie', () => {
  beforeAll(() => {
    document.cookie = ''
  })
  it('should set a cookie with the given key, value, and expiration time', () => {
    setCookie('myKey', 'myValue', 3600)
    expect(document.cookie).toContain('myKey=myValue')
  })

  it('should set a cookie without an expiration time if expirem is null', () => {
    setCookie('myKey', 'myValue', null)
    expect(document.cookie).toContain('myKey=myValue')
  })
})

describe('getCookie', () => {
  beforeAll(() => {
    document.cookie = ''
  })
  it('should return the value of the cookie with the given key', () => {
    document.cookie = 'myKey=myValue;otherKey = otherValue'
    const value = getCookie('myKey')
    expect(value).toBe('myValue')
  })

  it('should return an empty string if the cookie with the given key does not exist', () => {
    document.cookie = 'otherKey = otherValue'
    const value = getCookie('nonExistentKey')
    expect(value).toBe('')
  })
})

describe('delCookie', () => {
  beforeAll(() => {
    document.cookie = ''
  })
  it('should delete the cookie with the given key', () => {
    document.cookie = 'myKey=myValue'
    delCookie('myKey')
    delCookie('otherKey')
    expect(document.cookie).toBe('')
  })

  it('should not throw an error if the cookie with the given key does not exist', () => {
    expect(() => delCookie('nonExistentKey')).not.toThrow()
  })
})

