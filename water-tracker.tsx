"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Droplets,
  Plus,
  Minus,
  RotateCcw,
  Target,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Gift,
  Users,
  Zap,
  Crown,
  Medal,
  Sparkles,
  Loader2,
  Globe,
  Sun,
  Moon,
  Monitor,
  Palette,
} from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useLanguage } from "@/lib/language-context"
import { useTheme, type ThemeMode, type ThemeStyle } from "@/lib/theme-context"
import {
  mockAPI,
  AVAILABLE_LOOT,
  type DayProgress,
  type UserStats,
  type LeaderboardUser,
  type LootItem,
} from "@/lib/mock-data"

// Add these keyframe animations
const modalAnimations = `
  @keyframes modalSlideIn {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(-50px);
    }
    50% {
      opacity: 1;
      transform: scale(1.05) translateY(0);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes iconBounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) scale(1);
    }
    40% {
      transform: translateY(-20px) scale(1.1);
    }
    60% {
      transform: translateY(-10px) scale(1.05);
    }
  }

  @keyframes sparkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1) rotate(180deg);
    }
  }

  @keyframes confetti {
    0% {
      opacity: 1;
      transform: translateY(0) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translateY(100px) rotate(360deg);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    }
    50% {
      box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.4);
    }
  }

  @keyframes textShine {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .modal-slide-in {
    animation: modalSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .icon-bounce {
    animation: iconBounce 1s ease-in-out infinite;
  }

  .sparkle {
    animation: sparkle 1.5s ease-in-out infinite;
  }

  .confetti {
    animation: confetti 3s ease-out forwards;
  }

  .glow-effect {
    animation: glow 2s ease-in-out infinite;
  }

  .text-shine {
    background: linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc, #a855f7, #8b5cf6);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: textShine 2s linear infinite;
  }

  .backdrop-blur-custom {
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.6);
  }
`

