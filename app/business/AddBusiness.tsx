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
import { FullLoading, Title } from "@/components";
import { Colors, fonts } from "@/constants";
import ILImageAdd from "@/assets/images/add_photo.svg";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCategory } from "@/store/reducers/categorySlice";
import useForm from "@/hooks/useForm";
import { storeBusiness } from "@/store/reducers/businessSlice";
import { showMessage } from "react-native-flash-message";

const { width } = Dimensions.get("window");

export default function AddBusiness() {
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState<any>(null);
  const { categories } = useSelector((state: RootState) => state.category);
  const { loading } = useSelector((state: RootState) => state.business);
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useForm({
    image: "",
    category: "",
    name: "",
    contact: "",
    website: "",
    address: "",
    about: "",
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Add new Business",
    });

    dispatch(getCategory());
  }, [dispatch, navigation]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const dataImage = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].fileName,
      };

      setImageUrl(dataImage.uri);
      setForm("image", dataImage);
    }
  };

  const onAddNewBusiness = async () => {
    try {
      await dispatch(storeBusiness(form)).unwrap();
      setImageUrl(null);
      setForm("reset");
      showMessage({
        message: "Business Successfully added",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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

          <Text style={styles.label}>Category</Text>
          <View style={[styles.textinput, { padding: 0 }]}>
            <RNPickerSelect
              onValueChange={(value) => setForm("category", value)}
              value={form.category}
              items={categories.map((category) => ({
                label: category.name,
                value: category.id,
                key: category.id,
              }))}
            />
          </View>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Name"
            value={form.name}
            onChangeText={(val) => setForm("name", val)}
          />

          <Text style={styles.label}>Contact</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Contact"
            value={form.contact}
            onChangeText={(val) => setForm("contact", val)}
          />

          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Website"
            value={form.website}
            onChangeText={(val) => setForm("website", val)}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.textinput, styles.textArea]}
            placeholder="Address"
            multiline
            numberOfLines={3}
            value={form.address}
            onChangeText={(val) => setForm("address", val)}
          />

          <Text style={styles.label}>About</Text>
          <TextInput
            style={[styles.textinput, styles.textArea]}
            placeholder="About"
            multiline
            numberOfLines={5}
            value={form.about}
            onChangeText={(val) => setForm("about", val)}
          />

          <TouchableOpacity
            style={styles.submit}
            onPress={onAddNewBusiness}
            disabled={loading}
          >
            <Text style={styles.submitText}>Add new Business</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && <FullLoading />}
    </>
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
    marginTop: 15,
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
  submit: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    marginVertical: 20,
  },
  submitText: {
    textAlign: "center",
    color: Colors.white,
    fontFamily: fonts.primary.regular,
  },
});
