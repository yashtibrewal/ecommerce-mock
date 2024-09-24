// pages/products.tsx
import { useState, useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces/Product";
import Session, { LoggedInUser, sessionOptions } from "@/interfaces/Session";
import { getIronSession } from "iron-session";
import { useSessionContext } from "@/context/Session";
import { UserSession } from "@/interfaces/UserSession";


interface Props {
  products: Product[] | null;
  categories: string[] | null;
}

const ProductsPage = ({ products, categories }: Props) => {
  const itemsPerPage = 6; // Number of items per page
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products || []);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const session: Session = useSessionContext();

  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    console.log('in products page use effect for sessions')
    if (session) {
      const keys = Object.keys(session);
      if (keys.includes('isLoggedIn')) {
        console.log(keys);
        console.log(session);

        setUser({
          name: (session as LoggedInUser).name,
          email: (session as LoggedInUser).username,
        })
      }
    }
  }, [session])

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products?.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered || []);
    } else {
      setFilteredProducts(products || []);
    }
    setCurrentPage(1); // Reset to first page on category change
  }, [selectedCategory, products]);

  // Calculate the products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 mt-10">
        <h1 className="text-4xl font-bold mb-6">Products</h1>
        {user && <h3 className="text-2xl font-semibold mb-2">Welcome {user && user.name} </h3>}
        <div className="mb-4">
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
                {category}
              </option>
            ))}
          </select>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard
                key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-4 py-2 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-4 py-2 bg-blue-500 text-white rounded"
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

  const session = await getIronSession(req, res, sessionOptions)

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
