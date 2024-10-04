import { useUserContext } from "@/context/AuthContext"
import { useGetUserPosts } from "@/lib/react-query/queriesAndMutations"



const Profile = () => {
  const { user } = useUserContext()
  const {data:posts}=useGetUserPosts()
  // console.log(posts)
  const filteredPosts=posts?.documents.filter(post=>post.creator.$id===user.id)
  // console.log(filteredPosts)
  return (
    <ul className="grid-container">

    </ul>
  )
}

export default Profile