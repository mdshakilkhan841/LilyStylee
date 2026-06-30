import { View, Text, Dimensions } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import LogoMain from "@/assets/images/logo-main.svg";
import { TouchableRipple } from "react-native-paper";
import { Colors } from "../../constants/Colors";

const TabBar = ({ state, descriptors, navigation }) => {
    const width = Dimensions.get("window").width;

    const getTabIcon = (routeName, isFocused) => {
        const color = isFocused ? Colors.primary : "black";
        switch (routeName) {
            case "index":
                return <LogoMain width={32} height={32} />;
            case "category":
                return (
                    <MaterialCommunityIcons
                        name="bag-personal-tag-outline"
                        size={20}
                        color={color}
                    />
                );
            case "lilysChoice":
                return (
                    <FontAwesome6 name="chess-queen" size={20} color={color} />
                );
            case "wishlist":
                return (
                    <MaterialCommunityIcons
                        name="heart-outline"
                        size={20}
                        color={color}
                    />
                );
            case "cart":
                return (
                    <MaterialCommunityIcons
                        name="shopping-outline"
                        size={20}
                        color={color}
                    />
                );
            default:
                return null;
        }
    };

    const getTabLabel = (routeName) => {
        switch (routeName) {
            case "index":
                return "Home";
            case "category":
                return "Category";
            case "lilysChoice":
                return "Lily's Choice";
            case "wishlist":
                return "Wishlist";
            case "cart":
                return "Bag";
            default:
                return routeName;
        }
    };

    return (
        <View
            style={{
                flexDirection: "row",
                width: "100%",
                height: 70,
                backgroundColor: "white",
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            }}
        >
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                const label = getTabLabel(route.name);

                return (
                    <LinearGradient
                        key={route.key}
                        colors={
                            isFocused
                                ? [Colors.primaryLight, "#fff"]
                                : ["#fff", "#fff"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{
                            width: width / state.routes.length,
                        }}
                    >
                        <TouchableRipple
                            rippleColor={Colors.ripple}
                            style={{
                                flex: 1,
                                alignItems: "center",
                                height: "100%",
                                width: "100%",
                                paddingTop: 5,
                                borderTopWidth: 2.5,
                                borderTopColor: isFocused
                                    ? Colors.primaryHover
                                    : "white",
                            }}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            {route.name === "index" ? (
                                <LogoMain width={32} height={32} />
                            ) : (
                                <>
                                    {getTabIcon(route.name, isFocused)}
                                    <Text
                                        className={`sm:text-base text-xs ${
                                            isFocused
                                                ? "text-pink-600"
                                                : "text-black"
                                        }`}
                                    >
                                        {label}
                                    </Text>
                                </>
                            )}
                        </TouchableRipple>
                    </LinearGradient>
                );
            })}
        </View>
    );
};

export default TabBar;
