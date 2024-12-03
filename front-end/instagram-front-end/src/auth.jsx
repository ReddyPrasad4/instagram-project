import axios from "axios";

let BASE_URL = "http://localhost:8080";


export const login = async(requestData)=>{
     const response = await axios.post(`${BASE_URL}/api/user/login`,requestData);
     return response;
}
export const registration = async(requestData)=>{
     const response = await axios.post(`${BASE_URL}/api/user/register`,requestData);
     return response;
}

export const getMathcedUsers = async(userName)=>{
     let response = await axios.get(`${BASE_URL}/api/user/get-matched-user/${userName}`);
     return response;
}
export const getUserByName = async(userName)=>{
     let response = await axios.get(`${BASE_URL}/api/user/get-by-user-name/${userName}`);
     return response;
}
export const updateUser = async(requestData)=>{
     let response = await axios.put(`${BASE_URL}/api/user/update-user`,requestData);
     return response;
}
export const deleteUser = async(userName)=>{
     let response = await axios.delete(`${BASE_URL}/api/user/delete-by-user-name/${userName}`);
     return response;
}




export const addPost = async(userName,requestData)=>{
     const response = await axios.post(`${BASE_URL}/api/post/save-post/${userName}`,requestData,);
     return response;
}
export const updatePost = async(requestData)=>{
     const response = await axios.put(`${BASE_URL}/api/post/update-post`,requestData);
     return response;
}
export const deletePost = async(postId)=>{
     const response = await axios.delete(`${BASE_URL}/api/post/delete-post/${postId}`);
     return response;
}
export const getPostById = async(postId)=>{
     const response = await axios.get(`${BASE_URL}/api/post/get-post-by-id/${postId}`);
     return response;
}
export const getAllPosts = async()=>{
     const response = await axios.get(`${BASE_URL}/api/post/get-all-posts`);
     return response;
}
export const getAllPostsByUserName = async(userName)=>{
     const response = await axios.get(`${BASE_URL}/api/post/get-all-posts-by-user-name/${userName}`);
     return response;
}



export const addLike = async(userName , requestData)=>{
     const response = await axios.post(`${BASE_URL}/api/likes/save-like/${userName}`,requestData);
     return response;
}
export const updateLike = async(requestData)=>{
     const response = await axios.put(`${BASE_URL}/api/likes/update-like`,requestData);
     return response;
}
export const getUserLikes = async(userName)=>{
     const response = await axios.get(`${BASE_URL}/api/likes/get-user-likes/${userName}`);
     return response;
}
export const getAllLikesOfAPost = async(postId)=>{
     const response = await axios.get(`${BASE_URL}/api/likes/get-all-likes-by-post-id/${postId}`);
     return response;
}



export const addComment = async(userName , requestData)=>{
     const response = await axios.post(`${BASE_URL}/api/comment/save-comment/${userName}`,requestData);
     return response;
}
export const updateComment = async( requestData)=>{
     const response = await axios.put(`${BASE_URL}/api/comment/update-comment`,requestData);
     return response;
}
export const deleteComment = async( commentId)=>{
     const response = await axios.delete(`${BASE_URL}/api/comment/delete-comment/${commentId}`);
     return response;
}
export const getAllCommentsOfAPost = async(postId)=>{
     const response = await axios.get(`${BASE_URL}/api/comment/get-all-comments-by-post-id/${postId}`);
     return response;
}

