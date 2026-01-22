import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum Role {
  user = "user",    // Set explicit string values for better matching
  admin = "admin"
}

export const useRole = () => {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session && session.data?.user.role) {
          // Assuming role in session is a string, map it to the Role enum
          if (session.data.user.role === "user") {
            setRole(Role.user);
          } else if (session.data.user.role === "admin") {
            setRole(Role.admin);
          }
        } else {
          setRole(null); // No role or user data
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setRole(null); // In case of an error, reset role
      }
    };

    fetchSession(); // Fetch session when the component mounts

    // If needed, you can also add a cleanup function here for the async call

  }, []); // Empty dependency array to run the effect once after mount

  // Optionally, handle redirects based on role
  useEffect(() => {
    if (role === null) {
      // Redirect if no role is found (e.g., user is not logged in)
      router.push("/login");
    } else if (role === Role.user) {
      // Redirect to user-specific page
      router.push("/dashboard");
    } else if (role === Role.admin) {
      // Redirect to admin-specific page
      router.push("/admin/dashboard");
    }
  }, [role, router]);

  return { role }; // Return role to be used in your components
};
