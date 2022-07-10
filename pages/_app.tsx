import type { AppProps } from "next/app";
import "@picocss/pico/css/pico.min.css";
import { NextPage } from "next";
import { wrapper } from "../store";
import App from "next/app";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (_store) => async (appContext) => ({
    pageProps: (await App.getInitialProps(appContext)).pageProps,
  })
  // TODO: fix
) as any;

export default wrapper.withRedux(MyApp);
