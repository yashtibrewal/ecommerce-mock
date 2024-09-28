import Layout from "@/components/Layout";
import { removeAllProducts } from "@/store/productsSlice";
import { removeAllFromWishlist } from "@/store/wishlistsSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


// Example usage in a component
const Logout = () => {
  
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {

    dispatch(removeAllFromWishlist());
    dispatch(removeAllProducts());

    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });

    if (response.ok) {
      // Handle successful logout, e.g., redirect to the login page
      // console.log('Logged out successfully');
      router.push('/login');

    } else {
      console.error('Logout failed');
    }
  };

  useEffect(() => {
    handleLogout();
  })

  return (
    <Layout>
      <p>Logging out...</p>
    </Layout>
  );
};

export default Logout;