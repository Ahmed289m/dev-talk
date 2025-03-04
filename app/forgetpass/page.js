export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-md mx-auto py-12 px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Forgot your password?</h1>
          <p className="text-gray-600">
            Enter the email address you used to sign up and we&apos;ll send you
            a link to reset your password
          </p>
        </div>

        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Send reset link
          </button>
        </form>
      </main>
    </div>
  );
}
