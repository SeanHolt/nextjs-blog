import utilStyles from '../styles/utils.module.css';
import Image from 'next/image';

export function HomeLayout(props) {
    return (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{props.name}</h1>
          </>
        )
}
export default HomeLayout;