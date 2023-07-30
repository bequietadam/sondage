import React, { useEffect, useState } from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Layout from "../../../components/Layout";


type PageParams = {
  id: string;
};

type ContentPageProps = {
  sondage: Sondage;
};

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

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> {
  try {
    let response = await fetch(
      "http://localhost:3000/api/sondages/getSondage?id=" + params?.id
    );

    let responseFromServer: ResponseFromServer = await response.json();

    return {
      // Passed to the page component as props
      props: {
        sondage: {
          _id: responseFromServer._id,
          title: responseFromServer.title,
          description: responseFromServer.description,
          answers: responseFromServer.answers,
        },
      },
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
      },
    };
  }
}


export async function getStaticPaths() {
  let sondages = await fetch("http://localhost:3000/api/sondages/getSondages");

  let sondageFromServer: [Sondage] = await sondages.json();
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


export default function PlaySondage({
  sondage: { _id, title, description, answers },
}: ContentPageProps) {
  // const [sondageTitle, setSondageTitle] = useState(title);
  // const [sondageDescription, setSondageDescription] = useState(description);
  // const [sondageAnswers, setSondageAnswers] = useState(answers)

  const [newCount, setNewCount] = useState(-1);
  const [answerIndex, setAnswerIndex] = useState(-1);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (answers[answerIndex].count !== newCount) {
      try {
        let response = await fetch(
          "http://localhost:3000/api/sondages/updateSondageCount?id=" + _id,
          {
            method: "POST",
            body: JSON.stringify({
              newCount: newCount,
              answerIndex: answerIndex,
            }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          }
        );
        response = await response.json();
        setMessage("Sondage edited successfully");
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };

  // no such sondage exists
  if (!title && !description && !answers.length && !_id && typeof window) {
    return (window.location.href = "/");
  }


  // const updateAnswers = (event: React.ChangeEvent<HTMLInputElement>, answerIndex: number) => {
  //   setSondageAnswers((state) => state.map((item, index) => {
  //     if (index === answerIndex) {
  //       return {
  //         answer: event.target.value,
  //         count: 0, 
  //       } as Answer;
  //     } else {
  //       return item
  //     }
  //   }))
  // }

  const updateCount = ()


  return (
    <Layout>
      <form
        // onSubmit={handleSubmit}
        className="form"
      >
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <h2>{title}</h2>
        </div>
        <div className="form-group">
          <label>Description</label>
          <p>{description}</p>
        </div>
        <div className="form-group">
          <label>Answers</label>
          <div className="form-group__answer">
            <input
              type="checkbox"
              name={answers[0].answer}
              onChange={updateCount(0)}
            />
            <label>{answers[0].answer}</label>
          </div>
          <div className="form-group__answer">
            <input
              type="checkbox"
              name={answers[1].answer}
              onChange={updateCount(1)}
            />
            <label>{answers[0].answer}</label>
          </div>
          <div className="form-group__answer">
            <input
              type="checkbox"
              name={answers[2].answer}
              onChange={updateCount(2)}
            />
            <label>{answers[0].answer}</label>
          </div>
        </div>
        <div className="form-group">
        </div>
      </form>
      <style jsx>
        {`
          .form {
            width: 400px;
            margin: 10px auto;
          }
          .form-group {
            width: 100%;
            margin-bottom: 10px;
            display: block;
          }
          .form-group label {
            display: block;
            margin-bottom: 10px;
            font-style: bold;
          }
          .form-group input[type="text"] {
            padding: 10px;
            width: 100%;
          }
          .form-group textarea {
            padding: 10px;
            width: 100%;
          }
          .alert-error {
            width: 100%;
            color: red;
            margin-bottom: 10px;
          }
          .alert-message {
            width: 100%;
            color: green;
            margin-bottom: 10px;
          }
        `}
      </style>
    </Layout>
  );
}