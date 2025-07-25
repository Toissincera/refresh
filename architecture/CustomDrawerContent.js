import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Alert, View } from "react-native";
import * as Updates from "expo-updates";
import { UserState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CustomDrawerContent(props) {
  const [user, setUser] = useRecoilState(UserState);
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
      }}
      {...props}
    >
      <View>
        <DrawerItem
          label={() => (
            <View style={{ marginLeft: "auto" }}>
              <MaterialIcons
                name="chevron-left"
                size={24}
                color="black"
              />
            </View>
          )}
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItemList {...props} />
      </View>
      <View>
        <DrawerItem
          label="App Info"
          onPress={(e) => {
            e.preventDefault();
            Alert.alert(
              "App Information",
              `Update channel: ${Updates.channel}\n` +
                `ID: ${Updates.updateId}\n` +
                `Runtime: ${Updates.runtimeVersion}\n` +
                `ID: ${user.id}\n` +
                `Name: ${user.name}\n` +
                `Number: ${user.phoneNumber}\n` +
                `Address: ${user.address}`
            );
          }}
        />
        <DrawerItem
          label="Log Out"
          onPress={async () => {
            props.navigation.closeDrawer();
            try {
              await AsyncStorage.removeItem("user");
              setUser(null);
            } catch (err) {
              console.error("Error during logout:", err);
            }
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}
