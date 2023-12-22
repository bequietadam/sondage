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
        sondages: sondages,
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

export default function Home({sondages}: Props) {


  return (
    <Layout>
      <div className="home">
        <h1 className="heading">Every sondages:</h1>
        <SondagesList sondages={sondages}/>
      </div>
    </Layout>
  );
}
