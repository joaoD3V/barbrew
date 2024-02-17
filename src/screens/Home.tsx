/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import bannerImg from '@/assets/banner.png';
import { useAppDispatch, useAppSelector } from '@/store';
import { BeerCard } from '@/components/BeerCard';
import { useEffect } from 'react';
import { loadBeers } from '@/store/slices/brewery';
import { ListFooter } from '@/components/ListFooter';
import logoImg from '@/assets/logo.png';

export function Home() {
  const dispatch = useAppDispatch();

  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 60) / numColumns;

  const beers = useAppSelector((state) => state.brewery.beers);
  const currentPage = useAppSelector((state) => state.brewery.currentPage);

  useEffect(() => {
    dispatch(loadBeers(currentPage));
  }, []);

  return (
    <SafeAreaView className="flex-col px-5 py-8 gap-10 w-full">
      <Image
        source={bannerImg}
        className="w-full h-[190px] rounded-lg"
        resizeMode="stretch"
      />

      <View className="w-full">
        <TouchableOpacity className="border border-black w-11 h-11 p-1 rounded">
          <Image
            source={logoImg}
            className="w-full h-full"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View className="w-full">
        <FlatList
          data={beers}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <BeerCard cardWidth={cardWidth} index={index} beer={item} />
          )}
          numColumns={2}
          contentContainerStyle={{
            paddingTop: 10,
            gap: 16,
            paddingBottom: 600,
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd <= 0) {
              return;
            }

            dispatch(loadBeers(currentPage));
          }}
          onEndReachedThreshold={1}
          ListFooterComponent={ListFooter}
        />
      </View>
    </SafeAreaView>
  );
}
