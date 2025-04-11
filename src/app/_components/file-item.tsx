"use client";

import Link from "next/link";
import { File, Folder, MoreHorizontal, Share, Star, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FileItemProps {
  item: {
    id: string;
    name: string;
    type: "file" | "folder";
    modified?: string;
    size?: string;
  };
  viewMode: "grid" | "list";
  onNavigateToFolder: (folderId: string, folderName: string) => void;
}

export function FileItem({
  item,
  viewMode,
  onNavigateToFolder,
}: FileItemProps) {
  if (viewMode === "grid") {
    return (
      <div className="group relative flex flex-col items-center rounded-lg border p-4 hover:bg-gray-50">
        {item.type === "folder" ? (
          <button
            onClick={() => onNavigateToFolder(item.id, item.name)}
            className="flex flex-col items-center"
          >
            <Folder className="mb-2 h-16 w-16 text-gray-400" />
            <span className="text-center text-sm font-medium">{item.name}</span>
          </button>
        ) : (
          <Link
            href={`#file-${item.id}`}
            className="flex flex-col items-center"
          >
            <File className="mb-2 h-16 w-16 text-gray-400" />
            <span className="text-center text-sm font-medium">{item.name}</span>
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
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 border-b p-3 text-sm hover:bg-gray-50">
      <div className="col-span-6 flex items-center">
        {item.type === "folder" ? (
          <button
            onClick={() => onNavigateToFolder(item.id, item.name)}
            className="flex items-center"
          >
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
        <span>{item.modified ?? "—"}</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span>{item.size ?? "—"}</span>
      </div>
    </div>
  );
}
