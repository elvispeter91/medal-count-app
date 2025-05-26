import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
      <h1 className="text-5xl font-bold mb-4">Something went wrong</h1>
      <p className="text-base mb-8 text-center max-w-md">
        We encountered an unexpected error. Please try refreshing the page or
        come back later.
      </p>
      <Link
        href="/"
        className="px-4 py-2 border border-gray-800 rounded-md hover:bg-gray-100 transition"
      >
        Try Again
      </Link>
    </div>
  );
}
