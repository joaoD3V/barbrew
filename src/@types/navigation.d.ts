import { Beer } from '@/store/slices/brewery';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      beer: {
        beer: Beer;
      };
    }
  }
}
