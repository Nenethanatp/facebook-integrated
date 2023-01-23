import React, { useState } from 'react';
import dateFormat from 'dateformat';
import { createReply, getReplyByCommentId } from '../api/graphApi';
import Reply from './Reply';

function Comment({ item }) {
  const [replies, setReplies] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [newMessage, setNewMessage] = useState('');
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

  const getReply = async (commentId) => {
    console.log(commentId);
    console.log('do getReply');
    const res = await getReplyByCommentId(commentId);
    setReplies(res.data.data);
    setToggle((toggle) => !toggle);
  };

  return (
    <div
      key={item.id}
      className="bg-slate-200 rounded p-2 text-black flex flex-row justify-between items-center"
    >
      <div>
        <div key={item.from.id}>Name: {item.from.name} </div>
        <div className="flex gap-5">
          <div>Message: {item.message} </div>
          <div>{dateFormat(item.created_time, 'mmm d, yyyy HH:MM')}</div>
        </div>
        <div className="flex space-x-3">
          <div>Reply: {item.comment_count} </div>
          {Boolean(item.comment_count) && (
            <button
              value={item.id}
              onClick={(e) => {
                getReply(e.currentTarget.value);
              }}
            >
              <i className="fa-solid fa-circle-chevron-down text-gray-500"></i>
            </button>
          )}
          {/* map reply */}
        </div>
        {toggle &&
          replies?.map((reply) => {
            return (
              <div key={reply.id} className="bg-white">
                <Reply item={reply} getReply={getReply} />
              </div>
            );
          })}
        {/* add input here */}

        <div className="flex mt-2">
          <div className="text-blue-500 mr-2">reply</div>
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
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <a
          className="bg-teal-600 rounded px-2  p-2 h-full text-white"
          href={item.permalink_url}
        >
          Link to Comment
        </a>
      </div>
    </div>
  );
}

export default Comment;
