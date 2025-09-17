import { BookOpen } from "lucide-react";
import { Link } from "react-router"

const Header = ({children}: {children?: React.ReactNode}) => {
    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-4 py-4 overflow-x-hidden">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-3">
                        <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                        <h1 className="text-xl md:text-2xl font-bold text-foreground">Book Explorer</h1>
                    </Link>
                    {children}
                </div>
            </div>
        </header>
    )
}
export default Header
