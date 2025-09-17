import type { Route } from "./+types/home";
import Header from "~/components/Header";
import BookCard from "~/components/BookCard";
import LoadingSpinner from "~/components/skeleton/loading-spinner";
import BookCardSkeleton from "~/components/skeleton/book-card-skeleton";
import { useState, useEffect, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { BookOpen, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import FilterSidebar from "~/components/filter-sidebar";
import EmptyState from "~/components/empty-state";
import SearchBar from "~/components/search-bar";
import MobileLanguageMarquee from "~/components/mobile-language-marquee";


const Popular = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  
// const BASE_URL = "http://localhost:5170/api/books"
const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const loadPopularBooks = async () => {
      try {
        setLoading(true)
        setError(null)
        const url = `${BASE_URL}/popular/top?limit=10`;
        // console.log(url)

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)

        setBooks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load popular books")
      } finally {
        setLoading(false)
      }
    }

    loadPopularBooks()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30'>
      <Header/>

      <main className="overflow-x-hidden max-w-full">
        <div className="container mx-auto px-4 py-6 overflow-x-hidden">
          
          {/* Loading */}
          {loading && (
             <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Popular Books</h1>
                <p className="text-slate-600">Discover the most downloaded classic literature</p>
              </div>
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
             </>
          )}

          {error && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Popular Books</h1>
                <p className="text-slate-600">Failed to load popular books - try again by refresh page</p>
              </div>
            </>
          )}

          {!loading && !error && books?.length > 0 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Popular Books</h1>
                <p className="text-slate-600 mb-4">Discover the most downloaded classic literature</p>
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {books.length} popular books
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  )
}

export default Popular
