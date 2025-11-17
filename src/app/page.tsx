"use client";

import { useState } from "react";
import { Check, Star, Users, Trophy, Clock, Shield, ChevronRight, X, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

type QuizStep = {
  question: string;
  options: string[];
};

const quizSteps: QuizStep[] = [
  {
    question: "Qual é seu principal objetivo?",
    options: ["Emagrecer", "Ganhar massa muscular", "Melhorar condicionamento", "Manter a forma"],
  },
  {
    question: "Quantas vezes por semana você se exercita atualmente?",
    options: ["Não me exercito", "1-2 vezes", "3-4 vezes", "5+ vezes"],
  },
  {
    question: "Você possui alguma restrição alimentar?",
    options: ["Nenhuma", "Vegetariano/Vegano", "Intolerância à lactose", "Outras restrições"],
  },
  {
    question: "Prefere treinos em casa ou na academia?",
    options: ["Em casa", "Na academia", "Ambos", "Ao ar livre"],
  },
];

type PricingPlan = {
  name: string;
  period: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  features: string[];
  popular?: boolean;
  savings?: string;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Mensal",
    period: "mês",
    price: 49.90,
    features: [
      "Acesso completo ao FitTracker",
      "Treinos personalizados",
      "Cardápios adaptados",
      "Acompanhamento diário",
      "Suporte via chat",
      "Guia de receitas (BÔNUS)",
    ],
  },
  {
    name: "Trimestral",
    period: "3 meses",
    price: 119.90,
    originalPrice: 149.70,
    discount: "20% OFF",
    savings: "Economize R$ 29,80",
    popular: true,
    features: [
      "Tudo do plano Mensal",
      "3 meses de acesso",
      "Desconto de 20%",
      "Plano de treino avançado",
      "Consultoria nutricional (1x)",
      "Acesso ao grupo VIP",
      "Guia de suplementação (BÔNUS)",
    ],
  },
  {
    name: "Anual",
    period: "12 meses",
    price: 399.90,
    originalPrice: 598.80,
    discount: "33% OFF",
    savings: "Economize R$ 198,90",
    features: [
      "Tudo do plano Trimestral",
      "12 meses de acesso",
      "Desconto de 33%",
      "Consultoria nutricional (3x)",
      "Avaliação física personalizada",
      "Suporte prioritário 24/7",
      "E-book exclusivo de receitas fit",
      "Acesso vitalício ao grupo VIP",
    ],
  },
];

