/* eslint-disable react/no-unescaped-entities */
import { Beer as BeerProps } from '@/store/slices/brewery';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftCircle } from 'lucide-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '@/assets/logo.png';
import { Section } from '@/components/Section';

type RouteParams = {
  beer: BeerProps;
};

export function Beer() {
  const route = useRoute();

  const { beer } = route.params as RouteParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('home');
  }

  return (
    <SafeAreaView className="flex-col w-full bg-yellow-beer flex-1 relative">
      <View className="flex-col px-5 py-8 w-full">
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeftCircle size={32} className="text-black" strokeWidth={1.5} />
        </TouchableOpacity>

        <Text className="font-heading text-3xl mt-12 w-1/2 leading-relaxed">
          {beer.name}
        </Text>
      </View>

      <Image
        className="w-[200px] h-[350px] absolute top-32 right-5 z-10"
        resizeMode="contain"
        source={beer.image_url ? { uri: beer.image_url } : logoImg}
      />

      <View className="absolute h-1/2 flex-col px-5  w-full bottom-0 bg-white-bubble rounded-t-[40px]">
        <ScrollView
          className="w-full mt-16"
          showsVerticalScrollIndicator={false}
        >
          <Section title="Description">
            <Text className="text-lg leading-relaxed">{beer.description}</Text>
          </Section>

          <Section title="Specifications">
            <View className="flex-row flex-wrap items-center">
              {beer.abv && (
                <Text className="text-lg leading-relaxed">ABV: {beer.abv}</Text>
              )}

              {beer.ibu && (
                <>
                  <Text className="mx-4">|</Text>
                  <Text className="text-lg leading-relaxed">
                    IBU: {beer.ibu}
                  </Text>
                </>
              )}

              {beer.ebc && (
                <>
                  <Text className="mx-4">|</Text>
                  <Text className="text-lg leading-relaxed">
                    EBC: {beer.ebc}
                  </Text>
                </>
              )}

              {beer.srm && (
                <>
                  <Text className="mx-4">|</Text>
                  <Text className="text-lg leading-relaxed">
                    SRM: {beer.srm}
                  </Text>
                </>
              )}

              {beer.ph && (
                <>
                  <Text className="mx-4">|</Text>
                  <Text className="text-lg leading-relaxed">PH: {beer.ph}</Text>
                </>
              )}
            </View>
          </Section>

          <Section title="Food Pairing">
            <View className="flex-col gap-2">
              {beer.food_pairing.map((food) => (
                <Text key={food} className="text-lg leading-relaxed">
                  - {food}
                </Text>
              ))}
            </View>
          </Section>

          <Section title="Brewers Tips">
            <View className="flex-col gap-2">
              <Text className="text-lg leading-relaxed">
                "{beer.brewers_tips}"
              </Text>
            </View>
          </Section>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
