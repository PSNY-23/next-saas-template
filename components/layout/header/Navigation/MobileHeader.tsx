import Link from "next/link";

const MobileHeader: React.FC<{ item: any }> = ({ item }) => {
  return (
    <>
      <Link
        href={item.href}
        className="text-black dark:text-white rounded-md text-base font-medium group"
      >
        <li
          className={`rounded-md w-full p-3 px-4 transition-colors duration-200 hover:bg-dark_black/5 dark:hover:bg-white/5`}
        >
          {item.label}
        </li>
      </Link>
    </>
  );
};

export default MobileHeader;
