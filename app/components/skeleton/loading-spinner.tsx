import { Loader2 } from "lucide-react"

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2 text-muted-foreground">Loading books...</span>
    </div>
  )
}

export default LoadingSpinner
