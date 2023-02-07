import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';
import * as Linking from 'expo-linking'

const linking = {
  prefixes: ['igniteshoesapp://', 'com.rocketseat.igniteshoesapp://', 'exp+igniteshoesapp://'],//ai sao os schemes que ele vai aceitar para reconhecer a aplicação
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          producId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();

  const [notification, setNotification] = useState<OSNotification>()

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const deepLinking = Linking.createURL('details', {
    queryParams: {
      productId: '7'
    }
  })

  console.log(deepLinking); /* o console vai mostrar igniteshoesapp://?detailsproductId=7 
    no terminal eu passo igniteshoesapp://?details/7 e ai redireciona o usuario para o produto de id 7 e é isso que voce coloca tbm la no oneSignal */
 

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification()
      setNotification(response)
    })/* assim eu to pegando a notificação em primeiro plano, por isso eu coloco no useEffect... */
    return () => unsubscribe
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification?.title && <Notification data={notification} onClose={() => setNotification(undefined)} />}
    </NavigationContainer>
  );
}