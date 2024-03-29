import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/globals.css';
import { Provider } from "../lib/context";
import type { AppProps } from 'next/app';
import { SSRProvider } from 'react-bootstrap';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
};
