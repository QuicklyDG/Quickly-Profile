"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div>
      <title>Home Page</title>
      <Link href="/about">Go to About</Link>
    </div>
  );
}
