import { auth } from "@/lib/auth"

const Page = async() => {
   await auth.api.signUpEmail({
    
   })
  return (
    <div>test page</div>
  )
}

export default Page