// Sistema inteligente de geração de planos alimentares personalizados
const generatePersonalizedMealPlan = (answers: string[]) => {
  const [objetivo, nivelAtividade, restricao, localTreino] = answers;
  
  // Determinar calorias base conforme objetivo e nível de atividade
  let caloriasDiarias = 2000;
  let distribuicaoMacros = { proteina: 30, carboidrato: 40, gordura: 30 };
  
  if (objetivo === "Emagrecer") {
    caloriasDiarias = nivelAtividade === "Não me exercito" ? 1500 : 1700;
    distribuicaoMacros = { proteina: 35, carboidrato: 35, gordura: 30 };
  } else if (objetivo === "Ganhar massa muscular") {
    caloriasDiarias = nivelAtividade === "5+ vezes" ? 2800 : 2400;
    distribuicaoMacros = { proteina: 40, carboidrato: 40, gordura: 20 };
  } else if (objetivo === "Melhorar condicionamento") {
    caloriasDiarias = 2200;
    distribuicaoMacros = { proteina: 30, carboidrato: 45, gordura: 25 };
  }

  // Ajustar refeições conforme restrições alimentares
  const gerarRefeicoes = () => {
    const isVegetariano = restricao === "Vegetariano/Vegano";
    const isIntolerante = restricao === "Intolerância à lactose";

    return [
      {
        type: "Café da Manhã",
        time: "07:00",
        calories: Math.round(caloriasDiarias * 0.25),
        items: isVegetariano 
          ? ["Aveia com frutas (80g)", "Pasta de amendoim (20g)", "Banana", "Leite vegetal (200ml)"]
          : isIntolerante
          ? ["Ovos mexidos (2 unidades)", "Pão integral (2 fatias)", "Abacate (1/2)", "Café preto"]
          : ["Ovos mexidos (2 unidades)", "Pão integral (2 fatias)", "Abacate (1/2)", "Café com leite"],
        macros: {
          proteina: Math.round((caloriasDiarias * 0.25 * distribuicaoMacros.proteina) / 400),
          carboidrato: Math.round((caloriasDiarias * 0.25 * distribuicaoMacros.carboidrato) / 400),
          gordura: Math.round((caloriasDiarias * 0.25 * distribuicaoMacros.gordura) / 900),
        }
      },
      {
        type: "Lanche da Manhã",
        time: "10:00",
        calories: Math.round(caloriasDiarias * 0.10),
        items: isVegetariano
          ? ["Frutas variadas", "Castanhas (30g)", "Suco natural"]
          : isIntolerante
          ? ["Iogurte sem lactose", "Granola (30g)", "Frutas vermelhas"]
          : ["Iogurte natural", "Granola (30g)", "Frutas vermelhas"],
        macros: {
          proteina: Math.round((caloriasDiarias * 0.10 * distribuicaoMacros.proteina) / 400),
          carboidrato: Math.round((caloriasDiarias * 0.10 * distribuicaoMacros.carboidrato) / 400),
          gordura: Math.round((caloriasDiarias * 0.10 * distribuicaoMacros.gordura) / 900),
        }
      },
      {
        type: "Almoço",
        time: "12:30",
        calories: Math.round(caloriasDiarias * 0.35),
        items: isVegetariano
          ? ["Tofu grelhado (150g)", "Quinoa (120g)", "Grão de bico (100g)", "Salada completa", "Azeite"]
          : objetivo === "Ganhar massa muscular"
          ? ["Carne magra (200g)", "Arroz integral (150g)", "Feijão (100g)", "Batata doce (100g)", "Salada verde"]
          : ["Frango grelhado (150g)", "Arroz integral (100g)", "Feijão (80g)", "Salada verde", "Azeite"],
        macros: {
          proteina: Math.round((caloriasDiarias * 0.35 * distribuicaoMacros.proteina) / 400),
          carboidrato: Math.round((caloriasDiarias * 0.35 * distribuicaoMacros.carboidrato) / 400),
          gordura: Math.round((caloriasDiarias * 0.35 * distribuicaoMacros.gordura) / 900),
        }
      },
      {
        type: "Lanche da Tarde",
        time: "16:00",
        calories: Math.round(caloriasDiarias * 0.10),
        items: objetivo === "Ganhar massa muscular"
          ? ["Whey protein", "Banana com aveia", "Pasta de amendoim (20g)"]
          : isVegetariano
          ? ["Proteína vegetal", "Frutas", "Amêndoas (30g)"]
          : ["Iogurte proteico", "Frutas", "Castanhas (30g)"],
        macros: {
          proteina: Math.round((caloriasDiarias * 0.10 * distribuicaoMacros.proteina) / 400),
          carboidrato: Math.round((caloriasDiarias * 0.10 * distribuicaoMacros.carboidrato) / 400),
          gordura: Math.round((caloriasDiarias * 0.10 * distribuicaoMacros.gordura) / 900),
        }
      },
      {
        type: "Jantar",
        time: "19:30",
        calories: Math.round(caloriasDiarias * 0.20),
        items: isVegetariano
          ? ["Lentilha (150g)", "Quinoa (80g)", "Legumes assados", "Salada", "Azeite"]
          : objetivo === "Emagrecer"
          ? ["Peixe grelhado (120g)", "Legumes no vapor", "Salada verde", "Azeite"]
          : ["Salmão grelhado (150g)", "Batata doce (100g)", "Brócolis no vapor", "Azeite"],
        macros: {
          proteina: Math.round((caloriasDiarias * 0.20 * distribuicaoMacros.proteina) / 400),
          carboidrato: Math.round((caloriasDiarias * 0.20 * distribuicaoMacros.carboidrato) / 400),
          gordura: Math.round((caloriasDiarias * 0.20 * distribuicaoMacros.gordura) / 900),
        }
      },
    ];
  };

  return {
    objetivo,
    caloriasDiarias,
    distribuicaoMacros,
    refeicoes: gerarRefeicoes(),
    recomendacoes: [
      objetivo === "Emagrecer" ? "Mantenha déficit calórico de 300-500 calorias" : "Mantenha superávit calórico de 300-500 calorias",
      `Beba pelo menos ${nivelAtividade === "5+ vezes" ? "3" : "2"} litros de água por dia`,
      restricao === "Vegetariano/Vegano" ? "Suplementar vitamina B12 é recomendado" : "Varie as fontes de proteína ao longo da semana",
      "Faça refeições a cada 3-4 horas para manter metabolismo ativo",
      objetivo === "Ganhar massa muscular" ? "Consuma proteína logo após o treino" : "Evite carboidratos simples à noite",
    ]
  };
};

