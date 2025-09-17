import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "~/components/ui/button";
// import { Separator } from "~/components/ui/separator"
import { POPULAR_LANGUAGES } from "../../constants"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface FilterSidebarProps {
  onFilterChange: (filters: Partial<SearchFilters>) => void
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

    const handleLanguageToggle = (langCode: string) => {
        const newLanguages = selectedLanguages.includes(langCode)
            ? selectedLanguages.filter((l) => l !== langCode)
            : [...selectedLanguages, langCode]

        setSelectedLanguages(newLanguages)
        onFilterChange({ languages: newLanguages.length > 0 ? newLanguages : undefined })
    }

    const clearAllFilters = () => {
        setSelectedLanguages([])
        onFilterChange({ languages: undefined })
    }

    const hasActiveFilters = selectedLanguages.length > 0;

    return (
        <Card className="sticky top-24">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                    </CardTitle>
                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                            <X className="w-4 h-4 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                {/* Languages Filter */}
                <div>
                    <h3 className="font-medium mb-3">Languages</h3>
                    <div className="space-y-2">
                        {POPULAR_LANGUAGES.map((lang) => (
                            <Button
                                key={lang.code}
                                variant={selectedLanguages.includes(lang.code) ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleLanguageToggle(lang.code)}
                                className="w-full justify-start"
                            >
                                {lang.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                <>
                    {/* <Separator /> */}
                    <div className="mt-10">
                    <h3 className="font-medium mb-3">Active Filters</h3>
                    <div className="space-y-2">
                        {selectedLanguages.map((langCode) => {
                        const lang = POPULAR_LANGUAGES.find((l) => l.code === langCode)
                        return (
                            <div key={langCode} className="flex items-center justify-between text-sm">
                            <span>Language: {lang?.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => handleLanguageToggle(langCode)}>
                                <X className="w-3 h-3" />
                            </Button>
                            </div>
                        )
                        })}
                    </div>
                    </div>
                </>
                )}
            </CardContent>
        </Card>
    )
}
export default FilterSidebar
