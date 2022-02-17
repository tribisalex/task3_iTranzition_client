import React, {useContext} from "react";
import {Context} from "../index";

export const User = ({user}) => {

  const {user: usersStorage} = useContext(Context)

  return (
  <tr>
  <th scope="col">
    <input
      type="checkbox"
      className="form-check-input"
      checked={user.selected}
      id={user.id}
      onChange={() => usersStorage.setSelected(user.id)}
    />
  </th>
  <td>{user.id}</td>
  <td>{user.name}</td>
  <td>{user.email}</td>
  <td>{user.dateregistration}</td>
  <td>{user.datelastauthorization}</td>
  <td>{user.status}</td>
</tr>
)
}
