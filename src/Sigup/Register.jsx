import React from "react";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState([]);
  const [listUsers, setListUsers] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [listUsersErrors, setListUsersErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeListUsers = (e, key) => {
    setListUsers({
      ...listUsers,
      [key]: e.target.value,
    });
  };

  const handleAddUser = () => {
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordRegEx =
      /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/i;
    let isValid = true;
    const errors = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!listUsers.email) {
      errors.email = "Email is required !!!";
      isValid = false;
    } else if (!emailRegEx.test(listUsers.email)) {
      errors.email = "Email must include @gmail.com !!!";
      isValid = false;
    } else {
      errors.email = "";
    }

    if (!listUsers.password) {
      errors.password = "Password is required !!!";
      isValid = false;
    } else if (!passwordRegEx.test(listUsers.password)) {
      errors.password = "Password must have 6 chars !!!";
      isValid = false;
    } else {
      errors.password = "";
    }

    if (!listUsers.confirmPassword) {
      errors.confirmPassword = "confirmPassword is required !!!";
      isValid = false;
    } else if (listUsers.confirmPassword !== listUsers.password) {
      errors.confirmPassword = "confirmPassword incorrect";
      isValid = false;
    } else {
      errors.confirmPassword = "";
    }

    if (isValid) {
      setListUsers([
        setUser([
          ...user,
          {
            email: listUsers.email,
            password: listUsers.password,
            confirmPassword: listUsers.confirmPassword,
          },
        ]),
        {
          email: "",
          password: "",
          confirmPassword: "",
        },
      ]);
    }
    setListUsersErrors(errors);
  };

  let delethandle = (i) => {
    let newdataArr = [...user];
    newdataArr.splice(i, 1);
    setUser(newdataArr);
  };

  return (
    <div>
      <form>
        <div className="wrapper__user">
          <input
            type="text"
            onChange={(e) => handleChangeListUsers(e, "email")}
            value={listUsers.email}
            placeholder="Email"
          />
          <span>{listUsersErrors.email}</span>
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => handleChangeListUsers(e, "password")}
            value={listUsers.password}
            placeholder="Password"
          />
          <span>{listUsersErrors.password}</span>
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => handleChangeListUsers(e, "confirmPassword")}
            value={listUsers.confirmPassword}
            placeholder="Confirm Password"
          />
          <span>{listUsersErrors.confirmPassword}</span>
        </div>
        <button type="button" onClick={() => handleAddUser()}>
          Submit
        </button>
      </form>

      <div className="content__users">
        <table id="container" border={1} width={800} cellPadding={10}>
          <tr>
            <th>Email</th>
            <th>Password</th>
          </tr>
          {user.length < 1 ? (
            <tr>
              <td colSpan={4}>NO data Enter yet !</td>
            </tr>
          ) : (
            user.map((item, ind) => {
              return (
                <tr key={ind}>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>
                    <button onClick={() => delethandle(ind)}>Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </table>
      </div>
    </div>
  );
};

export default Register;
