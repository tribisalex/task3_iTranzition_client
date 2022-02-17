import {$host, $authHost} from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (name, email, password) => {
  var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const {data} = await $host.post('api/user/registration', {name, email, password, dataRegistration: date, dateLastAuthorization: date, status: 'unblock'})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (email, password) => {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const {data} = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const fetchUsers = async () => {
  const {data} = await $authHost.get('api/user/users')
  return data
}

export const updateUserStatus = async (users, status) => {
  const {data} = await $authHost.put('api/user/status', {status, users})
  return data
}

export const deleteUser = async (users) => {
  const {data} = await $authHost.delete('api/user/user', {users})
  return data
}
