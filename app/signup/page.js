import SignupForm from "../_components/signup-form";

export default function Signup() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-md mx-auto py-12 px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
        </div>
        <SignupForm />
      </main>
    </div>
  );
}
