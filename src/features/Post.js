import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import { getReplyByCommentId } from '../api/graphApi';
import Reply from './Reply';
// import { useNavigate } from 'react-router-dom';

function Post(props) {
  const { post } = props;
  const [countComment, setCountComment] = useState('');
  const [date, setDate] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [replies, setReplies] = useState([]);
  //   console.log(openDetail);
  //   console.log(post.comments?.data);
  console.log(replies);
  useEffect(() => {
    setCountComment(countCommentFn(post));
    setDate(dateFormat(post.created_time, 'mmm d, yyyy HH:MM'));
  }, []);

  const countCommentFn = (post) => {
    let count = 0;
    if (post.comments?.data.length) {
      count = post.comments?.data.length;
    }
    return count;
  };

  const handleShowDetail = (e) => {
    setOpenDetail(true);
  };

  const getReply = async (commentId) => {
    console.log(commentId);
    const res = await getReplyByCommentId(commentId);
    setReplies(res.data.data);
  };

  return (
    <div>
      {!openDetail ? (
        <div
          className="p-2 px-5 rounded bg-white text-black flex items-center justify-between"
          value={post.id}
          onClick={handleShowDetail}
        >
          <div>
            <div className="flex gap-5">
              <div>{post.message}</div>
              <div>{date}</div>
            </div>
            <div>Comment: {countComment}</div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <a
              className="bg-teal-600 rounded px-2  p-2 h-full text-white"
              href={post.permalink_url}
            >
              Link to post
            </a>
          </div>
        </div>
      ) : (
        <div
          className="p-2 px-5 rounded bg-white text-black flex flex-row justify-between items-center "
          value={post.id}
        >
          <div className="flex flex-col w-full">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-5">
                <div>{post.message}</div>
                <div>{date}</div>
              </div>
              <div onClick={() => setOpenDetail(false)}>
                <i className="fa-solid fa-circle-xmark text-lg text-gray-500" />
              </div>
            </div>
            <div>
              {post.comments ? (
                <div className="flex flex-col gap-2 w-full">
                  {post.comments?.data?.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="bg-slate-200 rounded p-2 text-black flex flex-row justify-between items-center"
                      >
                        <div>
                          <div key={item.from.id}>{item.from.name} </div>
                          <div className="flex gap-5">
                            <div>{item.message} </div>
                            <div>
                              {dateFormat(
                                item.created_time,
                                'mmm d, yyyy HH:MM'
                              )}
                            </div>
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
                            {/* {replies?.map((reply) => {
                              return (
                                <div key={reply.id} className="bg-white">
                                  <Reply />
                                </div>
                              );
                            })} */}
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
                  })}
                </div>
              ) : (
                <div className="text-red-400">No comment</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
