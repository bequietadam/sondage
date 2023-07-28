import React, { useEffect, useState } from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Layout from "../../components/Layout";


type PageParams = {
  id: string;
};

type ContentPageProps = {
  sondage: Sondage;
};

type ResponseFromServer = {
  title: string;
  description: string;
  answers: string[];
  _id: string;
};

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
          _id:"  ",
          title:"  ",
          description: "  ",
          answers: [],
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


export default function EditSondage({
  sondage: { _id, title, description, answers },
}: ContentPageProps) {
  const [sondageTitle, setSondageTitle] = useState(title);
  const [sondageDescription, setSondageDescription] = useState(description);
  const [sondageAnswers, setSondageAnswers] = useState(answers)
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (sondageTitle && sondageDescription && sondageAnswers.length === 3) {
      try {
        let response = await fetch(
          "http://localhost:3000/api/sondages/editSondage?id=" + _id,
          {
            method: "POST",
            body: JSON.stringify({
              title: sondageTitle,
              description: sondageDescription,
              answers: sondageAnswers,
            }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          }
        );
        response = await response.json();
        setSondageTitle("");
        setSondageDescription("");
        setSondageAnswers([]);
        setError("");
        setMessage("Sondage edited successfully");
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };

  // no such sondage exists
  if (!title && !description && !answers && !_id && typeof window) {
    return (window.location.href = "/");
  }

  
  const updateAnswers = (event: React.ChangeEvent<HTMLInputElement>, answerIndex: number) => {
    setSondageAnswers(answers.map((item, index) => {
      if (index === answerIndex) {
        return event.target.value;
      } else {
        return item
      }
    }))
  }


  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <label>Title</label>
          <input
            type= "text"
            placeholder= "Title of the sondage"
            onChange={(e) => setSondageTitle(e.target.value)}
            value={sondageTitle ? sondageTitle : ""}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name= "content"
            placeholder= "Content of the sondage"
            value={sondageDescription ? sondageDescription : ""}
            onChange={(e) => setSondageDescription(e.target.value)}
            cols={20}
            rows={8}
          />
        </div>
        <div className="form-group">
          <label>Answers</label>
          <input
            type="text"
            placeholder='First answer'
            onChange={(e) => updateAnswers(e, 0)}
            value={answers[0]}
          />
          <input
            type="text"
            placeholder='First answer'
            onChange={(e) => updateAnswers(e, 1)}
            value={answers[1]}
          />
          <input
            type="text"
            placeholder='First answer'
            onChange={(e) => updateAnswers(e, 2)}
            value={answers[2]}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit_btn">
            Update
          </button>
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
