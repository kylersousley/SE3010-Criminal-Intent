import { Stack, router } from "expo-router";
import { Alert, View } from "react-native";
import { useContext } from "react";
import { ThemeContext, ThemeContextProvider } from "@/contexts/ThemeContext";

import IconButton from "@/Components/IconButton";

export default function RootLayout() {
  return (
    <ThemeContextProvider>
      <ThemedStack />
    </ThemeContextProvider>
  )
}

function ThemedStack() {
  const {theme, textIconColor} = useContext(ThemeContext)

  const sendData = () => {
    router.push({
      pathname: '/new-crime',
      params: { id: "" }
    });
  }
  return (
  <Stack screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
    <Stack.Screen 
      name="index"
      options= {{
        title: 'Criminal Intent',
        headerStyle: {
          backgroundColor: theme
        },
        headerTintColor: textIconColor,
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 16 }}>
            <IconButton icon="add" size={36} color={textIconColor} onPress={sendData} />
            <IconButton icon="settings-outline" size={36} color={textIconColor} onPress={() => Alert.alert("test")} />
          </View>
        ),
        unstable_headerRightItems: () => [
          {
            type: "custom",
            element: <IconButton icon="add" size={36} color={textIconColor} onPress={sendData} />,
            hidesSharedBackground: true,
          },
          {
            type: "custom",
            element: <IconButton icon="settings-outline" size={36} color={textIconColor} onPress={() => router.push("/change-theme")} />,
            hidesSharedBackground: true,
          },
        ],
      }}
    />
    <Stack.Screen name="new-crime" options={{ title: "Criminal Intent", headerTintColor: textIconColor, headerStyle: { backgroundColor: theme} }} />
    <Stack.Screen name="change-theme" options={{ title: "Criminal Intent", headerTintColor: textIconColor, headerStyle: { backgroundColor: theme } }} />
  </Stack>
  );
}
