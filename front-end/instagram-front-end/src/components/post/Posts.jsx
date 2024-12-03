import PostCard from "./PostCard";


const Posts = ({posts,likes , setIsChanged , currentUserName}) => {
    return (
        <ul className="flex flex-col items-center gap-y-4 mt-4 ">
            {posts.map((post) => {
                const isPostLiked = likes.find(like => like.postId === post.id)?.isUserLiked;
                // console.log(isPostLiked,post.id);
                return (
                    <li key={post.id} className="border w-[930px] rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition-shadow">
                        <PostCard posts={posts} post={post} isPostLiked={isPostLiked} setIsChanged={setIsChanged} currentUserName={currentUserName} />
                    </li>
                );
            })}
        </ul>
    )
}

export default Posts