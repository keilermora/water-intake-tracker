export type Language = "es" | "en"

export interface Translations {
  // Header
  appTitle: string
  appDescription: string
  level: string
  streak: string

  // Tabs
  today: string
  history: string
  ranking: string
  rewards: string

  // Today tab
  glasses: string
  of: string
  completed: string
  goalReached: string
  addToCart: string
  mlConsumed: string
  mlRemaining: string
  glassSize: string
  customSize: string

  // Motivational messages
  motivational: {
    start: string
    goodStart: string
    halfway: string
    goalReached: string
  }

  // Calendar
  loadingHistory: string
  legend: string
  low: string
  medium: string
  goal: string
  clickDay: string
  months: string[]
  days: string[]

  // Day details modal
  goalAchieved: string
  veryClose: string
  goodProgress: string
  needMore: string
  close: string

  // Leaderboard
  weeklyRanking: string
  competeWith: string
  updatingRanking: string
  points: string
  teams: string

  // Rewards
  rewardCollection: string
  unlockRewards: string
  unlocked: string
  toUnlock: string
  keepStreak: string
  rewardChances: string
  common: string
  rare: string
  epic: string
  legendary: string
  newReward: string
  keepHydrating: string
  awesome: string

  // Level names
  levelNames: string[]

  // Loot items
  loot: {
    [key: string]: {
      name: string
      description: string
    }
  }

  // Teams
  teamNames: {
    oceanBlue: string
    greenRiver: string
  }

  // Settings
  language: string
  selectLanguage: string

  // Add these missing properties
  noRewardsYet: string
  clickDayDetails: string
  pts: string
  daysText: string // Rename to avoid conflict
  unlockedNewReward: string
  great: string
  almostThere: string

  // Add new XP related translations
  extraHydration: string
  noAdditionalXP: string
  glassAdded: string
  glassRemoved: string
  xpEarned: string
  noXpForExtra: string
}

