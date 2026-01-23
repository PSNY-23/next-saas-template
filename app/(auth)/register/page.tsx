import RegisterForm from '@/components/auth/register-form';

export const metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <RegisterForm />
      </div>
    </div>
  );
}
