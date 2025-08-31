import { useEffect, useState } from "react";
import { api } from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const load = async () => setUsers((await api.get("/users")).data);

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post("/users", { name, email });
    setName("");
    setEmail("");
    load();
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Users</h2>
      <form onSubmit={add} style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button>Add</button>
      </form>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
