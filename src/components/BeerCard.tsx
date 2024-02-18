import { Beer } from '@/store/slices/brewery';
import { Image, Text, View } from 'react-native';
import logoImg from '@/assets/logo.png';

type BeerCriteria = {
  abv: number; // Teor alcoólico
  ibu: number; // Unidade de amargor
  ebc: number; // Cor (Escala EBC)
  srm: number; // Cor (Escala SRM)
  ph: number; // pH
};

type BeerCardProps = {
  beer: Beer;
};

export function BeerCard({ beer }: BeerCardProps) {
  function isGoodBeer(criteria: BeerCriteria): boolean {
    const acceptableRanges = {
      abv: { min: 4, max: 6 }, // Aceita ABV entre 4% e 6%
      ibu: { min: 20, max: 40 }, // Aceita IBU entre 20 e 40
      ebc: { min: 10, max: 20 }, // Aceita EBC entre 10 e 20
      srm: { min: 5, max: 10 }, // Aceita SRM entre 5 e 10
      ph: { min: 3.8, max: 4.2 }, // Aceita pH entre 3.8 e 4.2
    };

    const isWithinRanges = Object.keys(acceptableRanges).every((key) => {
      const criterion = criteria[key as keyof BeerCriteria];
      const range = acceptableRanges[key as keyof typeof acceptableRanges];
      return criterion >= range.min && criterion <= range.max;
    });

    return isWithinRanges;
  }

  const isGood = isGoodBeer(beer);

  return (
    <View className="w-full h-[240px] bg-yellow-beer rounded-[20px] py-3 px-4 flex flex-row items-center border border-black relative">
      {beer.image_url && (
        <Image
          className="w-32 h-full"
          resizeMode="contain"
          source={{ uri: beer.image_url }}
        />
      )}

      <View className="flex-1 max-w-full h-full items-center justify-center gap-2">
        <Text className="font-heading text-lg leading-5 text-center">
          {beer.name}
        </Text>

        <Text className="text-xs leading-tight text-center" numberOfLines={4}>
          {beer.description}
        </Text>
      </View>

      {isGood && (
        <Image
          source={logoImg}
          className="absolute right-4 top-4 w-10 h-10 "
          resizeMode="contain"
        />
      )}
    </View>
  );
}
