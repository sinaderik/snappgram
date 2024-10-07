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
import ProfileUploader from "@/components/shared/ProfileUploader"

const formSchema = z.object({
  file:z.custom<File[]>(),
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
  const { data: currentUser } = useGetUserById(id)

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="mt-9 w-2/5">
   
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button className="shad-button_dark_4 ">Cancel</Button>
            <Button className="shad-button_primary" type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UpdateProfile