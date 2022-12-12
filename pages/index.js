import Head from 'next/head';
import Header from '../formTask/header';
import Form from '../formTask/Form';

function App(){
  return(
    <div>
      <Head>
        <title>Fullstack Engineer Tech Test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href='/manifest.json' />
      </Head>
      <Header />
      <Form />
    </div>
  )
}
export default App
