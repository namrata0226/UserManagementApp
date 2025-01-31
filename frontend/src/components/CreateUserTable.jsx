import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateUserTable = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const userData = { firstname, lastname, email, phone };
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!nameRegex.test(firstname)) return "Invalid First Name";
    if (!nameRegex.test(lastname)) return "Invalid Last Name";
    if (!phoneRegex.test(phone)) return "Invalid Phone Number";
    if (!emailRegex.test(email)) return "Invalid Email Address";

    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }
    try {
      await axios.post("http://localhost:3000/add", userData);
      navigate("/");
    } catch (err){
      setErrorMessage("Failed to create user. Please try again.",err);
    }
  };

  return (
    <div className="container">
      <h1>Add new user</h1>
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
        <br />

        <button className="btn btn-save btn-primary m-2">Save</button>
        <Link to={"/"} className="btn btn-back btn-dark">
          Back
        </Link>
      </form>
    </div>
  );
};

export default CreateUserTable;
