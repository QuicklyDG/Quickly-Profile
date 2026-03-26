import Link from "next/link";

export const metadata = {
  title: "Home Page",
};

export default function Page() {
  return (
    <div>
      <Link href="/about">Go to About</Link>
    </div>
  );
}
