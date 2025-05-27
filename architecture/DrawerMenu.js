import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { UserState } from "../recoil/atom";
import CircularLoading from "../componentsNative/animated/CircularLoading";
import useHydrateUser from "./UserHydration";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AwaitingOTP from "../pages/AwaitingOTP";

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  const [isHydrating, setIsHydrating] = useState(true);
  useHydrateUser(isHydrating, setIsHydrating);
  const user = useRecoilValue(UserState);

  if (isHydrating)
    return (
      <NavigationContainer>
        <CircularLoading fullScreen />
      </NavigationContainer>
    );

  return (
    <NavigationContainer>
      {!user ? (
        <Drawer.Navigator>
          <Drawer.Screen
            name="Login"
            component={Login}
          />
        </Drawer.Navigator>
      ) : user.userStatus === "AwaitingOTP" ? (
        <Drawer.Navigator>
          <Drawer.Screen
            name="AwaitingOTP"
            component={AwaitingOTP}
          />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator>
          <Drawer.Screen
            name="Dashboard"
            component={Dashboard}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
