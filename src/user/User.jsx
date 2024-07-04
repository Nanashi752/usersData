import React, { useEffect, useState } from "react";
import axios from "axios";
import 'tailwindcss/tailwind.css';

function User() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://602e7c2c4410730017c50b9d.mockapi.io/users`
      );
      const data = res.data;
      setUserData(data);
      setLoading(false);
      setErrors(null);
    } catch (error) {
      console.log(error);
      setErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center text-3xl h-screen">Loading...</div>;
  }

  if (errors) {
    return <div className="flex justify-center items-center text-3xl h-screen">Something went wrong: {errors.message}</div>;
  }

  const selectedUser = userData.find(user => user.id === selectedUserId);

  return (
    <div className="flex flex-col lg:flex-row justify-between text-white py-10 px-20 border-2 rounded-xl bg-black shadow-lg">
      <div className="w-full lg:w-1/3 bg-zinc-800 p-4 rounded-xl shadow-md">
        {userData.map((item) => (
          <div key={item.id} onClick={() => setSelectedUserId(item.id)} className="cursor-pointer bg-black p-2 hover:bg-yellow-500 transition duration-200 ease-in-out rounded-lg flex items-center space-x-4 mb-4">
            <img src={item.avatar} alt={`name ${item.profile.firstName}`} className="w-12 h-12 rounded-full border-2 border-yellow-500" />
            <div className="text-lg font-medium text-white">{item.profile.username}</div>
          </div>
        ))}
      </div>
      <div className="w-full lg:w-2/3 flex justify-center items-center h-screen sticky top-0">
        {selectedUser && (
          <div className="bg-black p-8 border-2 rounded-xl shadow-md w-full max-w-xl">
            <div className="flex items-center space-x-4 mb-6">
              <img src={selectedUser.avatar} alt={`name ${selectedUser.profile.firstName}`} className="w-24 h-24 rounded-full border-4 border-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-white">{selectedUser.profile.firstName} {selectedUser.profile.lastName}</div>
                <div className="text-white">{selectedUser.profile.email}</div>
                <div className="text-yellow-500">{selectedUser.jobTitle}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-lg text-white">{selectedUser.Bio}</div>
              <div className="text-white mt-2">{new Date(selectedUser.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
