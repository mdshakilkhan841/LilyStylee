import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput as RNTextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Button, IconButton, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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

    const { addLocation, updateLocation } = useLocationStore();

    // Parse helpers for editing state
    const getInitialTitle = () => params.title || "Home";
    const getInitialName = () => {
        const valueStr = params.value || "";
        if (valueStr.includes(",")) {
            return valueStr.split(",")[0].trim();
        }
        return valueStr;
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
            return subtextStr.split("-")[1].trim();
        }
        return subtextStr;
    };
    const getInitialPhone = () => params.phone || "";
    const getInitialIsDefault = () => params.isDefault === "true";

    // Form fields states
    const [selectedType, setSelectedType] = useState(() => {
        const initialTitle = getInitialTitle();
        if (["Home", "Office", "Guest"].includes(initialTitle)) {
            return initialTitle;
        }
        return "Custom";
    });
    const [customLabel, setCustomLabel] = useState(() => {
        const initialTitle = getInitialTitle();
        if (["Home", "Office", "Guest"].includes(initialTitle)) {
            return "";
        }
        return initialTitle;
    });

    const [name, setName] = useState(getInitialName);
    const [phone, setPhone] = useState(getInitialPhone);
    const [pincode, setPincode] = useState(getInitialPincode);
    const [cityDetails, setCityDetails] = useState(getInitialCity);
    const [isDefault, setIsDefault] = useState(getInitialIsDefault);

    const handleSave = () => {
        const finalTitle =
            selectedType === "Custom" ? customLabel.trim() : selectedType;
        const cleanedName = name.trim();
        const cleanedPhone = phone.trim();
        const cleanedPincode = pincode.trim();
        const cleanedCity = cityDetails.trim();

        if (
            !finalTitle ||
            !cleanedName ||
            !cleanedPhone ||
            !cleanedPincode ||
            !cleanedCity
        ) {
            toast.warning("Please fill in all fields");
            return;
        }

        // Validate phone structure (basic check)
        if (cleanedPhone.length < 8) {
            toast.warning("Please enter a valid mobile number");
            return;
        }

        const value = `${cleanedName}, ${cleanedPincode}`;
        const subtext = `${cleanedPincode}, ${cleanedName} - ${cleanedCity}`;

        const payload = {
            title: finalTitle,
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

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
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
                <View style={{ width: 48 }} /> {/* Spacer */}
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.formContainer}>
                    {/* Section 1: Contact Details */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>
                            CONTACT DETAILS
                        </Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <RNTextInput
                                placeholder="Full Name"
                                placeholderTextColor="#94a3b8"
                                value={name}
                                onChangeText={setName}
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

                    {/* Section 2: Address */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>
                            ADDRESS DETAILS
                        </Text>

                        <View style={styles.inputGroup}>
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

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                City, State & Country Details
                            </Text>
                            <RNTextInput
                                placeholder="e.g. Dhaka, BD"
                                placeholderTextColor="#94a3b8"
                                value={cityDetails}
                                onChangeText={setCityDetails}
                                style={styles.textInput}
                            />
                        </View>
                    </View>

                    {/* Section 3: Address Type */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>ADDRESS TYPE</Text>
                        <View style={styles.radioGroup}>
                            {ADDRESS_TYPES.map((type) => {
                                const active = selectedType === type.key;
                                return (
                                    <TouchableRipple
                                        key={type.key}
                                        borderless
                                        onPress={() =>
                                            setSelectedType(type.key)
                                        }
                                        style={styles.radioOption}
                                        rippleColor={Colors.ripple}
                                    >
                                        <View style={styles.radioRow}>
                                            <MaterialCommunityIcons
                                                name={
                                                    active
                                                        ? "radiobox-marked"
                                                        : "radiobox-blank"
                                                }
                                                size={22}
                                                color={
                                                    active
                                                        ? Colors.primary
                                                        : "#64748b"
                                                }
                                            />
                                            <MaterialCommunityIcons
                                                name={type.icon}
                                                size={18}
                                                color="#475569"
                                                style={{ marginLeft: 2 }}
                                            />
                                            <Text style={styles.radioText}>
                                                {type.label}
                                            </Text>
                                        </View>
                                    </TouchableRipple>
                                );
                            })}
                        </View>

                        {/* Custom label input if custom is selected */}
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

                    {/* Default Address Checkbox */}
                    <TouchableRipple
                        borderless
                        onPress={() => setIsDefault(!isDefault)}
                        style={styles.checkboxContainer}
                        rippleColor={Colors.ripple}
                    >
                        <View style={styles.checkboxRow}>
                            <MaterialCommunityIcons
                                name={
                                    isDefault
                                        ? "checkbox-marked"
                                        : "checkbox-blank-outline"
                                }
                                size={22}
                                color={isDefault ? Colors.primary : "#64748b"}
                            />
                            <Text style={styles.checkboxLabel}>
                                Mark this as my default address
                            </Text>
                        </View>
                    </TouchableRipple>

                    {/* Save Button */}
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
    sectionHeader: {
        fontSize: 11.5,
        fontWeight: "bold",
        color: "#64748b",
        letterSpacing: 0.5,
    },
    inputGroup: {
        gap: 4,
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
});
