"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      router.push("/dashboard");
    } else {
      alert("Preencha email e senha (qualquer valor funciona no mock).");
    }
  };

  const handleGoogle = () => {
    alert("Mock: login com Google");
  };

  const handleGithub = () => {
    alert("Mock: login com GitHub");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
        />
        <h2 className="login-title">Sign in to your account</h2>

        <form onSubmit={handleLogin}>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>

          <div className="form-field">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <label htmlFor="password">Password</label>
              <div className="small"><a href="#" className="muted">Forgot password?</a></div>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>

          <div className="form-field">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </form>

        <div className="divider">
          <div className="line" />
          <div className="label">Ou entrar com</div>
          <div className="line" />
        </div>

        <div style={{display:'flex',gap:12}}>
          <button onClick={handleGoogle} type="button" className="btn btn-secondary" style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="12" fill="#4285F4" />
              <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">G</text>
            </svg>
            <span>Google</span>
          </button>

          <button onClick={handleGithub} type="button" className="btn btn-secondary" style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8,background:'#111827',color:'#fff'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.55-3.88-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.73 1.26 3.4.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.28 1.2-3.09-.12-.29-.52-1.46.12-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.75.81 1.2 1.83 1.2 3.09 0 4.43-2.71 5.41-5.29 5.69.41.36.77 1.07.77 2.16 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.8.55A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        <p className="small" style={{marginTop:18,textAlign:'center',color:'#6b7280'}}>
          Not a member?{' '}
          <a href="#" style={{color:'var(--accent)',fontWeight:600}}>Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  );
}
