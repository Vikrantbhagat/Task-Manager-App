import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import '../auth/Auth.css';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card bg-white p-4">
        <h3 className="text-center mb-3 fw-bold">Welcome Back</h3>

        <form onSubmit={submit}>
          <div className="form-floating mb-3">
            <input
              id="log-user"
              name="username"
              type="text"
              className="form-control"
              placeholder="johndoe"
              onChange={handle}
              required
            />
            <label htmlFor="log-user">Username</label>
          </div>

          <div className="form-floating mb-4">
            <input
              id="log-pass"
              name="password"
              type="password"
              className="form-control"
              placeholder="•••••••"
              onChange={handle}
              required
            />
            <label htmlFor="log-pass">Password</label>
          </div>

          <button className="btn btn-success w-100 py-2">Login</button>
        </form>

        <p className="text-center mt-3 small">
          No account? <Link to="/register">First Create Account</Link>
        </p>
      </div>
    </div>
  );
}
