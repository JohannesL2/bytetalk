import React, { useState, useEffect } from "react";

const InviteUser = ({selectedId}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  )

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    

    const fetchUsers = async () => {
    try {
      const res = await fetch("https://chatify-api.up.railway.app/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Kunde inte hämta användare:", err);
    } finally {
        setLoading(false);
      }
  }
    fetchUsers();
}, [token]);

  const sendInvite = async (userId) => {
    if (!selectedId) {
  alert("Välj först en konversation innan du skickar invite!");
  return;
}

    const token = localStorage.getItem("jwt");
    if (!token) return;
    console.log('INVITE', selectedId)

    try {
      const res = await fetch(`https://chatify-api.up.railway.app/invite/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ conversationId: String(selectedId) }),
    })
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Misslyckades med att skicka inbjudan")
    }

    alert("Inbjudan skickad!")
  } catch (err) {
    console.error("Send invite error:", err);
    alert("Kunde inte skicka inbjudan: " + err.message);
    console.log(selectedId)
  }
}


  if (loading) return <p>Laddar användare...</p>;
  if (!token) return <p>Logga in för att se användare.</p>;
  if (users.length === 0) return <p>Inga användare hittades.</p>;

  return (
    <div>
      <h2>Välj användare att invitea:</h2>

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-2 p-3 rounded-lg border-2 border-blue-400 bg-blue-50 text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg transition duration-300 hover:scale-105 hover:text-3xl"
      />

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} className="flex justify-between items-center p-2 border-b">
            <span>{user.username}</span>
            <button
              onClick={() => sendInvite(user.userId)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Skicka Invite
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InviteUser