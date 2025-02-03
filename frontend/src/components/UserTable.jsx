import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Shimmer from "./Shimmer";
import Swal from "sweetalert2";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const editDetails = (id) => {
    navigate("/edit/" + id);
  };

  const removeDetails = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`);
          setUsers(users.filter((user) => user._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user.",
            icon: "error",
          });
          console.error("Error deleting user:", error);
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="heading">
        <div className="heading-text">
          <h2 className="text-center text-light">User Management System</h2>
        </div>
        <div className="text-center mb-3">
          <Link to={"/user/create"} className="btn btn-add btn-primary ">
            Add User
          </Link>
        </div>
      </div>
      {loader ? (
        <div className="d-flex  shimmer-card ">
          <Shimmer /> <Shimmer /> <Shimmer />
        </div>
      ) : (
        <div className="card-container d-flex flex-wrap ">
          {users.length ? (
            users.map((user, index) => (
              <div className=" mb-3 user-card rounded col-sm-4 " key={index}>
                <div className="card mx-2">
                  <div className="card-body  ">
                    <div className="d-flex  justify-content-between">
                      <h3 className="card-title ">
                        {user.firstname} {user.lastname}
                      </h3>
                      <div className="d-flex h-50">
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
                    <p className="card-text mb-1">
                      {" "}
                      <MdOutlinePhone /> +91 {user.phone}
                    </p>
                    <p className="card-text  ">
                      {" "}
                      <MdOutlineEmail /> {user.email}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-light">No User Added</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserTable;
