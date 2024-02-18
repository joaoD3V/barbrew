import { FlatList } from 'react-native';
import { LoadingList } from './LoadingList';
import { Beer, PER_PAGE } from '@/store/slices/brewery';
import { BeerCard } from './BeerCard';
import {
  ForwardRefRenderFunction,
  RefObject,
  forwardRef,
  memo,
  useCallback,
} from 'react';
import { EmptyList } from './EmptyList';

type ListBeersProps = {
  ref: RefObject<FlatList<Beer>>;
  items: Beer[];
  onLoad: () => void;
  endLoad: boolean;
  isLoading: boolean;
};

const MemoizedBeerCard = memo(BeerCard);

const ListBeersBase: ForwardRefRenderFunction<
  FlatList<Beer>,
  ListBeersProps
> = ({ items, onLoad, endLoad, isLoading }, ref) => {
  const renderItem = useCallback(({ item }: { item: Beer }) => {
    return <MemoizedBeerCard beer={item} />;
  }, []);

  return (
    <FlatList
      ref={ref}
      data={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      initialNumToRender={PER_PAGE}
      contentContainerStyle={{
        paddingTop: 10,
        gap: 16,
        paddingBottom: 600,
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={({ distanceFromEnd }) => {
        if (distanceFromEnd <= 0 || endLoad) {
          return;
        }

        onLoad();
      }}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={isLoading ? <LoadingList /> : <EmptyList />}
      ListFooterComponent={
        !endLoad && items.length > 20 ? <LoadingList /> : null
      }
    />
  );
};

export const ListBeers = forwardRef(ListBeersBase);
