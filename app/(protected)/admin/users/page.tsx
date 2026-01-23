import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/components/ui/table';
import Image from 'next/image';
import { caller } from '@/trpc/server';

const Page = async () => {
  const users = await caller.user.userList();
  console.log('users: ', users);
  return (
    <div className="min-h-screen px-6 w-full">
      <div>This is admin user-management page</div>
      <div>
        <p>Total users: {users.length}</p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Email Verified</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Other Fields</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.emailVerified ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
