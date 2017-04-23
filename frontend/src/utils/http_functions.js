/* eslint camelcase: 0 */

import axios from 'axios'

const tokenConfig = (token) => ({
  headers: {
    'Authorization': 'Token ' + token // eslint-disable-line quote-props
  }
})

const emailPasswordConfig = (email, password) => ({
  headers: {
    'Authorization': 'Basic ' + decodeURIComponent(
      escape(btoa(
        unescape(encodeURIComponent(
          (email + ':' + password)))
    ))) // eslint-disable-line quote-props
  }
})

export function validate_token (token) {
  return axios.post('/api/is_token_valid', {
    token
  })
}

export function redirectToRoute (long_url) {
  return window.location.assign('http://' + long_url)
}

export function getPopularUrls () {
  return axios.get('http://127.0.0.1:5000/api/v1.0/shorturl/popular')
}

export function getMostRecentUrls () {
  return axios.get('http://127.0.0.1:5000/api/v1.0/shorturl/recent')
}

export function getInfluentialUsers () {
  return axios.get('http://127.0.0.1:5000/api/v1.0/users/influential')
}

export function visitUrl (shortUrl) {
  const body = {
    short_url: shortUrl
  }
  return axios.post('http://127.0.0.1:5000/api/v1.0/visit', body)
}

export function createUser (first_name, last_name, email, password, confirm_password) {
  return axios.post('http://127.0.0.1:5000/api/v1.0/register', {
    first_name,
    last_name,
    email,
    password,
    confirm_password
  })
}

export function getToken (email, password) {
  return axios.get('http://127.0.0.1:5000/api/v1.0/token', emailPasswordConfig(email, password))
}

export function shortenLongUrl (longUrl, vanity) {
  if (vanity) {
    const token = localStorage.getItem('token')
    const data = {
      long_url: longUrl,
      vanity
    }
    return axios.post('http://127.0.0.1:5000/api/v1.0/shorten', data, tokenConfig(token))
  } else {
    return axios.post('http://127.0.0.1:5000/api/v1.0/shorten', {long_url: longUrl})
  }
}

export function getUserDetails (token) {
  return axios.get('api/v1.0/user', tokenConfig(token))
}
