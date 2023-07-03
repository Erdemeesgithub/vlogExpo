import { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, Text } from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

export function Comments({ route }) {
  const [comments, setComments] = useState();
  const { width } = useWindowDimensions();
  const { id } = route.params;

  useEffect(() => {
    if (id) {
      fetch(`https://dev.to/api/comments?a_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
        });
    }
  }, [id]);

  if (!comments) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }
  return (
    <ScrollView>
      {comments.map((comment) => (
        <View>
          <Text style={{ color: "pink" }}>{comment.user.name}</Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: comment.body_html }}
          />
        </View>
      ))}
    </ScrollView>
  );
}
