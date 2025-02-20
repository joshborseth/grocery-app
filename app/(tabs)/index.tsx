import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { SafeAreaView } from "react-native";

export default function App() {
  const fetchLists = async () => {
    const response = await fetch("http://localhost:8081/hello");
    const data = await response.json();
    console.log(data);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="p-4">
        <Heading className="font-inter-extrabold text-3xl">Grocery List</Heading>
        {/* <FlatList /> */}
        <Button>
          <ButtonText onPress={fetchLists}>Fetch Lists</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
}
