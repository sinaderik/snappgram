import PostForm from "@/components/forms/PostForm"
import { useGetPostById } from "@/lib/react-query/queriesAndMutations"
import { Loader } from "lucide-react"
import { useParams } from "react-router-dom"

const EditPost = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '')
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add-post"
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit post</h2>
        </div>
        {isPending
          ? <Loader />
          : <PostForm post={post} action='Update' />
        }
      </div>
    </div>
  )
}

export default EditPost