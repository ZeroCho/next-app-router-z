import Link from "next/link";
import {NextPage} from "next";

const NotFound: NextPage = () => {
  return (
    <div>
      <div>404 Not Found</div>
      <Link href="/">메인 페이지로</Link>
    </div>
  )
}

export default NotFound;