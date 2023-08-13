"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const options = ["Good", "Bad", "Neutral", "Excellent", "Perfect"];

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState(Array(4).fill(null));
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.get("/api/questions");
      const quizs = response.data;
      // console.log(quizs.data);
      setQuestions(quizs);
    };
    getQuestions();
  }, []);

  const handleChange = (index, value) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
    setIsFormValid(
      questions.every(
        (question, questionIndex) => answers[questionIndex] !== null
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;

    if (!name || !email) {
      alert("Please Enter Name & Email....");
      return;
    }
    const data = {
      userName: name,
      userEmail: email,
      response: answers.map((answer, index) => ({
        questionId: questions[index]._id,
        answer,
      })),
    };
    axios
      .post("/api/answers", data)
      .then(() => {
        router.push("/thanks");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className={styles.container}>
      <h1>Survey Collection Form</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.userForm}>
          <label className={styles.userDetail}>
            <span>Name*</span>
            <input type="text" name="name" onChange={() => handleChange()} />
          </label>
          <label className={styles.userDetail}>
            <span>Email*</span>
            <input type="email" name="email" />
          </label>
        </div>
        {/* {console.log(questions[1])} */}
        {questions.map((question, index) => (
          <div key={index}>
            <p>
              <b>({++index})</b>
              {question.text}
            </p>
            <section>
              {options.map((option) => (
                <label key={option} className={styles.radioLables}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index - 1] === option}
                    onChange={() => handleChange(index - 1, option)}
                  />
                  {option}
                </label>
              ))}
            </section>
          </div>
        ))}
        {!isFormValid && (
          <p>
            <br />
            <b>All questions must be attempted to submit the survey.</b>
          </p>
        )}
        <br />
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </main>
  );
}
