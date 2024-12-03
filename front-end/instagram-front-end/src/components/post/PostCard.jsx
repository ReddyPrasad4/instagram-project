import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faHeart as faSolidHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import Comments from '../home/Comments';
import LikedUsers from '../home/LikedUsers';
import { addLike, deletePost, getAllCommentsOfAPost, getAllLikesOfAPost, updateLike } from '../../auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, isPostLiked, posts, setIsChanged, currentUserName }) => {

    const [comments, setComments] = useState([]);
    const [activePostIdForComments, setActivePostIdForComments] = useState(null);
    const [activePostIdForLikes, setActivePostIdForLikes] = useState(null);
    const [likedUsers, setLikedUsers] = useState([]);
    const navigate = useNavigate();
    const [postDeleteMessage, setPostDeleteMessage] = useState()
    let userName = localStorage.getItem("userName");

    let handleLike = (postId) => {

        let likeObject = {};
        const liked = posts.find(post => post.id === postId && post.likesDTOList.find((like) => like.userDto.userName === userName));
        // console.log(liked);
        if (liked) {
            let post = posts.find(post => post.id === postId);
            let like = post.likesDTOList.filter((like) => like.userDto.userName === userName);
            // console.log(like);

            likeObject = {
                id: like[0].id,
            }

            let handleUpdateLike = async () => {

                try {
                    let response = await updateLike(likeObject)
                    console.log(response);
                    setIsChanged(pre => !pre)
                }
                catch (error) {
                    console.error(error);
                }
            }
            handleUpdateLike()
        }
        else {

            likeObject = {
                postDto: {
                    id: postId
                }
            }
            let handleAddLike = async () => {

                try {
                    let response = await addLike(userName, likeObject);
                    console.log(response);
                    setIsChanged((pre) => !pre)
                }
                catch (error) {
                    console.error(error);

                }
            }
            handleAddLike()
        }
    }

    let handleViewLikedUsers = async (postId) => {
        setActivePostIdForComments(null)
        if (activePostIdForLikes === postId) {
            setActivePostIdForLikes(null);
            return;
        }
        try {
            let response = await getAllLikesOfAPost(postId);
            console.log(response);
            setLikedUsers(response.data)
        }
        catch (error) {
            console.error(error)
            setLikedUsers([])
        }
        finally {
            setActivePostIdForLikes(postId);
        }
    }
    const handleComments = async (postId) => {
        setActivePostIdForLikes(null)
        if (activePostIdForComments === postId) {
            setActivePostIdForComments(null);
            return;
        }
        try {
            const response = await getAllCommentsOfAPost(postId);
            console.log(response.data);
            setComments(response.data);
            setIsChanged(pre => !pre)

        } catch (error) {
            console.error(error);
            setComments([])
        }
        finally {
            setActivePostIdForComments(postId);
        }
    };
    function handleUpdate(postId) {
        navigate("/updatePost", {
            state: {
                postId: postId
            }
        })
    }
    let handleDeletePost = async (postId) => {
        try {
            let response = deletePost(postId)
            console.log(response);
            setPostDeleteMessage("Post Sucessfully deleted")
            setTimeout(() => {
                setIsChanged((pre) => !pre)
            }, 1000)
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="flex items-center justify-between mb-2">
                <h1 className="font-bold cursor-pointer text-pink-700 hover:underline hover:text-red-500"
                    onClick={() => navigate('/userPosts', { state: { userName: post.userDto.userName } })}>
                    {post.userDto.userName}
                </h1>

                {currentUserName === userName &&

                    <ul className="flex gap-x-4 rounded-lg text-gray-800 ">
                        <FontAwesomeIcon icon={faEdit} className='hover:text-red-500 text-xl' title='Update post'
                            onClick={() => handleUpdate(post.id)} />

                        <FontAwesomeIcon icon={faTrash} className='hover:text-red-500 text-xl' title='Delete post'
                            onClick={() => handleDeletePost(post.id)} />


                  
                    </ul>
                }

            </div>
            <p className=" font-medium mb-2 pl-3">{post.content}</p>
            <p className='text-gray-800 mb-1 pl-3'>{post.caption}</p>
            <p className="text-gray-500 text-sm mb-3">
                {new Date(post.updatedAt).toLocaleString()}
            </p>
            <div className="flex items-center gap-x-4">
                <span className="flex items-center gap-x-1 cursor-pointer">
                    <FontAwesomeIcon
                        onClick={() => handleLike(post.id)}
                        icon={isPostLiked ? faSolidHeart : faRegularHeart}
                        className={isPostLiked ? 'text-red-600' : 'hover:text-red-400'}
                    />
                    <p className="text-xs cursor-pointer"
                        onClick={() => handleViewLikedUsers(post.id)}>
                        {post.likesDTOList.filter((like) => like.isDeleted === false).length}
                    </p>
                </span>
                <span
                    className="flex items-center gap-x-1 cursor-pointer hover:text-red-500"
                    onClick={() => handleComments(post.id)}
                >
                    <FontAwesomeIcon icon={faComment} />
                    <p className="text-sm">{post.commentsDTOList.length}</p>
                </span>
            </div>
            {postDeleteMessage && <h1 className='text-center text-green-500 font-bold'> {postDeleteMessage}</h1>}

            {activePostIdForComments === post.id && (
                <Comments comments={comments} postId={post.id} setIsChanged={setIsChanged} set setComments={setComments} />
            )}


            {activePostIdForLikes === post.id && (
                <LikedUsers likedUsers={likedUsers} />
            )}
        </>
    )
}

export default PostCard