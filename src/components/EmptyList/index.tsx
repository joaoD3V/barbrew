import { Image, Text, View } from 'react-native';
import logoImg from '@/assets/logo.png';

export function EmptyList() {
  return (
    <View className="h-[400px] items-center justify-center gap-2">
      <Image
        source={logoImg}
        className="w-32 h-32 "
        resizeMode="contain"
        testID="logo"
      />
      <Text className="text-xl">Sorry... This beer not found</Text>
    </View>
  );
}
