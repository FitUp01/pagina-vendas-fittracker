import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export type User = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  user_id: string;
  objetivo: string;
  nivel_atividade: string;
  restricao_alimentar: string;
  local_treino: string;
  peso_atual: number;
  altura: number;
  idade: number;
  genero: string;
  created_at: string;
  updated_at: string;
};

export type WorkoutProgress = {
  id: string;
  user_id: string;
  workout_id: number;
  workout_name: string;
  completed_at: string;
  duration_minutes: number;
  calories_burned: number;
  exercises_completed: string[];
};

export type NutritionLog = {
  id: string;
  user_id: string;
  meal_type: string;
  meal_time: string;
  calories: number;
  items: string[];
  logged_at: string;
};

export type ProgressMeasurement = {
  id: string;
  user_id: string;
  weight: number;
  waist: number;
  chest?: number;
  hips?: number;
  measured_at: string;
};

// Funções auxiliares para autenticação
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Funções para perfil do usuário
export const createUserProfile = async (profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([profile])
    .select()
    .single();
  return { data, error };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();
  return { data, error };
};

// Funções para progresso de treinos
export const logWorkout = async (workout: Omit<WorkoutProgress, 'id' | 'completed_at'>) => {
  const { data, error } = await supabase
    .from('workout_progress')
    .insert([workout])
    .select()
    .single();
  return { data, error };
};

export const getWorkoutHistory = async (userId: string, limit = 30) => {
  const { data, error } = await supabase
    .from('workout_progress')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(limit);
  return { data, error };
};

// Funções para log nutricional
export const logMeal = async (meal: Omit<NutritionLog, 'id' | 'logged_at'>) => {
  const { data, error } = await supabase
    .from('nutrition_logs')
    .insert([meal])
    .select()
    .single();
  return { data, error };
};

export const getDailyNutrition = async (userId: string, date: string) => {
  const { data, error } = await supabase
    .from('nutrition_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('logged_at', `${date}T00:00:00`)
    .lte('logged_at', `${date}T23:59:59`)
    .order('logged_at', { ascending: true });
  return { data, error };
};

// Funções para medições de progresso
export const addMeasurement = async (measurement: Omit<ProgressMeasurement, 'id' | 'measured_at'>) => {
  const { data, error } = await supabase
    .from('progress_measurements')
    .insert([measurement])
    .select()
    .single();
  return { data, error };
};

export const getMeasurements = async (userId: string, limit = 30) => {
  const { data, error } = await supabase
    .from('progress_measurements')
    .select('*')
    .eq('user_id', userId)
    .order('measured_at', { ascending: false })
    .limit(limit);
  return { data, error };
};
