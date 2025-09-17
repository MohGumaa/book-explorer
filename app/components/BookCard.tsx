import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Download, BookOpen, Users, ExternalLink } from "lucide-react"

const BookCard = ({ book} : {book: Book}) => {
    const [imageError, setImageError] = useState(false);

    const getBookCoverUrl = (book: Book) => {
        return book.formats["image/jpeg"] || null
    }

    const getReadingUrl = (book: Book) => {
        return (
            book.formats["text/html"] || book.formats["text/plain; charset=utf-8"] || book.formats["application/epub+zip"]
        )
    }

    const formatAuthors = (authors: Book["authors"]) => {
        return authors.map((author) => author.name).join(", ")
    }

    const coverUrl = getBookCoverUrl(book)

    return (
        <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3 p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                        {coverUrl && !imageError ? (
                            <img
                                src={coverUrl || "/placeholder.svg"}
                                alt={`Cover of ${book.title}`}
                                className="w-16 h-20 sm:w-20 sm:h-28 object-cover rounded-md border shadow-sm"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-16 h-20 sm:w-20 sm:h-28 bg-muted rounded-md border flex items-center justify-center">
                                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg leading-tight text-balance line-clamp-2 md:line-clamp-3 mb-2 group-hover:text-primary transition-colors">
                            {book.title}
                        </CardTitle>
                        {book.authors.length > 0 && (
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-2">
                                <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="line-clamp-1">{formatAuthors(book.authors)}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{book.download_count.toLocaleString()} downloads</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-3 p-4 sm:p-6 pt-0">
                <div className="flex flex-wrap gap-1">
                    {book.languages.slice(0, 2).map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                            {lang.toUpperCase()}
                        </Badge>
                    ))}
                    {book.languages.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                            +{book.languages.length - 2}
                        </Badge>
                    )}
                </div>

                {book.subjects.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {book.subjects.slice(0, 2).map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs line-clamp-1">
                                {subject.split(" -- ")[0]}
                            </Badge>
                        ))}
                        {book.subjects.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                                +{book.subjects.length - 2}
                            </Badge>
                        )}
                    </div>
                )}

                <div className="mt-auto pt-3">
                    {getReadingUrl(book) ? (
                        <Button className="w-full text-sm cursor-pointer" size="lg" onClick={() => window.open(getReadingUrl(book), "_blank")}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Read Now
                            <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                    ) : (
                        <Button className="w-full text-sm cursor-not-allowed" size="lg" disabled>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Not Available
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
export default BookCard
