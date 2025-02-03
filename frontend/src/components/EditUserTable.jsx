import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import validateInput from "../utils/validation";
const EditUserTable = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userData = { firstname, lastname, email, phone };

  const navigate = useNavigate();

  const { userid } = useParams();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/${userid}`).then(({ data }) => {
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setEmail(data.email);
      setPhone(data.phone);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateInput(userData);
    if (error) {
      setErrorMessage(error);
      return;
    }
    try {
      await axios
        .put(`${import.meta.env.VITE_BASE_URL}/${userid}`, userData)
        .then(() => {
          Swal.fire({
            title: "Details Updated Successfully",
            icon: "success",
          }).then(() => navigate("/"));
        });
    } catch {
      Swal.fire({
        title: "Failed To Update User",
        text: "Please Try again later...",
        icon: "error",
      });
    }
  };
  return (
    <div className="container form-container">
      <h3 className="fw-bold text-center text-light ">Edit User Details</h3>
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
              className="form-control"
              name="phone"
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
          <button className="btn btn-save btn-info m-1">Save</button>
          <Link to={"/"} className="btn btn-back btn-dark m-1">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditUserTable;
