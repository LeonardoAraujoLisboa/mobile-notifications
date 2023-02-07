import OneSignal from "react-native-onesignal";

/* export const tagUserEmailCreate = (email: string) => {
    OneSignal.sendTag('user_email', email)
    OneSignal.deleteTag('user_email') // so precisa passar a tag da chave q vc quer deletar
} */

export const tagUserInfoCreate = () => {
    OneSignal.sendTags({
        user_name: 'Leo',
        user_email: 'leo_araujo05@hotmail.com'
    })
}

export const tagCartUpdate = (itemsCount: string) => {
    OneSignal.sendTag('cart_items_count', itemsCount)
}