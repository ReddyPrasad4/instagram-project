import { useNavigate } from "react-router-dom"

const LikedUsers = ({likedUsers}) => {

    let navigate = useNavigate()

    return (
        <div className="mt-4 bg-gray-50  border rounded-md p-3 ">
            <h3 className="font-bold mb-2 text-red-500">Liked Users</h3>
            <div className="h-56 overflow-y-scroll">
                {likedUsers.length != 0 ? (
                    likedUsers.map((likes) => (
                        <p key={likes.id} className=" w-fit text-sm mb-2 font-medium cursor-pointer hover:underline hover:text-red-500"
                        onClick={() => navigate('/userPosts', { state: { userName: likes.userDto.userName } })}>

                            {likes.userDto.userName}
                        </p>))) :
                    (<p className="text-gray-500 text-sm">No Likes yet.</p>)
                }
            </div>
        </div>
    )
}

export default LikedUsers