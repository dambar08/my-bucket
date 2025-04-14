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

export default function Layout({ children }: { children: React.ReactNode }) {
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
        {children}
      </div>
    </div>
  );
}