export default function Home() {
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [personalizedPlan, setPersonalizedPlan] = useState<any>(null);

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Gerar plano personalizado baseado nas respostas
      const plan = generatePersonalizedMealPlan(newAnswers);
      setPersonalizedPlan(plan);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
    setEmail("");
    setPersonalizedPlan(null);
  };

  const handleStartApp = () => {
    // Salvar plano personalizado no localStorage para usar no app
    if (personalizedPlan) {
      localStorage.setItem('personalizedMealPlan', JSON.stringify(personalizedPlan));
    }
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Trophy className="w-4 h-4" />
              <span>Mais de 50.000 pessoas transformadas</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              Transforme seu corpo<br />em <span className="text-yellow-300">30 dias</span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed">
              O FitTracker é o único aplicativo que garante resultados visíveis,<br className="hidden sm:block" />
              mesmo para quem tem uma rotina agitada!
            </p>
            
            <p className="text-lg sm:text-xl max-w-3xl mx-auto opacity-95">
              Descubra como qualquer pessoa pode alcançar suas metas de fitness rapidamente,<br className="hidden sm:block" />
              sem dietas restritivas ou treinos exaustivos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={handleStartApp}
                className="group bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 shadow-2xl hover:shadow-yellow-300/50 hover:scale-105 flex items-center gap-2"
              >
                Acessar Aplicativo
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setShowQuiz(true)}
                className="group bg-white/20 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center gap-2"
              >
                Fazer Quiz Gratuito
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm pt-2">
              <Shield className="w-5 h-5" />
              <span>Garantia de 30 dias ou seu dinheiro de volta</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-8 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-yellow-300" />
                <span>Sem equipamentos especiais</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-yellow-300" />
                <span>Treinos de 15-30 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-yellow-300" />
                <span>Resultados garantidos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Você já passou por isso?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Você já começou uma dieta ou um plano de exercícios, mas acabou desistindo no meio do caminho? 
              A frustração é comum. O estresse do dia a dia, a falta de tempo e informações complicadas 
              são barreiras que fazem você jogar a toalha.
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-purple-600 pt-4">
              O FitTracker elimina essas barreiras de forma simples e direta.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              A Solução Inteligente para Seus Resultados
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              O FitTracker é um aplicativo inteligente que combina acompanhamento de nutrição, 
              planos de treino personalizados e motivação diária para garantir que você alcance 
              suas metas rapidamente, sem complicações.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Resultados Rápidos",
                description: "Alcance suas metas em até 30 dias com nosso método comprovado",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Acompanhamento Personalizado",
                description: "Treinos e dietas feitos sob medida para você e seu estilo de vida",
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Motivação Diária",
                description: "Mensagens motivacionais que ajudam a manter o foco e disciplina",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Fácil de Usar",
                description: "Interface intuitiva que qualquer pessoa pode navegar sem dificuldade",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gradient-to-br from-orange-400 to-pink-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold text-sm sm:text-base animate-pulse">
              🔥 OFERTA LIMITADA
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Escolha Seu Plano Ideal
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Invista na sua saúde e transformação. Todos os planos incluem garantia de 30 dias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  plan.popular ? "ring-4 ring-purple-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    MAIS POPULAR
                  </div>
                )}

                {plan.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                    {plan.discount}
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <p className="text-gray-400 line-through text-lg">
                        R$ {plan.originalPrice.toFixed(2)}
                      </p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gray-900">
                        R$ {plan.price.toFixed(2)}
                      </span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <p className="text-green-600 font-semibold text-sm mt-2">
                        {plan.savings}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleStartApp}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 mb-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Começar Agora
                  </button>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              💳 Aceitamos todos os cartões de crédito e débito
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Pagamento 100% seguro e criptografado
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              O Que Você Vai Receber
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Acesso imediato ao FitTracker",
              "Treinos personalizados para seu nível e objetivos",
              "Cardápios adaptados ao seu gosto e necessidades",
              "Acompanhamento e feedback diário",
              "Acesso ao grupo exclusivo de suporte e motivação",
              "Guia de receitas saudáveis e práticas (BÔNUS GRÁTIS)",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white p-4 sm:p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-br from-orange-400 to-pink-500 text-white rounded-full p-2 flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-lg text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              O Que Nossos Usuários Dizem
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Ana Silva",
                age: "34 anos",
                text: "Perdi 5kg em um mês sem passar fome! O FitTracker mudou minha vida!",
                rating: 5,
              },
              {
                name: "Carlos Mendes",
                age: "28 anos",
                text: "Finalmente um aplicativo que entendeu minha rotina e se encaixou perfeitamente!",
                rating: 5,
              },
              {
                name: "Juliana Costa",
                age: "42 anos",
                text: "Nunca imaginei que conseguiria me exercitar regularmente. Agora é parte da minha rotina!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl hover:bg-white/20 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm opacity-90">{testimonial.age}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 sm:p-12 rounded-3xl shadow-xl">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Garantia de 30 Dias
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Experimente o FitTracker por 30 dias sem riscos! Se não estiver satisfeito, 
              você recebe <span className="font-bold text-green-600">100% do seu investimento de volta</span>. 
              Sem perguntas, sem complicações.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "É difícil usar o FitTracker?",
                answer: "De forma alguma! É extremamente simples e intuitivo. Qualquer pessoa consegue usar, independente da idade ou experiência com tecnologia.",
              },
              {
                question: "Preciso de equipamento especial?",
                answer: "Não! Você pode treinar em casa com o que já tem. Nossos treinos são adaptados para usar o peso do corpo ou objetos do dia a dia.",
              },
              {
                question: "E se eu não gostar?",
                answer: "Temos uma garantia de satisfação total de 30 dias. Se não gostar, devolvemos 100% do seu dinheiro. Sem riscos!",
              },
              {
                question: "Quanto tempo leva para ver resultados?",
                answer: "A maioria dos nossos usuários vê resultados visíveis em 2-3 semanas. Em 30 dias, a transformação é significativa!",
              },
              {
                question: "Posso cancelar minha assinatura a qualquer momento?",
                answer: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem taxas ou multas. Seu acesso continuará até o final do período pago.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
            Comece Sua Transformação AGORA!
          </h2>
          <p className="text-xl sm:text-2xl opacity-95">
            Não perca mais tempo. A mudança que você deseja está a um clique de distância. 
            O FitTracker é a sua melhor escolha para alcançar o corpo dos seus sonhos, 
            de forma rápida e sem complicações!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartApp}
              className="group bg-white text-purple-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 shadow-2xl hover:shadow-yellow-300/50 hover:scale-110 inline-flex items-center justify-center gap-3"
            >
              Acessar Aplicativo
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setShowQuiz(true)}
              className="group bg-white/20 backdrop-blur-sm text-white border-2 border-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              Fazer Quiz Gratuito
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-sm opacity-90">
            ✓ Sem cartão de crédito necessário<br />
            ✓ Acesso imediato ao aplicativo
          </p>
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Descubra Seu Plano Ideal</h3>
                <p className="text-sm opacity-90 mt-1">
                  {!showResult ? `Pergunta ${currentStep + 1} de ${quizSteps.length}` : "Resultado"}
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {!showResult ? (
                <div className="space-y-6">
                  <div className="mb-4">
                    <div className="flex gap-2 mb-6">
                      {quizSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 flex-1 rounded-full transition-all ${
                            index <= currentStep
                              ? "bg-gradient-to-r from-purple-600 to-pink-600"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold text-gray-900 mb-6">
                    {quizSteps[currentStep].question}
                  </h4>

                  <div className="space-y-3">
                    {quizSteps[currentStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(option)}
                        className="w-full text-left p-4 sm:p-5 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 font-medium text-gray-800 hover:scale-105"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
                    <Trophy className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
                      Seu Plano Personalizado Está Pronto!
                    </h4>
                    <p className="text-lg text-gray-700 mb-6 text-center">
                      Com base nas suas respostas, criamos um plano perfeito para você alcançar seus objetivos.
                    </p>
                  </div>

                  {personalizedPlan && (
                    <div className="space-y-6">
                      {/* Resumo do Objetivo */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                        <h5 className="font-bold text-gray-900 mb-3 text-lg">📊 Seu Perfil:</h5>
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Objetivo:</strong> {personalizedPlan.objetivo}</p>
                          <p><strong>Calorias Diárias:</strong> {personalizedPlan.caloriasDiarias} kcal</p>
                          <p><strong>Distribuição de Macros:</strong></p>
                          <div className="ml-4 space-y-1">
                            <p>• Proteína: {personalizedPlan.distribuicaoMacros.proteina}%</p>
                            <p>• Carboidrato: {personalizedPlan.distribuicaoMacros.carboidrato}%</p>
                            <p>• Gordura: {personalizedPlan.distribuicaoMacros.gordura}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Plano Alimentar */}
                      <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
                        <h5 className="font-bold text-gray-900 mb-4 text-lg">🍽️ Seu Plano Alimentar Personalizado:</h5>
                        <div className="space-y-4">
                          {personalizedPlan.refeicoes.map((refeicao: any, index: number) => (
                            <div key={index} className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h6 className="font-bold text-gray-900">{refeicao.type}</h6>
                                  <p className="text-sm text-gray-600">{refeicao.time}</p>
                                </div>
                                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                  {refeicao.calories} kcal
                                </span>
                              </div>
                              <ul className="space-y-1 mb-2">
                                {refeicao.items.map((item: string, idx: number) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                              <div className="flex gap-4 text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200">
                                <span>P: {refeicao.macros.proteina}g</span>
                                <span>C: {refeicao.macros.carboidrato}g</span>
                                <span>G: {refeicao.macros.gordura}g</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recomendações */}
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                        <h5 className="font-bold text-gray-900 mb-3 text-lg">💡 Recomendações Personalizadas:</h5>
                        <ul className="space-y-2">
                          {personalizedPlan.recomendacoes.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pt-4">
                    <p className="text-gray-700 text-center">
                      Deixe seu e-mail para receber seu plano completo:
                    </p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-gray-900"
                    />
                    <button
                      onClick={() => {
                        if (email) {
                          alert(`Obrigado! Enviamos seu plano personalizado para ${email}`);
                          handleStartApp();
                        }
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      Receber Plano e Acessar App
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 FitTracker. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Transforme seu corpo. Transforme sua vida.
          </p>
        </div>
      </footer>
    </div>
  );
}
