import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";


const Home = () => {

  const { data: posts, isLoading: isLoadingPosts } = useGetRecentPosts()
 
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home feed</h2>
          {isLoadingPosts && !posts ?
            (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts?.documents.map((post)=>{
                  return(
                    <PostCard post={post} key={post.caption}/>
                  )
                })}
              </ul>
            )}
        </div>
      </div>
    </div>
  )
}

export default Home