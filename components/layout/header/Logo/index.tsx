import Image from 'next/image';
import Link from 'next/link';


const Logo = () => {
    return (
        <Link href="/" className='flex items-center justify-center gap-2'>
            <Image
                src="/images/logo/logo.svg"
                alt="logo"
                width={160}
                height={50}
                style={{ width: 'auto', height: 'auto' }}
                quality={100}
                priority={true}
                className='dark:hidden'
            />
            <Image
                src="/images/logo/DarkModeLogo.svg"
                alt="logo"
                width={160}
                height={50}
                style={{ width: 'auto', height: 'auto' }}
                quality={100}
                className='dark:block hidden'
            />
            <span className='text-4xl font-bold'>Alchemist</span>
        </Link>
    );
};

export default Logo;
