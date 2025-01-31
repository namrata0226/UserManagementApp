import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTable from "./components/UserTable";
import CreateUserTable from "./components/CreateUserTable";
import EditUserTable from "./components/EditUserTable";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTable />}></Route>
        <Route path="/user/create" element={<CreateUserTable />}></Route>
        <Route path="/edit/:userid" element={<EditUserTable />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
