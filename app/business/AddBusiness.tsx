import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Title } from "@/components";
import { Colors, fonts } from "@/constants";
import ILImageAdd from "@/assets/images/add_photo.svg";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCategory } from "@/store/reducers/categorySlice";
import { createSelector } from "@reduxjs/toolkit";
import { selectCategoryOptions } from "@/features/category/categorySelector";

const { width } = Dimensions.get("window");

export default function AddBusiness() {
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState<any>(null);

  const categoriesOptios = useSelector((state: RootState) =>
    selectCategoryOptions(state),
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Add new Business",
    });

    dispatch(getCategory());
  }, [dispatch, navigation]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View style={styles.pages}>
        <Title title="Add new Business" fontSize={24} fontWeight="bold" />
        <Text style={styles.subtitle}>
          Fill all details in order to add new business
        </Text>

        <TouchableOpacity style={styles.addImage} onPress={onPickImage}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <ILImageAdd width={width * 0.2} height={width * 0.2} />
          )}
        </TouchableOpacity>

        <View>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={categoriesOptios}
          />
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.textinput} placeholder="Name" />

        <Text style={styles.label}>Contact</Text>
        <TextInput style={styles.textinput} placeholder="Contact" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.textinput} placeholder="Email" />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.textinput, styles.textArea]}
          placeholder="Address"
          multiline
          numberOfLines={3}
        />

        <View>
          <Text style={styles.label}>About</Text>
          <TextInput
            style={[styles.textinput, styles.textArea]}
            placeholder="About"
            multiline
            numberOfLines={5}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pages: {
    padding: 20,
    backgroundColor: Colors.white,
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.text_muted,
  },
  addImage: {
    backgroundColor: Colors.borderGrey,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 20,
    height: width * 0.3,
    width: width * 0.3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.text,
    marginTop: 10,
    marginBottom: 5,
  },
  textinput: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: fonts.primary.regular,
  },
  textArea: {
    textAlignVertical: "top",
  },
});
