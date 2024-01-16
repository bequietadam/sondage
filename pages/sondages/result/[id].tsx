import React, { forwardRef, useEffect, useState } from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Layout from "../../../components/Layout";
import ProgressBar from '../../../components/ProgressBar';
import { getSondage, getSondages } from "../../../lib/sondage";


type PageParams = {
  id: string;
};

type ContentPageProps = {
  sondage: Sondage;
  maxCount: number;
};

type PageRef = React.ForwardedRef<HTMLDivElement>;

type ResponseFromServer = {
  title: string;
  description: string;
  answers: Answer[];
  _id: string;
};

const emptyAnswer: Answer = {
  answer: '',
  count: 0,
}

const emptyAnswers = [
  emptyAnswer,
  emptyAnswer,
  emptyAnswer,
]


export async function getStaticPaths() {
  // let sondages = await fetch(process.env.SONDAGE_API_URL + "/api/sondages/getSondages");

  let sondages: unknown = await getSondages();


  let sondageFromServer = JSON.parse(JSON.stringify(sondages)) as [Sondage];
  return {
    paths: sondageFromServer.map((sondage) => {
      return {
        params: {
          id: sondage._id,
        },
      };
    }),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> {
  try {
    let response = await getSondage(params?.id);

    let responseFromServer: ResponseFromServer = JSON.parse(JSON.stringify(response));

    
    const maxCount = Math.max(...responseFromServer.answers.map(i => i.count));

    return {
      props: {
        sondage: {
          _id: responseFromServer._id,
          title: responseFromServer.title,
          description: responseFromServer.description,
          answers: responseFromServer.answers,
        },
        maxCount: maxCount,
      },
      revalidate: true,
    };
  } catch (e) {
    console.log("error ", e);
    return {
      props: {
        sondage: {
          _id: "  ",
          title: "  ",
          description: "  ",
          answers: emptyAnswers,
        },
        maxCount: 0,
      },
    };
  }
}

// export async function getStaticProps({
//   params,
// }: GetStaticPropsContext<PageParams>): Promise<
//   GetStaticPropsResult<ContentPageProps>
// > {
//   try {
//     let response = await fetch(
//       process.env.SONDAGE_API_URL + "/api/sondages/getSondage?id=" + params?.id
//     );

//     let responseFromServer: ResponseFromServer = await response.json();

//     const maxCount = Math.max(...responseFromServer.answers.map(i => i.count));

//     return {
//       // Passed to the page component as props
//       props: {
//         sondage: {
//           _id: responseFromServer._id,
//           title: responseFromServer.title,
//           description: responseFromServer.description,
//           answers: responseFromServer.answers,
//         },
//         maxCount: maxCount,
//       },
//     };
//   } catch (e) {
//     console.log("error ", e);
//     return {
//       props: {
//         sondage: {
//           _id: "  ",
//           title: "  ",
//           description: "  ",
//           answers: emptyAnswers,
//         },
//         maxCount: 0,
//       },
//     };
//   }
// }




function ResultSondage(
  {
    sondage: { _id, title, description, answers },
    maxCount,
  }: ContentPageProps,
  ref: PageRef
) {
  // const [sondageTitle, setSondageTitle] = useState(title);
  // const [sondageDescription, setSondageDescription] = useState(description);
  // const [sondageAnswers, setSondageAnswers] = useState(answers)

  const [newCount, setNewCount] = useState(-1);
  const [answerIndex, setAnswerIndex] = useState(-1);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  // no such sondage exists
  // if (!title && !description && !answers.length && !_id && typeof window) {
  //   return (window.location.href = "/");
  // }




  return (
    <Layout ref={ref}>
      <div
        className="form"
      >
        <div className="form-group">
          <h1>{title}</h1>
        </div>
        <div className="form-group">
          <p>{description}</p>
        </div>
        <div className="form-group answers">
          {answers.map((answer, index) => {
            return (
              <ProgressBar
                key={answer + index.toString()}
                maxProgressValue={maxCount}
                progressValue={answer.count}
                progressValueUnit="votes"
                text={answer.answer}
              />
            );
          })}
        </div>
        <div className="form-group">
        </div>
      </div>
      <style jsx>
        {`
          form {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          .form-group.answers{
            margin-bottom: 12px;
          }
          .form-group > h1 {
            margin-bottom: 0.1em;
          }
          .form-group > p {
            margin-bottom: 60px;
          }
          @media (max-width: 480px) {
            .form-group > h1 {
              margin-bottom: .2em;
            }
            .form-group > p {
              margin-bottom: 36px;
            }
          }
        `}
      </style>
    </Layout>
  );
}


export default forwardRef(ResultSondage);
