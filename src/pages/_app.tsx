// import { css } from "@emotion/react";
import Header from "../components/header";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
