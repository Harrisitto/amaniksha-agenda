import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import db from '../../sqlite';
import { nextHourDueNotificationContent, overdueNotificationContent, schedulePushNotification, tomorrowDueNotificationContent } from './notifications';

const BACKGROUND_TASK_IDENTIFIER = 'background-task';

// Register and create the task so that it is available also when the background task screen
// (a React component defined later in this example) is not visible.
// Note: This needs to be called in the global scope, not in a React component.
TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
  try {
    const now = Date.now();
    const allItems = await db.agendaOperations.getAllRows();
    
    for (const item of allItems) {
      const itemTime = new Date(item.end_iso).getTime();
      const timeDiff = itemTime - now;

      /**
       * If the item is marked as done, delete it
       */
      if (item.done) {
        await db.agendaOperations.deleteRow(item.id!);
        continue;
      }

      /**
       * If the item is overdue by more than 24 hours and not done, delete it
       */
      if (timeDiff < -86400000) {
        await db.agendaOperations.deleteRow(item.id!);
        continue;
      }

      /**
       * If the item is overdue and not done, send alert notification
       */
      if (timeDiff < 0) {
        await schedulePushNotification(overdueNotificationContent, new Date());
        continue;
      }

      /**
       * If the item is due within the next hour and not done, send reminder
       */
      if (timeDiff <= 3600000) {
        await schedulePushNotification(nextHourDueNotificationContent, new Date(item.end_iso));
        continue;
      }

      /**
       * If the item is due within 24 hours and not done, schedule tomorrow reminder
       */
      if (timeDiff <= 86400000) {
        await schedulePushNotification(tomorrowDueNotificationContent, new Date(item.end_iso));
        continue;
      }
    }
  } catch (error) {
    console.error('Failed to execute the background task:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
  return BackgroundTask.BackgroundTaskResult.Success;
});

// 2. Register the task at some point in your app by providing the same name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function registerBackgroundTaskAsync() {
  return BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background task calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function unregisterBackgroundTaskAsync() {
  return BackgroundTask.unregisterTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

export const isRegistered = async (): Promise<boolean> => { 
  return TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_IDENTIFIER);
}