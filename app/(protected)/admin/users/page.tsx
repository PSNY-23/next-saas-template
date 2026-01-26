'use client'
import { UserTable } from "@/components/admin/users-table";
import { UserChart } from "@/components/admin/user-chart";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const trpc = useTRPC();
  const { data: users, isLoading, isError, refetch } = useQuery(trpc.user.userList.queryOptions());


  let createdAtArray: string[] = [];
  if(users) {
    createdAtArray = users.map((user) => user.createdAt);
  }
  
  return (
    <div className="">
      {/* TODO: configure chart to show real user*/}
      <div className="flex flex-col gap-4 mt-4">
        <UserChart createdAtArray={createdAtArray} isLoading={isLoading} isError={isError}/>
        <UserTable userList={users} isLoading={isLoading} isError={isError} onRefetch={refetch} />
      </div>
    </div>
  );
};

export default Page;
