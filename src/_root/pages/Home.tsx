import { Loader } from "lucide-react";


const Home = () => {
  const isLoadingPosts: boolean = true;
  const posts = null

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home feed</h2>
          {isLoadingPosts && !posts ?
            (
              <Loader />
            ) : (
              <h3>all posts</h3>
            )}
        </div>
      </div>
    </div>
  )
}

export default Home