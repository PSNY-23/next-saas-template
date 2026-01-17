import LoginForm from '@/components/auth/login-form';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold mb-6">Log in to your account</h1>
        <LoginForm />
      </div>
    </div>
  );
}
