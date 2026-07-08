import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Registration Successful");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card p-4 shadow">
        <h2 className="mb-4 text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <select
            className="form-select mb-3"
            name="role"
            onChange={handleChange}
          >
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>

          <button className="btn btn-success w-100">
            Register
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;