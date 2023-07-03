import { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card, Text } from "react-native-paper";

export function Home({ navigation }) {
  const [articles, setArticles] = useState();

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=whitep4nth3r")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      });
  }, []);

  if (!articles) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <ScrollView>
          {articles.map((article) => (
            <Card
              key={article.id}
              style={{ marginBottom: 30 }}
              onPress={() => {
                navigation.navigate(
                  "Details",

                  {
                    id: article.id,
                  }
                );
              }}
            >
              <Card.Content>
                <Text variant="titleLarge">{article.title}</Text>
              </Card.Content>
              <Card.Cover
                source={{
                  uri: article.cover_image || "https://picsum.photos/700",
                }}
              />
            </Card>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
