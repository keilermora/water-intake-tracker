interface DayProgress {
  date: string
  glasses: number
  goal: number
}

interface UserStats {
  level: number
  xp: number
  xpToNext: number
  totalXP: number
  streak: number
  badges: string[]
  title: string
}

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  weeklyPoints: number
  level: number
  streak: number
  team?: string
}

interface LootItem {
  id: string
  name: string
  type: "badge" | "title" | "theme" | "bonus"
  rarity: "common" | "rare" | "epic" | "legendary"
  description: string
  icon: string
  themeId?: string // Add theme identifier
}

export const getLevelNames = (language: "es" | "en"): string[] => {
  if (language === "en") {
    return [
      "Newbie Drop",
      "Beginner Stream",
      "Emerging River",
      "Steady Lake",
      "Dedicated Sea",
      "Ocean Master",
      "Legendary Tsunami",
      "Hydro Supreme",
    ]
  }
  return [
    "Gota Novata",
    "Arroyo Principiante",
    "Río Emergente",
    "Lago Constante",
    "Mar Dedicado",
    "Océano Maestro",
    "Tsunami Legendario",
    "Hidro Supremo",
  ]
}

export const getAvailableLoot = (language: "es" | "en"): LootItem[] => {
  const lootData =
    language === "en"
      ? {
          badge_streak_7: { name: "7-Day Streak", description: "Maintain your hydration goal for 7 consecutive days" },
          badge_streak_30: { name: "Monthly Master", description: "Complete 30 days of consistent hydration" },
          badge_perfectionist: { name: "Perfectionist", description: "Exceed your daily goal for 5 days in a row" },
          badge_overachiever: { name: "Overachiever", description: "Drink 150% of your daily goal in a single day" },
          badge_consistent: { name: "Consistency King", description: "Meet your goal for 14 consecutive days" },
          badge_hydration_hero: { name: "Hydration Hero", description: "Reach your goal 50 times total" },
          badge_water_warrior: { name: "Water Warrior", description: "Drink over 100 glasses total" },
          badge_goal_crusher: { name: "Goal Crusher", description: "Exceed your goal 10 times" },
          badge_dedication: { name: "Dedication Badge", description: "Use the app for 21 consecutive days" },
          title_hydro_master: { name: "Hydro Master", description: "An epic title for hydration experts" },
          title_aqua_legend: { name: "Aqua Legend", description: "The most prestigious hydration title" },
          theme_ocean: { name: "Ocean Theme", description: "Deep blue colors inspired by the ocean" },
          theme_forest: { name: "Forest Theme", description: "Natural green colors of the forest" },
          theme_sunset: { name: "Sunset Theme", description: "Warm orange and red sunset colors" },
          theme_midnight: { name: "Midnight Theme", description: "Mysterious purple and indigo night colors" },
          theme_aurora: { name: "Aurora Theme", description: "Magical pink and purple aurora colors" },
          bonus_double_xp: { name: "Double XP", description: "Double your XP for 24 hours" },
        }
      : {
          badge_streak_7: {
            name: "Racha de 7 días",
            description: "Mantén tu meta de hidratación por 7 días consecutivos",
          },
          badge_streak_30: { name: "Maestro Mensual", description: "Completa 30 días de hidratación consistente" },
          badge_perfectionist: { name: "Perfeccionista", description: "Supera tu meta diaria por 5 días seguidos" },
          badge_overachiever: { name: "Sobresaliente", description: "Bebe 150% de tu meta diaria en un solo día" },
          badge_consistent: { name: "Rey de la Consistencia", description: "Cumple tu meta por 14 días consecutivos" },
          badge_hydration_hero: { name: "Héroe de Hidratación", description: "Alcanza tu meta 50 veces en total" },
          badge_water_warrior: { name: "Guerrero del Agua", description: "Bebe más de 100 vasos en total" },
          badge_goal_crusher: { name: "Destructor de Metas", description: "Supera tu meta 10 veces" },
          badge_dedication: { name: "Insignia de Dedicación", description: "Usa la app por 21 días consecutivos" },
          title_hydro_master: { name: "Maestro Hidro", description: "Un título épico para expertos en hidratación" },
          title_aqua_legend: { name: "Leyenda Acuática", description: "El título de hidratación más prestigioso" },
          theme_ocean: { name: "Tema Océano", description: "Colores azul profundo inspirados en el océano" },
          theme_forest: { name: "Tema Bosque", description: "Colores verdes naturales del bosque" },
          theme_sunset: { name: "Tema Atardecer", description: "Colores cálidos naranja y rojo del atardecer" },
          theme_midnight: { name: "Tema Medianoche", description: "Colores misteriosos púrpura e índigo de la noche" },
          theme_aurora: { name: "Tema Aurora", description: "Colores mágicos rosa y púrpura de la aurora" },
          bonus_double_xp: { name: "Doble XP", description: "Duplica tu XP por 24 horas" },
        }

  return [
    { id: "badge_streak_7", type: "badge", rarity: "common", icon: "🔥", ...lootData.badge_streak_7 },
    { id: "badge_streak_30", type: "badge", rarity: "epic", icon: "🏆", ...lootData.badge_streak_30 },
    { id: "badge_perfectionist", type: "badge", rarity: "rare", icon: "⭐", ...lootData.badge_perfectionist },
    { id: "badge_overachiever", type: "badge", rarity: "rare", icon: "💪", ...lootData.badge_overachiever },
    { id: "badge_consistent", type: "badge", rarity: "rare", icon: "🎯", ...lootData.badge_consistent },
    { id: "badge_hydration_hero", type: "badge", rarity: "epic", icon: "🦸", ...lootData.badge_hydration_hero },
    { id: "badge_water_warrior", type: "badge", rarity: "common", icon: "⚔️", ...lootData.badge_water_warrior },
    { id: "badge_goal_crusher", type: "badge", rarity: "rare", icon: "💥", ...lootData.badge_goal_crusher },
    { id: "badge_dedication", type: "badge", rarity: "epic", icon: "🌟", ...lootData.badge_dedication },
    { id: "title_hydro_master", type: "title", rarity: "epic", icon: "👑", ...lootData.title_hydro_master },
    { id: "title_aqua_legend", type: "title", rarity: "legendary", icon: "🔱", ...lootData.title_aqua_legend },
    {
      id: "theme_ocean",
      type: "theme",
      rarity: "rare",
      icon: "🌊",
      themeId: "ocean",
      ...lootData.theme_ocean,
    },
    {
      id: "theme_forest",
      type: "theme",
      rarity: "rare",
      icon: "🌲",
      themeId: "forest",
      ...lootData.theme_forest,
    },
    {
      id: "theme_sunset",
      type: "theme",
      rarity: "epic",
      icon: "🌅",
      themeId: "sunset",
      ...lootData.theme_sunset,
    },
    {
      id: "theme_midnight",
      type: "theme",
      rarity: "epic",
      icon: "🌙",
      themeId: "midnight",
      ...lootData.theme_midnight,
    },
    {
      id: "theme_aurora",
      type: "theme",
      rarity: "legendary",
      icon: "🌌",
      themeId: "aurora",
      ...lootData.theme_aurora,
    },
    { id: "bonus_double_xp", type: "bonus", rarity: "legendary", icon: "⚡", ...lootData.bonus_double_xp },
  ]
}

