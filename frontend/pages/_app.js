import "../styles/globals.css";
import StateProvider from "../context/StateProvider";
import Layout from "../Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateProvider>
    </>
  );
}

export default MyApp;
