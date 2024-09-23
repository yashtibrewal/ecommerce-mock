import Layout from "@/components/Layout";

// pages/contact.tsx
const ContactPage = () => {
  return (
    <Layout>
      <div className="container p-4">
        <div className="flex items-center justify-between">
          <div className="mb-6 space-y-2 w-full">

            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <h2 className="text-xl font-semibold mb-2">Our Contact Details</h2>
            <p>
              <strong>Email:</strong> support@mysite.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Address:</strong> 123 Main St, Suite 100, Anytown, USA
            </p>
          </div>
          <form className="flex flex-col w-full">
            <label htmlFor="name" className="mb-2">Name:</label>
            <input type="text" id="name" className="mb-4 p-2 border rounded" />

            <label htmlFor="email" className="mb-2">Email:</label>
            <input type="email" id="email" className="mb-4 p-2 border rounded" />

            <label htmlFor="message" className="mb-2">Message:</label>
            <textarea id="message" className="mb-4 p-2 border rounded" rows={4} />

            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </Layout>
  );
};

export default ContactPage;
