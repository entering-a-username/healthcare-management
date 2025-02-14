import { useState, FormEvent } from 'react';

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [error, setError] = useState<string>("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      setError('');

      try {
          const res = await fetch('http://localhost:3030/login?q=doctor', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': "*",
            },
            credentials: "include",
          });
    
          const data = await res.json();
    
          if (data.error) {
            setError(data.errors);
          } else if (data.status === "success") {
            localStorage.setItem("doctorId", data.doctorId);
            window.location.href = `/doctor/${localStorage.getItem("doctorId")}`;
          }
        } catch (err) {
          console.error(err);
      };
    }

  return (
    <>
      <main className="login">
        <div>
          <form onSubmit={handleSubmit}>
              <h1>Login to your account</h1>

              <div className='label-input'>
                  <label htmlFor="email">Your email</label>
                  <input 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} type="text" name="email" placeholder="email" required={true} />
              </div>

              <div className='label-input'>
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} type="password" name="password" placeholder="••••••••" required={true} />
              </div>
              <div className="error">{error}</div>
              
              <button type="submit">Sign In</button>
          </form>
        </div>
      </main>
    </>
  )
}
