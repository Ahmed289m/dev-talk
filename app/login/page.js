import LoginForm from "../_components/login-form";

export default function Login() {
  return (
    <div className="login min-h-screen ">
      <main className="max-w-md mx-auto py-12 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
