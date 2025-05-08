import Image from "next/image"

export default function LandingHero() {
  return (
    <div className="relative w-full max-w-lg aspect-square md:max-w-xl">
      <Image
        src="/placeholder.svg?height=800&width=800"
        alt="Diverse group of people enjoying Swedish landmarks"
        width={800}
        height={800}
        className="object-cover rounded-xl"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent rounded-xl" />
    </div>
  )
}
