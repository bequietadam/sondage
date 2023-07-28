import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";


export default function AddSondage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title && description && !!answers[2].length) {
      try {
        let response = await fetch("http://localhost:3000/api/sondages/addSondage", {
          method: "POST",
          body: JSON.stringify({
            title,
            description,
            answers
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Description-Type": "application/json",
          },
        });
        response = await response.json();
        setTitle("");
        setDescription("");
        setAnswers([]);
        setError("");
        setMessage("Sondage added successfully");
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };

  const updateAnswers = (event: React.ChangeEvent<HTMLInputElement>, answerIndex: number) => {
    const newAnswersMap = answers.map((item, index) => {
      if (index === answerIndex) {
        return event.target.value;
      } else {
        return item
      }
    })
    setAnswers(newAnswersMap);
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name= "description"
            placeholder= "Description of the sondage"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            Add Sondage
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
