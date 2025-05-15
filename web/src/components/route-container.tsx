import { Separator } from "./ui/separator"

export default function RouteContainer(props: {
  label: string,
  description?: string,
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{props.label}</h1>
      </div>
      <Separator />
      {props.children}
    </div>
  )
}
