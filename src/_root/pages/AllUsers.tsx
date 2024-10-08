
import Loader from '@/components/shared/Loader'
import UsersList from '@/components/shared/UsersList'
import { useGetUsers } from '@/lib/react-query/queriesAndMutations'


const AllUsers = () => {
    const { data: users, isPending: isGettingUsers } = useGetUsers()

    return (
        isGettingUsers
            ? (
                <div className='flex place-content-center w-full' >
                    <Loader />
                </div >
            ) : (
                <div className='m-6 md:m-0'>
                    <h2 className='flex items-center h3-bold md:h2-bold text-left w-full mt-10 mb-4'>
                        <img
                            className='w-7 h-7 mr-2'
                            src="/assets/icons/people.svg"
                            alt="people"
                        />
                        All Users
                    </h2>
                    <div className='max-w-4xl flex content-start items-center justify-around flex-wrap gap-7 overflow-auto max-h-screen'>
                        <UsersList users={users?.documents} />
                    </div>
                </div>
            )
    )
}

export default AllUsers