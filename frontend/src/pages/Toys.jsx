import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/toys.css";

export default function Toys() {
  const [toys, setToys] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    condition: "good",
    description: "",
    owner: "",
  });

  useEffect(() => {
    loadToys();
    loadUsers();
  }, []);

  const loadToys = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/toys");
      setToys(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/toys", form);
      setToys([res.data, ...toys]);
      setForm({ name: "", condition: "good", description: "", owner: "" });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/toys/${id}`);
      setToys(toys.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="page with-navbar">
      <div className="wrap">
        <h1>🎉 Toy Exchange!</h1>

        <form className="toy-form" onSubmit={handleSubmit}>
          <h2>🧸 Add a New Toy</h2>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Toy name"
            required
          />
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
          >
            <option value="new">New 🟢</option>
            <option value="good">Good 🔵</option>
            <option value="fair">Fair 🟠</option>
            <option value="worn">Worn 🔴</option>
          </select>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <select
            name="owner"
            value={form.owner}
            onChange={handleChange}
            required
          >
            <option value="">Select owner 👤</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
          <button type="submit">➕ Add Toy</button>
        </form>

        <div className="toy-list">
          {toys.map((toy) => (
            <article key={toy._id} className="toy-card">
              <header className="toy-head">
                <h3>{toy.name}</h3>
                <span className={`badge ${toy.condition}`}>
                  {toy.condition}
                </span>
              </header>

              <p className="owner">
                <strong>Owner:</strong> {toy.owner?.name || "Unknown"}
              </p>
              <p className="desc">{toy.description}</p>

              <div className="card-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(toy._id)}
                >
                  ❌ Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
