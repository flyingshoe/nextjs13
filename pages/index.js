import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/jobSearch">Job Search</Link>
      <Link href="/jobSearch/ssr">Job Search SSR</Link>
    </>
  );
}
