// import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
// import { api, HydrateClient } from "@/trpc/server";

// export default async function Home() {
//   const hello = await api.post.hello({ text: "from tRPC" });

//   void api.post.getLatest.prefetch();

//   return (
//     <HydrateClient>
//       <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//         <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
//           <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//             Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//           </h1>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//             <Link
//               className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//               href="https://create.t3.gg/en/usage/first-steps"
//               target="_blank"
//             >
//               <h3 className="text-2xl font-bold">First Steps →</h3>
//               <div className="text-lg">
//                 Just the basics - Everything you need to know to set up your
//                 database and authentication.
//               </div>
//             </Link>
//             <Link
//               className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//               href="https://create.t3.gg/en/introduction"
//               target="_blank"
//             >
//               <h3 className="text-2xl font-bold">Documentation →</h3>
//               <div className="text-lg">
//                 Learn more about Create T3 App, the libraries it uses, and how
//                 to deploy it.
//               </div>
//             </Link>
//           </div>
//           <div className="flex flex-col items-center gap-2">
//             <p className="text-2xl text-white">
//               {hello ? hello.greeting : "Loading tRPC query..."}
//             </p>
//           </div>

//           <LatestPost />
//         </div>
//       </main>
//     </HydrateClient>
//   );
// }


"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  File,
  Folder,
  Grid3X3,
  Home,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share,
  Star,
  Trash,
  Upload,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Mock data for files and folders
const initialData = {
  root: {
    id: "root",
    name: "My Drive",
    type: "folder",
    children: ["folder1", "folder2", "file1", "file2", "file3"],
  },
  folder1: {
    id: "folder1",
    name: "Work Documents",
    type: "folder",
    children: ["file4", "file5", "folder3"],
  },
  folder2: {
    id: "folder2",
    name: "Personal",
    type: "folder",
    children: ["file6", "file7"],
  },
  folder3: {
    id: "folder3",
    name: "Projects",
    type: "folder",
    children: ["file8", "file9"],
  },
  file1: {
    id: "file1",
    name: "Resume.pdf",
    type: "file",
    mimeType: "application/pdf",
    size: "2.4 MB",
    modified: "Apr 10, 2025",
  },
  file2: {
    id: "file2",
    name: "Budget.xlsx",
    type: "file",
    mimeType: "application/excel",
    size: "1.8 MB",
    modified: "Apr 8, 2025",
  },
  file3: {
    id: "file3",
    name: "Vacation Photos.zip",
    type: "file",
    mimeType: "application/zip",
    size: "156 MB",
    modified: "Mar 25, 2025",
  },
  file4: {
    id: "file4",
    name: "Presentation.pptx",
    type: "file",
    mimeType: "application/powerpoint",
    size: "5.7 MB",
    modified: "Apr 5, 2025",
  },
  file5: {
    id: "file5",
    name: "Report.docx",
    type: "file",
    mimeType: "application/word",
    size: "1.2 MB",
    modified: "Apr 2, 2025",
  },
  file6: {
    id: "file6",
    name: "Family Photo.jpg",
    type: "file",
    mimeType: "image/jpeg",
    size: "3.5 MB",
    modified: "Mar 15, 2025",
  },
  file7: {
    id: "file7",
    name: "Tax Return.pdf",
    type: "file",
    mimeType: "application/pdf",
    size: "4.2 MB",
    modified: "Feb 28, 2025",
  },
  file8: {
    id: "file8",
    name: "Project Plan.docx",
    type: "file",
    mimeType: "application/word",
    size: "0.8 MB",
    modified: "Apr 9, 2025",
  },
  file9: {
    id: "file9",
    name: "Code Samples.zip",
    type: "file",
    mimeType: "application/zip",
    size: "12.3 MB",
    modified: "Apr 7, 2025",
  },
}

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState("root")
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: "root", name: "My Drive" }])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [fileUploadOpen, setFileUploadOpen] = useState(false)

  const currentFolderData = initialData[currentFolder as keyof typeof initialData] as any
  const currentItems = currentFolderData.children.map((id: string) => initialData[id as keyof typeof initialData])

  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId)
    setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }])
  }

  const navigateToBreadcrumb = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(newBreadcrumbs)
    setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].id)
  }

  const handleFileUpload = () => {
    // Mock file upload functionality
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.onchange = (e) => {
      setFileUploadOpen(true)
      // In a real app, you would handle the file upload here
      setTimeout(() => {
        setFileUploadOpen(false)
        alert("Files uploaded successfully!")
      }, 2000)
    }
    input.click()
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center border-b px-6 py-3">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-blue-600">Drive</h1>
        </div>
        <div className="mx-6 flex flex-1 items-center rounded-full bg-gray-100 px-4 py-2">
          <Search className="mr-2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search in Drive"
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r p-4">
          <div className="mb-6">
            <Button
              className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              onClick={handleFileUpload}
            >
              <Plus className="h-5 w-5" />
              <span>New</span>
            </Button>
          </div>

          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start font-normal"
              onClick={() => {
                setCurrentFolder("root")
                setBreadcrumbs([{ id: "root", name: "My Drive" }])
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal">
              <Users className="mr-2 h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal">
              <Star className="mr-2 h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal">
              <Trash className="mr-2 h-4 w-4" />
              Trash
            </Button>
          </nav>

          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Storage</span>
              <span>15.5 GB of 30 GB used</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-1/2 bg-blue-600"></div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumbs and view controls */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center">
                  {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-gray-500" />}
                  <Button
                    variant="ghost"
                    className="h-auto p-1 text-sm font-medium"
                    onClick={() => navigateToBreadcrumb(index)}
                  >
                    {crumb.name}
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(viewMode === "list" && "bg-gray-100")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={cn(viewMode === "grid" && "bg-gray-100")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* File upload indicator */}
          {fileUploadOpen && (
            <div className="mb-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
              <div className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                <span>Uploading files...</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-blue-200">
                <div className="h-full w-2/3 animate-pulse bg-blue-600"></div>
              </div>
            </div>
          )}

          {/* Files and folders */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {currentItems.map((item: any) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col items-center rounded-lg border p-4 hover:bg-gray-50"
                >
                  {item.type === "folder" ? (
                    <button onClick={() => navigateToFolder(item.id, item.name)} className="flex flex-col items-center">
                      <Folder className="mb-2 h-16 w-16 text-gray-400" />
                      <span className="text-center text-sm font-medium">{item.name}</span>
                    </button>
                  ) : (
                    <Link href={`#file-${item.id}`} className="flex flex-col items-center">
                      <File className="mb-2 h-16 w-16 text-gray-400" />
                      <span className="text-center text-sm font-medium">{item.name}</span>
                    </Link>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        Add to starred
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        Move to trash
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border">
              <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 p-3 text-sm font-medium text-gray-500">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-2">Last modified</div>
                <div className="col-span-2">File size</div>
              </div>

              {currentItems.map((item: any) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 border-b p-3 text-sm hover:bg-gray-50">
                  <div className="col-span-6 flex items-center">
                    {item.type === "folder" ? (
                      <button onClick={() => navigateToFolder(item.id, item.name)} className="flex items-center">
                        <Folder className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ) : (
                      <Link href={`#file-${item.id}`} className="flex items-center">
                        <File className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span>Me</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span>{item.modified || "—"}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span>{item.size || "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
