import { BookOpen, Search } from "lucide-react"
import { Button } from "~/components/ui/button"

interface EmptyStateProps {
  type: "no-results" | "no-books"
  searchTerm?: string
  onClearSearch?: () => void
}

const EmptyState = ({ type, searchTerm, onClearSearch }: EmptyStateProps) => {
  if (type === "no-results") {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No books found</h3>
        <p className="text-muted-foreground mb-4">
          {searchTerm
            ? `No results found for "${searchTerm}". Try adjusting your search or filters.`
            : "No books match your current filters. Try adjusting your search criteria."}
        </p>
        {onClearSearch && <Button onClick={onClearSearch}>Clear Search</Button>}
      </div>
    )
  }

  return (
    <div className="text-center py-12">
      <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Welcome to Book Explorer</h3>
      <p className="text-muted-foreground">
        Discover thousands of classic books from Project Gutenberg. Use the search bar or filters to get started.
      </p>
    </div>
  )
}

export default EmptyState
