import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useNavigate, useParams } from "react-router-dom"
import { useGetUserById } from "@/lib/react-query/queriesAndMutations"
import ProfileUploader from "@/components/shared/ProfileUploader"
import { updateUserProfile } from "@/lib/appwrite/api"
import { toast } from "@/hooks/use-toast"
import { useUserContext } from "@/context/AuthContext"
import { useState } from "react"
import Loader from "@/components/shared/Loader"

const formSchema = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().min(3, {
    message: "This is not a valid email",
  }).regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, {
    message: "Invalid email format",
  }),
  bio: z.string().max(2200, {
    message: "You are not allowed to write more than 2200 characters"
  }),
})

const UpdateProfile = () => {
  const { id } = useParams()
  const { data: currentUser } = useGetUserById(id as string);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate()
  const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: [],
      name: currentUser?.name,
      username: currentUser?.username,
      email: currentUser?.email,
      bio: currentUser?.bio || "",
    },
  })

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    setIsUpdatingProfile(true)
    const updatedProfile = await updateUserProfile({
      userId: currentUser?.$id as string,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageUrl: currentUser?.imageUrl,
      imageId: currentUser?.imageId,
      username: values.username,
    })
    if (!updatedProfile) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }

    setUser({
      ...user,
      name: updatedProfile?.name,
      username: updatedProfile?.username,
      bio: updatedProfile?.bio,
      imageUrl: updatedProfile?.imageUrl,
      email: updatedProfile?.email,
    });
    setIsUpdatingProfile(false)
    toast({
      title: `Profile successfully updated`,
    });
    return navigate(`/profile/${id}`);
  }

  const handelCancel=(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    navigate(-1)
  }
  return (
    <div className="mt-9 w-full md:w-2/5 overflow-auto max-h-screen p-3">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-8">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="flex">
                <FormControl>
                  <ProfileUploader
                    fieldChange={field.onChange}
                    mediaUrl={currentUser?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="shad-input" placeholder="name..." {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="shad-input" placeholder="username..." {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="shad-input" type="email" placeholder="email..." {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea className="shad-textarea" placeholder="Type your bio..."  {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4 pb-6 mb-6">
            <Button 
            onClick={handelCancel}
            className="shad-button_dark_4 "
            >Cancel</Button>
            <Button className="shad-button_primary" type="submit">
              {isUpdatingProfile
                ? <><Loader />Updating</>
                : 'Update'
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UpdateProfile