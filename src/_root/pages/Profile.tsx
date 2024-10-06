import { useUserContext } from "@/context/AuthContext"
import { useGetUserPosts } from "@/lib/react-query/queriesAndMutations"



const Profile = () => {
  const { user } = useUserContext()
  const {data:posts}=useGetUserPosts(user.id)

  return (
    <ul className="grid-container">

    </ul>
  )
}

export default Profile