import Link from "next/link";



export default function InternalServerError() {

  return (
    <div>
      <div>
        <h1>500 - Server-side error occurred</h1>
        <p>Sorry, something went wrong on our end.</p>
        <Link href="/">Go back home</Link>
      </div>
    </div>
  )

}