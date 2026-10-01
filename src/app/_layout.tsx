import { Stack, router } from "expo-router";

import IconButton from "@/Components/IconButton";

export default function RootLayout() {
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
          backgroundColor: '#6A1B9A'
        },
        headerTintColor: 'white',
        headerRight: () => (
          <IconButton icon="add" size={36} color="white" onPress={sendData} />
        ),
        // iOS only: same button, but without the iOS 26 glass bubble behind it.
        unstable_headerRightItems: () => [
          {
            type: "custom",
            element: <IconButton icon="add" size={36} color="white" onPress={() => router.push("/new-crime")} />,
            hidesSharedBackground: true,
          },
        ],
      }}
    />
    <Stack.Screen name="new-crime" options={{ title: "Criminal Intent", headerTintColor: "white", headerStyle: { backgroundColor: '#6A1B9A'} }} />

  </Stack>
  
  );
}
