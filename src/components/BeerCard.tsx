import { Beer } from '@/store/slices/brewery';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import logoImg from '@/assets/logo.png';

type BeerCardProps = {
  beer: Beer;
};

export function BeerCard({ beer }: BeerCardProps) {
  const navigation = useNavigation();

  function handleShowBeer() {
    navigation.navigate('beer', {
      beer,
    });
  }

  return (
    <TouchableOpacity
      onPress={handleShowBeer}
      className="w-full h-[240px] bg-yellow-beer rounded-[20px] py-3 px-4 flex flex-row items-center border border-black relative"
    >
      <Image
        className="w-32 h-full"
        resizeMode="contain"
        source={beer.image_url ? { uri: beer.image_url } : logoImg}
      />

      <View className="flex-1 max-w-full h-full items-center justify-center gap-2">
        <Text className="font-heading text-lg leading-5 text-center">
          {beer.name}
        </Text>

        <Text className="text-xs leading-tight text-center" numberOfLines={4}>
          {beer.description}
        </Text>
      </View>

      {/* {isGood && (
        <Image
          source={logoImg}
          className="absolute right-4 top-4 w-10 h-10 "
          resizeMode="contain"
        />
      )} */}
    </TouchableOpacity>
  );
}
