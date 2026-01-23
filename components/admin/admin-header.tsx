import { SidebarTrigger } from '@/components/ui/sidebar';


export const AdminHeader = () => {
  return (
    <div className="w-full h-12 border-b flex items-center px-2 md:px-4 lg:px-6">
      <SidebarTrigger className='size-8'/>
    </div>
  )
}