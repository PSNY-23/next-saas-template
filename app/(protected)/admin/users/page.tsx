import { caller } from '@/trpc/server';
import { UserTable } from '@/components/admin/users-table';
import { UserChart } from '@/components/admin/user-chart';

const Page = async () => {
  const users = await caller.user.userList();
  const createdAtArray = users.map((user) => (
    user.createdAt
  ))
  return (
    <div className="min-h-screen px-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold my-4">User Management</h1>
        <p className=" font-semibold text-lg">
          Total users: {users.length}</p>
      </div>
      {/* TODO: configure chart to show real user*/}
      <UserChart createdAtArray={createdAtArray} />
      <UserTable userList={users} />
    </div>
  );
};

export default Page;
