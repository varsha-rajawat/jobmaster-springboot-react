import { useState } from "react";
import {login, setToken} from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({username: '', password: ''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await login(form);
      setToken(res.data.token);
      navigate('/dashboard');
    }
    catch (err){
      setError(err);
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
