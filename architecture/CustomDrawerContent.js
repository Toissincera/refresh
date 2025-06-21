import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Alert, View } from "react-native";
import * as Updates from "expo-updates";

export default function CustomDrawerContent(props) {
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
          onPress={(e) => {
            e.preventDefault();
            props.navigation.closeDrawer();
          }}
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
              `Update channel: ${Updates.channel}\n
              Update ID: ${Updates.updateId}\n
              Update Runtime Version: ${Updates.runtimeVersion}`
            );
          }}
        />
        <DrawerItem
          label="Log Out"
          onPress={(e) => {
            e.preventDefault();
            props.navigation.closeDrawer();
            Alert.alert("This should log you out...ideally");
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}
