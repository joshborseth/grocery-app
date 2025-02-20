import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@/components/ui/drawer";
import { Text } from "@/components/ui/text";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { LogOut, Menu } from "lucide-react-native";
import React from "react";

export function MainSidebar() {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  return (
    <>
      <Button
        onPress={() => {
          setShowDrawer(true);
        }}
        variant="link"
        className="px-3"
      >
        <ButtonIcon size="xl" as={Menu} />
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
      >
        <DrawerBackdrop />
        <DrawerContent className="w-[270px] pt-10">
          <DrawerHeader className="flex justify-start gap-2">
            <Avatar size="md">
              {user?.username && <AvatarFallbackText>{user.username}</AvatarFallbackText>}
              <AvatarImage
                source={{
                  uri: user!.imageUrl,
                }}
              />
            </Avatar>
            <Text size="lg">{user?.username ?? user?.fullName}</Text>
          </DrawerHeader>
          <DrawerBody contentContainerClassName="gap-2"></DrawerBody>
          <DrawerFooter>
            <Button className="w-full gap-2" variant="outline" action="secondary" onPress={signOut}>
              <ButtonText>Logout</ButtonText>
              <ButtonIcon as={LogOut} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
