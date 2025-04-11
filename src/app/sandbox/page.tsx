import { mockFiles, mockFolders } from "@/lib/mock-data";
import { db } from "@/server/db";
import { folders_table, files_table } from "@/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          await db.insert(folders_table).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );
          await db.insert(files_table).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 5000,
              url: file.url,
              parent: (index % 3) + 1,
              mimeType: "application/pdf",
            })),
          );
        }}
      >
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
