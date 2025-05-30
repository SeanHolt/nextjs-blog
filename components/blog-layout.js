import utilStyles from '../styles/utils.module.css';
import Image from 'next/image';
import Link from 'next/link';

export function BlogLayout(props) {
  return (
    <>
      <Link href="/">
        <Image
          priority
          src="/images/profile.jpg"
          className={utilStyles.borderCircle}
          height={108}
          width={108}
          alt=""
        />
      </Link>
      <h2 className={utilStyles.headingLg}>
        <Link href="/about" className={utilStyles.colorInherit}>
          {props.name}
        </Link>
      </h2>
    </>
  );
}
export default BlogLayout;