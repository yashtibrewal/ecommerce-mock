import Link from "next/link";



export default function PageNotFound() {

  return (
    <div>
      <div>
        <h1>400 - The page you are looking for does not exist</h1>
        <p>Sorry, something went wrong on our end.</p>
        <Link href="/">Go back home</Link>
      </div>
    </div>
  )

}