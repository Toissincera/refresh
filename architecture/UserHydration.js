import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { UserState } from "../recoil/atom";
import { Alert } from "react-native";
import { supabase } from "../supabase/supabase";

export default function useHydrateUser(isHydrating, setIsHydrating) {
  const setUser = useSetRecoilState(UserState);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 2000)
        );
        const userString = await Promise.race([
          AsyncStorage.getItem("user"),
          timeout,
        ]);
        if (userString) {
          console.log("user found: ", userString)
          const userJson = JSON.parse(userString);
          let { data, error } = await supabase
            .from("shopkeepers")
            .select("*")
            .eq("id", userJson.id)
            .single();
          if (error) {
            setUser(userJson);
          } else if (!data || !data.id) {
            await AsyncStorage.removeItem("user");
            setUser(null);
            Alert.alert("No user found", "Please sign in again.");
          } else {
            await AsyncStorage.setItem("user", JSON.stringify(data));
            setUser(data);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        Alert.alert("User not found", JSON.stringify(err, null, 4));
      } finally {
        setIsHydrating(false);
      }
    };
    loadUser();
  }, []);
}
