import { useState, useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces/Product";
import Session, { LoggedInUser, sessionOptions } from "@/interfaces/Session";
import { getIronSession } from "iron-session";
import { useSessionContext } from "@/context/Session";
import { UserSession } from "@/interfaces/UserSession";
import { capitalize } from "@/utils/functions";

interface Props {
  products: Product[] | null;
  categories: string[] | null;
}

const ProductsPage = ({ products, categories }: Props) => {
  const itemsPerPage = 6;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products || []);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const session: Session = useSessionContext();
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    if (session) {
      const keys = Object.keys(session);
      if (keys.includes("isLoggedIn")) {
        setUser({
          name: (session as LoggedInUser).name,
          email: (session as LoggedInUser).username,
        });
      }
    }
  }, [session]);

  useEffect(() => {
    let filtered = products || [];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by rating
    if (selectedRating !== null) {
      filtered = filtered.filter(product => product.rating && product.rating.rate >= selectedRating);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedCategory, selectedRating, products]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 mt-10">
        {user && <h3 className="text-2xl font-semibold mb-2">Welcome {user && capitalize(user.name)} </h3>}
        <div className="mb-4 flex flex-wrap gap-y-4 gap-x-4 items-center">

          <div >
            <label htmlFor="category" className="mr-2">Filter by Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2"
            >
              <option value="">All Categories</option>
              {categories && categories.map((category) => (
                <option key={category} value={category}>
                  {capitalize(category)}
                </option>
              ))}
            </select>
          </div>

          <div >
            <label htmlFor="rating" className="mr-2">Filter by Rating:</label>
            <select
              id="rating"
              value={selectedRating || ""}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className="border p-2"
            >
              <option value="">All Ratings</option>
              <option value={1}>1 and above</option>
              <option value={2}>2 and above</option>
              <option value={3}>3 and above</option>
              <option value={4}>4 and above</option>
              <option value={5}>5 only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-2 py-1 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-2 py-1 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req, res } = context;

  const session = await getIronSession(req, res, sessionOptions);

  try {
    const resProducts = await fetch("https://fakestoreapi.com/products");
    const products = await resProducts.json();

    const resCategories = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await resCategories.json();

    return {
      props: {
        products,
        categories,
        session,
      }
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        products: null,
        categories: null,
        session,
      }
    };
  }
};

export default ProductsPage;
