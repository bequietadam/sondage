import React, { forwardRef, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import { AnimatePresence, motion } from 'framer-motion';



type PageRef = React.ForwardedRef<HTMLDivElement>;


function AddSondage(ref: PageRef) {
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
      return;
    }
    if (title && description && answers.length > 1 && !newAnswer) {
      try {
        let response = await fetch("/api/sondages/addSondage", {
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
    if (answers.includes(newAnswer)) {
      setError('Please enter different answers')
      return;
    }
    setAnswers(s => [...s, newAnswer])
    setNewAnswer('')
    setMessage('')
    setError('')
  };

  const onClickRemoveAnswer = (i: number) => {
    setAnswers(state => {
      state.splice(i, 1);
      const newState = state;
      return [...newState];
    })
    setMessage('')
    setError('')
  }




  return (
    <Layout ref={ref}>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group title">
          <input
            type="text"
            placeholder="Title of the sondage"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-group description">
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
                      duration: 0.5,
                    },
                    height: {
                      ease: 'easeIn',
                      duration: 0.35,
                    },
                    marginTop: {
                      type: 'spring',
                      duration: 0.5,
                      bounce: 0.5,
                      delay: 0.2,
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
            {answers.length >= 12 ? 'Already enough answers' : 'Another answer pls'}
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
          form {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          .form-group {
            padding-bottom: 12px;
          }
          .form-group.description {
            padding-bottom: 48px;
          }
          .form-group.title input[type="text"] {
            padding: 6px 0 6px 6px;
            width: 100%;
            border: 2px dashed var(--border);
            border-radius: 22px;
            background: transparent;
            color: var(--text);
            font-size: 3.6em;
            font-family: inherit;
            margin: 28px 0 .1em;
          }
          .form-group.title input[type="text"]:focus {
            outline: none;
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
            margin: auto 0 0;
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

          @media (max-width: 480px) {
            .form-group.title input[type="text"] { 
              font-size: 2.4em;
              line-height: 0.9em;
              margin-top: 24px;
            }
          }
        `}
      </style>
    </Layout>
  );
}


export default forwardRef(AddSondage);
