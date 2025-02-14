import { useState, FormEvent } from 'react';

export default function Signup() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [confirmError, setConfirmError] = useState<string>("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError('');

        if (password !== confirmPassword) {
            setConfirmError("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch('http://localhost:3030/signup', {
              method: 'POST',
              body: JSON.stringify({ username, email, password }),
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
              },
              credentials: "include",
            });
      
            const data = await res.json();
      
            if (data.error) {
              setError(data.error);
            } else if (data.status === "success") {
              window.location.href = '/login';
            }
          } catch (err) {
            console.log(err);
        };
    }

  return (
    <>
        <main className="signup">
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Create an account</h1>

                    <div className='label-input'>
                        <label htmlFor="username">Your username</label>
                       
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username} type="text" name="username" placeholder="username" required={true} />
                    </div>

                    <div className='label-input'>
                        <label htmlFor="email">Your email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} type="email" name="email" placeholder="name@company.com" required={true} />
                    </div>

                    <div className='label-input'>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} type="password" name="password" placeholder="••••••••" required={true} />
                    </div>

                    <div className='label-input'>
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword} type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" required={true} />
                    </div>
                    <div className="error">{confirmError || error}</div>

                    <button type="submit">Signup</button>
                    <p>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </main>
    </>
  )
}