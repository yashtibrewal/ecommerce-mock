import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSessionContext } from "@/context/Session"; // Assuming you have a context for session
import { LoggedInUser } from "@/interfaces/Session";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const session = useSessionContext();

    useEffect(() => {
      if (!(session as LoggedInUser)?.isLoggedIn) {
        router.push("/login"); // Redirect to login if not logged in
      }
    }, [session, router]);

    // If the user is logged in, render the wrapped component
    return (session as LoggedInUser)?.isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  // Set a display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;
