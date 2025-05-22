import { useState, useContext} from "react";
import {loginUser} from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({username: '', password: ''});
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{
      const res = await loginUser(form);
      login(res.data.userId, res.data?.token);
    }
    catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      // Display backend error message
      setError(err.response.data.message);
    } else {
      setError('Login failed. Please try again.');
    }
  }
  };

  return(
    <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
