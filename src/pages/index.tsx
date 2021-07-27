import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>Ignews</title>
      </Head>
      <main>
        <section>
          <span>👏 Hey, welcome </span>
          <h1>News about the <span>React</span> world. </h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>

        </section>

        <img src="/images/avatar.svg" alt="Gril coding" />
        
      </main>
    </>
  )
}
