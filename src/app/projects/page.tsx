import { baseMetadata, baseURL } from "@/constants";
import BaseLayout from "../_components/layout/BaseLayout";

export const metadata = baseMetadata("projects", "Project");

export default function Project() {
  return (
    <BaseLayout logoText="ls ~/Workspaces">
      <main>
        <h1 className="text-5xl">Coming Soon</h1>
      </main>
    </BaseLayout>
  );
}
