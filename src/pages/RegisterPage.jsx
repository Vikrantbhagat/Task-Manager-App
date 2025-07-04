import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import '../auth/Auth.css';
import '../auth/Auth.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card bg-white p-4">
        <h3 className="text-center mb-3 fw-bold">Create Account</h3>

        <form onSubmit={submit}>
          <div className="form-floating mb-3">
            <input
              id="reg-user"
              name="username"
              type="text"
              className="form-control"
              placeholder="johndoe"
              onChange={handle}
              required
            />
            <label htmlFor="reg-user">Username</label>
          </div>

          <div className="form-floating mb-4">
            <input
              id="reg-pass"
              name="password"
              type="password"
              className="form-control"
              placeholder="•••••••"
              onChange={handle}
              required
            />
            <label htmlFor="reg-pass">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2">Sign Up</button>
        </form>

        <p className="text-center mt-3 small">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}
