import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const notificationChannel = 'myNotificationChannel';

export const tomorrowDueNotificationContent = {
  title: "Tienes algo que hacer mañana ⏰",
  body: "Revisa tu agenda para más detalles.",
  data: { type: 'dueTomorrow' },
  sound: 'notification_mistery.mp3',
};

export const nextHourDueNotificationContent = {
  title: "Tienes algo que hacer en la próxima hora ⏰",
  body: "Revisa tu agenda para más detalles.",
  data: { type: 'dueNextHour' },
  sound: 'notification_truck.mp3',
};

export const overdueNotificationContent = {
  title: "¡Elemento de la agenda vencido! ⚠️",
  body: "Revisa tu agenda para más detalles.",
  data: { type: 'overdue' },
  sound: 'notification_truck.mp3',
};

export async function schedulePushNotification(content: Notifications.NotificationContentInput, date: Date) {
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        channelId: notificationChannel,
      },
    });
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(notificationChannel, {
      name: 'App main channel',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#642ca9',
      sound: 'notification_truck.mp3',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? 
        Constants?.easConfig?.projectId;

      if (!projectId) {
        throw new Error('Project ID not found');
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token;
}
