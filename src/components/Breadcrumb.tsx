import Link from "next/link";
import { useRouter } from "next/navigation";

const Breadcrumb = () => {
  const router = useRouter();
  // const path = router?.asPath?.split("/").filter((p: any) => p);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">Home</Link>
        </li>
        {/* {path?.map((segment: any, index: any) => {
          const url = `/${path.slice(0, index + 1).join("/")}`;
          return (
            <li key={url} className="breadcrumb-item">
              <Link href={url}>{segment.replace("-", " ")}</Link>
            </li>
          );
        })} */}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
