import { ActivityIndicator, View } from 'react-native';

export function LoadingList() {
  return (
    <View className="flex-1 items-center justify-center mt-8">
      <ActivityIndicator
        size={64}
        color="#F4C314"
        accessibilityHint="loading"
      />
    </View>
  );
}
