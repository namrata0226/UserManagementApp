import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import validateInput from "../utils/validation";
import Swal from "sweetalert2";
const CreateUserTable = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const userData = { firstname, lastname, email, phone };
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const error = validateInput(userData);

    if (error) {
      setErrorMessage(error);
      return;
    }

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/add`, userData)
      .then(() => {
        Swal.fire({
          title: "User Added Successfully",
          icon: "success",
        }).then(() => navigate("/"));
      })
      .catch((err) => {
        if (err.status == 401) setErrorMessage("Email already exists");
        Swal.fire({
                title: "Failed To Add User",
                text: "Please Try again later...",
                icon: "error",
              });
      });
  };

  return (
    <div className="container form-container">
      <h3 className="fw-bold text-center text-light">Add New User</h3>
      <div className=" px-3">
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              id="floatingInput"
              className="form-control"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              onMouseDown={() => setValidation(true)}
            />
            <label htmlFor="floatingInput">First Name:</label>
          </div>

          {firstname.length === 0 && validation && (
            <span className="error-message">Please enter your first name</span>
          )}

          <div className="form-floating">
            <input
              type="text"
              id="floatingInput"
              className="form-control"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              onMouseDown={() => setValidation(true)}
            />
            <label htmlFor="floatingInput">Last Name:</label>
          </div>

          {lastname.length === 0 && validation && (
            <span className="error-message">Please enter your last name</span>
          )}

          <div className="form-floating">
            <input
              type="email"
              id="floatingInput"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onMouseDown={() => setValidation(true)}
            />
            <label htmlFor="floatingInput">Email:</label>
          </div>

          {email.length === 0 && validation && (
            <span className="error-message">Please enter your email</span>
          )}

          <div className="form-floating">
            <input
              type="number"
              id="floatingInput"
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onMouseDown={() => setValidation(true)}
            />
            <label htmlFor="floatingInput">Phone:</label>
          </div>

          {phone.length === 0 && validation && (
            <span className="error-message">Please enter your phone</span>
          )}

          <p className="error-message">{errorMessage}</p>
          <button className="btn btn-save btn-primary m-2">Save</button>
          <Link to={"/"} className="btn btn-back btn-dark">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateUserTable;
