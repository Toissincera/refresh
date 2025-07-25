import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { UserState } from "../recoil/atom";
import CircularLoading from "../componentsNative/animated/CircularLoading";
import useHydrateUser from "./UserHydration";
import BrowseParent from "../pages/browse/BrowseParent";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import OrderParent from "../pages/order/OrderParent";
import CustomDrawerContent from "./CustomDrawerContent";
import AllOrders from "../pages/admin/AllOrders";
import AllShopkeepers from "../pages/admin/AllShopkeepers";

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
            name="Signup"
            component={Signup}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
          />
        </Drawer.Navigator>
      ) : user.isAdmin === false ? (
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
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="All Orders"
            component={AllOrders}
          />
          <Drawer.Screen
            name="All Shopkeepers"
            component={AllShopkeepers}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
