/* eslint-disable react-hooks/exhaustive-deps */
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Loading } from '@/components/Loading';
import { Routes } from '@/routes';
import { store } from '@/store';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return (
    <ReduxProvider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded && !fontError ? <Loading /> : <Routes />}
    </ReduxProvider>
  );
}
