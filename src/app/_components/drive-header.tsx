import { Search } from "lucide-react"
import { Settings } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DriveHeader() {
  return (
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
  )
}
