"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  User, 
  Calendar,
  Clock,
  Flame,
  Target,
  Award,
  ChevronRight,
  CheckCircle2,
  LogOut,
  Settings,
  UserCircle,
  RefreshCw
} from "lucide-react";

type Tab = "dashboard" | "treinos" | "nutricao" | "progresso";

// Sistema de rotação automática a cada 30 dias
const getMonthCycle = () => {
  const startDate = new Date('2024-01-01'); // Data de início do programa
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const cycle = Math.floor(diffDays / 30) % 3; // Ciclo de 3 meses que se repete
  const daysInCurrentCycle = diffDays % 30;
  const daysUntilNextCycle = 30 - daysInCurrentCycle;
  
  return { cycle, daysUntilNextCycle };
};

// Planos de treino que mudam a cada 30 dias
const workoutPlans = [
  // Mês 1 - Iniciante/Adaptação
  [
    {
      id: 1,
      title: "Treino HIIT Iniciante",
      duration: "15 min",
      calories: 180,
      difficulty: "Iniciante",
      exercises: ["Polichinelos", "Agachamentos", "Flexões", "Prancha"],
    },
    {
      id: 2,
      title: "Cardio Leve",
      duration: "20 min",
      calories: 200,
      difficulty: "Iniciante",
      exercises: ["Caminhada rápida", "Elevação de joelhos", "Alongamentos", "Respiração"],
    },
    {
      id: 3,
      title: "Força Básica",
      duration: "25 min",
      calories: 250,
      difficulty: "Iniciante",
      exercises: ["Agachamento livre", "Flexões de joelho", "Prancha", "Abdominais"],
    },
  ],
  // Mês 2 - Intermediário/Progressão
  [
    {
      id: 4,
      title: "HIIT Intermediário",
      duration: "25 min",
      calories: 300,
      difficulty: "Intermediário",
      exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees"],
    },
    {
      id: 5,
      title: "Cardio Intenso",
      duration: "30 min",
      calories: 350,
      difficulty: "Intermediário",
      exercises: ["Corrida intervalada", "Pulos", "Sprint no lugar", "Jumping Jacks"],
    },
    {
      id: 6,
      title: "Força e Resistência",
      duration: "35 min",
      calories: 380,
      difficulty: "Intermediário",
      exercises: ["Agachamento com salto", "Flexões completas", "Lunges", "Prancha lateral"],
    },
  ],
  // Mês 3 - Avançado/Desafio
  [
    {
      id: 7,
      title: "HIIT Avançado",
      duration: "30 min",
      calories: 420,
      difficulty: "Avançado",
      exercises: ["Burpees com flexão", "Box Jumps", "Pistol Squats", "Handstand Push-ups"],
    },
    {
      id: 8,
      title: "Cardio Extremo",
      duration: "35 min",
      calories: 450,
      difficulty: "Avançado",
      exercises: ["Sprint intervalado", "Burpees duplos", "Tuck Jumps", "Bear Crawls"],
    },
    {
      id: 9,
      title: "Força Máxima",
      duration: "40 min",
      calories: 480,
      difficulty: "Avançado",
      exercises: ["Agachamento búlgaro", "Flexões diamante", "Pistol Squats", "L-Sit Hold"],
    },
  ],
];

