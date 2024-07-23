import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { BusinessItem, FullLoading, Title } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  deleteBusinessByUser,
  getBusinessByUser,
} from "@/store/reducers/businessSlice";
import { Colors, fonts } from "@/constants";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

export default function MyBusiness() {
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { mybusiness, loading } = useSelector(
    (state: RootState) => state.business,
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Business",
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getBusinessByUser());
  }, [dispatch]);

  const refetchBusiness = () => {
    dispatch(getBusinessByUser());
  };

  const onDelete = (id: string | number) => {
    Alert.alert(
      "Do you want to delete ?",
      "Are you sure want to Delete this business ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => destroyBusiness(id),
        },
      ],
    );
  };

  const destroyBusiness = async (id: string | number) => {
    try {
      await dispatch(deleteBusinessByUser(id)).unwrap();
      showMessage({
        message: "Business Successfully Deleted",
        type: "success",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.pages}>
        {mybusiness && (
          <FlatList
            data={mybusiness}
            ListHeaderComponent={
              <Title title="My Business" fontSize={24} fontWeight="bold" />
            }
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <View style={{ margin: -10 }}>
                  <BusinessItem
                    item={item}
                    styleItem="row"
                    onPress={() => router.push(`business_detail/${item.id}`)}
                  />
                </View>
                <TouchableOpacity
                  style={styles.buttonDelete}
                  onPress={() => onDelete(item.id)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              </View>
            )}
            onRefresh={refetchBusiness}
            refreshing={loading}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.text}>No Business Found!</Text>
              </View>
            }
          />
        )}
      </View>
      {loading && <FullLoading />}
    </>
  );
}

const styles = StyleSheet.create({
  pages: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  listContainer: {
    padding: 20,
    flexGrow: 1,
    alignContent: "space-between",
  },
  itemContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.primary.medium,
    color: Colors.light.text,
  },
  buttonDelete: {
    padding: 10,
    backgroundColor: Colors.danger,
    alignSelf: "flex-end",
  },
});
