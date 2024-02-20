/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import bannerImg from '@/assets/banner.png';
import { useAppDispatch, useAppSelector } from '@/store';
import { useEffect, useRef, useState } from 'react';
import {
  Beer,
  loadBeers,
  resetFilteredBeersList,
  searchBeers,
} from '@/store/slices/brewery';
import logoImg from '@/assets/logo.png';
import { Search } from 'lucide-react-native';
import { ListBeers } from '@/components/ListBeers';

export function Home() {
  const [beerName, setBeerName] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const flatListRef = useRef<FlatList<Beer>>(null);

  const dispatch = useAppDispatch();

  const beers = useAppSelector((state) => state.brewery.beers);
  const filteredBeers = useAppSelector((state) => state.brewery.filteredBeers);
  const endLoad = useAppSelector((state) => state.brewery.endLoad);
  const isLoading = useAppSelector((state) => state.brewery.isLoading);

  useEffect(() => {
    dispatch(loadBeers());
  }, []);

  function scrollToTop() {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }

  function handleBeerName(text: string) {
    setBeerName(text);

    if (text === '') {
      Keyboard.dismiss();
      setIsSearch(false);
      dispatch(resetFilteredBeersList());
      scrollToTop();
    }
  }

  function handleSearchBeers(reset = false) {
    Keyboard.dismiss();

    if (reset) {
      dispatch(resetFilteredBeersList());
    }

    if (beerName === '') {
      return;
    }

    setIsSearch(true);
    dispatch(searchBeers(beerName));
  }

  return (
    <SafeAreaView className="flex-col px-5 py-8 w-full">
      <Image
        source={bannerImg}
        className="w-full h-[190px] rounded-lg"
        resizeMode="stretch"
      />

      <View className="w-full flex-row gap-2 mt-8">
        <Image source={logoImg} className="w-10 h-10" resizeMode="contain" />

        <View className="flex-row flex-1 h-11 border border-black rounded pl-2">
          <TextInput
            className="flex-1 h-full text-black"
            placeholder="Search for beer..."
            placeholderTextColor="#52525b"
            returnKeyType="search"
            onChangeText={handleBeerName}
            value={beerName}
            onSubmitEditing={() => handleSearchBeers(true)}
            cursorColor="#F4C314"
          />
          <TouchableOpacity
            className="w-11 h-11 items-center justify-center"
            onPress={() => handleSearchBeers(true)}
          >
            <Search className="w-full h-full text-black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full mt-5">
        <ListBeers
          ref={flatListRef}
          items={isSearch ? filteredBeers : beers}
          onLoad={() =>
            isSearch ? handleSearchBeers() : dispatch(loadBeers())
          }
          endLoad={endLoad}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}
