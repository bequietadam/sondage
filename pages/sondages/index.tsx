import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import { AnimatePresence, motion } from 'framer-motion';


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
        {/* <h1>Create your new sondage</h1> */}
        <div className="form-group title">
          {/* <label>Title</label> */}
          <input
            type="text"
            placeholder="Title of the sondage"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-group description">
          {/* <label>Description</label> */}
          <textarea
            name="description"
            placeholder="Description of the sondage"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols={20}
            rows={6}
          />
        </div>
        <div className="form-group answers">
          {/* <label>Answers</label> */}
          <AnimatePresence>
            {!!answers.length ? answers.map((a, i) =>
              <motion.div
                style={{
                position: 'relative',
                }}
                key={a}
                initial={{ opacity: 0, height: 0, }}
                animate={{ opacity: 1, height: '40px' }}
                exit={{
                  opacity: 0,
                  height: '0px',
                  marginTop: '-12px',
                  overflow: 'clip',
                  transition: {
                    opacity: {
                      ease: 'easeOut',
                      duration: 0.7,
                    },
                    height: {
                      ease: 'easeIn',
                      duration: 0.5,
                    },
                    marginTop: {
                      type: 'spring',
                      duration: 0.7,
                      bounce: 0.5,
                      delay: 0.3,
                    }
                  }
                }}>
                <InputText
                  disabled={true}
                  onChange={(event) => setNewAnswer(event.target.value)}
                  value={a}
                />
                <Button
                  onClick={() => onClickRemoveAnswer(i)}
                  size="small"
                  className="remove"
                >
                  remove
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
          {answers.length < 12 &&
            <div className="answer new">
              <InputText
                key="newAnswer"
                onChange={(event) => setNewAnswer(event.target.value)}
                placeholder='New answer'
                value={newAnswer}
              />
            </div>
          }
        </div >
        <div className="form-group button">
          <Button
            disabled={!newAnswer || answers.length >= 12}
            onClick={onClickAddAnswer}
          >
            {answers.length >= 12 ? 'already enough answers' : 'another answer pls'}
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
          .form-group.description {
            padding-bottom: 48px;
          }
          .form-group > label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .form-group.title input[type="text"] {
            padding: 10px;
            width: 100%;
            border: 2px dashed var(--border);
            border-radius: 22px;
            background: transparent;
            color: var(--text);
            font-size: 3.6em;
            font-family: inherit;
            margin: 35px 0 0;
          }
          .form-group textarea {
            padding: 15px 10px 10px;
            width: 100%;
            border-radius: 22px;
            border: 2px dashed var(--border);
            background: transparent;
            color: var(--text);
            box-shadow: none;
            resize: none;
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
          .form-group.answers .answer :global(InputText) {
            margin: 0;
          }
          .form-group.answers input:disabled {
            margin-bottom: 12px;
          }
          .form-group.answers input:last-child {
            margin-top: 30px;
          }
          .form-group.answers  :global(button) {
            position: absolute;
            top: 5px;
            right: 6px;
            z-index: ;
          }
          .form-group.button :global(button) {
            margin-left: 12px;
          }
        `}
      </style>
    </Layout>
  );
}
