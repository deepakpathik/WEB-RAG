import { useState, useEffect } from 'react'
import { askQuestion } from './services/api'
import logo from './assets/logo.png'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Loader2, CheckCircle2, Circle } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [searchStep, setSearchStep] = useState(0)

  const steps = [
    "Analyzing your question...",
    "Searching the web for information...",
    "Reading and verifying sources...",
    "Synthesizing the final answer..."
  ]

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    setResponse(null)
    setSearchStep(0)

    // Simulate steps progress over time
    const stepInterval = setInterval(() => {
      setSearchStep(prev => {
        if (prev < steps.length - 1) return prev + 1
        return prev
      })
    }, 800)

    try {
      const result = await askQuestion(query)
      clearInterval(stepInterval)
      setSearchStep(steps.length) // All complete

      // Small delay to show completion before showing result
      setTimeout(() => {
        setResponse(result)
        setIsLoading(false)
      }, 500)
    } catch (err) {
      clearInterval(stepInterval)
      setError(err.message || 'An error occurred while researching')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Header / Logo */}
      <div className="mb-8 text-center">
        <img src={logo} alt="Research Assistant" className="h-16 w-auto mx-auto mb-4" />
        {/* <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Research Assistant</h1>
        <p className="mt-2 text-neutral-600">Powered by AI & Web Search</p> */}
      </div>

      {/* Search Section */}
      <div className="w-full max-w-2xl mb-8">
        <Card className="shadow-lg border-neutral-200">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <Input
                  className="pl-10 h-12 text-lg bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-400 shadow-none"
                  placeholder="Ask a research question..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6" disabled={isLoading || !query.trim()}>
                {isLoading && searchStep < steps.length ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="w-full max-w-2xl mb-8 border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center gap-3 text-red-700">
            <span className="text-xl">⚠️</span>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Process Visualization */}
      {isLoading && !error && (
        <div className="w-full max-w-2xl mb-8">
          <Card className="border-neutral-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const isCompleted = searchStep > index
                  const isCurrent = searchStep === index

                  return (
                    <div key={index} className={`flex items-center gap-3 ${isCurrent || isCompleted ? 'text-neutral-900' : 'text-neutral-400'}`}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : isCurrent ? (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                      <span className={`font-medium ${isCurrent && "animate-pulse"}`}>{step}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results Section */}
      {response && !isLoading && (
        <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">

          {/* Answer Card */}
          <Card className="border-neutral-200 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center justify-between">
                Direct Answer
                {response.confidence !== null && response.confidence !== undefined && (
                  <Badge variant={response.confidence > 0.7 ? "default" : "secondary"}>
                    {Math.round(response.confidence * 100)}% Confidence
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <Separator />
            <ScrollArea className="h-max max-h-[600px] w-full rounded-md">
              <CardContent className="pt-6">
                <div className="prose prose-neutral max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response.answer}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </ScrollArea>
          </Card>

          {/* Sources Section */}
          {response.sources && response.sources.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 flex items-center gap-2">
                <span className="bg-neutral-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">i</span>
                Sources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {response.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow duration-200 border-neutral-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {source.title || source.url}
                        </h4>
                        <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                          {source.snippet || source.url}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-neutral-50 font-normal">
                            {new URL(source.url).hostname.replace('www.', '')}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
