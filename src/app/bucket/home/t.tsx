"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Cloud,
  File,
  FileUp,
  Folder,
  FolderPlus,
  Folders,
  FolderUp,
  Grid3X3,
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
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { mockDriveData as initialData } from "@/lib/mock-data";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton, UploadDropzone } from "@/components/uploadthing";
import { useRouter } from "next/navigation";
import { DriveSidebar } from "@/app/_components/drive-sidebar";

export default function Home() {
  const navigate = useRouter();
  const [currentFolder, setCurrentFolder] = useState("root");
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: "root", name: "My Bucket" },
  ]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [fileUploadOpen, setFileUploadOpen] = useState(false);

  const currentFolderData = initialData[
    currentFolder as keyof typeof initialData
  ] as any;
  const currentItems = currentFolderData.children.map(
    (id: string) => initialData[id as keyof typeof initialData],
  );

  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);
    setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }]);
  };

  const navigateToBreadcrumb = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);
    setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].id);
  };

  const handleFileUpload = () => {
    // Mock file upload functionality
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      setFileUploadOpen(true);
      // In a real app, you would handle the file upload here
      setTimeout(() => {
        setFileUploadOpen(false);
        alert("Files uploaded successfully!");
      }, 2000);
    };
    input.click();
  };

  return (
    <div className="flex h-screen flex-col">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          navigate.refresh();
        }}
      />
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          navigate.refresh();
        }}
      />
      {/* Header */}
      <header className="flex items-center border-b px-6 py-3">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-blue-600">My Bucket</h1>
        </div>
        <div className="mx-6 flex flex-1 items-center rounded-full bg-gray-100 px-4 py-2">
          <Search className="mr-2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search in MyBucket"
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>
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
        <DriveSidebar
          onNavigateRoot={() => {
            setCurrentFolder("root");
            setBreadcrumbs([{ id: "root", name: "My Bucket" }]);
          }}
          onNewClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumbs and view controls */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="mx-1 h-4 w-4 text-gray-500" />
                  )}
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
                    <button
                      onClick={() => navigateToFolder(item.id, item.name)}
                      className="flex flex-col items-center"
                    >
                      <Folder className="mb-2 h-16 w-16 text-gray-400" />
                      <span className="text-center text-sm font-medium">
                        {item.name}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={`#file-${item.id}`}
                      className="flex flex-col items-center"
                    >
                      <File className="mb-2 h-16 w-16 text-gray-400" />
                      <span className="text-center text-sm font-medium">
                        {item.name}
                      </span>
                    </Link>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
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
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 border-b p-3 text-sm hover:bg-gray-50"
                >
                  <div className="col-span-6 flex items-center">
                    {item.type === "folder" ? (
                      <button
                        onClick={() => navigateToFolder(item.id, item.name)}
                        className="flex items-center"
                      >
                        <Folder className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ) : (
                      <Link
                        href={`#file-${item.id}`}
                        className="flex items-center"
                      >
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
  );
}
