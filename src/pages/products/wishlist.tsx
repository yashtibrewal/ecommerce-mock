import Layout from "@/components/Layout";
import { Product } from "@/interfaces/Product";
import { sessionOptions } from "@/interfaces/Session";
import { RootState } from "@/store";
import { getIronSession } from "iron-session";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "@/store/wishlistsSlice"; // Assuming you have a wishlist slice
import withAuth from "@/components/withAuth";
import { addProductToCard } from "@/store/productsSlice";

const WishList = () => {
  const dispatch = useDispatch();

  // Get wishlist products from the store
  const wishlistProducts: Product[] = useSelector((state: RootState) => state.wishlists);

  const handleRemoveFromWishlist = (product: Product) => {
    dispatch(removeFromWishlist(product.id));
  };

  const handleMoveToCart = (product: Product) => {
    dispatch(removeFromWishlist(product));
    dispatch(addProductToCard(product));
  }

  return (
    <Layout>
      <div>
        <h3 className="text-2xl font-bold mb-4">My Wishlist</h3>
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product: Product) => (
              <div key={product.id} className="border bg-slate-100 p-4 rounded-lg">
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <h4 className="text-lg min-h-24 font-semibold">{product.title}</h4>
                <p className="text-blue-600 font-bold">${product.price}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(product)}
                  className="mt-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove from Wishlist
                </button>
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="mt-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Move to cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Your wishlist is currently empty.</p>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getIronSession(req, res, sessionOptions);
  return {
    props: {
      session,
    },
  };
};

export default withAuth(WishList);
