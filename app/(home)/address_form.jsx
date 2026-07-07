import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput as RNTextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import { Button, IconButton, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";
import useLocationStore from "@/store/use_location_store";

const ADDRESS_TYPES = [
    { key: "Home", label: "Home", icon: "home-outline" },
    {
        key: "Office",
        label: "Office",
        icon: "office-building-marker-outline",
    },
    { key: "Custom", label: "Custom / Other", icon: "map-marker-outline" },
];

export default function AddressForm() {
    const params = useLocalSearchParams();
    const isEditMode = !!params.id;

    const { addLocation, updateLocation, deleteLocation } = useLocationStore();

    // Parse helpers for editing state
    const getInitialTitle = () => params.title || "Home";
    const getInitialContactName = () => {
        if (params.contactName) return params.contactName;
        if (params.name) return params.name; // legacy fallback
        
        const valueStr = params.value || "";
        if (valueStr.includes(",")) {
            return valueStr.split(",")[0].trim();
        }
        return valueStr;
    };
    const getInitialAddress = () => {
        if (params.addressLine) return params.addressLine;
        
        // Fallback to parsing left side of legacy subtext
        const subtextStr = params.subtext || "";
        if (subtextStr.includes("-")) {
            const leftSide = subtextStr.split("-")[0].trim();
            if (leftSide.includes(",")) {
                return leftSide.split(",").slice(1).join(",").trim();
            }
            return leftSide;
        }
        return "";
    };
    const getInitialPincode = () => {
        const valueStr = params.value || "";
        if (valueStr.includes(",")) {
            return valueStr.split(",")[1].trim();
        }
        return "";
    };
    const getInitialCity = () => {
        const subtextStr = params.subtext || "";
        if (subtextStr.includes("-")) {
            const rightSide = subtextStr.split("-")[1];
            const parts = rightSide.split(",");
            return parts[0] ? parts[0].trim() : "";
        }
        return "";
    };
    const getInitialState = () => {
        const subtextStr = params.subtext || "";
        if (subtextStr.includes("-")) {
            const rightSide = subtextStr.split("-")[1];
            const parts = rightSide.split(",");
            return parts[1] ? parts[1].trim() : "";
        }
        return "";
    };
    const getInitialCountry = () => {
        const subtextStr = params.subtext || "";
        if (subtextStr.includes("-")) {
            const rightSide = subtextStr.split("-")[1];
            const parts = rightSide.split(",");
            return parts[2] ? parts[2].trim() : "";
        }
        return "";
    };
    const getInitialPhone = () => params.phone || "";
    const getInitialIsDefault = () => params.isDefault === "true";

    // Form fields states
    const [selectedType, setSelectedType] = useState(() => {
        const initialType = params.type || "";
        if (["Home", "Office"].includes(initialType)) {
            return initialType;
        }
        const initialTitle = getInitialTitle();
        if (["Home", "Office"].includes(initialTitle)) {
            return initialTitle;
        }
        return "Custom";
    });
    const [customLabel, setCustomLabel] = useState(() => {
        const initialTitle = getInitialTitle();
        const initialType = params.type || "";
        if (["Home", "Office"].includes(initialType) || ["Home", "Office"].includes(initialTitle)) {
            return "";
        }
        return initialTitle;
    });

    const [contactName, setContactName] = useState(getInitialContactName);
    const [phone, setPhone] = useState(getInitialPhone);
    const [addressLine, setAddressLine] = useState(getInitialAddress);
    const [pincode, setPincode] = useState(getInitialPincode);
    const [city, setCity] = useState(getInitialCity);
    const [stateVal, setStateVal] = useState(getInitialState);
    const [country, setCountry] = useState(getInitialCountry);
    const [isDefault, setIsDefault] = useState(getInitialIsDefault);
    const [isFetchingGps, setIsFetchingGps] = useState(false);

    const handleDetectGpsAddress = async () => {
        try {
            setIsFetchingGps(true);
            toast.success("Fetching current location...");

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                toast.danger("Permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const geocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (geocode && geocode.length > 0) {
                const addressObj = geocode[0];
                const streetName = addressObj.name || addressObj.street || "";
                const pincodeVal = addressObj.postalCode || "";
                const cityVal = addressObj.city || addressObj.subregion || "";
                const stateVal = addressObj.region || "";
                const countryVal = addressObj.country || "";

                setAddressLine(streetName);
                setPincode(pincodeVal);
                setCity(cityVal);
                setStateVal(stateVal);
                setCountry(countryVal);
                
                toast.success("Address filled using GPS!");
            } else {
                toast.danger("Could not resolve address details");
            }
        } catch (error) {
            console.error("GPS Form Fetch Error: ", error);
            toast.danger("Error detecting current location");
        } finally {
            setIsFetchingGps(false);
        }
    };

    const handleSave = () => {
        const finalTitle = selectedType === "Custom" ? customLabel.trim() : selectedType;
        const cleanedContactName = contactName.trim();
        const cleanedPhone = phone.trim();
        const cleanedAddress = addressLine.trim();
        const cleanedPincode = pincode.trim();
        const cleanedCity = city.trim();
        const cleanedState = stateVal.trim();
        const cleanedCountry = country.trim();

        if (!finalTitle || !cleanedContactName || !cleanedPhone || !cleanedAddress || !cleanedPincode || !cleanedCity || !cleanedState || !cleanedCountry) {
            toast.warning("Please fill in all fields");
            return;
        }

        if (cleanedPhone.length < 8) {
            toast.warning("Please enter a valid mobile number");
            return;
        }

        const value = `${cleanedAddress}, ${cleanedPincode}`;
        const subtext = `${cleanedPincode}, ${cleanedAddress} - ${cleanedCity}, ${cleanedState}, ${cleanedCountry}`;

        const payload = {
            title: finalTitle,
            type: selectedType,
            contactName: cleanedContactName,
            addressLine: cleanedAddress,
            pincode: cleanedPincode,
            city: cleanedCity,
            stateVal: cleanedState,
            country: cleanedCountry,
            value,
            subtext,
            phone: cleanedPhone,
            isDefault,
        };

        if (isEditMode) {
            updateLocation(params.id, payload);
            toast.success("Address updated successfully!");
        } else {
            addLocation(payload);
            toast.success("Address added successfully!");
        }

        router.back();
    };

    const handleDelete = () => {
        deleteLocation(params.id);
        toast.success("Address deleted successfully!");
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    iconColor="#0f172a"
                    onPress={() => router.back()}
                />
                <Text style={styles.headerTitle}>
                    {isEditMode ? "Edit Address" : "Add Address"}
                </Text>
                <View style={{ width: 48 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>CONTACT DETAILS</Text>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <RNTextInput
                                placeholder="Full Name"
                                placeholderTextColor="#94a3b8"
                                value={contactName}
                                onChangeText={setContactName}
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <RNTextInput
                                placeholder="e.g. +880 1712-345678"
                                placeholderTextColor="#94a3b8"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                style={styles.textInput}
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionHeader}>ADDRESS DETAILS</Text>
                            <TouchableRipple
                                borderless
                                onPress={handleDetectGpsAddress}
                                disabled={isFetchingGps}
                                style={styles.detectRipple}
                                rippleColor={Colors.ripple}
                            >
                                <View style={styles.detectContainer}>
                                    {isFetchingGps ? (
                                        <ActivityIndicator size={12} color={Colors.primary} />
                                    ) : (
                                        <MaterialCommunityIcons
                                            name="crosshairs-gps"
                                            size={16}
                                            color={Colors.primary}
                                        />
                                    )}
                                    <Text style={styles.detectText}>
                                        {isFetchingGps ? "Detecting..." : "Detect GPS"}
                                    </Text>
                                </View>
                            </TouchableRipple>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Address (House, Street, Area)</Text>
                            <RNTextInput
                                placeholder="e.g. House 12, Road 5, Sector 3"
                                placeholderTextColor="#94a3b8"
                                value={addressLine}
                                onChangeText={setAddressLine}
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.inputGroup, styles.halfColumn]}>
                                <Text style={styles.label}>Post / PIN Code</Text>
                                <RNTextInput
                                    placeholder="e.g. 769008"
                                    placeholderTextColor="#94a3b8"
                                    value={pincode}
                                    onChangeText={setPincode}
                                    keyboardType="numeric"
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={[styles.inputGroup, styles.halfColumn]}>
                                <Text style={styles.label}>City</Text>
                                <RNTextInput
                                    placeholder="e.g. Dhaka"
                                    placeholderTextColor="#94a3b8"
                                    value={city}
                                    onChangeText={setCity}
                                    style={styles.textInput}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.inputGroup, styles.halfColumn]}>
                                <Text style={styles.label}>State</Text>
                                <RNTextInput
                                    placeholder="e.g. Dhaka Division"
                                    placeholderTextColor="#94a3b8"
                                    value={stateVal}
                                    onChangeText={setStateVal}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={[styles.inputGroup, styles.halfColumn]}>
                                <Text style={styles.label}>Country</Text>
                                <RNTextInput
                                    placeholder="e.g. Bangladesh"
                                    placeholderTextColor="#94a3b8"
                                    value={country}
                                    onChangeText={setCountry}
                                    style={styles.textInput}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>ADDRESS TYPE</Text>
                        <View style={styles.radioGroup}>
                            {ADDRESS_TYPES.map((type) => {
                                const active = selectedType === type.key;
                                return (
                                    <TouchableRipple
                                        key={type.key}
                                        borderless
                                        onPress={() => setSelectedType(type.key)}
                                        style={styles.radioOption}
                                        rippleColor={Colors.ripple}
                                    >
                                        <View style={styles.radioRow}>
                                            <MaterialCommunityIcons
                                                name={active ? "radiobox-marked" : "radiobox-blank"}
                                                size={22}
                                                color={active ? Colors.primary : "#64748b"}
                                            />
                                            <MaterialCommunityIcons
                                                name={type.icon}
                                                size={18}
                                                color="#475569"
                                                style={{ marginLeft: 2 }}
                                            />
                                            <Text style={styles.radioText}>{type.label}</Text>
                                        </View>
                                    </TouchableRipple>
                                );
                            })}
                        </View>

                        {selectedType === "Custom" && (
                            <View style={[styles.inputGroup, { marginTop: 4 }]}>
                                <RNTextInput
                                    placeholder="Enter custom label (e.g. Gym, Friend's House)"
                                    placeholderTextColor="#94a3b8"
                                    value={customLabel}
                                    onChangeText={setCustomLabel}
                                    style={styles.textInput}
                                />
                            </View>
                        )}
                    </View>

                    <TouchableRipple
                        borderless
                        onPress={() => setIsDefault(!isDefault)}
                        style={styles.checkboxContainer}
                        rippleColor={Colors.ripple}
                    >
                        <View style={styles.checkboxRow}>
                            <MaterialCommunityIcons
                                name={isDefault ? "checkbox-marked" : "checkbox-blank-outline"}
                                size={22}
                                color={isDefault ? Colors.primary : "#64748b"}
                            />
                            <Text style={styles.checkboxLabel}>Mark this as my default address</Text>
                        </View>
                    </TouchableRipple>

                    <Button
                        mode="contained"
                        buttonColor={Colors.primary}
                        textColor="#ffffff"
                        style={styles.saveButton}
                        labelStyle={styles.saveButtonLabel}
                        onPress={handleSave}
                    >
                        {isEditMode ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
                    </Button>

                    {isEditMode && (
                        <Button
                            mode="outlined"
                            textColor="#ef4444"
                            style={styles.deleteButton}
                            labelStyle={styles.deleteButtonLabel}
                            onPress={handleDelete}
                        >
                            DELETE ADDRESS
                        </Button>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
        paddingBottom: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0f172a",
        flex: 1,
        textAlign: "center",
    },
    formContainer: {
        padding: 16,
        gap: 18,
    },
    section: {
        gap: 10,
    },
    sectionHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#f1f5f9",
    },
    sectionHeader: {
        fontSize: 11.5,
        fontWeight: "bold",
        color: "#64748b",
        letterSpacing: 0.5,
    },
    detectRipple: {
        borderRadius: 4,
    },
    detectContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    detectText: {
        fontSize: 11.5,
        fontWeight: "bold",
        color: Colors.primary,
    },
    inputGroup: {
        gap: 4,
    },
    formRow: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    halfColumn: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#475569",
    },
    textInput: {
        height: 44,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 13.5,
        color: "#0f172a",
        backgroundColor: "#f8fafc",
    },
    radioGroup: {
        gap: 6,
    },
    radioOption: {
        paddingVertical: 4,
        borderRadius: 6,
    },
    radioRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    radioText: {
        fontSize: 13.5,
        fontWeight: "500",
        color: "#334155",
    },
    checkboxContainer: {
        paddingVertical: 4,
        borderRadius: 6,
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    checkboxLabel: {
        fontSize: 13,
        fontWeight: "500",
        color: "#334155",
    },
    saveButton: {
        marginTop: 8,
        borderRadius: 8,
        height: 46,
        justifyContent: "center",
    },
    saveButtonLabel: {
        fontSize: 13.5,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    deleteButton: {
        marginTop: 4,
        borderRadius: 8,
        height: 46,
        justifyContent: "center",
        borderColor: "#fecaca",
        borderWidth: 1,
    },
    deleteButtonLabel: {
        fontSize: 13.5,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
});
