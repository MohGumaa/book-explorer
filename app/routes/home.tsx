import type { Route } from "./+types/home";
import Header from "~/components/Header";
import BookCard from "~/components/BookCard";
import BookCardSkeleton from "~/components/skeleton/book-card-skeleton";
import { useState, useEffect, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { BookOpen, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import FilterSidebar from "~/components/filter-sidebar";
import EmptyState from "~/components/empty-state";
import SearchBar from "~/components/search-bar";
import MobileLanguageMarquee from "~/components/mobile-language-marquee";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Explorer - Discover Classic Literature" },
    { name: "description", content: "Explore thousands of classic books from Project Gutenberg with advanced search and filtering" },
  ];
}

const BASE_URL = "https://gutendex.com/books"

export default function Home() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<SearchFilters>({ page: 1 })
    const [hasNext, setHasNext] = useState(false)
    const [hasPrevious, setHasPrevious] = useState(false)

    const loadBooks = useCallback(async (newFilters: SearchFilters) => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({ page: String(newFilters.page || 1) });
            if (newFilters.search) params.append("search", newFilters.search);
            if (newFilters.author) params.append("author", newFilters.author);
            if (newFilters.languages && newFilters.languages.length > 0) params.append("languages", newFilters.languages.join(","));

            const url = `${BASE_URL}?${params.toString()}`;

            console.log(url)

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data)

            setBooks(data.results);
            setTotalCount(data.count);
            setHasNext(Boolean(data.next));
            setHasPrevious(Boolean(data.previous));

        } catch (err) {
            setError("Failed to load books. Please check your connection and try again.");
            console.error("Error loading books:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBooks(filters);
    }, [filters, loadBooks]);

    const handleSearch = (searchTerm: string) => {
        setFilters({ ...filters, search: searchTerm, page: 1 })
    }

    const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
        setFilters({ ...filters, ...newFilters, page: 1 })
    }

    const handlePageChange = (newPage: number) => {
        setFilters({ ...filters, page: newPage })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleClearSearch = () => {
        setFilters({ page: 1 })
    }

    const currentPage = filters.page || 1
    const totalPages = Math.ceil(totalCount / 32) // Gutendex returns 32 books per page

  return (
      <div>
          <div className="min-h-screen bg-background overflow-x-hidden max-w-full">
              {/* HEADER */}
              <Header>
                <div className="w-full md:flex-1 md:max-w-md md:mx-8">
                    <SearchBar onSearch={handleSearch} />
                </div>
              </Header>

              {/* CONTENT */}
              <div className="container mx-auto px-4 py-6 overflow-x-hidden">
                  <div className="flex gap-6">
                      {/* Sidebar - Hidden on mobile, shown on desktop */}
                      <aside className="w-96 flex-shrink-0 hidden lg:block">
                          <FilterSidebar onFilterChange={handleFilterChange} />
                      </aside>

                      {/* Main Content */}
                      <main className="flex-1 overflow-x-hidden max-w-full">
                          {/* Results Header */}
                          <section className="mb-6">
                              <h2 className="text-lg md:text-xl font-semibold mb-2">
                                  {filters.search ? `Search results for "${filters.search}"` : "Discover Classic Literature"}
                              </h2>
                              <p className="text-sm md:text-base text-muted-foreground">
                                  {loading ? "Loading..." : `${totalCount.toLocaleString()} books available`}
                              </p>
                          </section>

                          {/* Mobile Language Marquee */}
                          <MobileLanguageMarquee onFilterChange={handleFilterChange} />

                          {/* Error State */}
                            {error && (
                            <Alert className="mb-6">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <span>{error}</span>
                                <Button variant="outline" size="sm" onClick={() => loadBooks(filters)}>
                                    Try Again
                                </Button>
                                </AlertDescription>
                            </Alert>
                            )}

                          {/* Loading State */}
                          {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <BookCardSkeleton key={i} />
                            ))}
                            </div>
                          )}

                            {/* Empty State */}
                            {!loading && !error && books.length === 0 && (
                            <EmptyState
                                type={filters.search || filters.languages || filters.topic ? "no-results" : "no-books"}
                                searchTerm={filters.search}
                                onClearSearch={handleClearSearch}
                            />
                            )}

                          {/* Books Grid */}
                          {!loading && !error && books.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                                {books.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                                    <div className="flex items-center justify-center gap-2 sm:gap-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={!hasPrevious}
                                            className="flex-1 sm:flex-none"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                                            <span className="hidden sm:inline">Previous</span>
                                            <span className="sm:hidden">Prev</span>
                                        </Button>

                                        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap px-2">
                                        Page {currentPage} of {totalPages}
                                        </span>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={!hasNext}
                                            className="flex-1 sm:flex-none"
                                        >
                                            <span className="hidden sm:inline">Next</span>
                                            <span className="sm:hidden">Next</span>
                                            <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
                                        </Button>
                                    </div>
                                </div>
                                )}
                            </>
                          )}
                      </main>
                  </div>
              </div>
          </div>
      </div>
  )
}
