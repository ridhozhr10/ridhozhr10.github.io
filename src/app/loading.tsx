import { BiLoader } from "react-icons/bi";
import BaseLayout from "./_components/layout/BaseLayout";

export default function Loading() {
  return (
    <BaseLayout>
      <BiLoader className="animate-spin" />
    </BaseLayout>
  );
}
