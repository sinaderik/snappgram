import PostCard from "@/components/shared/PostCard";
import UsersList from "@/components/shared/UsersList";
import { useGetPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";


const Home = () => {

  // const { data: posts, isLoading: isLoadingPosts } = useGetRecentPosts()
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isLoading: isLoadingPosts } = useGetPosts();
  const { data: users, isPending: isGettingUsers } = useGetUsers()

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
      <div className="hidden lg:block w-1/3 max-w-96 h-full border-2 border-slate-900">
        <h2 className="h3-bold md:h2-bold block w-full pt-10 text-center">Recently Joined</h2>
        <div className="flex items-start justify-center content-start h-full pt-4 gap-4 flex-wrap">
          {isGettingUsers
            ? <Loader />
            : <UsersList users={users?.documents}/>}
        </div>
      </div>
    </div>
  )
}

export default Home