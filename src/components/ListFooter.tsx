import { ActivityIndicator, View } from 'react-native';

export function ListFooter() {
  return (
    <View className="flex-1 items-center justify-center mt-6">
      <ActivityIndicator size={64} color="#F4C314" />
    </View>
  );
}
