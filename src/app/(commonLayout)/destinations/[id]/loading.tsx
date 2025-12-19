import { Spinner } from "@/src/app/components/ui/spinner"

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="size-20" color="black"/>
    </div>
  )
}

export default Loading