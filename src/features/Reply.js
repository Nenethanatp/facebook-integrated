import React, { useState } from 'react';
import { createReply } from '../api/graphApi';

function Reply({ item, getReply }) {
  const [toggle, setToggle] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  console.log(newMessage);
  const handleSubmit = async () => {
    if (!newMessage.trim()) {
      setNewMessage('');
      return;
    }
    console.log('id', item.id);
    console.log('newMessage', newMessage);
    const res = await createReply(String(item.id), newMessage);
    console.log(res);
    setNewMessage('');
    await getReply(item.id);
  };
  return (
    <div className="my-3 p-2 px-5 rounded bg-slate-300 text-black">
      <div>
        <div>Name: {item.from.name}</div>
        <div>Message: {item.message}</div>
        <div className="flex mt-1">
          <div
            className="text-blue-600 mr-2"
            onClick={() => {
              setToggle((toggle) => !toggle);
            }}
          >
            reply
          </div>
          {toggle && (
            <div className="flex">
              <input
                className="pl-1"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
              />
              <div className="bg-gray-500 px-1" onClick={handleSubmit}>
                <i className="fa-solid fa-paper-plane text-gray-100 h-5"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reply;