// Planos alimentares padrão (caso não tenha personalizado)
const defaultNutritionPlans = [
  // Mês 1 - Adaptação Metabólica
  [
    {
      type: "Café da Manhã",
      time: "07:00",
      calories: 450,
      items: ["Ovos mexidos (2 unidades)", "Pão integral (2 fatias)", "Abacate (1/2)", "Café com leite"],
    },
    {
      type: "Almoço",
      time: "12:30",
      calories: 650,
      items: ["Frango grelhado (150g)", "Arroz integral (100g)", "Feijão (80g)", "Salada verde"],
    },
    {
      type: "Lanche",
      time: "16:00",
      calories: 200,
      items: ["Iogurte natural", "Granola (30g)", "Frutas vermelhas"],
    },
    {
      type: "Jantar",
      time: "19:30",
      calories: 550,
      items: ["Salmão grelhado (120g)", "Batata doce (150g)", "Brócolis no vapor", "Azeite"],
    },
  ],
  // Mês 2 - Otimização Nutricional
  [
    {
      type: "Café da Manhã",
      time: "07:00",
      calories: 480,
      items: ["Omelete (3 ovos)", "Aveia (50g)", "Banana", "Pasta de amendoim (20g)"],
    },
    {
      type: "Almoço",
      time: "12:30",
      calories: 680,
      items: ["Carne magra (180g)", "Quinoa (120g)", "Grão de bico (100g)", "Legumes assados"],
    },
    {
      type: "Lanche",
      time: "16:00",
      calories: 220,
      items: ["Whey protein", "Castanhas (30g)", "Maçã"],
    },
    {
      type: "Jantar",
      time: "19:30",
      calories: 570,
      items: ["Peito de peru (150g)", "Arroz integral (80g)", "Aspargos", "Azeite extra virgem"],
    },
  ],
  // Mês 3 - Performance Máxima
  [
    {
      type: "Café da Manhã",
      time: "07:00",
      calories: 520,
      items: ["Panqueca proteica (3 ovos + aveia)", "Mel", "Frutas variadas", "Café preto"],
    },
    {
      type: "Almoço",
      time: "12:30",
      calories: 720,
      items: ["Filé mignon (200g)", "Batata doce (200g)", "Lentilha (100g)", "Salada completa"],
    },
    {
      type: "Lanche",
      time: "16:00",
      calories: 250,
      items: ["Shake proteico", "Amêndoas (40g)", "Banana com canela"],
    },
    {
      type: "Jantar",
      time: "19:30",
      calories: 600,
      items: ["Atum grelhado (180g)", "Quinoa (100g)", "Couve-flor grelhada", "Abacate"],
    },
  ],
];

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [daysUntilRenewal, setDaysUntilRenewal] = useState(30);
  const [workoutReps, setWorkoutReps] = useState<{ [key: string]: number }>({});
  const [personalizedPlan, setPersonalizedPlan] = useState<any>(null);
  const [meals, setMeals] = useState<any[]>([]);

  // Atualiza o ciclo atual ao carregar o componente
  useEffect(() => {
    const { cycle, daysUntilNextCycle } = getMonthCycle();
    setCurrentCycle(cycle);
    setDaysUntilRenewal(daysUntilNextCycle);

    // Inicializa as repetições para os treinos do ciclo atual
    const currentWorkouts = workoutPlans[cycle];
    const initialReps: { [key: string]: number } = {};
    currentWorkouts.forEach((workout, workoutIndex) => {
      workout.exercises.forEach((_, exerciseIndex) => {
        const key = `${workout.id}-${exerciseIndex}`;
        initialReps[key] = 15;
      });
    });
    setWorkoutReps(initialReps);

    // Carregar plano personalizado do localStorage
    const savedPlan = localStorage.getItem('personalizedMealPlan');
    if (savedPlan) {
      try {
        const plan = JSON.parse(savedPlan);
        setPersonalizedPlan(plan);
        setMeals(plan.refeicoes);
      } catch (e) {
        // Se houver erro ao parsear, usa plano padrão
        setMeals(defaultNutritionPlans[cycle]);
      }
    } else {
      // Se não houver plano personalizado, usa plano padrão
      setMeals(defaultNutritionPlans[cycle]);
    }
  }, []);

  const stats = {
    diasConsecutivos: 7,
    caloriasQueimadas: 2450,
    treinosCompletos: 12,
    metaSemanal: 5,
  };

  const workouts = workoutPlans[currentCycle];

  const progressData = [
    { week: "Sem 1", weight: 78, waist: 92 },
    { week: "Sem 2", weight: 77.2, waist: 90 },
    { week: "Sem 3", weight: 76.5, waist: 89 },
    { week: "Sem 4", weight: 75.8, waist: 87 },
  ];

  const toggleWorkout = (id: number) => {
    if (completedWorkouts.includes(id)) {
      setCompletedWorkouts(completedWorkouts.filter(w => w !== id));
    } else {
      setCompletedWorkouts([...completedWorkouts, id]);
    }
  };

  const updateReps = (workoutId: number, exerciseIndex: number, value: number) => {
    const key = `${workoutId}-${exerciseIndex}`;
    setWorkoutReps(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    alert("Saindo da conta...");
    window.location.href = "/";
  };

  const handleSettings = () => {
    alert("Abrindo configurações da conta...");
  };

  const handleProfile = () => {
    alert("Abrindo dados pessoais...");
  };

  const getCycleName = (cycle: number) => {
    const names = ["Adaptação", "Progressão", "Desafio"];
    return names[cycle];
  };

  const getCycleColor = (cycle: number) => {
    const colors = [
      "from-green-500 to-emerald-500",
      "from-orange-500 to-amber-500",
      "from-red-500 to-pink-500"
    ];
    return colors[cycle];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">FitTracker</h1>
                <p className="text-xs sm:text-sm opacity-90">Olá, João! 👋</p>
              </div>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              {/* Profile Menu Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                  <div className="py-2">
                    <button
                      onClick={handleProfile}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors text-left"
                    >
                      <UserCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Dados Pessoais</span>
                    </button>
                    <button
                      onClick={handleSettings}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors text-left"
                    >
                      <Settings className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Configurações</span>
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sair da Conta</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cycle Indicator Banner */}
      <div className={`bg-gradient-to-r ${getCycleColor(currentCycle)} text-white py-3 px-4 shadow-md`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">Ciclo Atual: Mês {currentCycle + 1} - {getCycleName(currentCycle)}</p>
              <p className="text-xs opacity-90">Seus treinos e planos alimentares são atualizados automaticamente</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{daysUntilRenewal}</p>
            <p className="text-xs opacity-90">dias até renovação</p>
          </div>
        </div>
      </div>

      {/* Personalized Plan Banner */}
      {personalizedPlan && (
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">Plano Personalizado Ativo: {personalizedPlan.objetivo}</p>
                <p className="text-xs opacity-90">Meta diária: {personalizedPlan.caloriasDiarias} calorias | P:{personalizedPlan.distribuicaoMacros.proteina}% C:{personalizedPlan.distribuicaoMacros.carboidrato}% G:{personalizedPlan.distribuicaoMacros.gordura}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: "dashboard" as Tab, icon: Home, label: "Início" },
              { id: "treinos" as Tab, icon: Dumbbell, label: "Treinos" },
              { id: "nutricao" as Tab, icon: Apple, label: "Nutrição" },
              { id: "progresso" as Tab, icon: TrendingUp, label: "Progresso" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-4 sm:p-6 rounded-2xl shadow-lg">
                <Flame className="w-8 h-8 mb-2" />
                <p className="text-2xl sm:text-3xl font-bold">{stats.diasConsecutivos}</p>
                <p className="text-xs sm:text-sm opacity-90">Dias Consecutivos</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-4 sm:p-6 rounded-2xl shadow-lg">
                <Target className="w-8 h-8 mb-2" />
                <p className="text-2xl sm:text-3xl font-bold">{stats.caloriasQueimadas}</p>
                <p className="text-xs sm:text-sm opacity-90">Calorias Queimadas</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-4 sm:p-6 rounded-2xl shadow-lg">
                <Award className="w-8 h-8 mb-2" />
                <p className="text-2xl sm:text-3xl font-bold">{stats.treinosCompletos}</p>
                <p className="text-xs sm:text-sm opacity-90">Treinos Completos</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-4 sm:p-6 rounded-2xl shadow-lg">
                <Calendar className="w-8 h-8 mb-2" />
                <p className="text-2xl sm:text-3xl font-bold">{stats.metaSemanal}/5</p>
                <p className="text-xs sm:text-sm opacity-90">Meta Semanal</p>
              </div>
            </div>

            {/* Today's Workout */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Treino de Hoje</h2>
                <span className={`bg-gradient-to-r ${getCycleColor(currentCycle)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  Mês {currentCycle + 1}
                </span>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{workouts[0].title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workouts[0].duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {workouts[0].calories} cal
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {workouts[0].exercises.map((exercise, index) => {
                    const key = `${workouts[0].id}-${index}`;
                    const reps = workoutReps[key] || 15;
                    return (
                      <div key={index} className="flex items-center justify-between gap-2 text-gray-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-600" />
                          <span>{exercise}</span>
                        </div>
                        <span className="text-sm font-semibold text-purple-600">{reps} reps</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab("nutricao")}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Apple className="w-10 h-10 text-green-600 mb-2" />
                    <h3 className="text-lg font-bold text-gray-900">Plano Alimentar</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {personalizedPlan ? "Ver seu plano personalizado" : "Ver refeições de hoje"}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </button>
              <button 
                onClick={() => setActiveTab("progresso")}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <TrendingUp className="w-10 h-10 text-blue-600 mb-2" />
                    <h3 className="text-lg font-bold text-gray-900">Meu Progresso</h3>
                    <p className="text-sm text-gray-600 mt-1">Acompanhar evolução</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Treinos Tab */}
        {activeTab === "treinos" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Seus Treinos</h2>
                <p className="text-sm text-gray-600 mt-1">Ciclo {currentCycle + 1} - {getCycleName(currentCycle)}</p>
              </div>
              <span className="text-sm text-gray-600">{completedWorkouts.length} completos hoje</span>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {workouts.map((workout) => {
                const isCompleted = completedWorkouts.includes(workout.id);
                return (
                  <div
                    key={workout.id}
                    className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all ${
                      isCompleted ? "ring-2 ring-green-500" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-xl">
                            <Dumbbell className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{workout.title}</h3>
                            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full mt-2">
                              {workout.difficulty}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {workout.duration}
                          </span>
                          <span className="flex items-center gap-2">
                            <Flame className="w-4 h-4" />
                            {workout.calories} cal
                          </span>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm font-medium text-gray-700">Exercícios:</p>
                          <div className="space-y-3">
                            {workout.exercises.map((exercise, index) => {
                              const key = `${workout.id}-${index}`;
                              const reps = workoutReps[key] || 10;
                              return (
                                <div key={index} className="flex items-center justify-between gap-4 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                                  <div className="flex items-center gap-2 flex-1">
                                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{exercise}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      min="1"
                                      max="100"
                                      value={reps}
                                      onChange={(e) => updateReps(workout.id, index, parseInt(e.target.value) || 10)}
                                      className="w-16 px-2 py-1 text-center border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium"
                                    />
                                    <span className="text-xs text-gray-600 font-medium">reps</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2">
                        <button
                          onClick={() => toggleWorkout(workout.id)}
                          className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            isCompleted
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-gray-300 text-gray-600 hover:bg-green-500 hover:text-white"
                          }`}
                        >
                          Finalizado ✓
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Nutrição Tab */}
        {activeTab === "nutricao" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {personalizedPlan ? "Seu Plano Personalizado" : "Plano Alimentar"}
                </h2>
                <span className={`bg-gradient-to-r ${getCycleColor(currentCycle)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  {personalizedPlan ? "Personalizado" : `Mês ${currentCycle + 1}`}
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Meta diária: {meals.reduce((acc, meal) => acc + meal.calories, 0)} calorias
              </p>

              {personalizedPlan && (
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">📊 Seu Perfil Nutricional:</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p><strong>Objetivo:</strong> {personalizedPlan.objetivo}</p>
                      <p><strong>Calorias:</strong> {personalizedPlan.caloriasDiarias} kcal/dia</p>
                    </div>
                    <div>
                      <p><strong>Macros:</strong> P:{personalizedPlan.distribuicaoMacros.proteina}% C:{personalizedPlan.distribuicaoMacros.carboidrato}% G:{personalizedPlan.distribuicaoMacros.gordura}%</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progresso Diário</span>
                  <span className="text-sm font-bold text-purple-600">
                    {meals.reduce((acc, meal) => acc + meal.calories, 0)} / {meals.reduce((acc, meal) => acc + meal.calories, 0)} cal
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {meals.map((meal, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{meal.type}</h3>
                      <p className="text-sm text-gray-600 mt-1">{meal.time}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-100 to-pink-100 text-orange-700 px-4 py-2 rounded-xl font-bold">
                      {meal.calories} cal
                    </div>
                  </div>

                  <div className="space-y-2">
                    {meal.items.map((item: string, itemIndex: number) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {meal.macros && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex gap-6 text-sm text-gray-600">
                      <span className="font-medium">P: {meal.macros.proteina}g</span>
                      <span className="font-medium">C: {meal.macros.carboidrato}g</span>
                      <span className="font-medium">G: {meal.macros.gordura}g</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {personalizedPlan && personalizedPlan.recomendacoes && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Recomendações Personalizadas</h3>
                <ul className="space-y-3">
                  {personalizedPlan.recomendacoes.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Progresso Tab */}
        {activeTab === "progresso" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Sua Evolução</h2>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Peso</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-2">75.8 kg</p>
                  <p className="text-sm text-green-600 font-medium">↓ 2.2 kg em 4 semanas</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Cintura</h3>
                  <p className="text-4xl font-bold text-purple-600 mb-2">87 cm</p>
                  <p className="text-sm text-green-600 font-medium">↓ 5 cm em 4 semanas</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Histórico Semanal</h3>
                {progressData.map((data, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-purple-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{data.week}</span>
                      <div className="flex gap-6 text-sm">
                        <span className="text-blue-600 font-medium">{data.weight} kg</span>
                        <span className="text-purple-600 font-medium">{data.waist} cm</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg p-6 sm:p-8">
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Parabéns! 🎉</h3>
              <p className="text-lg opacity-95">
                Você está no caminho certo! Continue assim e alcance seus objetivos.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
