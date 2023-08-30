import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Button from '../../components/Button';


export default function AddSondage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState<string[]>([])
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!!newAnswer) {
      onClickAddAnswer()
    }
    if (title && description && answers.length > 1 && !newAnswer) {
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
        setMessage("Sondage added successfully!");
        setError('')
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };


  const onClickAddAnswer = () => {
    setAnswers(s => [...s, newAnswer])
    setNewAnswer('')
  };

  const onClickRemoveAnswer = (i: number) => {
    setAnswers(state => {
      state.splice(i, 1);
      const newState = state;
      return [...newState];
    })
  }




  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <h1>Create your new sondage</h1>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title of the sondage"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description of the sondage"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols={20}
            rows={8}
          />
        </div>
        <div className="form-group answers">
          <label>Answers</label>
          {!!answers.length ? answers.map((a, i) =>
            <div className="answer" key={a + i}>
              <input
                disabled={true}
                type="text"
                value={a}
              />
              <Button
                onClick={() => onClickRemoveAnswer(i)}
                size="small"
                className="remove"
              >
                remove
              </Button>
            </div>
          ) : null}
          {answers.length < 12 && <input
            key="newAnswer"
            onChange={(e) => setNewAnswer(e.target.value)}
            type="text"
            placeholder='New answer'
            value={newAnswer}
          />}
        </div >
        <div className="form-group button">
          <Button
            disabled={!newAnswer && answers.length >= 12}
            onClick={onClickAddAnswer}
          >
            {answers.length >= 12 ? 'another answer pls' : 'already enough answers'}
          </Button>
          <Button
            className="submit_btn"
            type="submit"
          >
            Add Sondage
          </Button>
        </div>
      </form>
      <style jsx>
        {`
          .form-group {
            padding-bottom: 12px;
          }
          .form-group > label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .form-group input[type="text"] {
            padding: 10px;
            width: 100%;
          }
          .form-group textarea {
            padding: 10px;
            width: 100%;
          }
          .form-group.button {
            display: flex;
            justify-content: flex-end;
            padding: 12px 0;
          }
          .form-group.answers {

          }
          .form-group.answers .answer {
            position: relative;
          }
          .form-group.answers input:disabled {
            margin-bottom: 12px;
          }
          .form-group.answers :global(button) {
            position: absolute;
            top: 4px;
            right: 6px;
          }
          .form-group :global(button) {
            margin-left: 12px;
          }
        `}
      </style>
    </Layout>
  );
}
