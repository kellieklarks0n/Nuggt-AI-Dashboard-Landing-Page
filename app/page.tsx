"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  MessageSquare,
  Target,
  BarChart3,
  Phone,
  Zap,
  ArrowDown,
  Search,
  Users,
  Clock,
  Star,
  ArrowUp,
} from "lucide-react"

// Mock data for the dashboard
const aiEngineData = [
  {
    name: "ChatGPT",
    visibility: 85,
    citations: 142,
    trend: "+12%",
    color: "#10B981",
    logo: "🤖",
  },
  {
    name: "Perplexity.ai",
    visibility: 72,
    citations: 98,
    trend: "+8%",
    color: "#3B82F6",
    logo: "🔍",
  },
  {
    name: "Google Gemini",
    visibility: 68,
    citations: 87,
    trend: "+15%",
    color: "#F59E0B",
    logo: "💎",
  },
  {
    name: "Claude",
    visibility: 61,
    citations: 73,
    trend: "+5%",
    color: "#8B5CF6",
    logo: "🧠",
  },
  {
    name: "Bing Copilot",
    visibility: 45,
    citations: 52,
    trend: "+3%",
    color: "#EF4444",
    logo: "🚁",
  },
]

const trendData = [
  { month: "Jan", ChatGPT: 65, Perplexity: 45, Gemini: 35, Claude: 25 },
  { month: "Feb", ChatGPT: 72, Perplexity: 52, Gemini: 42, Claude: 31 },
  { month: "Mar", ChatGPT: 78, Perplexity: 58, Gemini: 48, Claude: 38 },
  { month: "Apr", ChatGPT: 85, Perplexity: 65, Gemini: 55, Claude: 45 },
  { month: "May", ChatGPT: 92, Perplexity: 72, Gemini: 62, Claude: 52 },
  { month: "Jun", ChatGPT: 98, Perplexity: 78, Gemini: 68, Claude: 58 },
]

// Mock data for AI Search Traffic
const trafficData = [
  {
    query: "best project management software",
    volume: 12500,
    platforms: ["ChatGPT", "Perplexity", "Gemini"],
    trend: "+15%",
  },
  { query: "AI marketing tools comparison", volume: 8900, platforms: ["ChatGPT", "Claude", "Gemini"], trend: "+23%" },
  { query: "cloud storage solutions", volume: 7200, platforms: ["Perplexity", "Gemini", "Bing"], trend: "+8%" },
  { query: "cybersecurity best practices", volume: 6800, platforms: ["ChatGPT", "Claude"], trend: "+12%" },
  { query: "remote work productivity tips", volume: 5400, platforms: ["ChatGPT", "Perplexity"], trend: "+18%" },
]

const platformTrafficData = [
  { platform: "ChatGPT", queries: 45200, users: 2.1, growth: "+24%" },
  { platform: "Perplexity", queries: 28900, users: 1.3, growth: "+31%" },
  { platform: "Google Gemini", queries: 22100, users: 0.9, growth: "+18%" },
  { platform: "Claude", queries: 18700, users: 0.7, growth: "+15%" },
]

// Mock data for Brand Visibility & Rankings
const brandRankingData = [
  { brand: "TechCorp", position: 1, mentions: 342, visibility: 89, change: "+2", platforms: 5 },
  { brand: "InnovateLab", position: 2, mentions: 298, visibility: 76, change: "+1", platforms: 4 },
  { brand: "DataFlow", position: 3, mentions: 267, visibility: 71, change: "-1", platforms: 4 },
  { brand: "CloudSync", position: 4, mentions: 234, visibility: 65, change: "+3", platforms: 3 },
  { brand: "SecureNet", position: 5, mentions: 198, visibility: 58, change: "-2", platforms: 3 },
]

const competitorData = [
  { competitor: "Competitor A", visibility: 72, mentions: 289, trend: "+8%", color: "#EF4444" },
  { competitor: "Competitor B", visibility: 68, mentions: 245, trend: "+5%", color: "#F59E0B" },
  { competitor: "Your Brand", visibility: 89, mentions: 342, trend: "+12%", color: "#10B981" },
  { competitor: "Competitor C", visibility: 61, mentions: 198, trend: "+3%", color: "#8B5CF6" },
]

