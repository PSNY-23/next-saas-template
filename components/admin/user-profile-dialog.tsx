"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Ban,
  Trash2,
  RefreshCcw,
  UserCheck,
  Calendar as CalendarIcon,
  Mail,
  Clock,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { UserTableType } from "@/types/admin";
import { format } from "date-fns";
import { toast } from "sonner";
import { getNameInitials } from "@/utils";
import { authClient } from "@/lib/auth-client";

interface UserProfileDialogProps {
  user: UserTableType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRefetch?: () => void;
}

export function UserProfileDialog({
  user,
  isOpen,
  onOpenChange,
  onRefetch,
}: UserProfileDialogProps) {
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  if (!user) return null;



  const initials = getNameInitials(user.name);

  const handleAction = async (actionName: string, actionFn: () => Promise<any>) => {
    setIsActionLoading(actionName);
    try {
      const { error } = await actionFn();
      if (error) throw new Error(error.message || `Failed to ${actionName}`);
      toast.success(`${actionName} completed successfully`);
      onRefetch?.();
      
    } catch (error: any) {
      toast.error(error.message || `An error occurred during ${actionName}`);
    } finally {
      setIsActionLoading(null);
      
    }
  };

  const handleUserBanToggle = async () => {
    if (user.banned) {
      await handleAction("Unban User", () => 
        authClient.admin.unbanUser({ userId: user.id })
      );
    } else {
      await handleAction("Ban User", () => 
        authClient.admin.banUser({ 
          userId: user.id,
          banReason: "Admin action",
          // Default to 7 days if no specific input yet, or just a generic ban
          banExpiresIn: 60 * 60 * 24 * 7 
        })
      );
    }
  };

  const handleDeleteUser = async () => {    
    await handleAction("Delete User", () => 
      authClient.admin.removeUser({ userId: user.id })
    );
  };

  const handleRevokeUserSessions = async () => {
    await handleAction("Revoke Sessions", () => 
      authClient.admin.revokeUserSessions({ userId: user.id })
    );
  };

  const handleMakeAdmin = async () => {
    await handleAction("Make Admin", () => 
      authClient.admin.setRole({
	userId: user.id,
	role: "admin", // required
})
    );

  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            View and manage user details and permissions.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {/* Header Section: Avatar + Basic Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/10">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="text-xl bg-primary/5">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Name: {user.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} />
                 {user.email}
              </div>
              <div className="flex gap-2 mt-1">
               
                <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                  {user.role || "user"}
                </Badge>
                {user.banned ? (
                  <Badge variant="destructive">Banned</Badge>
                ) : (
                  <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* User Details Section */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground font-medium flex items-center gap-1">
                <Clock size={14} /> Created At
              </span>
              <span>{format(new Date(user.createdAt), "PPP")}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground font-medium flex items-center gap-1">
                <ShieldAlert size={14} /> Email Verified
              </span>
              <span>{user.emailVerified ? "Yes" : "No"}</span>
            </div>
            {user.banned && (
              <>
                <div className="flex flex-col gap-1 col-span-2">
                  <span className="text-muted-foreground font-medium">Ban Reason</span>
                  <span className="p-2 bg-destructive/10 rounded text-destructive">
                    {user.banReason || "No reason provided"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <span className="text-muted-foreground font-medium flex items-center gap-1">
                    <CalendarIcon size={14} /> Ban Expires
                  </span>
                  <span>{user.banExpires ? format(new Date(user.banExpires), "PPP") : "Permanent"}</span>
                </div>
              </>
            )}
          </div>

          <Separator />

          {/* Administrative Actions Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Administrative Actions
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={handleUserBanToggle}
                disabled={!!isActionLoading}
              >
                {isActionLoading === (user.banned ? "Unban User" : "Ban User") ? (
                  <Spinner className="mr-2" />
                ) : user.banned ? (
                  <UserCheck size={16} />
                ) : (
                  <Ban size={16} />
                )}
                {user.banned ? "Unban User" : "Ban User"}
              </Button>

              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={handleRevokeUserSessions}
                disabled={!!isActionLoading}
              >
                {isActionLoading === "Revoke Sessions" ? (
                  <Spinner className="mr-2" />
                ) : (
                  <RefreshCcw size={16} />
                )}
                Revoke All Sessions
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={handleMakeAdmin}
                disabled={!!isActionLoading}
              >
                {isActionLoading === "Make Admin" ? (
                  <Spinner className="mr-2" />
                ) : (
                  <UserCheck size={16} />
                )}
                Make Admin
              </Button>

              <Button
                variant="destructive"
                className="justify-start gap-2"
                onClick={handleDeleteUser}
                disabled={!!isActionLoading}
              >
                {isActionLoading === "Delete User" ? (
                  <Spinner className="mr-2" />
                ) : (
                  <Trash2 size={16} />
                )}
                Delete User Account
              </Button>
              

              
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
