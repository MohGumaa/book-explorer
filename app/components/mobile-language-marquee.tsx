import { useState } from "react"
import { Button } from "~/components/ui/button"

const POPULAR_LANGUAGES = [
  { code: "all", name: "All" },
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "la", name: "Latin" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ar", name: "Arabic" },
]

interface MobileLanguageMarqueeProps {
  onFilterChange: (filters: Partial<SearchFilters>) => void
}

const MobileLanguageMarqueeProps = ({ onFilterChange }: MobileLanguageMarqueeProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode)
    onFilterChange({
      languages: langCode === "all" ? undefined : [langCode],
    })
  }

  return (
    <div className="lg:hidden mb-6">
      <div className="relative">
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-3 px-4">
            {POPULAR_LANGUAGES.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "secondary"}
                size="sm"
                className={`
                  whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all
                  ${
                    selectedLanguage === lang.code
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-secondary/80 text-secondary-foreground hover:bg-secondary"
                  }
                `}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default MobileLanguageMarqueeProps