export default function Component() {
  const { language, setLanguage, t } = useLanguage()
  const { mode, style, setMode, setStyle, isDark, unlockedThemes, unlockTheme } = useTheme()
  const [waterGlasses, setWaterGlasses] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(8)
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString())
  const [progressHistory, setProgressHistory] = useState<DayProgress[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<DayProgress | null>(null)
  const [glassSizeML, setGlassSizeML] = useState(250)

  // Gamification states
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    xp: 0,
    xpToNext: 100,
    totalXP: 0,
    streak: 0,
    badges: [],
    title: "Gota Novata",
  })
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [showLootModal, setShowLootModal] = useState(false)
  const [newLoot, setNewLoot] = useState<LootItem | null>(null)
  const [unlockedLoot, setUnlockedLoot] = useState<string[]>([])

  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(false)
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  // Load initial data
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    // Load basic settings from localStorage
    const savedGlasses = localStorage.getItem("waterGlasses")
    const savedGoal = localStorage.getItem("dailyGoal")
    const savedDate = localStorage.getItem("lastResetDate")
    const savedGlassSize = localStorage.getItem("glassSizeML")

    if (savedGlasses) setWaterGlasses(Number.parseInt(savedGlasses))
    if (savedGoal) setDailyGoal(Number.parseInt(savedGoal))
    if (savedDate) setLastResetDate(savedDate)
    if (savedGlassSize) setGlassSizeML(Number.parseInt(savedGlassSize))

    // Load data from "API"
    try {
      setIsLoadingHistory(true)
      const history = await mockAPI.getProgressHistory()
      setProgressHistory(history)

      const unlocked = await mockAPI.getUnlockedLoot()
      setUnlockedLoot(unlocked)

      // Load user stats based on coherent data
      await refreshUserStats(history, savedGlasses ? Number.parseInt(savedGlasses) : 0)
    } catch (error) {
      console.error("Error loading initial data:", error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const refreshUserStats = async (history: DayProgress[], currentGlasses: number) => {
    try {
      setIsLoadingStats(true)
      const stats = await mockAPI.getUserStats(history, currentGlasses, dailyGoal, language)
      setUserStats(stats)

      // Load leaderboard with updated stats
      setIsLoadingLeaderboard(true)
      const leaderboardData = await mockAPI.getLeaderboard(stats, language)
      setLeaderboard(leaderboardData)
    } catch (error) {
      console.error("Error refreshing user stats:", error)
    } finally {
      setIsLoadingStats(false)
      setIsLoadingLeaderboard(false)
    }
  }

  // Check for new day and handle day transitions
  useEffect(() => {
    const today = new Date().toDateString()

    if (lastResetDate !== today) {
      handleDayTransition(today)
    }

    // Save current state
    localStorage.setItem("waterGlasses", waterGlasses.toString())
    localStorage.setItem("dailyGoal", dailyGoal.toString())
    localStorage.setItem("glassSizeML", glassSizeML.toString())
  }, [waterGlasses, dailyGoal, lastResetDate, glassSizeML])

  const handleDayTransition = async (today: string) => {
    // Save yesterday's progress
    if (waterGlasses > 0) {
      await mockAPI.updateDailyProgress(lastResetDate, waterGlasses, dailyGoal)

      // Refresh history and stats
      const updatedHistory = await mockAPI.getProgressHistory()
      setProgressHistory(updatedHistory)
      await refreshUserStats(updatedHistory, 0) // Reset to 0 for new day
    }

    setWaterGlasses(0)
    setLastResetDate(today)
    localStorage.setItem("lastResetDate", today)
  }

  // Refresh stats when glasses change
  useEffect(() => {
    if (progressHistory.length > 0) {
      refreshUserStats(progressHistory, waterGlasses)
    }
  }, [waterGlasses]) // Removed progressHistory.length from dependencies

  const awardXP = (amount: number, reason: string) => {
    // XP is now calculated coherently in the API, but we can show notifications
    console.log(`+${amount} XP: ${reason}`)

    // Check for surprise loot
    if (Math.random() < 0.15) {
      triggerSurpriseLoot()
    }
  }

  const triggerSurpriseLoot = async () => {
    const availableLoot = AVAILABLE_LOOT.filter((loot) => !unlockedLoot.includes(loot.id))
    if (availableLoot.length === 0) return

    // Rarity weights
    const rarityWeights = { common: 50, rare: 30, epic: 15, legendary: 5 }
    const totalWeight = Object.values(rarityWeights).reduce((a, b) => a + b, 0)
    const random = Math.random() * totalWeight

    let currentWeight = 0
    let selectedRarity: keyof typeof rarityWeights = "common"

    for (const [rarity, weight] of Object.entries(rarityWeights)) {
      currentWeight += weight
      if (random <= currentWeight) {
        selectedRarity = rarity as keyof typeof rarityWeights
        break
      }
    }

    const lootOfRarity = availableLoot.filter((loot) => loot.rarity === selectedRarity)
    if (lootOfRarity.length > 0) {
      const randomLoot = lootOfRarity[Math.floor(Math.random() * lootOfRarity.length)]
      setNewLoot(randomLoot)
      setShowLootModal(true)

      await mockAPI.unlockLoot(randomLoot.id)
      const updatedUnlocked = await mockAPI.getUnlockedLoot()
      setUnlockedLoot(updatedUnlocked)

      // If it's a theme, unlock it
      if (randomLoot.type === "theme" && randomLoot.themeId) {
        unlockTheme(randomLoot.themeId as ThemeStyle)
      }
    }
  }

  const addGlass = () => {
    setWaterGlasses((prev) => prev + 1)
    awardXP(10, "Vaso de agua consumido")
  }

  const removeGlass = () => {
    setWaterGlasses((prev) => Math.max(0, prev - 1))
  }

  const resetCounter = () => {
    setWaterGlasses(0)
  }

  const progressPercentage = Math.min((waterGlasses / dailyGoal) * 100, 100)
  const isGoalReached = waterGlasses >= dailyGoal

  const getProgressColor = (percentage: number) => {
    const hue = Math.min(percentage * 1.2, 120)
    return `hsl(${hue}, 70%, 50%)`
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800"
      case "rare":
        return "text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900"
      case "epic":
        return "text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-900"
      case "legendary":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900"
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800"
    }
  }

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getProgressForDate = (date: Date) => {
    const dateString = date.toDateString()
    const today = new Date().toDateString()

    if (dateString === today) {
      return { glasses: waterGlasses, goal: dailyGoal }
    }

    const progress = progressHistory.find((p) => p.date === dateString)
    return progress ? { glasses: progress.glasses, goal: progress.goal } : null
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const progress = getProgressForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()

      let dayClass =
        "h-12 w-12 rounded-lg border flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 "

      if (isToday) {
        dayClass += "border-primary bg-primary/10 "
      } else {
        dayClass += "border-border "
      }

      if (progress) {
        dayClass += "cursor-pointer hover:scale-105 "
      } else {
        dayClass += "text-muted-foreground "
      }

      days.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => {
            if (progress) {
              setSelectedDay({
                date: date.toDateString(),
                glasses: progress.glasses,
                goal: progress.goal,
              })
            }
          }}
        >
          <div className="text-foreground">{day}</div>
          {progress && (
            <div className="flex items-center gap-1">
              <Droplets
                className="h-3 w-3"
                style={{ color: getProgressColor((progress.glasses / progress.goal) * 100) }}
              />
              <span style={{ color: getProgressColor((progress.glasses / progress.goal) * 100) }}>
                {progress.glasses}
              </span>
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  const monthNames = t.months
  const dayNames = t.days

  const getRarityText = (rarity: string) => {
    const rarityTexts = {
      common: language === "en" ? "Common Reward" : "Recompensa Común",
      rare: language === "en" ? "Rare Reward" : "Recompensa Rara",
      epic: language === "en" ? "Epic Reward" : "Recompensa Épica",
      legendary: language === "en" ? "Legendary Reward" : "Recompensa Legendaria",
    }
    return rarityTexts[rarity as keyof typeof rarityTexts] || rarity
  }

  const getThemeName = (themeId: ThemeStyle) => {
    const themeNames = {
      default: language === "en" ? "Default" : "Predeterminado",
      ocean: language === "en" ? "Ocean" : "Océano",
      forest: language === "en" ? "Forest" : "Bosque",
      sunset: language === "en" ? "Sunset" : "Atardecer",
      midnight: language === "en" ? "Midnight" : "Medianoche",
      aurora: language === "en" ? "Aurora" : "Aurora",
    }
    return themeNames[themeId] || themeId
  }

  const getThemeIcon = (themeId: ThemeStyle) => {
    const themeIcons = {
      default: "🎨",
      ocean: "🌊",
      forest: "🌲",
      sunset: "🌅",
      midnight: "🌙",
      aurora: "🌌",
    }
    return themeIcons[themeId] || "🎨"
  }

  return (
    <div className="min-h-screen theme-gradient p-4 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Droplets className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">{t.appTitle}</CardTitle>
          </div>
          <CardDescription>{t.appDescription}</CardDescription>

          {/* User Stats Header */}
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                <span className="font-bold text-primary">
                  {t.level} {userStats.level}
                  {isLoadingStats && <Loader2 className="h-3 w-3 animate-spin inline ml-1" />}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {userStats.title}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>
                  XP: {userStats.xp}/{userStats.xpToNext}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {t.streak}: {userStats.streak}
                </span>
              </div>
              <Progress value={(userStats.xp / userStats.xpToNext) * 100} className="h-2" />
            </div>
          </div>

          {/* Settings Row */}
          <div className="mt-2 flex justify-center gap-2">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
                <SelectItem value="en">🇺🇸 English</SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Mode Selector */}
            <Select value={mode} onValueChange={(value: ThemeMode) => setMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    {language === "en" ? "Light" : "Claro"}
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    {language === "en" ? "Dark" : "Oscuro"}
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    {language === "en" ? "System" : "Sistema"}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Style Selector */}
            <Select value={style} onValueChange={(value: ThemeStyle) => setStyle(value)}>
              <SelectTrigger className="w-32">
                <Palette className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {unlockedThemes.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    <div className="flex items-center gap-2">
                      {getThemeName(theme)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today" className="flex items-center gap-1 text-xs">
                <Droplets className="h-3 w-3" />
                {t.today}
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                {isLoadingHistory && <Loader2 className="h-3 w-3 animate-spin" />}
                {t.history}
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-1 text-xs">
                <Trophy className="h-3 w-3" />
                {isLoadingLeaderboard && <Loader2 className="h-3 w-3 animate-spin" />}
                {t.ranking}
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-1 text-xs">
                <Gift className="h-3 w-3" />
                {t.rewards}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-6 mt-6">
              {/* Progress Section */}
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="text-6xl font-bold mb-2" style={{ color: getProgressColor(progressPercentage) }}>
                    {waterGlasses}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {t.of} {dailyGoal} {t.glasses}
                  </div>
                </div>

                <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 ease-out rounded-full"
                    style={{
                      width: `${progressPercentage}%`,
                      backgroundColor: getProgressColor(progressPercentage),
                    }}
                  />
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Target className="h-4 w-4" style={{ color: getProgressColor(progressPercentage) }} />
                  <span className="text-sm font-medium" style={{ color: getProgressColor(progressPercentage) }}>
                    {Math.round(progressPercentage)}% {t.completed}
                  </span>
                </div>

                {isGoalReached && (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    🎉 {t.goalReached}!
                  </Badge>
                )}
              </div>

              {/* Water Glasses Visual */}
              <div className="grid grid-cols-4 gap-2 py-4">
                {Array.from({ length: dailyGoal }, (_, i) => (
                  <div
                    key={i}
                    className={`h-12 w-12 mx-auto rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      i < waterGlasses
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-muted border-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    <Droplets className="h-6 w-6" />
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={removeGlass}
                  disabled={waterGlasses === 0}
                  className="h-12 w-12 rounded-full"
                >
                  <Minus className="h-5 w-5" />
                </Button>

                <Button
                  onClick={addGlass}
                  size="lg"
                  className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                >
                  <Plus className="h-8 w-8" />
                </Button>

                <Button variant="outline" size="icon" onClick={resetCounter} className="h-12 w-12 rounded-full">
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{(waterGlasses * glassSizeML).toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{t.mlConsumed}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.max(0, (dailyGoal - waterGlasses) * glassSizeML).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{t.mlRemaining}</div>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-primary">
                  {waterGlasses === 0 && t.motivational.start}
                  {waterGlasses > 0 && waterGlasses < dailyGoal / 2 && t.motivational.goodStart}
                  {waterGlasses >= dailyGoal / 2 && waterGlasses < dailyGoal && t.motivational.halfway}
                  {waterGlasses >= dailyGoal && t.motivational.goalReached}
                </p>
              </div>

              {/* Glass Size Configuration */}
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{t.glassSize}:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">{glassSizeML}</span>
                    <span className="text-sm text-muted-foreground">ml</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[200, 250, 300, 500].map((size) => (
                    <Button
                      key={size}
                      variant={glassSizeML === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGlassSizeML(size)}
                      className="text-xs"
                    >
                      {size}ml
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={glassSizeML}
                    onChange={(e) =>
                      setGlassSizeML(Math.max(50, Math.min(1000, Number.parseInt(e.target.value) || 250)))
                    }
                    className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder={t.customSize}
                  />
                  <span className="text-sm text-muted-foreground">ml</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4 mt-6">
              {isLoadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-primary">{t.loadingHistory}...</span>
                </div>
              ) : (
                <>
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="icon" onClick={previousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-lg font-semibold text-foreground">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

                  {/* Legend */}
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-primary mb-2">{t.legend}:</p>
                    <div className="flex items-center justify-center gap-4 text-xs mb-2">
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-red-500" />
                        <span>{t.low}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-yellow-500" />
                        <span>{t.medium}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-green-500" />
                        <span>{t.goal}</span>
                      </div>
                    </div>
                    <p className="text-xs text-primary">💡 {t.clickDayDetails}</p>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4 mt-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold flex items-center justify-center gap-2 text-foreground">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  {t.weeklyRanking}
                  {isLoadingLeaderboard && <Loader2 className="h-4 w-4 animate-spin" />}
                </h3>
                <p className="text-sm text-muted-foreground">{t.competeWith}</p>
              </div>

              {isLoadingLeaderboard ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-primary">{t.updatingRanking}...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border border-border transition-all ${
                        user.name === "Tú" || user.name === "You"
                          ? "bg-primary/10 border-primary/20 shadow-md"
                          : "bg-card hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-center w-8 h-8">
                        {index === 0 && <Crown className="h-6 w-6 text-yellow-500" />}
                        {index === 1 && <Medal className="h-6 w-6 text-gray-400" />}
                        {index === 2 && <Medal className="h-6 w-6 text-amber-600" />}
                        {index > 2 && <span className="font-bold text-muted-foreground">#{index + 1}</span>}
                      </div>

                      <div className="text-2xl">{user.avatar}</div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${user.name === "Tú" || user.name === "You" ? "text-primary" : "text-foreground"}`}
                          >
                            {user.name}
                          </span>
                          {user.team && (
                            <Badge variant="outline" className="text-xs">
                              {user.team}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t.level} {user.level} • {t.streak}: {user.streak} {t.daysText}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-primary">{user.weeklyPoints}</div>
                        <div className="text-xs text-muted-foreground">{t.points}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {t.teams}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{t.teamNames.oceanBlue}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      {leaderboard
                        .filter((u) => u.team === t.teamNames.oceanBlue)
                        .reduce((sum, u) => sum + u.weeklyPoints, 0)
                        .toLocaleString()}{" "}
                      {t.points}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <div className="text-lg font-bold text-green-700 dark:text-green-300">{t.teamNames.greenRiver}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {leaderboard
                        .filter((u) => u.team === t.teamNames.greenRiver)
                        .reduce((sum, u) => sum + u.weeklyPoints, 0)
                        .toLocaleString()}{" "}
                      {t.points}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4 mt-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold flex items-center justify-center gap-2 text-foreground">
                  <Gift className="h-5 w-5 text-purple-500" />
                  {t.rewardCollection}
                </h3>
                <p className="text-sm text-muted-foreground">{t.unlockRewards}</p>
              </div>

              {/* Unlocked Themes Section */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Palette className="h-4 w-4 text-purple-500" />
                  {language === "en" ? "Unlocked Themes" : "Temas Desbloqueados"} ({unlockedThemes.length})
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {unlockedThemes.map((theme) => (
                    <Button
                      key={theme}
                      variant={style === theme ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStyle(theme)}
                      className="flex items-center gap-2 h-auto p-3"
                    >
                      <span className="text-lg">{getThemeIcon(theme)}</span>
                      <span className="text-xs">{getThemeName(theme)}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Unlocked Rewards */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  {t.unlocked} ({unlockedLoot.length})
                </h4>

                {unlockedLoot.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {unlockedLoot.map((lootId) => {
                      const loot = AVAILABLE_LOOT.find((l) => l.id === lootId)
                      if (!loot) return null

                      const lootTranslation = t.loot[loot.id]
                      if (!lootTranslation) return null

                      return (
                        <div
                          key={loot.id}
                          className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
                        >
                          <div className="text-2xl">{loot.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{lootTranslation.name}</span>
                              <Badge className={`text-xs ${getRarityColor(loot.rarity)}`}>{loot.rarity}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{lootTranslation.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">{t.noRewardsYet}!</p>
                    <p className="text-sm text-muted-foreground">{t.keepHydrating}</p>
                  </div>
                )}
              </div>

              {/* Available Rewards */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  {t.toUnlock} ({AVAILABLE_LOOT.length - unlockedLoot.length})
                </h4>

                <div className="grid grid-cols-1 gap-2">
                  {AVAILABLE_LOOT.filter((loot) => !unlockedLoot.includes(loot.id)).map((loot) => (
                    <div
                      key={loot.id}
                      className="flex items-center gap-3 p-3 bg-muted/50 border border-border rounded-lg opacity-60"
                    >
                      <div className="text-2xl grayscale">{loot.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-muted-foreground">???</span>
                          <Badge className={`text-xs ${getRarityColor(loot.rarity)}`}>{loot.rarity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{t.keepStreak}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loot Chances */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">{t.rewardChances}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t.common}</span>
                    <span className="text-gray-800 dark:text-gray-200">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 dark:text-blue-400">{t.rare}</span>
                    <span className="text-blue-800 dark:text-blue-200">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600 dark:text-purple-400">{t.epic}</span>
                    <span className="text-purple-800 dark:text-purple-200">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600 dark:text-yellow-400">{t.legendary}</span>
                    <span className="text-yellow-800 dark:text-yellow-200">5%</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Day Details Modal */}
            {selectedDay && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-foreground">
                      {new Date(selectedDay.date).toLocaleDateString(language, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div
                        className="text-4xl font-bold mb-2"
                        style={{ color: getProgressColor((selectedDay.glasses / selectedDay.goal) * 100) }}
                      >
                        {selectedDay.glasses}
                      </div>
                      <div className="text-lg text-muted-foreground">
                        {t.of} {selectedDay.goal} {t.glasses}
                      </div>
                    </div>

                    <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 ease-out rounded-full"
                        style={{
                          width: `${Math.min((selectedDay.glasses / selectedDay.goal) * 100, 100)}%`,
                          backgroundColor: getProgressColor((selectedDay.glasses / selectedDay.goal) * 100),
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-primary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {(selectedDay.glasses * glassSizeML).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">{t.mlConsumed}</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-muted-foreground">
                          {Math.max(0, (selectedDay.goal - selectedDay.glasses) * glassSizeML).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">{t.mlRemaining}</div>
                      </div>
                    </div>

                    <div
                      className="text-center p-3 rounded-lg"
                      style={{
                        backgroundColor: `${getProgressColor((selectedDay.glasses / selectedDay.goal) * 100)}20`,
                      }}
                    >
                      <div
                        className="text-sm font-medium"
                        style={{ color: getProgressColor((selectedDay.glasses / selectedDay.goal) * 100) }}
                      >
                        {selectedDay.glasses >= selectedDay.goal
                          ? `🎉 ${t.goalReached}!`
                          : selectedDay.glasses >= selectedDay.goal * 0.75
                            ? t.almostThere
                            : selectedDay.glasses >= selectedDay.goal * 0.5
                              ? t.goodProgress
                              : t.needMore}
                      </div>
                    </div>

                    <Button onClick={() => setSelectedDay(null)} className="w-full" variant="outline">
                      {t.close}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Enhanced Loot Modal with Animations */}
            {showLootModal && newLoot && (
              <>
                <style>{modalAnimations}</style>
                <div className="fixed inset-0 backdrop-blur-custom flex items-center justify-center p-4 z-50">
                  {/* Confetti particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 20 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute confetti"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          fontSize: `${Math.random() * 20 + 10}px`,
                        }}
                      >
                        {["🎉", "✨", "🌟", "💫", "🎊"][Math.floor(Math.random() * 5)]}
                      </div>
                    ))}
                  </div>

                  {/* Sparkle effects around modal */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute sparkle text-yellow-400"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${30 + (i % 2) * 40}%`,
                          animationDelay: `${i * 0.2}s`,
                          fontSize: "24px",
                        }}
                      >
                        ✨
                      </div>
                    ))}
                  </div>

                  <Card className="w-full max-w-sm modal-slide-in glow-effect border-2 border-purple-300 dark:border-purple-700 relative overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 dark:from-purple-950/50 dark:via-pink-950/50 dark:to-purple-950/50 opacity-50"></div>

                    {/* Floating sparkles inside modal */}
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div
                          key={i}
                          className="absolute sparkle text-purple-400"
                          style={{
                            left: `${10 + i * 15}%`,
                            top: `${20 + (i % 3) * 20}%`,
                            animationDelay: `${i * 0.3}s`,
                            fontSize: "16px",
                          }}
                        >
                          ⭐
                        </div>
                      ))}
                    </div>

                    <CardHeader className="text-center relative z-10">
                      <div className="relative">
                        <div className="text-8xl mb-4 icon-bounce relative z-10">{newLoot.icon}</div>

                        {/* Glow effect behind icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 bg-purple-400 rounded-full opacity-20 blur-xl"></div>
                        </div>
                      </div>

                      <CardTitle className="text-2xl text-purple-900 dark:text-purple-100 mb-2">
                        <span className="text-shine font-bold">{t.newReward}!</span>
                      </CardTitle>

                      {/* Animated subtitle */}
                      <div className="text-sm text-purple-600 dark:text-purple-300 animate-pulse">
                        🎊 {getRarityText(newLoot.rarity)} 🎊
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 text-center relative z-10">
                      <div className="transform transition-all duration-500 hover:scale-105">
                        <h3 className="text-xl font-bold mb-2 text-foreground">
                          {t.loot[newLoot.id]?.name || newLoot.name}
                        </h3>

                        <Badge className={`${getRarityColor(newLoot.rarity)} mb-3 text-sm px-3 py-1 animate-pulse`}>
                          {newLoot.rarity.toUpperCase()}
                        </Badge>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t.loot[newLoot.id]?.description || newLoot.description}
                        </p>
                      </div>

                      {/* Animated reward box */}
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-700 relative overflow-hidden">
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white dark:via-white/10 to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 animate-pulse"></div>

                        <p className="text-sm text-purple-700 dark:text-purple-300">🎉 {t.unlockedNewReward}</p>
                      </div>

                      {/* Enhanced button with hover effects */}
                      <Button
                        onClick={() => {
                          setShowLootModal(false)
                          setNewLoot(null)
                        }}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg relative overflow-hidden group"
                      >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-500 group-hover:translate-x-full"></div>

                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>{t.great}!</span>
                          <span className="animate-bounce">🎉</span>
                        </span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
