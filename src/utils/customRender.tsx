import { NavigationContainer } from '@react-navigation/native';
import { RenderOptions, render } from '@testing-library/react-native';
import { ReactElement, ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </ReduxProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react-native';
export { customRender as render, Providers };