// Mock data for AI Citations
const citationData = [
  {
    source: "Ultimate Guide to Project Management",
    citations: 45,
    platforms: ["ChatGPT", "Perplexity", "Gemini"],
    lastCited: "2 hours ago",
    type: "Blog Post",
    performance: "High",
  },
  {
    source: "AI Marketing Strategies Whitepaper",
    citations: 38,
    platforms: ["ChatGPT", "Claude"],
    lastCited: "5 hours ago",
    type: "Whitepaper",
    performance: "High",
  },
  {
    source: "Product Feature Comparison",
    citations: 32,
    platforms: ["Perplexity", "Gemini", "Bing"],
    lastCited: "1 day ago",
    type: "Landing Page",
    performance: "Medium",
  },
  {
    source: "Customer Success Stories",
    citations: 28,
    platforms: ["ChatGPT", "Claude"],
    lastCited: "2 days ago",
    type: "Case Study",
    performance: "Medium",
  },
]

const citationTrendData = [
  { month: "Jan", citations: 125, mentions: 89 },
  { month: "Feb", citations: 142, mentions: 98 },
  { month: "Mar", citations: 168, mentions: 112 },
  { month: "Apr", citations: 189, mentions: 134 },
  { month: "May", citations: 215, mentions: 156 },
  { month: "Jun", citations: 243, mentions: 178 },
]

