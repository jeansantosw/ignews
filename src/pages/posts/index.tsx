
import { GetStaticProps } from 'next';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';


type Post = {
  slug: string;
  tittle: string;
  excerpt: string;
  updateAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>

      <head>Post Ignews</head>

      <main className={styles.container}>
        <div className={styles.postsList}>
          { posts.map(post => (
            <a key={ post.slug } href="#">
            <time>{ post.updateAt }</time>
            <strong>{ post.tittle }</strong>
            <p>{ post.excerpt }</p>
          </a>
          ))}
        </div>
      </main>

    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], { fetch: ['post.title', 'post.content'], pageSize: 100 });

  const posts = response.results.map(post => {
    return {
      slug: post.id,
      tittle: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  })

  return {
    props: { posts }
  }

}

