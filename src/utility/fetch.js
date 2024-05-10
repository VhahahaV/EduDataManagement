import { delCookie, getCookie } from "./cookie"

export const root_url = "http://localhost:8080"

export const getRequest = (url, callback) => {
  const token = getCookie("token")

  fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
    .catch((error) => console.log(error))
}

export const postRequest = (url, values, callback) => {
  const token = getCookie("token")

  fetch(url, {
    method: "POST",
    body: JSON.stringify(values),
    credentials: "include",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((values) => callback(values))
    .catch((error) => console.error(error))
}

export const postRequest_file = (url, values, callback) => {
  const token = getCookie("token")

  fetch(url, {
    method: "POST",
    body: values,
    credentials: "include",
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((response) => response.json())
    .then((values) => callback(values))
    .catch((error) => console.error(error))

}

export const getRequest_noToken = (url, callback) => {
  fetch(url, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
    .catch((error) => console.log(error))
}

export const postRequest_noToken = (url, values, callback) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(values),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((values) => callback(values))
    .catch((error) => console.error(error))
}