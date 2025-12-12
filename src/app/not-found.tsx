import Link from "next/link";


export default function NotFound() {
  return (
    <html>
      <body>
        <h1>404 - Page Not Found</h1>
        <Link href="/">Home</Link>
      </body>
    </html>
  );
}