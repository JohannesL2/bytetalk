import {useState} from 'react';
import EmojiPicker, { Emoji } from "emoji-picker-react";

export default function MessageInput({conversationId, onNewConversation, onMessageSent}) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiPicker = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleSend = async (convIdParam) => {
    if (!message.trim()) return;
    
    const convId = convIdParam || conversationId || crypto.randomUUID();
    
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch("https://chatify-api.up.railway.app/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          text: message,
          conversationId: convId,
        }),
      });

      if (!res.ok) {
        throw new Error("Något gick fel vid skickandet av meddelandet.");
      }

      const data = await res.json();

if ((!conversationId || convIdParam) && onNewConversation) {
  onNewConversation(convId);
}

if (onMessageSent) {
  onMessageSent();
}

      console.log("Meddelande skickat:", data);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  }

  const startNewConversation =  async () => {
  if (!message.trim()) return;
  const newConvId = crypto.randomUUID();
  await handleSend(newConvId);
};


  return (
    <div>
      <button 
      onClick={startNewConversation}
      disabled={!message.trim()}
       className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
        New conversation
      </button>

      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Skriv något...'
      className="flex-1 p-2 rounded-2xl p-4 outline-none bg-gray-200 focus:bg-gray-100"/>

      <button onClick={() => setShowEmoji((val) => !val)}className={`text-xl p-4 rounded-2xl transition ${
            showEmoji
              ? "bg-red-100 text-red-500 animate-pulse"
              : "hover:bg-gray-100 text-gray-600"
          }`}>😀</button>
      
      <button
        onClick={() => handleSend(conversationId)}
        className="p-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        Send
      </button>


      {showEmoji && (
        <div className='absolute bottom-12 right-4 z-50'>
          <EmojiPicker onEmojiClick={handleEmojiPicker}/>
          </div>
      )}
    </div>
  )
}