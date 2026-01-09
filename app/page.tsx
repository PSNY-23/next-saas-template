import { caller } from "@/trpc/server";

export default async function Home() {
  const greeting = await caller.user.hello({text: 'pankaj'})
  console.log(greeting);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        This is home page.
      </div>
    </div>
  );
}
