import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [fetchedData, setFetchedData] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      const res = await fetch(`http://localhost:3030/api/user/${id}`);
      const data = await res.json();

      setFetchedData(data);
      setIsLoading(false);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    setName(fetchedData.username);
    setEmail(fetchedData.email);
    setPhone(fetchedData.phone);
    setDOB(fetchedData.dateOfBirth);
    setGender(fetchedData.gender);
  }, [fetchedData]);

  const [edit, setEdit] = useState(false);

  async function submitData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", name);
    fd.append("email", email);
    fd.append("phone", phone);
    fd.append("gender", gender);
    fd.append("dateOfBirth", DOB);
    
    const res = await fetch(`http://localhost:3030/api/user/${localStorage.getItem("userId")}`, {
      method: "PUT",
      body: fd,
    });

    const data = await res.json();

    if (data.status === "success") {
      navigate(0);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <main className="account">

      {edit && 
        <>
        <h1>Edit User Information</h1>

        <form onSubmit={submitData}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input type="text" name='name' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input type="text" name='phone' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>
            <label htmlFor="gender">Your Gender</label>
            <select name="gender" id="" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="birth">Birth Date</label>
            <input type="date" name='birth' placeholder='Birth Date' value={DOB} onChange={(e) => setDOB(e.target.value)} />
          </div>

          <button type="submit">Edit</button>
          
        </form>
        </>
      }

      {!edit && <div className="info">
        <div>
          <h1>{fetchedData.username}</h1>

          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
        <hr />

        <div>
          <div>
            <span>Gender: {fetchedData.gender}</span>
            <span>Birthday: {fetchedData.dateOfBirth}</span>
          </div>
          <div>
            <h3>Contact Information</h3>
            <span>Email: {fetchedData.email}</span>
            <span>Phone: {fetchedData.phone}</span>
          </div>
        </div>

      </div> }

    </main>
  )
}
