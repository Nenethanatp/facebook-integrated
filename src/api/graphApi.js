import axios from '../config/axios';
import { ACCESS_TOKEN } from '../config/constant';

export const getInfo = () => {
  return axios.get('/me', {
    params: {
      fields: 'name,category,followers_count',
      access_token: ACCESS_TOKEN,
    },
  });
};
export const getAllPost = (pageId) => {
  return axios.get(`/${pageId}/feed`, {
    params: {
      fields:
        'id,message,message_tags,created_time,full_picture,is_popular,permalink_url',
      access_token: ACCESS_TOKEN,
    },
  });
};

export const getAllPostWComment = (pageId) => {
  return axios.get(`/${pageId}/feed`, {
    params: {
      fields:
        'id,message,message_tags,permalink_url,created_time,full_pictire,likes,comments{id,from,attachment,message,message_tags,comment_count,created_time,can_comment,permalink_url}',
      access_token: ACCESS_TOKEN,
    },
  });
};

export const getCommentAndReply = (postId) => {
  return axios.get(`/${postId}/comments`, {
    params: {
      fields:
        'id,message,attachment,created_time,comments{id,from,message,message_tags,attachment,comment_count,created_time,permalink_url,can_comment}',
      summary: 1,
      access_token: ACCESS_TOKEN,
    },
  });
};

export const postStatus = (pageId, message) => {
  console.log(pageId, message);
  return axios.post(`/${pageId}/feed`, {
    params: {
      message,
      access_token: ACCESS_TOKEN,
    },
  });
};
