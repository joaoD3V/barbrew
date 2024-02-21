import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <View className="w-full flex-col gap-5 mb-16">
      <Text className="bg-yellow-beer text-black text-base px-4 py-1 rounded-full font-heading self-start">
        {title}
      </Text>

      {children}
    </View>
  );
}
