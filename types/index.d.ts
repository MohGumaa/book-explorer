interface Author  {
    name: string
    birth_year?: number
    death_year?: number
}

interface Book {
    id: number;
    title: string;
    authors: Author[];
    summaries: string[];
    translators: string[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    media_type: string;
    formats: {
        [key: string]: string; // since formats can have dynamic MIME types
    };
    download_count: number;
}

interface BooksResponse {
    count: number
    next: string | null
    previous: string | null
    results: Book[]
}

interface SearchFilters {
    search?: string
    languages?: string[]
    topic?: string
    author?: string
    page?: number
}