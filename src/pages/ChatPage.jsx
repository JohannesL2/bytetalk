import React, {useState, useEffect} from 'react'
import Drawer from '../components/Drawer';
import Footer from '../components/Footer';
import ProfileModal from '../components/ProfileModal';
import { jwtDecode } from "jwt-decode";
import ChatList from '../components/ChatList';
import MessageInput from '../components/MessageInput';
import InviteUser from '../components/InviteUser';
import ProfileCard from '../components/ProfileCard';

const ChatPage = () => {
  const [avatar, setAvatar] = useState('');
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(null)
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshMessages, setRefreshMessages] = useState(0);

  const [messageText, setMessageText] = useState('');

  //Invite useStates
  const [inviteUsername, setInviteUsername] = useState('');
  const [inviteStatus, setInviteStatus] = useState(null);

  const [invites, setInvites] = useState([]);

  const handleNewConversation = (newId) => {
  setConversations((prev) => [...prev, newId]);  // lägg till i listan
  setSelectedId(newId);                          // välj direkt
};

  

useEffect(() => {
  const token = localStorage.getItem("jwt");
   if (!token) return;

  const decoded = jwtDecode(token)
          console.log(decoded);
          setUserId(decoded.id)
  const fetchUser = async () => {
    try {
  const response = await fetch(
  `https://chatify-api.up.railway.app/users/${decoded.id}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
);
const data = await response.json();
console.log(data)
setUser(data[0].username.charAt(0).toUpperCase() + data[0].username.slice(1));
setAvatar(data[0].avatar || "");
console.log(avatar)
} catch (err) {
  console.error('Kunde inte hämta användaren', err);
    }
}
 fetchUser();
}, [])

  return (
    <div className='bg-white min-h-screen text-gray-900 rounded-3xl'>
      <ProfileModal avatar={avatar} setAvatar={setAvatar}/>
      <Drawer/>
      <ProfileCard avatar={avatar} user={user}/>

      <ChatList 
        conversations={conversations}
        setConversations={setConversations}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refreshMessages={refreshMessages}
/>
<MessageInput
  conversationId={selectedId}
  onNewConversation={(newConvId) => {
  setConversations((prev) => {
    if (prev.some(c => c.id === newConvId)) return prev;
    return [...prev, { id: newConvId, status: "Participating" }];
  });
  setSelectedId(newConvId);
}}
/>

      <InviteUser selectedId={selectedId}/>
      <Footer/>
    </div>
  );
}
export default ChatPage;