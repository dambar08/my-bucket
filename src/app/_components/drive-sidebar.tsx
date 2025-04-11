"use client"

import { Home, Plus, Star, Trash, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DriveSidebarProps {
  onNewClick: () => void
  onNavigateRoot: () => void
}

export function DriveSidebar({ onNewClick, onNavigateRoot }: DriveSidebarProps) {
  return (
    <aside className="w-64 border-r p-4">
      <div className="mb-6">
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          onClick={onNewClick}
        >
          <Plus className="h-5 w-5" />
          <span>New</span>
        </Button>
      </div>

      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start font-normal" onClick={onNavigateRoot}>
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
  )
}
