import React, { useEffect, useState } from 'react';
import { initFlowbite } from 'flowbite';
import { jwtDecode } from "jwt-decode";
import { FaUpload } from "react-icons/fa";

const ProfileModal = ({avatar, setAvatar}) => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    initFlowbite(); // Behövs för att data-modal-toggle ska funka
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!selectedImage) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    setAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage])

  const handleAvatar = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
  } else {
    const url = e.target.value;
    setAvatar(url);
    setPreview(url);
  }
}

// useEffect(() => {
//   fetch('http://localhost:3000/me', {
//     credentials: 'include'
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data && data.user && data.user.id) {
//       setUserId(data.user.id);
//     }
//   })
//   .catch(err => console.error('Failed to fetch user info', err));
// }, []);

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");
          if (!token) {
      alert("Ingen token hittad");
      return;
    }

        const decoded = jwtDecode(token)
        const userIdFromToken = decoded.id;

        console.log("Decoded JWT:", decoded);
    console.log("User ID:", userIdFromToken);
      console.log("JWT token:", token);
      const response = await fetch(
  'https://chatify-api.up.railway.app/user',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      userId: userIdFromToken,
      updatedData: { avatar: preview, username: username, email: email}
    })
  }
);
    const data = await response.json();
    console.log("Avatar updated:", data);
    alert("Profile updated");
} catch (err) {
    console.error("Failed to update avatar", err);
  }
};

const deleteUser = async () => {
  if (!window.confirm("Are you sure you want to delete your account?")) {
    return;
  }

  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("No token found");
      return;
    }

    const decoded = jwtDecode(token);
    const userIdFromToken = decoded.id;

    const response = await fetch(`https://chatify-api.up.railway.app/users/${userIdFromToken}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });

    if (!response.ok) {
      throw new Error("Could not remove user.")
    }

    alert("User removed from bytechat")
    localStorage.removeItem("jwt");
    window.location.href = "/";
  } catch (err) {
    console.error("Failed to delete user", err);
    alert("Something went wrong when trying to delete user.")
  }
}

  return (
    <>
      {/* Toggle-knappen kan ligga i Drawer.jsx istället */}
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm bg-black/30"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                My profile
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 py-8 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Change avatar here
              </p>
              {preview ? (
                <>
                <img src={preview} alt="Preview" className='size-24 rounded-full object-cover'/>
                </>
              ) : (
                <div className='size-24 rounded-full bg-gray-200 flex items-center justify-center'>
                  <img src={avatar} alt="Preview" className='size-24 rounded-full object-cover'/>
                </div>
              )}
          <div className=' items-center flex justify-center gap-5'>
              <input type="file" id="avatarUpload" accept='image/*' onChange={handleAvatar} className='hidden'/>
              <input type="text" placeholder='Image URL' className='border-2 border-gray-500 rounded-2xl p-2 animate-pulse' onChange={handleAvatar}/>
              <label 
  htmlFor="avatarUpload" 
  className="cursor-pointer"
>
  <FaUpload size={30} className='hover:text-gray-700 cursor-pointer'/>
</label>
</div>

            </div>

            {/*ändring av Username & Email*/}
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full border-2 border-gray-500 rounded-2xl p-2'
          />

          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border-2 border-gray-500 rounded-2xl p-2'
          />

              <button onClick={saveProfile} className='text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'>Save profile</button>

              <button
  onClick={deleteUser}
  className="w-full text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer mt-10"
>
  Delete account
</button>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
