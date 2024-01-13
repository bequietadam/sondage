import { forwardRef, useState } from 'react';
import Layout from '../components/Layout';
import SondagesList from '../components/SondagesList';


type Props = {
  sondages: Sondage[];
}


type PageRef = React.ForwardedRef<HTMLDivElement>;



export async function getServerSideProps() {
  try {

    let responseSondages = await fetch(process.env.SONDAGE_API_URL + "/api/sondages/getSondages");
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

function Home({sondages}: Props, ref: PageRef) {
  const [message, setMessage] = useState("");


  const copyLinkConfirmation = () => {
    setMessage('Link copied to clipboard!');
  }

  return (
    <Layout ref={ref} reverse={true}>
      <div className="home">
        {message ? <div className="alert-message">{message}</div> : null}
        <h1 className="heading">Every sondages:</h1>
        <SondagesList copyLinkConfirmation={copyLinkConfirmation} sondages={sondages}/>
      </div>
    </Layout>
  );
}

export default forwardRef(Home);
