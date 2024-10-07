import { Models } from 'appwrite'
import { Button } from '../ui/button'
import { useUserContext } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

type UserListProps = {
    users: Models.Document[] | undefined
}

const UsersList = ({ users }: UserListProps) => {
    const { user: currentUser } = useUserContext()

    return (
        users?.map(user => (
            <div key={user.$id} className='flex flex-1 flex-col gap-1 justify-center items-center border-2 border-dark-4 rounded p-5 h-max'>
                <Link to={`/profile/${user.$id}`}>
                    <img
                        className='rounded-full h-10 w-10'
                        src={user.imageUrl}
                        alt="profile-image"
                    />
                </Link>
                <h2>{user.name}</h2>
                <p className='text-light-3'>@{user.username}</p>
                {currentUser.id !== user.$id
                    ? <Button className='shad-button_primary'>Follow</Button>
                    : <Button className="shad-button_dark_4">Edit profile</Button>
                }

            </div>
        ))
    )

}

export default UsersList