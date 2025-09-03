import { useEffect, useState } from "react";

const ChatList = ({conversations, setConversations, selectedId, setSelectedId, refreshMessages}) => {
    const [invitesReceived, setInvitesReceived] = useState([]);
    const [invitesSent, setInvitesSent] = useState([]);
    const [participating, setParticipating] = useState([]);
    const [messages, setMessages] = useState([]);


useEffect(() => {
  const token = localStorage.getItem("jwt");
   if (!token) return;

  fetch('https://chatify-api.up.railway.app/conversations',   {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then((res) => res.json())
    .then((data) => {
    const allConversations = [
      ...(Array.isArray(data.participating) ? data.participating.map(id => ({ id, status: 'Participating' })) : []),
      ...(Array.isArray(data.invitesReceived) ? data.invitesReceived.map(id => ({ id, status: 'Invite Received' })) : []),
      ...(Array.isArray(data.invitesSent) ? data.invitesSent.map(id => ({ id, status: 'Invite Sent' })) : [])
    ];

      console.log("API response:", data);
       setConversations(allConversations);
       setInvitesReceived(Array.isArray(data.invitesReceived) ? data.invitesReceived : []);
      setInvitesSent(Array.isArray(data.invitesSent) ? data.invitesSent : []);
      setParticipating(Array.isArray(data.participating) ? data.participating : []);
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);

useEffect(() => {
  if (!selectedId && conversations.length > 0) {
    setSelectedId(conversations[0].id);
  }
}, [conversations, selectedId]);

useEffect(() => {
  setMessages([]);

  if (!selectedId) {
    setMessages([]);
    return;
  }

  const token = localStorage.getItem("jwt");
  if (!token) return;

  const fetchMessages = async () => {
    try {
      let msgs = await fetch(`https://chatify-api.up.railway.app/messages?conversationId=${selectedId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
  }
}).then(res => res.json());

if (!Array.isArray(msgs)) msgs = [];

const uniqueUserIds = [...new Set(msgs.map(msg => msg.userId))]
const usersMap = {};

await Promise.all(uniqueUserIds.map(async (id) => {
  const res = await fetch(`https://chatify-api.up.railway.app/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  usersMap[id] = Array.isArray(data) ? data[0]?.username || "Unknown" : data.username || "Unknown";
}))

const messageWithUsernames = msgs.map(msg => ({
  ...msg,
  username: usersMap[msg.userId] || "Unknown"
}));

  setMessages(messageWithUsernames);
} catch (err) {
  console.error("Fetch messages error:", err)
  }
}
fetchMessages();
}, [selectedId, refreshMessages])


//Ta bort meddelanden
const handleDelete = async (messageId) => {
  const token = localStorage.getItem("jwt");
  if (!token) return;

  try {
    const res = await fetch(
      `https://chatify-api.up.railway.app/messages/${messageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
  }
})

if (!res.ok) {
  throw new Error("Misslyckades med att ta bort meddelandet");
}

setMessages((prev) => prev.filter((msg) => msg.id !== messageId))

console.log("Meddelande raderat:", messageId);
  } catch (err) {
    console.error(err)
    }
  };


  return (
    <div>
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conv) => (
  <li
    key={conv.id}
    onClick={() => setSelectedId(conv.id)}
    className={`cursor-pointer p-2 rounded ${selectedId === conv.id ? "bg-blue-200" : "hover:bg-gray-100"}`}
  >
    {`Conversation ${conv.id} (${conv.status})`}
  </li>
))}
      </ul>

      <h2>Messages</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id} className="p-2 border-b">
            <span>
            <strong>{msg.username}:</strong> {msg.text}
            </span>
            <button
              onClick={() => handleDelete(msg.id)}
              className="text-red-500 hover:text-red-700 font-bold ml-2"
            >✕</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default ChatList