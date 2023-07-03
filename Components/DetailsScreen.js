import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";

export function Details({ navigation, route }) {
  const { id } = route.params;
  const [article, setArticle] = useState();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (id) {
      fetch(`https://dev.to/api/articles/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
        });
    }
  }, [id]);

  if (!article) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }
  return (
    <>
      <ScrollView>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {article.title}
        </Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() =>
            navigation.navigate("Comments", {
              id: article.id,
            })
          }
        >
          Go to the Comments
        </Button>
        <RenderHtml contentWidth={width} source={{ html: article.body_html }} />
      </ScrollView>
    </>
  );
}
