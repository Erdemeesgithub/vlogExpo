import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { Card } from "react-native-paper";

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
        <>
          <Card style={{ marginBottom: 20 }} key={comment.id}>
            <View>
              <Image
                source={comment.user.profile_image}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>{comment.user.name}</Text>
            </View>

            <Card.Content>
              <RenderHtml
                contentWidth={width}
                source={{ html: comment.body_html }}
              />
            </Card.Content>
          </Card>
        </>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 30,
    height: 30,
    // backgroundColor: "red",
  },
});
