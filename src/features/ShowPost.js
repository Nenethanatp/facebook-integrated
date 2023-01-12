import React from 'react';
import Post from './Post';

function ShowPost(props) {
  const { allPostWComment } = props;
  allPostWComment.sort((a, b) => (a.created_time > b.created_time ? -1 : 1));

  console.log(allPostWComment);
  return (
    <div className="bg-gray-700 h-full text-white mt-5">
      <div className="flex flex-col gap-3 ">
        {allPostWComment.map((item) => {
          return <Post key={item.id} post={item} />;
        })}
      </div>
    </div>
  );
}

export default ShowPost;
