import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useGetUserById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations"

import { Link, useParams } from "react-router-dom"



const Profile = () => {

  const { id } = useParams()
  const { user: currentUser } = useUserContext()
  const { data: user, isPending: isUserLoading } = useGetUserById(String(id))
  const { data: posts, isPending: isGettingPost } = useGetUserPosts(String(id))

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
              src={user?.imageUrl}
              alt="profile-img"
            />

            <div className="flex flex-col">
              <h2 className="h3-bold">{user?.name}</h2>
              <p className="medium-regular text-light-3">@{user?.username}</p>
            </div>
            {user?.$id === currentUser?.id
              ? <div className="flex items-center">
                <Link to={`/update-profile/${id}`}>
                  <Button className="ml-6 shad-button_dark_4">
                    <img className="h-5 w-5" src='/assets/icons/edit.svg' alt="" />
                    Edit profile
                  </Button>
                </Link>
                <Link to='/create-post'>
                  <Button className="ml-6 shad-button_primary">
                    <img
                      className="group-hover:invert-white invert-white h-5 w-5"
                      src="/assets/icons/add-post.svg"
                      alt="post"
                    />
                    Post
                  </Button></Link>
              </div>
              : <Button className="ml-6 shad-button_primary">
                follow
                <img
                  className="group-hover:invert-white invert-white h-5 w-5"
                  src="/assets/icons/follow.svg"
                  alt="follow"
                />
              </Button>}
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
          {user?.bio
            ? <p>{user?.bio}</p>
            : <p className="text-gray-400">bio is not written yet ...</p>
          }

        </div>
        <hr className="border-slate-700 mt-3" />
      </div>
      {isGettingPost
        ? <Loader />
        : <GridPostList posts={posts?.documents} showStats={false} showUser={false} />
      }
    </div>
  )
}

export default Profile