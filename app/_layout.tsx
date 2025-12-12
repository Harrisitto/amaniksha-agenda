import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import db from "../src/hook/sqlite";
import { Platform, StatusBar } from "react-native";
import colors from "../src/theme/colors";
import { registerForPushNotificationsAsync } from "../src/hook/custom/background/notifications";
import { registerBackgroundTaskAsync, isRegistered } from "../src/hook/custom/background/register";
import * as Notifications from "expo-notifications";

export default function Layout() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");

  useEffect(() => {
    // Initialize database
    db.initializeDB().catch((error) => {
      console.error("Error initializing database:", error);
    });

    // Register for push notifications
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    // Register background task
    const setupBackgroundTask = async () => {
      const registered = await isRegistered();
      if (!registered) {
        try {
          await registerBackgroundTaskAsync();
          console.log("Background task registered successfully");
        } catch (error) {
          console.error("Failed to register background task:", error);
        }
      }
    };
    setupBackgroundTask();

    // Set up notification listeners
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification received:", notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification response:", response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.brilliantRose }} />
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar backgroundColor={colors.brilliantRose} barStyle="light-content" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
