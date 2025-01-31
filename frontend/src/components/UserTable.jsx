import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const editDetails = (id) => {
    navigate("/edit/" + id);
  };
  const removeDetails = (id) => {
    if (window.confirm("You want to delete details")) {
      axios.delete(`http://localhost:3000/${id}`).then(() => {
        //window.alert("User Removed Successfully");
        window.location.reload();
      });
    }
  };
  return (
    <div className="container">
      <div className="heading">
        <div className="heading-text">
          <h2>User Management System</h2>
        </div>
        <div className="heading-button">
          {" "}
          <Link
            to={"/user/create"}
            className="btn btn-add btn-primary add-button"
          >
            Add User
          </Link>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user?.firstname}</td>
                  <td>{user?.lastname}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <td>
                    <button
                      className="btn btn-primary m-3 btn-sm"
                      onClick={() => editDetails(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger m-3 btn-sm"
                      onClick={() => removeDetails(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
