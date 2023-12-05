// A component function that represents all the pages
// We can wrap this component (all of the pages) with the layout component
import Layout from "@/components/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