export default function AIVisibilityDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeSection, setActiveSection] = useState("")
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null)
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "pricing"]
      const scrollPosition = window.scrollY + 100 // Offset for header height

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            return
          }
        }
      }

      // If we're at the top or no section is active, clear active section
      if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Helper function to create SVG path for line chart
  const createPath = (data: number[], width: number, height: number) => {
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue || 1

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - minValue) / range) * height
      return `${x},${y}`
    })

    return `M ${points.join(" L ")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-amber-200/50 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src="/images/nuggt-logo.jpg" alt="Nuggt Logo" className="h-8 w-8 rounded-lg shadow-sm" />
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-lg blur opacity-30"></div>
              </div>
              <span className="text-xl font-bold text-gray-800">Nuggt</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className={`transition-all duration-200 font-medium ${
                  activeSection === "features"
                    ? "text-amber-600 font-bold border-b-2 border-amber-600 pb-1"
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                Features
              </a>
              <a
                href="#pricing"
                className={`transition-all duration-200 font-medium ${
                  activeSection === "pricing"
                    ? "text-amber-600 font-bold border-b-2 border-amber-600 pb-1"
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                Pricing
              </a>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="font-bold bg-transparent border-amber-300 text-gray-700 hover:bg-amber-100 hover:border-amber-400 hover:text-amber-700 transition-all duration-200"
              >
                <a href="mailto:tedmond.chang@nuggt.io">Contact Us</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-100/15 to-yellow-100/15 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Real-Time AI Search Insights - All the Key Data Your Marketing Team Needs.
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
              Track brand rankings, analyze AI-driven traffic, and deliver visible results for clients.
            </p>

            {/* Mock Dashboard Preview */}
            <div className="mb-16 max-w-6xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-800">AI Visibility Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live Data</span>
                  </div>
                </div>

                {/* AI Engine Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                  {aiEngineData.map((engine, index) => (
                    <div
                      key={engine.name}
                      className={`bg-white/80 rounded-xl p-4 border transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg ${
                        selectedEngine === engine.name
                          ? "border-amber-400 bg-white/90"
                          : "border-amber-200/50 hover:border-amber-300"
                      }`}
                      onClick={() => setSelectedEngine(selectedEngine === engine.name ? null : engine.name)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{engine.logo}</span>
                          <h4 className="text-sm font-semibold text-gray-800 truncate">{engine.name}</h4>
                        </div>
                        <span className="text-xs text-green-600 font-medium">{engine.trend}</span>
                      </div>
                      <div className="mb-2">
                        <div className="text-2xl font-bold text-gray-800">{engine.visibility}%</div>
                        <div className="text-xs text-gray-600">Visibility Score</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${engine.visibility}%`,
                            backgroundColor: engine.color,
                          }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">{engine.citations} citations</div>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-200/30">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-800">AI Platform Trends</h4>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { name: "ChatGPT", color: "#10B981", logo: "🤖" },
                        { name: "Perplexity", color: "#3B82F6", logo: "🔍" },
                        { name: "Gemini", color: "#F59E0B", logo: "💎" },
                        { name: "Claude", color: "#8B5CF6", logo: "🧠" },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center space-x-2">
                          <span className="text-sm">{item.logo}</span>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs text-gray-700">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Line Chart Visualization */}
                  <div className="h-40 bg-white/50 rounded-lg p-4 relative">
                    <svg width="100%" height="100%" className="overflow-visible">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#D1D5DB" strokeWidth="0.5" opacity="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Chart lines */}
                      <g>
                        {/* ChatGPT line */}
                        <path
                          d={createPath(
                            trendData.map((d) => d.ChatGPT),
                            280,
                            120,
                          )}
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          className="transition-all duration-300 hover:stroke-width-4"
                        />

                        {/* Perplexity line */}
                        <path
                          d={createPath(
                            trendData.map((d) => d.Perplexity),
                            280,
                            120,
                          )}
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          className="transition-all duration-300 hover:stroke-width-4"
                        />

                        {/* Gemini line */}
                        <path
                          d={createPath(
                            trendData.map((d) => d.Gemini),
                            280,
                            120,
                          )}
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="3"
                          className="transition-all duration-300 hover:stroke-width-4"
                        />

                        {/* Claude line */}
                        <path
                          d={createPath(
                            trendData.map((d) => d.Claude),
                            280,
                            120,
                          )}
                          fill="none"
                          stroke="#8B5CF6"
                          strokeWidth="3"
                          className="transition-all duration-300 hover:stroke-width-4"
                        />

                        {/* Data points */}
                        {trendData.map((data, index) => {
                          const x = (index / (trendData.length - 1)) * 280
                          const maxValue = Math.max(
                            ...trendData.flatMap((d) => [d.ChatGPT, d.Perplexity, d.Gemini, d.Claude]),
                          )
                          const minValue = Math.min(
                            ...trendData.flatMap((d) => [d.ChatGPT, d.Perplexity, d.Gemini, d.Claude]),
                          )
                          const range = maxValue - minValue || 1

                          return (
                            <g key={data.month}>
                              {/* ChatGPT point */}
                              <circle
                                cx={x}
                                cy={120 - ((data.ChatGPT - minValue) / range) * 120}
                                r="4"
                                fill="#10B981"
                                className="cursor-pointer hover:r-6 transition-all duration-200"
                                onMouseEnter={() => setHoveredMonth(data.month)}
                                onMouseLeave={() => setHoveredMonth(null)}
                              />

                              {/* Perplexity point */}
                              <circle
                                cx={x}
                                cy={120 - ((data.Perplexity - minValue) / range) * 120}
                                r="4"
                                fill="#3B82F6"
                                className="cursor-pointer hover:r-6 transition-all duration-200"
                                onMouseEnter={() => setHoveredMonth(data.month)}
                                onMouseLeave={() => setHoveredMonth(null)}
                              />

                              {/* Gemini point */}
                              <circle
                                cx={x}
                                cy={120 - ((data.Gemini - minValue) / range) * 120}
                                r="4"
                                fill="#F59E0B"
                                className="cursor-pointer hover:r-6 transition-all duration-200"
                                onMouseEnter={() => setHoveredMonth(data.month)}
                                onMouseLeave={() => setHoveredMonth(null)}
                              />

                              {/* Claude point */}
                              <circle
                                cx={x}
                                cy={120 - ((data.Claude - minValue) / range) * 120}
                                r="4"
                                fill="#8B5CF6"
                                className="cursor-pointer hover:r-6 transition-all duration-200"
                                onMouseEnter={() => setHoveredMonth(data.month)}
                                onMouseLeave={() => setHoveredMonth(null)}
                              />

                              {/* Month labels */}
                              <text
                                x={x}
                                y={140}
                                textAnchor="middle"
                                className={`text-xs transition-colors duration-200 ${
                                  hoveredMonth === data.month ? "fill-gray-800 font-semibold" : "fill-gray-600"
                                }`}
                              >
                                {data.month}
                              </text>

                              {/* Tooltip */}
                              {hoveredMonth === data.month && (
                                <g>
                                  <rect
                                    x={x - 40}
                                    y={-20}
                                    width="80"
                                    height="60"
                                    fill="white"
                                    stroke="#D1D5DB"
                                    rx="4"
                                    className="drop-shadow-lg"
                                  />
                                  <text
                                    x={x}
                                    y={-5}
                                    textAnchor="middle"
                                    className="text-xs fill-gray-800 font-semibold"
                                  >
                                    {data.month}
                                  </text>
                                  <text x={x} y={8} textAnchor="middle" className="text-xs fill-green-600">
                                    ChatGPT: {data.ChatGPT}%
                                  </text>
                                  <text x={x} y={20} textAnchor="middle" className="text-xs fill-blue-600">
                                    Perplexity: {data.Perplexity}%
                                  </text>
                                  <text x={x} y={32} textAnchor="middle" className="text-xs fill-yellow-600">
                                    Gemini: {data.Gemini}%
                                  </text>
                                </g>
                              )}
                            </g>
                          )
                        })}
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Interactive Dashboard Controls */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === "overview"
                          ? "bg-amber-500 text-white"
                          : "bg-amber-100 text-gray-700 hover:bg-amber-200"
                      }`}
                      onClick={() => setActiveTab("overview")}
                    >
                      Overview
                    </button>
                    <button
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === "analytics"
                          ? "bg-amber-500 text-white"
                          : "bg-amber-100 text-gray-700 hover:bg-amber-200"
                      }`}
                      onClick={() => setActiveTab("analytics")}
                    >
                      Analytics
                    </button>
                    <button
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === "reports"
                          ? "bg-amber-500 text-white"
                          : "bg-amber-100 text-gray-700 hover:bg-amber-200"
                      }`}
                      onClick={() => setActiveTab("reports")}
                    >
                      Reports
                    </button>
                  </div>
                  <div className="text-xs text-gray-600">Last updated: 2 minutes ago</div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg"
                asChild
              >
                <a href="#pricing">
                  <Zap className="mr-2 h-6 w-6" />
                  I'm In!
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-400 text-gray-700 hover:border-amber-500 hover:bg-amber-100 hover:text-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg bg-white/50"
                asChild
              >
                <a href="#features">
                  <ArrowDown className="mr-2 h-6 w-6" />
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Selling Points Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-yellow-50 to-amber-50"
      >
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            The Ultimate AI-First Search Platform
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Unleash the power of real‑time AI search: track traffic trends, monitor brand rankings, and capture every AI
            citation. Tailored for marketing agencies ready to lead the next wave.
          </p>
        </div>

        {/* USP 1: AI Search Traffic Data */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl mr-4 shadow-sm border border-blue-300">
                  <BarChart3 className="h-7 w-7 text-blue-600" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 text-sm font-semibold border border-blue-300"
                >
                  Real-Time Analytics
                </Badge>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                AI Search Traffic Data
              </h3>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                We track and break down real-time traffic data from leading AI search engines like ChatGPT, Google SGE,
                and Perplexity. Understand what users are asking, and which brands are being surfaced.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                This isn't just search insight — it's a deep analysis into how AI influences visibility and customer
                journeys across industries.
              </p>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">Real-time traffic monitoring across AI platforms</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">User query analysis and trending topics</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">Cross-industry visibility insights</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              {/* AI Search Traffic Dashboard Mock */}
              <div className="relative group">
                <div className="bg-white/70 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-800">AI Search Traffic Analytics</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600">Live</span>
                    </div>
                  </div>

                  {/* Platform Traffic Overview */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {platformTrafficData.map((platform, index) => (
                      <div key={platform.platform} className="bg-amber-50/50 rounded-lg p-4 border border-amber-200/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-800">{platform.platform}</span>
                          <span className="text-xs text-green-600 font-medium">{platform.growth}</span>
                        </div>
                        <div className="text-xl font-bold text-gray-800 mb-1">{platform.queries.toLocaleString()}</div>
                        <div className="text-xs text-gray-600 mb-2">Daily Queries</div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-gray-700">{platform.users}M users</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top Trending Queries */}
                  <div className="bg-amber-50/30 rounded-lg p-4 border border-amber-200/20">
                    <h5 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
                      <Search className="w-4 h-4 mr-2 text-blue-600" />
                      Top Trending Queries
                    </h5>
                    <div className="space-y-3">
                      {trafficData.slice(0, 3).map((query, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-800 font-medium truncate">{query.query}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-600">{query.volume.toLocaleString()} searches</span>
                              <span className="text-xs text-green-600 font-medium">{query.trend}</span>
                            </div>
                          </div>
                          <div className="flex space-x-1 ml-2">
                            {query.platforms.slice(0, 3).map((platform, pIndex) => (
                              <div key={pIndex} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white border border-amber-200 p-4 rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                    <span className="text-sm font-semibold text-gray-700">Live Data</span>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* USP 2: Brand Visibility & Rankings */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              {/* Brand Visibility Dashboard Mock */}
              <div className="bg-white/70 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-800">Brand Rankings Dashboard</h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-gray-600">Updated 5 min ago</span>
                  </div>
                </div>

                {/* Brand Rankings Table */}
                <div className="bg-amber-50/30 rounded-lg p-4 border border-amber-200/20 mb-6">
                  <h5 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-green-600" />
                    Brand Rankings
                  </h5>
                  <div className="space-y-3">
                    {brandRankingData.slice(0, 4).map((brand, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              brand.position === 1
                                ? "bg-yellow-400 text-gray-800"
                                : brand.position === 2
                                  ? "bg-gray-300 text-gray-800"
                                  : brand.position === 3
                                    ? "bg-orange-400 text-gray-800"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {brand.position}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-800">{brand.brand}</div>
                            <div className="text-xs text-gray-600">{brand.mentions} mentions</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-800">{brand.visibility}%</div>
                          <div
                            className={`text-xs font-medium flex items-center ${
                              brand.change.startsWith("+") ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {brand.change.startsWith("+") ? (
                              <ArrowUp className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowDown className="w-3 h-3 mr-1" />
                            )}
                            {brand.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Competitor Comparison */}
                <div className="bg-amber-50/30 rounded-lg p-4 border border-amber-200/20">
                  <h5 className="text-sm font-semibold text-gray-800 mb-4">Competitive Analysis</h5>
                  <div className="space-y-3">
                    {competitorData.map((competitor, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: competitor.color }}></div>
                          <span className="text-sm text-gray-800">{competitor.competitor}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-800">{competitor.visibility}%</span>
                          <span className="text-xs text-green-600 font-medium">{competitor.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-white border border-amber-200 p-4 rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">Ranking #1</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl mr-4 shadow-sm border border-green-300">
                  <Target className="h-7 w-7 text-green-600" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-4 py-2 text-sm font-semibold border border-green-300"
                >
                  Competitive Intelligence
                </Badge>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                Brand Visibility & Rankings in AI Search
              </h3>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                Surface how often your clients' brands appear — and where they rank — across AI search results. We
                reveal when, where, and how frequently a brand is mentioned in AI-generated answers.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                But we don't stop there — we also track brand rankings in these AI responses. Know if your client is the
                top mention, buried down the list, or missing entirely.
              </p>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">Brand mention frequency tracking</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">Ranking position analysis</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">Competitor comparison insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* USP 3: AI Citations */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl mr-4 shadow-sm border border-purple-300">
                  <MessageSquare className="h-7 w-7 text-purple-600" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-4 py-2 text-sm font-semibold border border-purple-300"
                >
                  Citation Intelligence
                </Badge>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">AI Citations</h3>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                Uncover exactly when and where AI models are referencing your brand. Track when your brand is cited in
                AI-generated responses — whether it's a product recommendation, a source link, or a quoted mention.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Get insights into why you're being cited (or not), which pages or assets are triggering references, and
                how to influence future mentions. It's the new SEO — and it's built for teams who don't want to be left
                behind.
              </p>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">Citation source tracking and analysis</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">Content performance insights</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700 text-lg">Strategic optimization recommendations</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              {/* AI Citations Dashboard Mock */}
              <div className="relative group">
                <div className="bg-white/70 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-800">Citation Analytics</h4>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span className="text-xs text-gray-600">243 Total Citations</span>
                    </div>
                  </div>

                  {/* Citation Trend Chart */}
                  <div className="bg-amber-50/30 rounded-lg p-4 border border-amber-200/20 mb-6">
                    <h5 className="text-sm font-semibold text-gray-800 mb-4">Citation Trends</h5>
                    <div className="h-24 flex items-end justify-between space-x-1">
                      {citationTrendData.map((data, index) => (
                        <div key={data.month} className="flex-1 flex flex-col items-center">
                          <div className="w-full max-w-8 flex flex-col justify-end space-y-1 mb-2 relative h-16">
                            <div
                              className="bg-purple-500 rounded-t-sm transition-all duration-300 hover:brightness-110"
                              style={{ height: `${(data.citations / 250) * 60}px` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Cited Content */}
                  <div className="bg-amber-50/30 rounded-lg p-4 border border-amber-200/20">
                    <h5 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-purple-600" />
                      Top Cited Content
                    </h5>
                    <div className="space-y-3">
                      {citationData.slice(0, 3).map((citation, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-800 font-medium truncate">{citation.source}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-600">{citation.type}</span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  citation.performance === "High"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {citation.performance}
                              </span>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-sm font-bold text-gray-800">{citation.citations}</div>
                            <div className="text-xs text-gray-600">citations</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white border border-amber-200 p-4 rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm"></div>
                    <span className="text-sm font-semibold text-gray-700">24 Citations</span>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-amber-50 to-yellow-50"
      >
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Choose the plan that fits your agency's needs. Scale your AI visibility tracking as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white/80 border border-amber-200 rounded-3xl shadow-xl p-8 relative hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200 border border-green-300">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Starter Plan</h3>
                <p className="text-gray-600 text-base">For freelancers or solo marketers</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-4xl md:text-5xl font-bold text-gray-800">$99</span>
                <span className="text-gray-600 ml-3 text-lg">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Track 1 brand</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Basic AI search traffic data</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Monitor brand visibility</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Monthly summary reports (PDF)</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">7-day historical data</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Email support</span>
              </li>
            </ul>
          </div>

          {/* Growth Plan */}
          <div className="bg-white/80 border border-amber-200 rounded-3xl shadow-xl p-8 relative hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200 border border-blue-300">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Growth Plan</h3>
                <p className="text-gray-600 text-base">For small to mid-sized marketing teams</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-4xl md:text-5xl font-bold text-gray-800">$249</span>
                <span className="text-gray-600 ml-3 text-lg">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Track up to 5 brands</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Real-time AI search traffic data</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Monitor brand visibility & rankings</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Detect AI citations in responses</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Weekly client-ready reports (exportable)</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">30-day historical data</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Email support</span>
              </li>
            </ul>
          </div>

          {/* Agency Pro Plan */}
          <div className="bg-white/80 border-2 border-amber-400 rounded-3xl shadow-2xl p-8 relative hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                Most Popular
              </span>
            </div>

            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200 border border-purple-300">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Agency Pro Plan</h3>
                <p className="text-gray-600 text-base">For large-scale marketing agencies</p>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-4xl md:text-5xl font-bold text-gray-800">$799</span>
                <span className="text-gray-600 ml-3 text-lg">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Track up to 20 brands</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Advanced AI traffic insights across platforms</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Competitive brand benchmarking</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Real-time mention & citation alerts</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Custom dashboards & white-label PDF reporting</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">12-month historical data access</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Team collaboration tools</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">Priority support + Slack access</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                <span className="text-gray-700 text-base">API access</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-br from-white/80 via-amber-50/80 to-yellow-50/80 rounded-3xl p-16 shadow-xl border border-amber-200 relative overflow-hidden backdrop-blur-sm">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl"></div>

        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
          Ready to Dominate AI Search?
        </h3>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          Join forward-thinking marketing teams who are already leveraging AI search insights to drive unprecedented
          growth for their clients.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-10 py-5 text-xl"
            asChild
          >
            <a href="mailto:tedmond.chang@nuggt.io">
              <Phone className="mr-3 h-6 w-6" />
              Contact Us
            </a>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-amber-100 via-white to-yellow-100 text-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="relative">
                <img src="/images/nuggt-logo.jpg" alt="Company Logo" className="h-10 w-10 rounded-lg shadow-sm" />
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-lg blur opacity-30"></div>
              </div>
              <span className="text-2xl font-bold text-gray-800">Nuggt</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-lg">All rights reserved, Nuggt Inc. 2025</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-amber-200">
            <div className="flex justify-start">
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6">Navigation</h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#features"
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-lg"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#pricing"
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-lg"
                      >
                        Pricing
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6">Connect</h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:tedmond.chang@nuggt.io"
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-lg"
                      >
                        Email
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/nuggt-ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-lg"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
