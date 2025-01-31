const validateInput = ({ firstname, lastname, email, phone }) => {
  const nameRegex = /^[A-Za-z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!nameRegex.test(firstname)) return "Enter valid first name";
  if (!nameRegex.test(lastname)) return "Enter valid last name";
  if (!phoneRegex.test(phone)) return "Enter 10 digit number";
  if (!emailRegex.test(email)) return "Enter valid email address";

  return null;
};

export default validateInput;
