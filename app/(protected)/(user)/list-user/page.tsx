import { caller } from "@/trpc/server"


const Page = async() => {
  const users = await caller.user.userList();
  return (
    <div className='h-screen flex items-center justify-center'>
          <h1 className='text-lg text-blue-600'>List of all the users</h1>
          <div className='border p-4'>
            {users.map((user) => (
              <div key={user.id} className="border mb-2 p-2">
                <h1>UserId: {user.id}</h1>
                <p>Username: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Page