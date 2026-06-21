import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { api } from '../lib/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token);
      navigate('/');
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black border border-red-900 rounded-sm p-8">
        <h1 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Login</h1>
        
        {error && (
          <div className="bg-red-950 text-red-500 p-3 mb-4 rounded-sm border border-red-900 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-sm focus:outline-none focus:border-red-900 transition-colors"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-sm focus:outline-none focus:border-red-900 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-800 text-white font-bold p-3 rounded-sm transition-colors uppercase tracking-widest mt-4"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
