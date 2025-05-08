"use client"

import { Badge } from "@/components/ui/badge"

interface InterestCategoryProps {
  title: string
  interests: string[]
  selectedInterests: string[]
  onToggle: (interest: string) => void
}

export default function InterestCategory({ title, interests, selectedInterests, onToggle }: InterestCategoryProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge
            key={interest}
            variant={selectedInterests.includes(interest) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onToggle(interest)}
          >
            {interest}
          </Badge>
        ))}
      </div>
    </div>
  )
}
