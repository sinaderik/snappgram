import PostCard from "@/components/shared/PostCard";
import { useGetPosts } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";


const Home = () => {

  // const { data: posts, isLoading: isLoadingPosts } = useGetRecentPosts()
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isLoading: isLoadingPosts } = useGetPosts();
 
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])
  
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
                {posts?.pages.map(item => item?.documents.map(post => (
                  <PostCard post={post} key={post.caption} />
                )))}
              </ul>
            )}
        </div>
        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home