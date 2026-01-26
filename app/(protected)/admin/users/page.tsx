'use client'
import { UserTable } from "@/components/admin/users-table";
import { UserChart } from "@/components/admin/user-chart";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Page = () => {
  const trpc = useTRPC();
  const { data: users, isLoading, isError, refetch } = useQuery(trpc.user.userList.queryOptions());

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (isError) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <p className="text-destructive font-semibold text-lg">Failed to load users</p>
      <Button onClick={() => refetch()}>Try again</Button>
    </div>
  );
  
  if (!users) return <p>No users found</p>;

  const createdAtArray = users.map((user) => user.createdAt);
  
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold my-4">User Management</h1>
        <p className=" font-semibold text-lg">Total users: {users.length}</p>
      </div>
      {/* TODO: configure chart to show real user*/}
      <div className="flex flex-col gap-4 mt-4">
        <UserChart createdAtArray={createdAtArray} />
        <UserTable userList={users} onRefetch={refetch} />
      </div>
    </div>
  );
};

export default Page;
