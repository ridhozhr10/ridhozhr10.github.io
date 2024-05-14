import Link from "next/link";
import BaseLayout from "./_components/layout/BaseLayout";

export const metadata = {
  title: "> $ exit code 1.",
};

export default function NotFound() {
  return (
    <BaseLayout logoText="exit code 1.">
      <div>
        <h2 className="text-4xl mb-5">Page Not Found</h2>
        <Link href="/">Home</Link>
      </div>
    </BaseLayout>
  );
}
