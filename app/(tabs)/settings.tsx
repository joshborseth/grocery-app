import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { SafeAreaView, View } from "react-native";

export default function Tab() {
  const { signOut } = useAuth();
  const { user } = useUser();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="px-4 pt-10 flex">
        <View className="flex justify-center items-center">
          <Avatar size="xl">
            {user?.username && <AvatarFallbackText>{user.username}</AvatarFallbackText>}
            <AvatarImage
              source={{
                uri: user!.imageUrl,
              }}
            />
          </Avatar>
          <Text size="lg">{user?.username ?? user?.fullName}</Text>
          <Text size="sm">{user?.primaryEmailAddress?.emailAddress ?? ""}</Text>
          <Button onPress={signOut} className="mt-4">
            <ButtonText>Sign Out</ButtonText>
          </Button>
        </View>
      </Box>
    </SafeAreaView>
  );
}
