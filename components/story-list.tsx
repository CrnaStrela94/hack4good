import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const stories = [
  {
    id: 1,
    name: "Anna",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
  },
  {
    id: 2,
    name: "Johan",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
  },
  {
    id: 3,
    name: "Maria",
    image: "/placeholder.svg?height=100&width=100",
    active: false,
  },
  {
    id: 4,
    name: "Erik",
    image: "/placeholder.svg?height=100&width=100",
    active: false,
  },
  {
    id: 5,
    name: "Sofia",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
  },
  {
    id: 6,
    name: "Lars",
    image: "/placeholder.svg?height=100&width=100",
    active: false,
  },
]

export default function StoryList() {
  return (
    <div className="py-4 border-b">
      <ScrollArea>
        <div className="flex px-4 gap-4">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 w-20">
              <div
                className={`p-0.5 rounded-full ${story.active ? "bg-gradient-to-tr from-yellow-400 to-blue-500" : "bg-muted"}`}
              >
                <Avatar className="w-16 h-16 border-2 border-background">
                  <AvatarImage src={story.image || "/placeholder.svg"} alt={story.name} />
                  <AvatarFallback>{story.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs truncate w-full text-center">{story.name}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
