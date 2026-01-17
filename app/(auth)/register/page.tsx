import RegisterForm from '@/components/auth/register-form';

export const metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold mb-6">Create an account</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
