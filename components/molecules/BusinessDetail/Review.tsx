import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { Colors, fonts } from "@/constants";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { postRating } from "@/store/reducers/businessSlice";
import ErrorText from "@/components/atoms/ErrorText";

interface Props {
  id: any;
}

export default function Review({ id }: Props) {
  const [rating, setRating] = useState(0);
  const [inputComment, setInputComment] = useState("");

  const { errorField } = useSelector((state: RootState) => state.business);
  const dispatch = useDispatch<AppDispatch>();

  const onReview = () => {
    const payload = {
      rating,
      comment: inputComment,
    };
    dispatch(postRating({ id, payload }));
    setInputComment("");
    setRating(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <Rating
        imageSize={30}
        showRating={false}
        startingValue={rating}
        onFinishRating={(val: any) => setRating(val)}
        style={{ paddingVertical: 10 }}
      />
      {errorField?.errors?.rating && (
        <ErrorText label={errorField?.errors?.rating[0]} align="center" />
      )}

      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
        placeholder="Write your comment"
        value={inputComment}
        onChangeText={(val: string) => setInputComment(val)}
      />
      <TouchableOpacity
        style={customStyle.button(inputComment.length <= 0 || rating === 0)}
        disabled={inputComment.length <= 0}
        onPress={onReview}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary.medium,
    color: Colors.light.text,
  },
  input: {
    marginTop: 15,
    color: Colors.light.text,
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.black,
  },
  button: {
    marginTop: 15,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.white,
  },
});

const customStyle = {
  button: (disable: boolean): ViewStyle => ({
    marginVertical: 15,
    padding: 10,
    backgroundColor: disable ? Colors.disabled : Colors.PRIMARY,
    borderRadius: 6,
  }),
};
