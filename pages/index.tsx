import { useState } from 'react';
import Layout from '../components/Layout';
import SondagesList from '../components/SondagesList';


type Props = {
  sondages: Sondage[];
}



export async function getServerSideProps() {
  try {

    let responseSondages = await fetch('http://localhost:3000/api/sondages/getSondages');
    let sondages = await responseSondages.json();



    return {
      props: {
        sondages: JSON.parse(JSON.stringify(sondages)),
        // sondages: [],
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        sondages: [],
      },
    };
  }
}

export default function Home(props: Props) {
  const [sondages, setSondages] = useState<Sondage[]>(props.sondages);


  return (
    <Layout>
      <div className="home">
        <h1 className="heading">All sondage created:</h1>
        <SondagesList sondages={sondages}/>
      </div>
    </Layout>
  );
}
