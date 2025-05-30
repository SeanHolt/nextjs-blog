import Head from "next/head";
import Layout from "../components/layout";

export default function Page() {
    return (
        <Layout>
            <Head>
                <title>About Page</title>
            </Head>
            <h1>About</h1>
            <p>Simple page about the site and me!</p>
        </Layout>
    )
}