import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"
import { useUserContext } from "@/context/AuthContext"

type GridPostListProps = {
  posts: Models.Document[] | undefined,
  showUser?: boolean,
  showStats?: boolean,
}

const GridPostList = ({ posts, showStats = true, showUser = true }: GridPostListProps) => {
  const { user } = useUserContext();
  
  return (
    <ul className="grid-container">
      {posts?.map(post => (
        <li key={post.$id} className="relative min-w-60 h-80">
          <Link className="grid-post_link" to={`/posts/${post.$id}`}>
            <img className="h-full w-full object-cover" src={post.imageUrl} alt="post" />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img className="w-8 h-8 rounded-full" src={post.creator.imageUrl} alt="profile-image" />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GridPostList