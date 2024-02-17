import { ActivityIndicator, View } from 'react-native';

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={64} color="#F4C314" />
    </View>
  );
}
