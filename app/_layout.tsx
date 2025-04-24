import {useEffect} from 'react';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {store} from "@/store/store";
import {Provider} from "react-redux";

declare global {
    interface Window {
        frameworkReady?: () => void;
    }
}

export default function RootLayout() {
    useEffect(() => {
        window.frameworkReady?.();
    }, []);

    return (
        <>
            <AuthProvider>
                <Provider store={store}>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Screen name="index"/>
                        <Stack.Screen name="register"/>
                        <Stack.Screen name="(tabs)" options={{animation: 'fade'}}/>
                    </Stack>
                    <StatusBar style="auto"/>
                </Provider>
            </AuthProvider>
        </>
    );
}
