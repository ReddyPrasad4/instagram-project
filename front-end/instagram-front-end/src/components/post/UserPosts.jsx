import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Posts from './Posts';
import { deleteUser, getAllPostsByUserName, getUserLikes } from '../../auth';

const UserPosts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [isChanged, setIsChanged] = useState();
    const [isDeleted, setIsDeleted] = useState(false);
    const [accountDeleteIsClicked, setAccountDeleteIsClicked] = useState(false)
    const navigate = useNavigate();
    let location = useLocation();
    let userName = location.state.userName;
    let currentUserName = localStorage.getItem("userName")
    useEffect(() => {
        let handleUserPosts = async () => {
            try {
                let response = await getAllPostsByUserName(userName);
                setUserPosts(response.data);
                let likesResponse = await getUserLikes(currentUserName)
                console.log(likesResponse.data);
                setLikes(likesResponse.data)
            } catch (error) {
                console.error(error);
                setUserPosts([])
            }
        };
        handleUserPosts();
    }, [isChanged, currentUserName, userName]);

    let handleBackHome = () => {
        navigate('/home')
    }

    let showDleteUser = () => {
        setAccountDeleteIsClicked(true)
    }

    let handleDeleteUser = async () => {
        try {
            let response = await deleteUser(currentUserName);
            console.log(response.data);
            setIsDeleted(true);
            setTimeout(() => {
                navigate("/register")
                setAccountDeleteIsClicked(false)
            }, 1000)

        } catch (error) {
            console.error(error);
        }
    };
    let handleUpdateUser = async () => {
        navigate("/updateUser")

    };

    return (
        <>
            <ul className="m-5">
                <div className='mx-28 flex justify-between'>
                    <button className="p-2 px-3 rounded-md font-bold bg-red-300 hover:text-white hover:bg-red-500"
                        onClick={handleBackHome}>
                        Home
                    </button>
                    {currentUserName === userName &&
                        <div >
                            <button
                                className="p-2 px-2 mx-[5px] rounded-md font-bold bg-red-300 hover:bg-red-500"
                                onClick={handleUpdateUser}
                            >
                                Update Account
                            </button>
                            <button
                                className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500"
                                onClick={showDleteUser}
                            >
                                Delete Account
                            </button>
                        </div>
                    }
                    {accountDeleteIsClicked &&
                        (
                            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                <div className='bg-white w-96 h-40 flex items-center gap-y-4 flex-col p-4 rounded shadow font-bold'>
                                    <h1 className='font-bold text-fuchsia-600'>Do you want to delete your account ?</h1>
                                    <div className='flex items-center gap-x-4 h-28'>
                                        <button
                                            className="bg-red-300 h-10 font-bold p-1 px-3 text-white rounded-md hover:bg-red-700"
                                            onClick={handleDeleteUser} >Delete
                                        </button>
                                        <button
                                            className="bg-red-500 h-10 font-bold p-1 px-3 text-white rounded-md hover:bg-red-700"
                                            onClick={()=>setAccountDeleteIsClicked(false)} > cancel
                                        </button>
                                    </div>
                                    {isDeleted === true && <p className="text-red-500 font-bold text-center">Account deleted Sucessfully</p>}

                                </div>
                            </div>
                        )}
                </div>

                {userPosts.length != 0 ?
                    <Posts posts={userPosts} likes={likes} setIsChanged={setIsChanged} currentUserName={userName} /> :
                    <h1 className='text-center' >
                        No Post found please Add posts
                        <span className='cursor-pointer hover:underline text-blue-700 hover:text-blue-500'
                            onClick={() => navigate('/addPost')} >
                            By clicking here
                        </span>
                    </h1>}
            </ul>
        </>
    );
}

export default UserPosts