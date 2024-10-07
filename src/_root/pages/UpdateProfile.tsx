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
import { useParams } from "react-router-dom"
import { useGetUserById } from "@/lib/react-query/queriesAndMutations"

const formSchema = z.object({
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
  bio: z.string().min(5, {
    message: "Bio must be at least 5 characters.",
  }).max(2200, {
    message: "You are not allowed to write more than 2200 characters"
  }),
})

const UpdateProfile = () => {
  const { id } = useParams()
  const { data: currentUser } = useGetUserById(id)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      bio: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="mt-9 w-2/5">
      <h2 className="flex items-center h3-bold md:h2-bold text-left w-full mb-9">
        <img
          className="mr-3 w-8 h-8"
          src="/assets/icons/edit.svg"
          alt=""
        />
        Edit Profile
      </h2>
      <div className="flex items-center gap-3 mb-8">
        <img
          className="w-32 h-32 rounded-full"
          src={currentUser?.imageUrl}
          alt="profile-picture"
        />
        <p className="text-blue-400 cursor-pointer">Change profile picture</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button className="shad-button_dark_4 ">Cancel</Button>
            <Button className="shad-button_primary" type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UpdateProfile