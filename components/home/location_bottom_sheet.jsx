import React, {
    forwardRef,
    useCallback,
    useMemo,
    useState,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { TouchableRipple, Button, ActivityIndicator } from "react-native-paper";
import * as Location from "expo-location";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";
import useLocationStore from "@/store/use_location_store";

const LocationBottomSheet = forwardRef(
    ({ onSelectLocation, selectedLocation }, ref) => {
        const bottomSheetRef = useRef(null);
        const [sheetIndex, setSheetIndex] = useState(-1);
        const [isFetchingGps, setIsFetchingGps] = useState(false);
        const { savedLocations } = useLocationStore();

        const isSelected = (value) => {
            if (!selectedLocation) return false;
            const normalizedSelected = selectedLocation
                .replace(/\s+/g, "")
                .toLowerCase();
            const normalizedValue = value.replace(/\s+/g, "").toLowerCase();

            if (value.includes(",")) {
                const parts = value.split(",");
                const reversedValue = `${parts[1].trim()}, ${parts[0].trim()}`;
                const normalizedReversed = reversedValue
                    .replace(/\s+/g, "")
                    .toLowerCase();
                return (
                    normalizedSelected === normalizedValue ||
                    normalizedSelected === normalizedReversed
                );
            }

            return normalizedSelected === normalizedValue;
        };

        const getIconForType = (type) => {
            const lower = (type || "").toLowerCase().trim();
            if (lower === "home") return "home-outline";
            if (lower === "office") return "office-building-marker-outline";
            return "map-marker-outline";
        };

        const isGpsSelected = !!(
            selectedLocation &&
            !savedLocations.some((loc) => isSelected(loc.value))
        );

        const [gpsAddressText, setGpsAddressText] = useState(() => {
            if (isGpsSelected) {
                return selectedLocation;
            }
            return "Using GPS tracking";
        });

        const snapPoints = useMemo(() => ["56%"], []);

        useImperativeHandle(ref, () => ({
            expand: () => {
                bottomSheetRef.current?.present();
            },
            close: () => {
                bottomSheetRef.current?.dismiss();
            },
        }));

        useEffect(() => {
            if (sheetIndex < 0) return;

            const onBackPress = () => {
                bottomSheetRef.current?.dismiss();
                return true;
            };

            const subscription = BackHandler.addEventListener(
                "hardwareBackPress",
                onBackPress,
            );

            return () => subscription.remove();
        }, [sheetIndex]);

        useEffect(() => {
            if (sheetIndex < 0) return;

            const fetchSilentGPS = async () => {
                try {
                    const { status } =
                        await Location.getForegroundPermissionsAsync();
                    if (status !== "granted") return;

                    const location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    });

                    const geocode = await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });

                    if (geocode && geocode.length > 0) {
                        const addressObj = geocode[0];
                        const name = addressObj.name || addressObj.street || "";
                        const pincode = addressObj.postalCode || "";
                        const city =
                            addressObj.city || addressObj.subregion || "";
                        const country = addressObj.country || "";

                        const parts = [];
                        if (name) parts.push(name);
                        if (city) parts.push(city);
                        if (country) parts.push(country);

                        const detailsStr = parts.join(", ");
                        const text = pincode
                            ? `${pincode}, ${detailsStr}`
                            : detailsStr;
                        setGpsAddressText(text || "Using GPS tracking");
                    }
                } catch (error) {
                    console.warn("Silent GPS Fetch error: ", error);
                }
            };

            fetchSilentGPS();
        }, [sheetIndex]);

        const renderBackdrop = useCallback(
            (props) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    pressBehavior="close"
                />
            ),
            [],
        );

        return (
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
                onChange={setSheetIndex}
                onDismiss={() => setSheetIndex(-1)}
            >
                <BottomSheetView style={styles.sheetContainer}>
                    <Text style={styles.sheetTitle}>
                        Select Delivery Location
                    </Text>

                    {/* GPS Current Location Option */}
                    <TouchableRipple
                        borderless
                        disabled={isFetchingGps}
                        onPress={async () => {
                            if (isFetchingGps) return;
                            try {
                                setIsFetchingGps(true);
                                toast.success("Fetching current location...");

                                const { status } =
                                    await Location.requestForegroundPermissionsAsync();
                                if (status !== "granted") {
                                    toast.danger(
                                        "Permission to access location was denied",
                                    );
                                    return;
                                }

                                const location =
                                    await Location.getCurrentPositionAsync({
                                        accuracy: Location.Accuracy.Balanced,
                                    });

                                const geocode =
                                    await Location.reverseGeocodeAsync({
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    });

                                if (geocode && geocode.length > 0) {
                                    const addressObj = geocode[0];
                                    const name =
                                        addressObj.name ||
                                        addressObj.street ||
                                        "";
                                    const pincode = addressObj.postalCode || "";
                                    const city =
                                        addressObj.city ||
                                        addressObj.subregion ||
                                        "";
                                    const country = addressObj.country || "";

                                    const value = pincode
                                        ? `${name}, ${pincode}`
                                        : name;

                                    const parts = [];
                                    if (name) parts.push(name);
                                    if (city) parts.push(city);
                                    if (country) parts.push(country);

                                    const detailsStr = parts.join(", ");
                                    const text = pincode
                                        ? `${pincode}, ${detailsStr}`
                                        : detailsStr;
                                    setGpsAddressText(
                                        text || "Using GPS tracking",
                                    );
                                    onSelectLocation?.(value);
                                    toast.success(
                                        "Location updated successfully!",
                                    );
                                    bottomSheetRef.current?.dismiss();
                                } else {
                                    toast.danger(
                                        "Could not resolve address details",
                                    );
                                }
                            } catch (error) {
                                console.error("GPS Fetch Error: ", error);
                                toast.danger("Error fetching current location");
                            } finally {
                                setIsFetchingGps(false);
                            }
                        }}
                        rippleColor={Colors.ripple}
                        style={[
                            styles.locationOption,
                            isGpsSelected && styles.locationOptionActive,
                            isFetchingGps && { opacity: 0.7 },
                        ]}
                    >
                        <View style={styles.optionContent}>
                            {isFetchingGps ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.primary}
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="crosshairs-gps"
                                    size={20}
                                    color={Colors.primary}
                                />
                            )}
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionTitle}>
                                    {isFetchingGps
                                        ? "Locating..."
                                        : "Use Current Location"}
                                </Text>
                                <Text style={styles.optionSub}>
                                    {isFetchingGps
                                        ? "Detecting current address..."
                                        : gpsAddressText}
                                </Text>
                            </View>
                            {isGpsSelected && !isFetchingGps && (
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={20}
                                    color={Colors.primary}
                                />
                            )}
                        </View>
                    </TouchableRipple>

                    {/* Dynamic Mapped Saved Locations */}
                    {savedLocations.map((loc) => {
                        const active = isSelected(loc.value);
                        return (
                            <View key={loc.id} style={styles.optionContainer}>
                                <TouchableRipple
                                    borderless
                                    onPress={() => {
                                        onSelectLocation?.(loc.value);
                                        toast.success(
                                            `Location updated to ${loc.title}`,
                                        );
                                        bottomSheetRef.current?.dismiss();
                                    }}
                                    rippleColor={Colors.ripple}
                                    style={[
                                        styles.locationOption,
                                        active && styles.locationOptionActive,
                                        { flex: 1 },
                                    ]}
                                >
                                    <View style={styles.optionContent}>
                                         <MaterialCommunityIcons
                                             name={getIconForType(loc.type)}
                                             size={20}
                                             color={Colors.primary}
                                         />
                                        <View
                                            style={styles.optionTextContainer}
                                        >
                                            <Text style={styles.optionTitle}>
                                                {loc.title}
                                            </Text>
                                            <Text style={styles.optionSub}>
                                                {loc.subtext}
                                            </Text>
                                        </View>
                                        {active && (
                                            <MaterialCommunityIcons
                                                name="check-circle"
                                                size={20}
                                                color={Colors.primary}
                                                style={{ marginRight: 4 }}
                                            />
                                        )}
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple
                                    borderless
                                    onPress={() => {
                                        bottomSheetRef.current?.dismiss();
                                        router.push({
                                            pathname: "/(home)/address_form",
                                            params: {
                                                id: loc.id,
                                                title: loc.title,
                                                type: loc.type || "",
                                                contactName: loc.contactName || loc.name || "",
                                                addressLine: loc.addressLine || "",
                                                value: loc.value,
                                                subtext: loc.subtext,
                                                phone: loc.phone || "",
                                                isDefault: loc.isDefault
                                                    ? "true"
                                                    : "false",
                                            },
                                        });
                                    }}
                                    rippleColor={Colors.ripple}
                                    style={styles.editButton}
                                >
                                    <MaterialCommunityIcons
                                        name="pencil-outline"
                                        size={18}
                                        color={Colors.primary}
                                    />
                                </TouchableRipple>
                            </View>
                        );
                    })}

                    {/* Add New Address Button */}
                    <Button
                        mode="outlined"
                        icon="plus"
                        textColor={Colors.primary}
                        style={styles.addButton}
                        labelStyle={styles.addButtonLabel}
                        onPress={() => {
                            bottomSheetRef.current?.dismiss();
                            router.push("/(home)/address_form");
                        }}
                    >
                        ADD NEW ADDRESS
                    </Button>
                </BottomSheetView>
            </BottomSheetModal>
        );
    },
);

LocationBottomSheet.displayName = "LocationBottomSheet";

const styles = StyleSheet.create({
    sheetContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 10,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.textDark || "#000000",
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    locationOption: {
        borderWidth: 1,
        borderColor: Colors.borderLight || "#e2e8f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    locationOptionActive: {
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        backgroundColor: "#fff0f6",
    },
    editButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: Colors.borderLight || "#e2e8f0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    optionContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.textDark || "#000000",
    },
    optionSub: {
        fontSize: 11.5,
        color: "#64748b",
        marginTop: 1,
    },
    addButton: {
        marginTop: 6,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 8,
    },
    addButtonLabel: {
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
});

export default LocationBottomSheet;
