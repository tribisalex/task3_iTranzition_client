import {makeAutoObservable} from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    this._users = []
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  setUsers(users) {
    this._users = users.map(user => ({...user, selected: false})).sort()
  }

  setStatus(status){
    this._users = this._users.map(user => user.selected ? ({...user, status}) : user)
  }

  setSelected (id) {
    this._users = this._users.map(user => user.id === id ? ({...user, selected: !user.selected}) : user)
  }

  setSelectedAll (selected) {
    this._users = this._users.map(user =>  ({...user, selected}))
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  getUsers() {
    return this._users
  }

  getStatus(user) {
    return this._user
  }
}