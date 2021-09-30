import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css'
import { GetStaticPaths, GetStaticProps } from "next";

interface PostProps {
    postData: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostsIds();
    return {
        paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id ?? '';
    const postData = await getPostData(id as string);
    return {
        props: {
            postData
        }
    }
}

export default function Post({ postData }: PostProps) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>{postData.id}</div>
            <Date dateString={postData.date} />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    )
}