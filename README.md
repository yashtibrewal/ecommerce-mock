This is a [Next.js](https://nextjs.org/) based project for depicted an ecommerce mock website.
The reason we have used Nextjs compared to just react is because ecommerce websites should perform well in SEO,
and nextjs does a pretty good job for the same.
If its a react application SPA will contain a single head component,
however in Nextjs we can have server rendered components and add product information dynamically.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The port could be different based on the availibility.

Functionalities Included:
1. Login/Logout
2. Cart Page
3. Wish List Page
4. Indivisual Product Page
5. Main landing products page with filters

This is a serverless project and is just a mock project, hence is stateless stored on the backend.

Products and other objects can be added to wishlist, cart etc.. however all of this is just stored on the frontend localstorage using [redux-persist](https://www.npmjs.com/package/redux-persist) library.

For cookies handling for routes, [iron-session](https://www.npmjs.com/package/iron-session/v/8.0.0-beta.5) is used.

For testing purposes, I have used cypress. To view cypress testing in real time, feel free to pull the code and run the test script.

```bash
npm run cypress:open
```

After that, the UI will guide you for the same.
You can run the tests there accordingly.
