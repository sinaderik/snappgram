import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useGetCurrentUser, useGetUserPosts } from "@/lib/react-query/queriesAndMutations"
import { Loader } from "lucide-react"
import { useParams } from "react-router-dom"



const Profile = () => {
  // const { id } = useParams() 
  const { user, isLoading: isUserLoading } = useUserContext()
  const { data: currentUser } = useGetCurrentUser()
  const { data: posts } = useGetUserPosts(user.id)


  console.log(user)
  console.log('current user ', currentUser)

  if (isUserLoading) {
    return (
      <div className="profile-container">
        <Loader />
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-inner_container items-center sm:items-start">
          <div className="flex items-center gap-3 ">
            <img
              className="rounded-full h-9 w-9 md:h-14 md:w-14"
              src={user.imageUrl}
              alt="profile-img"
            />

            <div className="flex flex-col">
              <h2 className="h3-bold">{user.name}</h2>
              <p className="medium-regular text-light-3">@{user.username}</p>
            </div>
            {user.id === currentUser?.$id
              ? <Button className="ml-6 shad-button_dark_4">Edit profile</Button>
              : <Button className="ml-6 shad-button_primary">follow</Button>}
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-6">
          <div className="flex items-center justify-between w-fit gap-8">
            <div className="flex flex-col items-center justify-center mt-7 md:mt-2">
              <p className="text-purple-400">{posts?.total}</p>
              <p>posts</p>
            </div>
            <div className="flex flex-col items-center justify-center mt-7 md:mt-2">
              <p className="text-purple-400">0</p>
              <p>Follower</p>
            </div>
            <div className="flex flex-col items-center justify-center mt-7 md:mt-2">
              <p className="text-purple-400">0</p>
              <p>Following</p>
            </div>
          </div>
          <p>Some text for the bio </p>
        </div>
      </div>
    </div>
  )
}

export default Profile