// Simular delay de red
const simulateNetworkDelay = (min = 200, max = 800) => {
  const delay = Math.random() * (max - min) + min
  return new Promise((resolve) => setTimeout(resolve, delay))
}

// Generar historial coherente
export const generateCoherentHistory = (): DayProgress[] => {
  const history: DayProgress[] = []
  const today = new Date()

  // Generar 30 días de historial con patrones realistas
  for (let i = 30; i >= 1; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Simular patrones realistas:
    // - Mejor rendimiento en días laborales
    // - Peor rendimiento los fines de semana
    // - Rachas y caídas naturales
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Base de vasos según el día
    let baseGlasses = isWeekend
      ? Math.floor(Math.random() * 6) + 3
      : // 3-8 vasos fines de semana
        Math.floor(Math.random() * 8) + 5 // 5-12 vasos días laborales

    // Simular rachas y caídas
    const streakFactor = Math.sin((i / 30) * Math.PI * 4) * 0.3 + 0.7 // Ondas de motivación
    baseGlasses = Math.floor(baseGlasses * streakFactor)

    // Asegurar valores mínimos y máximos realistas
    baseGlasses = Math.max(2, Math.min(15, baseGlasses))

    history.push({
      date: date.toDateString(),
      glasses: baseGlasses,
      goal: 8,
    })
  }

  return history
}

