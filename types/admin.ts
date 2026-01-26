
export type UserTableType = {
  id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    emailVerified: boolean;
    name: string;
    image: string | null;
    role: string | null;
    banReason: string | null;
    banned: boolean | null;
    banExpires: string | null;
};
