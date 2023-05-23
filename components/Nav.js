import BiStore from 'react-icons/bi';
import Link from 'next/link';

function Nav() {
  return (
    <aside>
      <Link href='/'>
        <BiStore />
      </Link>
    </aside>
  );
}

export default Nav;
