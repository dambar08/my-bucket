"use client"
import { ChevronRight, Grid3X3, List, Upload } from "lucide-react"
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils"

interface Breadcrumb {
  id: string
  name: string
}

interface FileExplorerProps {
  currentFolder: string
  breadcrumbs: Breadcrumb[]
  viewMode: "grid" | "list"
  fileUploadOpen: boolean
  driveData: Record<string, any>
  onViewModeChange: (mode: "grid" | "list") => void
  onNavigateToFolder: (folderId: string, folderName: string) => void
  onNavigateToBreadcrumb: (index: number) => void
}

export function FileExplorer({
  currentFolder,
  breadcrumbs,
  viewMode,
  fileUploadOpen,
  driveData,
  onViewModeChange,
  onNavigateToFolder,
  onNavigateToBreadcrumb,
}: FileExplorerProps) {
  const currentFolderData = driveData[currentFolder] as any
  const currentItems = currentFolderData.children.map((id: string) => driveData[id])

  return (
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
                onClick={() => onNavigateToBreadcrumb(index)}
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
            onClick={() => onViewModeChange("list")}
            className={cn(viewMode === "list" && "bg-gray-100")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange("grid")}
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
            <FileItem key={item.id} item={item} viewMode="grid" onNavigateToFolder={onNavigateToFolder} />
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
            <FileItem key={item.id} item={item} viewMode="list" onNavigateToFolder={onNavigateToFolder} />
          ))}
        </div>
      )}
    </main>
  )
}
