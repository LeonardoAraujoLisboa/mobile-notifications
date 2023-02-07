import OneSignal from 'react-native-onesignal';
import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';
/* import { tagUserEmailCreate } from './src/notifications/notificationsTags'; */

const oneSignalAppId = Platform.OS === 'ios' ? 'aisdoiasdopa' : 'a4c9f872-b90c-4311-91f4-4c77e3c246a8'
OneSignal.setAppId(oneSignalAppId)//id que tem no one signal. Ai é pelo id 

OneSignal.setEmail('leo_araujo05@hotmail.com')//ai seria para enviar email quando o usuário se cadastra usando o email dele

OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log(response);
})

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  tagUserInfoCreate()/* ai no onesignal vc faz a mensagem personalizada colocando o titulo e a mensagem utilizando as tags de user_email e user_name e caso nao exista coloca uns default */

  /* tagUserEmailCreate('leo_araujo05@hotmail.com') *//* se eu for em audience la no onesignal vai estar la esse email nas tags ({user_email: leo_araujo05@hotmail.com}). Para criar uma notificação com isso, voce vai em mesagens, faz todas as coisas e envia colocando send to a particular segments*/

  /* useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      console.log('notificação aberta', response)
      const {actionId} = response.action as any
      if (actionId) {
        switch (actionId) {
          case '1':
              console.log('ver todas');
            break;
        
          case '2':
              console.log('ver pedidos');
            break;
          default: 
            console.log('nao foi clicado em nenhum botão de ação');
            break;
        }
      }
    })
    return () => unsubscribe
  }, []) o nome disso é deep linking para quando o usuário clicar na notificação navegar o usuário de acordo com a notificação */

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
      {/* {notification?.title && <Notification title={notification.title} onClose={() => setNotification(undefined)} />} agr vou refatorar levando la para routes */}
    </NativeBaseProvider>
  );
}