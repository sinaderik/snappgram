import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite"


const Saved = () => {
  const { data: currentUser, isPending: isGettingSavedPosts } = useGetCurrentUser()

  let savedPosts: Models.Document[] = []
  if (!isGettingSavedPosts) {
    currentUser?.save.map((item: Models.Document) => savedPosts.push(item.post))
  }
  console.log(savedPosts)
  return (
    <div className="profile-container">
      {isGettingSavedPosts && <Loader />}
      {savedPosts.length===0 && <h2 className="h3-bold md:h2-bold text-center w-full">You have not saved any post yet...</h2>}
      {!isGettingSavedPosts && savedPosts && <GridPostList posts={savedPosts} showStats={false} showUser={false}/>}
    </div>
  )
}

export default Saved