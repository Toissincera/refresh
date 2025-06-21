import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { UserState } from "../recoil/atom";
import CircularLoading from "../componentsNative/animated/CircularLoading";
import useHydrateUser from "./UserHydration";
import BrowseParent from "../pages/browse/BrowseParent";
import Login from "../pages/Login";
import OrderParent from "../pages/order/OrderParent";
import CustomDrawerContent from "./CustomDrawerContent";

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
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
          <Drawer.Screen
            name="Login"
            component={Login}
          />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Browse"
            component={BrowseParent}
          />
          <Drawer.Screen
            name="Order"
            component={OrderParent}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
