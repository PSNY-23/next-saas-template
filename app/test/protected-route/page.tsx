import { redirect } from 'next/navigation'; // for server-side redirect
import { caller } from "@/trpc/server";
import { TRPCError } from '@trpc/server';

type User = {
  email: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    image: string | null;
    emailVerified: boolean;

}

const Page = async () => {
  let users:User[] = [];
  let errorMessage = "";

  try {
    // Attempt to fetch data
    users = await caller.user.userList();
  } catch (error) {
    // If the error is unauthorized, redirect to the login page
    if ((error as TRPCError).code === 'UNAUTHORIZED') {
      redirect("/login"); // Perform the server-side redirect
      return;
    }
    // Handle other types of errors
    errorMessage = "Failed to load users. Please try again later.";
    console.error("Error fetching users:", error);
  }

  // Render the page if no errors
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-lg text-blue-600">List of all the users</h1>
      <div className="border p-4">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="border mb-2 p-2">
              <h1>UserId: {user.id}</h1>
              <p>Username: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
