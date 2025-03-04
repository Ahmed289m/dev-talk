import Link from "next/link";
import { useRouter } from "next/router";

export default function ResetPassword({ params }) {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-md mx-auto py-12 px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Reset your password</h1>
          <p className="text-gray-600">
            Create a new password for your account
          </p>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              New password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••••••••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="confirm-password" className="block mb-2">
              Confirm new password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••••••••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Reset password
          </button>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-green-600 hover:text-green-700">
              Return to login
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