// Calcular racha actual basada en historial real
export const calculateCurrentStreak = (history: DayProgress[], currentGlasses: number, currentGoal: number): number => {
  let streak = 0
  const today = new Date().toDateString()

  // Si hoy ya completó la meta, cuenta como parte de la racha
  if (currentGlasses >= currentGoal) {
    streak = 1
  }

  // Revisar días anteriores desde el más reciente
  const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  for (const day of sortedHistory) {
    if (day.date === today) continue // Saltar el día actual

    if (day.glasses >= day.goal) {
      streak++
    } else {
      break // La racha se rompe
    }
  }

  return streak
}

// Calcular XP total basado en historial
export const calculateTotalXP = (history: DayProgress[], currentGlasses: number): number => {
  let totalXP = 0

  // XP por días anteriores
  for (const day of history) {
    // 10 XP por vaso
    totalXP += day.glasses * 10

    // 50 XP bonus por completar meta diaria
    if (day.glasses >= day.goal) {
      totalXP += 50
    }

    // Bonus por superar la meta
    if (day.glasses > day.goal) {
      totalXP += (day.glasses - day.goal) * 5
    }
  }

  // XP del día actual
  totalXP += currentGlasses * 10

  return totalXP
}

// Calcular nivel basado en XP total
export const calculateLevel = (totalXP: number): { level: number; currentXP: number; xpToNext: number } => {
  let level = 1
  let xpRequired = 100
  let totalRequired = 0

  while (totalXP >= totalRequired + xpRequired) {
    totalRequired += xpRequired
    level++
    xpRequired = level * 100 // XP requerido aumenta con cada nivel
  }

  const currentXP = totalXP - totalRequired
  const xpToNext = xpRequired - currentXP

  return { level, currentXP, xpToNext }
}