export const translations: Record<Language, Translations> = {
  es: {
    appTitle: "Hidratación Diaria",
    appDescription: "Mantén un registro de tu consumo de agua",
    level: "Nivel",
    streak: "Racha",

    today: "Hoy",
    history: "Historial",
    ranking: "Ranking",
    rewards: "Premios",

    glasses: "vasos",
    of: "de",
    completed: "completado",
    goalReached: "¡Meta alcanzada!",
    addToCart: "Agregar al carrito",
    mlConsumed: "ml consumidos",
    mlRemaining: "ml restantes",
    glassSize: "Tamaño del vaso:",
    customSize: "Tamaño personalizado",

    motivational: {
      start: "¡Comienza tu día hidratándote! 💧",
      goodStart: "¡Buen comienzo! Sigue así 🌊",
      halfway: "¡Vas por buen camino! 💪",
      goalReached: "¡Excelente hidratación! 🎉",
    },

    loadingHistory: "Cargando historial...",
    legend: "Leyenda:",
    low: "Bajo",
    medium: "Medio",
    goal: "Meta",
    clickDay: "💡 Haz click en cualquier día para ver detalles",
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    days: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],

    goalAchieved: "🎉 ¡Meta alcanzada!",
    veryClose: "💪 ¡Muy cerca de la meta!",
    goodProgress: "🌊 Buen progreso",
    needMore: "💧 Necesitas hidratarte más",
    close: "Cerrar",

    weeklyRanking: "Ranking Semanal",
    competeWith: "Compite con otros hidratadores",
    updatingRanking: "Actualizando ranking...",
    points: "puntos",
    teams: "Equipos",

    rewardCollection: "Colección de Premios",
    unlockRewards: "Desbloquea recompensas hidratándote",
    unlocked: "Desbloqueados",
    toUnlock: "Por Desbloquear",
    keepStreak: "Mantén tu racha para descubrir",
    rewardChances: "Probabilidades de Recompensa",
    common: "Común",
    rare: "Raro",
    epic: "Épico",
    legendary: "Legendario",
    newReward: "¡Nueva Recompensa!",
    keepHydrating: "🎉 ¡Has desbloqueado una nueva recompensa! Sigue hidratándote para conseguir más.",
    awesome: "¡Genial!",
    noRewardsYet: "¡Aún no has desbloqueado premios!",
    clickDayDetails: "Haz click en cualquier día para ver detalles",
    pts: "pts",
    daysText: "días",
    unlockedNewReward: "¡Has desbloqueado una nueva recompensa! Sigue hidratándote para conseguir más",
    great: "¡Genial!",
    almostThere: "💪 ¡Muy cerca de la meta!",

    levelNames: [
      "Gota Novata",
      "Arroyo Principiante",
      "Río Emergente",
      "Lago Constante",
      "Mar Dedicado",
      "Océano Maestro",
      "Tsunami Legendario",
      "Hidro Supremo",
    ],

    loot: {
      badge_streak_7: {
        name: "Racha de 7 días",
        description: "Mantén tu meta de hidratación por 7 días consecutivos",
      },
      badge_streak_30: {
        name: "Maestro Mensual",
        description: "Completa 30 días de hidratación consistente",
      },
      badge_perfectionist: {
        name: "Perfeccionista",
        description: "Supera tu meta diaria por 5 días seguidos",
      },
      badge_overachiever: {
        name: "Sobresaliente",
        description: "Bebe 150% de tu meta diaria en un solo día",
      },
      badge_consistent: {
        name: "Rey de la Consistencia",
        description: "Cumple tu meta por 14 días consecutivos",
      },
      badge_hydration_hero: {
        name: "Héroe de Hidratación",
        description: "Alcanza tu meta 50 veces en total",
      },
      badge_water_warrior: {
        name: "Guerrero del Agua",
        description: "Bebe más de 100 vasos en total",
      },
      badge_goal_crusher: {
        name: "Destructor de Metas",
        description: "Supera tu meta 10 veces",
      },
      badge_dedication: {
        name: "Insignia de Dedicación",
        description: "Usa la app por 21 días consecutivos",
      },
      title_hydro_master: {
        name: "Maestro Hidro",
        description: "Un título épico para expertos en hidratación",
      },
      title_aqua_legend: {
        name: "Leyenda Acuática",
        description: "El título de hidratación más prestigioso",
      },
      theme_ocean: {
        name: "Tema Océano",
        description: "Colores inspirados en el océano profundo",
      },
      bonus_double_xp: {
        name: "Doble XP",
        description: "Duplica tu XP por 24 horas",
      },
    },

    teamNames: {
      oceanBlue: "Océano Azul",
      greenRiver: "Río Verde",
    },

    language: "Idioma",
    selectLanguage: "Seleccionar idioma",
    extraHydration: "¡Hidratación extra!",
    noAdditionalXP: "Sin XP adicional",
    glassAdded: "Vaso agregado",
    glassRemoved: "Vaso removido",
    xpEarned: "XP ganado",
    noXpForExtra: "Los vasos adicionales no otorgan XP",
  },

  en: {
    appTitle: "Daily Hydration",
    appDescription: "Keep track of your water intake",
    level: "Level",
    streak: "Streak",

    today: "Today",
    history: "History",
    ranking: "Ranking",
    rewards: "Rewards",

    glasses: "glasses",
    of: "of",
    completed: "completed",
    goalReached: "Goal reached!",
    addToCart: "Add to cart",
    mlConsumed: "ml consumed",
    mlRemaining: "ml remaining",
    glassSize: "Glass size:",
    customSize: "Custom size",

    motivational: {
      start: "Start your day by hydrating! 💧",
      goodStart: "Good start! Keep it up 🌊",
      halfway: "You're on the right track! 💪",
      goalReached: "Excellent hydration! 🎉",
    },

    loadingHistory: "Loading history...",
    legend: "Legend:",
    low: "Low",
    medium: "Medium",
    goal: "Goal",
    clickDay: "💡 Click on any day to see details",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

    goalAchieved: "🎉 Goal achieved!",
    veryClose: "💪 Very close to goal!",
    goodProgress: "🌊 Good progress",
    needMore: "💧 You need to hydrate more",
    close: "Close",

    weeklyRanking: "Weekly Ranking",
    competeWith: "Compete with other hydrators",
    updatingRanking: "Updating ranking...",
    points: "points",
    teams: "Teams",

    rewardCollection: "Reward Collection",
    unlockRewards: "Unlock rewards by hydrating",
    unlocked: "Unlocked",
    toUnlock: "To Unlock",
    keepStreak: "Keep your streak to discover",
    rewardChances: "Reward Chances",
    common: "Common",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
    newReward: "New Reward!",
    keepHydrating: "🎉 You've unlocked a new reward! Keep hydrating to get more.",
    awesome: "Awesome!",
    noRewardsYet: "You haven't unlocked any rewards yet!",
    clickDayDetails: "Click on any day to see details",
    pts: "pts",
    daysText: "days",
    unlockedNewReward: "You've unlocked a new reward! Keep hydrating to get more",
    great: "Awesome!",
    almostThere: "💪 Very close to goal!",

    levelNames: [
      "Newbie Drop",
      "Beginner Stream",
      "Emerging River",
      "Steady Lake",
      "Dedicated Sea",
      "Ocean Master",
      "Legendary Tsunami",
      "Hydro Supreme",
    ],

    loot: {
      badge_streak_7: {
        name: "7-Day Streak",
        description: "Maintain your hydration goal for 7 consecutive days",
      },
      badge_streak_30: {
        name: "Monthly Master",
        description: "Complete 30 days of consistent hydration",
      },
      badge_perfectionist: {
        name: "Perfectionist",
        description: "Exceed your daily goal for 5 days in a row",
      },
      badge_overachiever: {
        name: "Overachiever",
        description: "Drink 150% of your daily goal in a single day",
      },
      badge_consistent: {
        name: "Consistency King",
        description: "Meet your goal for 14 consecutive days",
      },
      badge_hydration_hero: {
        name: "Hydration Hero",
        description: "Reach your goal 50 times total",
      },
      badge_water_warrior: {
        name: "Water Warrior",
        description: "Drink over 100 glasses total",
      },
      badge_goal_crusher: {
        name: "Goal Crusher",
        description: "Exceed your goal 10 times",
      },
      badge_dedication: {
        name: "Dedication Badge",
        description: "Use the app for 21 consecutive days",
      },
      title_hydro_master: {
        name: "Hydro Master",
        description: "An epic title for hydration experts",
      },
      title_aqua_legend: {
        name: "Aqua Legend",
        description: "The most prestigious hydration title",
      },
      theme_ocean: {
        name: "Ocean Theme",
        description: "Colors inspired by the deep ocean",
      },
      bonus_double_xp: {
        name: "Double XP",
        description: "Double your XP for 24 hours",
      },
    },

    teamNames: {
      oceanBlue: "Ocean Blue",
      greenRiver: "Green River",
    },

    language: "Language",
    selectLanguage: "Select language",
    extraHydration: "Extra hydration!",
    noAdditionalXP: "No additional XP",
    glassAdded: "Glass added",
    glassRemoved: "Glass removed",
    xpEarned: "XP earned",
    noXpForExtra: "Extra glasses don't grant XP",
  },
}
