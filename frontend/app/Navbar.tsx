import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Performance Tracker</Link>
        </div>
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/add_entry" className="hover:text-blue-300">
              Add Entry
            </Link>
          </li>
          <li>
            <Link href="/delete_entry" className="hover:text-blue-300">
              Delete Entry
            </Link>
          </li>
          <li>
            <Link href="/goals" className="hover:text-blue-300">
              Goals
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
