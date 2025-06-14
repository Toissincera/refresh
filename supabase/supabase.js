import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = "https://lcfoigtqlfchauzgqsjw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZm9pZ3RxbGZjaGF1emdxc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTc1MzcsImV4cCI6MjA2NTM3MzUzN30.L-l8YAeHcO5-RBmB6ezYJfjSY6CBDJaDy_P93KEO2lw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
