import { useState, useEffect } from 'react';
import './App.css';
import ShowPost from './features/ShowPost';
import {
  getAllPost,
  getAllPostWComment,
  getCommentAndReply,
  getInfo,
  postStatus,
} from './api/graphApi';

function App() {
  const [info, setInfo] = useState('');
  const [allPostWComment, setAllPostWComment] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [commentOfPost, setCommentOfPost] = useState({});
  const [postId, setPostId] = useState('');
  const [pageId, setPageId] = useState('');
  const [message, setMessage] = useState('');
  console.log('pageId', pageId);
  // console.log('postId', postId);
  console.log('allPostWComment', allPostWComment);

  // console.log('message', message);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const res = await getInfo();
    await handleGetAllPostWComment(res.data.id);
    setInfo(res.data);
    setPageId(res.data.id);
  };

  const handleGetAllPostWComment = async (pageId) => {
    try {
      const res = await getAllPostWComment(pageId);
      // console.log(res.data.data);
      setAllPostWComment(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkKeyword = (keyword) => {
    const matches = [];
    allPostWComment?.forEach((item, postIndex, postArr) => {
      item.comments?.data.forEach((comment, index, arr) => {
        if (comment.message.includes(keyword)) {
          matches.push({
            commentId: comment.id,
            postId: item.id,
            message: comment.message,
            from: comment.from,
            created_time: comment.created_time,
            url: comment.permalink_url,
          });
        }
      });
    });
    console.log(matches);
    setKeyword('');
    return matches;
  };

  const handleGetComment = async (postId) => {
    const res = await getCommentAndReply(postId);
    setCommentOfPost(res.data);
    // console.log(res.data);
    setPostId('');
  };
  const handlePostStatus = async (message) => {
    try {
      console.log(message, pageId);
      const res = await postStatus(pageId, message);
      console.log(res.data);
      setMessage('');
    } catch (err) {
      console.log(err.response?.data?.error?.message);
    }
  };

  return (
    <div className="p-8 bg-gray-700 h-full text-white">
      <div className="bg-slate-500  text-white text-center p-4 ">
        TEST GRAPH API
      </div>
      <div className="display:flex, flex-direction:row, gap:15px bg-slate-300 rounded-b p-2">
        {/* <button
          className="bg-teal-600 rounded px-2 m-2 p-1 text-white"
          onClick={handleGetAllPostWComment}
        >
          get all post w comment
        </button> */}

        <div className="text-black">
          Select keyword to find comment
          <input
            className="bg-white border-teal-600 border-solid border-2 rounded px-2 m-2 text-black"
            placeholder="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
          <button
            className="bg-teal-600 rounded px-2 m-2 p-1 text-white"
            onClick={() => checkKeyword(keyword)}
          >
            check
          </button>
        </div>
        {/* <div>
          get reply comment by comment id
          <input
            className="bg-white border-teal-600 border-solid border-2 rounded px-2 m-2"
            placeholder="select comment id"
          ></input>
          <button className="bg-teal-600 rounded px-2 m-2 p-1 text-white">
            get
          </button>
        </div> */}
        {/* <div>
          post a status
          <input
            className="bg-white border-teal-600 border-solid border-2 rounded px-2 m-2"
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button
            className="bg-teal-600 rounded px-2 m-2 p-1 text-white"
            type="button"
            onClick={() => handlePostStatus(message)}
          >
            post
          </button>
        </div> */}
      </div>
      <div>
        <ShowPost allPostWComment={allPostWComment} />
      </div>
    </div>
  );
}

export default App;
