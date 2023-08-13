"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const options = ["Good", "Bad", "Neutral", "Excellent", "Perfect"];

export const metadata = {
  title: "Home",
  description: "This is the home page.....",
};

export default function Home() {
  const [questions, setQuestions] = useState([]);
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
    const data = {
      response: answers.map((answer, index) => ({
        questionId: questions[index]._id,
        answer,
      })),
    };
    axios
      .post("/api/answers", data)
      .then((response) => {
        console.log(response);

        router.push("/thanks");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Survey Form</h1>
        {/* {console.log(questions[1])} */}
        {questions.map((question, index) => (
          <div key={index}>
            <p>
              <b>({++index})</b>
              {question.text}
            </p>
            <section>
              {options.map((option) => (
                <label key={option}>
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
