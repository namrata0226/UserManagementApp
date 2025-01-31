import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const editDetails = (id) => {
    navigate("/edit/" + id);
  };

  const removeDetails = (id) => {
    if (window.confirm("You want to delete details")) {
      axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`).then(() => {
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
        <div className="text-center mb-3">
          <Link
            to={"/user/create"}
            className="btn btn-add btn-primary "
          >
            Add User
          </Link>
        </div>
      </div>
      {users.length ? (
        users.map((user, index) => (
          <div className="col-sm-12 mb-3 user-card" key={index}>
            <div className="card">
              <div className="card-body ">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title ">
                    {user.firstname} {user.lastname}
                  </h3>
                  <div>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => editDetails(user._id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger ms-1"
                      onClick={() => removeDetails(user._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <p className="card-text mb-1">+91 {user.phone}</p>
                <p className="card-text ">{user.email}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No User Added</p>
      )}
    </div>
  );
};

export default UserTable;
// <div classNameName="table-container">
//   <table>
//     <thead>
//       <tr>
//         <th>First Name</th>
//         <th>Last Name</th>
//         <th>Email</th>
//         <th>Phone</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {users &&
//         users.map((user, index) => (
//           <tr key={index}>
//             <td>{user?.firstname}</td>
//             <td>{user?.lastname}</td>
//             <td>{user?.email}</td>
//             <td>{user?.phone}</td>
//             <td>
//               <button
//                 classNameName="btn btn-primary m-3 btn-sm"
//                 onClick={() => editDetails(user._id)}
//               >
//                 Edit
//               </button>
//               <button
//                 classNameName="btn btn-danger m-3 btn-sm"
//                 onClick={() => removeDetails(user._id)}
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//     </tbody>
//   </table>
// </div>
