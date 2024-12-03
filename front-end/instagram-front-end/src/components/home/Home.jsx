import { useEffect, useState } from "react"
import { getAllPosts, getMathcedUsers, getUserLikes } from "../../auth"
import Loader from "../loader/Loader"
import { useNavigate } from "react-router-dom"
import Posts from "../post/Posts"

const Home = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [likes, setLikes] = useState([]);
    const [isChanged, setIsChanged] = useState();
    const [searchedUserName, setSearchedUserName] = useState();
    const [searchedUserNameError, setSearchedUserNameError] = useState('')
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    let userName = localStorage.getItem("userName");

    useEffect(() => {
        let handleGetAllPosts = async () => {

            try {
                let response = await getAllPosts();
                setPosts(response.data);
                console.log(response);
                let likesResponse = await getUserLikes(userName);
                setLikes(likesResponse.data)
                // setLikes(response.data.map(post => ({ id: post.id, liked: post.likesDTOList.find(like => like.userDto.userName === userName && like.isDeleted === false) ? true : false })));
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false)

            }
        }

        handleGetAllPosts();
    }, [isChanged, userName])

    // console.log(likes);

    let handleAddPost = () => {
        navigate('/addPost')
    }

    let handleLogOut = () => {
        navigate("/")
        localStorage.clear();
    }
    let searchUserByName = async (searchUser) => {
        try {
            let usersResponse = await getMathcedUsers(searchUser);
            setUsers(usersResponse.data);
            console.log(usersResponse);
        }
        catch (error) {
            console.error(error);
            setUsers([])

        }
    }
    let handleInputChange = (event) => {
        setSearchedUserName(event.target.value)
        searchUserByName(event.target.value)
        setSearchedUserNameError('')
    }
    let handleSearchUser = () => {
        if (searchedUserName) {
            searchUserByName(searchedUserName);
        }
        else {
            setSearchedUserNameError("User name should not be empty")
        }
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) :
                <div className="m-5">

                    <div className="text-center flex justify-evenly">
                        <div>
                            <div className="flex gap-x-4">
                                <input placeholder="Enter user name" className={`${searchedUserNameError && "border-red-500"} w-96 p-2 rounded-2 border-1 outline-none focus:border-blue-500 `}
                                    onChange={handleInputChange} />
                                <button className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500 "
                                    onClick={handleSearchUser}>
                                    Search
                                </button>
                            </div>
                            {searchedUserNameError && <p className="text-red-500 pr-40">{searchedUserNameError}</p>}
                        </div>


                        <div className="flex gap-x-4">
                            <button className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500"
                                onClick={handleAddPost}>
                                Add Post
                            </button>
                            <button className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500"
                                onClick={() => navigate('/userPosts', { state: { userName: localStorage.getItem('userName') } })}>
                                My Posts
                            </button>
                            <button className="p-2 px-3 rounded-md font-bold  bg-red-300 hover:bg-red-500"
                                onClick={handleLogOut}>
                                Logout
                            </button>
                        </div>

                    </div>
                    {searchedUserName &&
                        <div className="bg-gray-100 mx-28 p-2 my-2 rounded-md h-40 overflow-y-scroll">
                            {users.length != 0 ?
                                <ul>
                                    {users.map((user) => {

                                        return (
                                            <p key={user.id}
                                                onClick={() => navigate('/userPosts', { state: { userName: user.userName } })}
                                                className="font-semibold p-2 w-fit hover:text-red-600 cursor-pointer ">
                                                {user.userName}
                                            </p>
                                        )
                                    })}
                                </ul> :
                                <p className=" text-center pt-5">No users found</p>}
                        </div>}
                    {posts.length != 0 ?
                        <Posts posts={posts} likes={likes} setIsChanged={setIsChanged} /> :
                        <p className="pt-4 font-bold text-red-500 text-center">No posts available.</p>}
                </div>
            }

        </>
    )
}

export default Home