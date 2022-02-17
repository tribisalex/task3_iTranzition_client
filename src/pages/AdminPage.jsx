import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchUsers, updateUserStatus, deleteUser} from "../http/userAPI";
import {User} from "../components/User";
import jwt_decode from "jwt-decode";
import {LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom'

const AdminPage = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()
  const [isMarkedAll, setIsMarkedAll] = useState(false)
  const isSelectedAll = user._users.filter(user => user.selected).length === user._users.length

  useEffect(() => {
    fetchUsers().then(data => user.setUsers(data))
  }, [])

  const onDeleteUser = () => {
    const checkedUsers = user._users.filter(user => user.selected)
    deleteUser(checkedUsers).then(data => user.setUsers(data))
  }

  const changeStatus = (status) => {
    const currentUser = jwt_decode(localStorage.token)
    console.log(currentUser.status)
    const checkedUsers = user._users.filter(user => user.selected)
    const isCurrentUser = checkedUsers.find(user => user.id === currentUser.id)
    updateUserStatus(checkedUsers, status).then(() => user.setStatus(status))
    if (isCurrentUser) {
      user.setIsAuth(false)
      navigate(LOGIN_ROUTE)
    }
  }

  return (
    <Container className='d-flex flex-column align-items-center mb-2'>
      <Row><h2 className='m-auto'>Task #3</h2></Row>
      <Row className='d-flex flex-row'>
        <Button variant={'outline-success'} onClick={() => changeStatus('block')}>Block</Button>
        <Button variant={'outline-success'} onClick={() => changeStatus('unBlock')}>Unblock</Button>
        <Button variant={'outline-success'} onClick={() => onDeleteUser()}>Delete</Button>
      </Row>

      <div className="row">
        <div className="col-md-12">
          <Table>
            <thead>
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  checked={isSelectedAll}
                  className="form-check-input"
                  id="mastercheck"
                  onChange={() => {
                    setIsMarkedAll(!isMarkedAll)
                    user.setSelectedAll(isMarkedAll)
                  }}
                />
              </th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Data registration</th>
              <th>Data last authorisation</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {user._users.map(user =>
              <User user={user} />
            )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
});


export default AdminPage;