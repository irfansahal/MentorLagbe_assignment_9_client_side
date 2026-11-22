import Link from 'next/link'

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-muted px-6 py-16">
      <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow-sm">
        <p className="text-6xl font-bold text-[#fb9506]">404</p>
        <h2 className="mt-4 text-2xl font-bold">You are not founding your current page</h2>
        <p className="mt-2 text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-[#fb9506] px-6 py-2 font-semibold text-white hover:bg-[#fbbe06]"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
