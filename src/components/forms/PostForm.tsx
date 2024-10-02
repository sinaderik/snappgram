import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { Link, useNavigate } from "react-router-dom"
import { Loader } from "lucide-react"

type PostFormProps = {
    post?: Models.Document,
    action: 'Update' | 'Create',
}
const PostForm = ({ post, action }: PostFormProps) => {

    const { toast } = useToast()
    const navigate = useNavigate()
    const { user } = useUserContext()
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost()

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post.caption : '',
            file: [],
            location: post ? post.location : '',
            tags: post ? post.tags.join(',') : ''
        },
    })

    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (post && action === "Update") {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post.imageId,
                imageUrl: post.imageUrl,
            });

            if (!updatedPost) {
                toast({
                    title: `${action} post failed. Please try again.`,
                });
            }
            return navigate(`/posts/${post.$id}`);
        }

        const newPost = await createPost({ ...values, userId: user.id })
        if (!newPost) {
            toast({ title: 'Something went wrong, please try again' })
        }
        navigate('/')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar"
                                    placeholder="Write your caption..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add photos</FormLabel>
                            <FormControl>
                                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="shad-input"
                                    placeholder="new york , usa"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Tags ( separated by comma " , " )</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="shad-input"
                                    placeholder="Art , Sport , Comedy"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button
                        className="shad-button_dark_4"
                        type="button"
                    >
                        <Link to='/'>Cancel</Link>
                    </Button>
                    <Button
                        className="shad-button_primary white-space-nowrap"
                        type="submit"
                    >
                        {isLoadingCreate
                            && (<><Loader /> Posting...</>)
                        }
                        {isLoadingUpdate
                            && (<><Loader /> Updating...</>)
                        }
                        {action === 'Update' ? 'Update' : 'Post'}
                    </Button>

                </div>
            </form>
        </Form>
    )
}

export default PostForm