// Sistema de logros coherente basado en datos reales
export const calculateEarnedBadges = (
  history: DayProgress[],
  streak: number,
  currentGlasses: number,
  currentGoal: number,
): string[] => {
  const badges: string[] = []
  const allHistory = [...history]

  // Agregar el día actual si tiene progreso
  if (currentGlasses > 0) {
    const today = new Date().toDateString()
    const existingToday = allHistory.find((h) => h.date === today)
    if (!existingToday) {
      allHistory.push({ date: today, glasses: currentGlasses, goal: currentGoal })
    }
  }

  // 1. Badge de racha de 7 días
  if (streak >= 7) {
    badges.push("badge_streak_7")
  }

  // 2. Badge de racha de 30 días
  if (streak >= 30) {
    badges.push("badge_streak_30")
  }

  // 3. Badge de consistencia (14 días consecutivos)
  if (streak >= 14) {
    badges.push("badge_consistent")
  }

  // 4. Badge perfeccionista (5 días seguidos superando meta)
  let consecutiveExceeded = 0
  const sortedHistory = [...allHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  for (const day of sortedHistory) {
    if (day.glasses > day.goal) {
      consecutiveExceeded++
      if (consecutiveExceeded >= 5) {
        badges.push("badge_perfectionist")
        break
      }
    } else {
      break
    }
  }

  // 5. Badge sobresaliente (150% de la meta en un día)
  const hasOverachieved = allHistory.some((day) => day.glasses >= day.goal * 1.5)
  if (hasOverachieved) {
    badges.push("badge_overachiever")
  }

  // 6. Badge héroe de hidratación (50 días cumpliendo meta)
  const goalMetDays = allHistory.filter((day) => day.glasses >= day.goal).length
  if (goalMetDays >= 50) {
    badges.push("badge_hydration_hero")
  }

  // 7. Badge guerrero del agua (100+ vasos total)
  const totalGlasses = allHistory.reduce((sum, day) => sum + day.glasses, 0)
  if (totalGlasses >= 100) {
    badges.push("badge_water_warrior")
  }

  // 8. Badge destructor de metas (superar meta 10 veces)
  const exceededGoalCount = allHistory.filter((day) => day.glasses > day.goal).length
  if (exceededGoalCount >= 10) {
    badges.push("badge_goal_crusher")
  }

  // 9. Badge de dedicación (21 días usando la app)
  if (allHistory.length >= 21) {
    badges.push("badge_dedication")
  }

  return badges
}

export const generateCoherentLeaderboard = (userStats: UserStats, language: "es" | "en"): LeaderboardUser[] => {
  const teamNames =
    language === "en"
      ? { oceanBlue: "Ocean Blue", greenRiver: "Green River" }
      : { oceanBlue: "Océano Azul", greenRiver: "Río Verde" }

  const baseUsers: Omit<LeaderboardUser, "weeklyPoints">[] = [
    { id: "1", name: "Ana García", avatar: "👩", level: 5, streak: 12, team: teamNames.oceanBlue },
    { id: "2", name: "Carlos López", avatar: "👨", level: 4, streak: 8, team: teamNames.greenRiver },
    { id: "3", name: "María Silva", avatar: "👩‍🦱", level: 6, streak: 15, team: teamNames.oceanBlue },
    { id: "5", name: "Pedro Ruiz", avatar: "👨‍🦲", level: 3, streak: 5, team: teamNames.greenRiver },
    { id: "6", name: "Laura Chen", avatar: "👩‍🦳", level: 4, streak: 7, team: teamNames.oceanBlue },
  ]

  const usersWithPoints = baseUsers.map((user) => ({
    ...user,
    weeklyPoints: user.level * 100 + user.streak * 20 + Math.floor(Math.random() * 100),
  }))

  const userWeeklyPoints = userStats.level * 100 + userStats.streak * 20 + Math.floor(userStats.totalXP / 10)
  const youText = language === "en" ? "You" : "Tú"

  usersWithPoints.push({
    id: "user",
    name: youText,
    avatar: "🧑",
    weeklyPoints: userWeeklyPoints,
    level: userStats.level,
    streak: userStats.streak,
    team: teamNames.oceanBlue,
  })

  return usersWithPoints.sort((a, b) => b.weeklyPoints - a.weeklyPoints)
}

// APIs simuladas
export const mockAPI = {
  // Obtener historial de progreso
  async getProgressHistory(): Promise<DayProgress[]> {
    await simulateNetworkDelay()

    const saved = localStorage.getItem("progressHistory")
    if (saved) {
      return JSON.parse(saved)
    }

    const history = generateCoherentHistory()
    localStorage.setItem("progressHistory", JSON.stringify(history))
    return history
  },

  // Obtener estadísticas del usuario
  async getUserStats(
    history: DayProgress[],
    currentGlasses: number,
    currentGoal: number,
    language: "es" | "en",
  ): Promise<UserStats> {
    await simulateNetworkDelay()

    const streak = calculateCurrentStreak(history, currentGlasses, currentGoal)
    const totalXP = calculateTotalXP(history, currentGlasses)
    const { level, currentXP, xpToNext } = calculateLevel(totalXP)
    const badges = calculateEarnedBadges(history, streak, currentGlasses, currentGoal)
    const levelNames = getLevelNames(language)

    const stats: UserStats = {
      level,
      xp: currentXP,
      xpToNext,
      totalXP,
      streak,
      badges,
      title: levelNames[Math.min(level - 1, levelNames.length - 1)],
    }

    return stats
  },

  // Obtener leaderboard
  async getLeaderboard(userStats: UserStats, language: "es" | "en"): Promise<LeaderboardUser[]> {
    await simulateNetworkDelay()
    return generateCoherentLeaderboard(userStats, language)
  },

  // Obtener loot disponible
  async getAvailableLoot(language: "es" | "en"): Promise<LootItem[]> {
    await simulateNetworkDelay()
    return getAvailableLoot(language)
  },

  // Actualizar progreso diario
  async updateDailyProgress(date: string, glasses: number, goal: number): Promise<void> {
    await simulateNetworkDelay()

    const history = await this.getProgressHistory()
    const updatedHistory = history.filter((p) => p.date !== date)
    updatedHistory.push({ date, glasses, goal })

    localStorage.setItem("progressHistory", JSON.stringify(updatedHistory))
  },

  // Desbloquear loot
  async unlockLoot(lootId: string): Promise<void> {
    await simulateNetworkDelay()

    const current = JSON.parse(localStorage.getItem("unlockedLoot") || "[]")
    if (!current.includes(lootId)) {
      current.push(lootId)
      localStorage.setItem("unlockedLoot", JSON.stringify(current))
    }
  },

  // Obtener loot desbloqueado
  async getUnlockedLoot(): Promise<string[]> {
    await simulateNetworkDelay()
    return JSON.parse(localStorage.getItem("unlockedLoot") || "[]")
  },
}

export const AVAILABLE_LOOT: LootItem[] = [
  {
    id: "badge_streak_7",
    type: "badge",
    rarity: "common",
    icon: "🔥",
    name: "7-Day Streak",
    description: "Maintain your hydration goal for 7 consecutive days",
  },
  {
    id: "badge_streak_30",
    type: "badge",
    rarity: "epic",
    icon: "🏆",
    name: "Monthly Master",
    description: "Complete 30 days of consistent hydration",
  },
  {
    id: "badge_perfectionist",
    type: "badge",
    rarity: "rare",
    icon: "⭐",
    name: "Perfectionist",
    description: "Exceed your daily goal for 5 days in a row",
  },
  {
    id: "badge_overachiever",
    type: "badge",
    rarity: "rare",
    icon: "💪",
    name: "Overachiever",
    description: "Drink 150% of your daily goal in a single day",
  },
  {
    id: "badge_consistent",
    type: "badge",
    rarity: "rare",
    icon: "🎯",
    name: "Consistency King",
    description: "Meet your goal for 14 consecutive days",
  },
  {
    id: "badge_hydration_hero",
    type: "badge",
    rarity: "epic",
    icon: "🦸",
    name: "Hydration Hero",
    description: "Reach your goal 50 times total",
  },
  {
    id: "badge_water_warrior",
    type: "badge",
    rarity: "common",
    icon: "⚔️",
    name: "Water Warrior",
    description: "Drink over 100 glasses total",
  },
  {
    id: "badge_goal_crusher",
    type: "badge",
    rarity: "rare",
    icon: "💥",
    name: "Goal Crusher",
    description: "Exceed your goal 10 times",
  },
  {
    id: "badge_dedication",
    type: "badge",
    rarity: "epic",
    icon: "🌟",
    name: "Dedication Badge",
    description: "Use the app for 21 consecutive days",
  },
  {
    id: "title_hydro_master",
    type: "title",
    rarity: "epic",
    icon: "👑",
    name: "Hydro Master",
    description: "An epic title for hydration experts",
  },
  {
    id: "title_aqua_legend",
    type: "title",
    rarity: "legendary",
    icon: "🔱",
    name: "Aqua Legend",
    description: "The most prestigious hydration title",
  },
  {
    id: "theme_ocean",
    type: "theme",
    rarity: "rare",
    icon: "🌊",
    name: "Ocean Theme",
    description: "Deep blue colors inspired by the ocean",
    themeId: "ocean",
  },
  {
    id: "theme_forest",
    type: "theme",
    rarity: "rare",
    icon: "🌲",
    name: "Forest Theme",
    description: "Natural green colors of the forest",
    themeId: "forest",
  },
  {
    id: "theme_sunset",
    type: "theme",
    rarity: "epic",
    icon: "🌅",
    name: "Sunset Theme",
    description: "Warm orange and red sunset colors",
    themeId: "sunset",
  },
  {
    id: "theme_midnight",
    type: "theme",
    rarity: "epic",
    icon: "🌙",
    name: "Midnight Theme",
    description: "Mysterious purple and indigo night colors",
    themeId: "midnight",
  },
  {
    id: "theme_aurora",
    type: "theme",
    rarity: "legendary",
    icon: "🌌",
    name: "Aurora Theme",
    description: "Magical pink and purple aurora colors",
    themeId: "aurora",
  },
  {
    id: "bonus_double_xp",
    type: "bonus",
    rarity: "legendary",
    icon: "⚡",
    name: "Double XP",
    description: "Double your XP for 24 hours",
  },
]

export type { DayProgress, UserStats, LeaderboardUser, LootItem }
