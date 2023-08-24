import { NextResponse } from "next/server";
import connect from "../../../db/connect";
import Response from "../../../models/Response";
import User from "../../../models/User";
import Quiz from "../../../models/Quiz";

// export async function POST(request) {
//   const { name, answers } = await request.json();

//   try {
//     await connect();
//     const generateDocuments = (n) => {
//       // Initialize an empty array
//       const documents = [];

//       // Loop from 1 to n
//       for (let i = 1; i <= n; i++) {
//         // Create a document object with a name and an answers array
//         const document = {
//           name: `Dialog ${i}`,
//           answers: [
//             { quiz: "64df605cd2901192ea59aa04" },
//             { quiz: "64df6073d2901192ea59aa06" },
//             { quiz: "64df6081d2901192ea59aa08" },
//             { quiz: "64df6090d2901192ea59aa0a" },
//             { quiz: "64df6098d2901192ea59aa0c" },
//             { quiz: "64df60a5d2901192ea59aa0e" },
//           ],
//         };

//         // Push the document object to the array
//         documents.push(document);
//       }

//       // Return the array
//       return documents;
//     };

//     // Call the function with the number of documents you want to insert
//     const documents = generateDocuments(49);

//     // Insert the documents into the Response collection
//     const newRes = Response.insertMany(documents)
//       .then((result) => {
//         // Do something with the result
//         console.log(result);
//       })
//       .catch((err) => {
//         // Handle the error
//         console.error(err);
//       });

//     return new NextResponse(newRes, { status: 200 });
//   } catch (error) {
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// }

export async function GET() {
  try {
    await connect();
    const dialogues = await Response.find().populate({
      path: "answers.quiz",
      model: "Quiz",
      select: "question",
    });
    // Shuffle the questions array using the Fisher-Yates algorithm
    for (let i = dialogues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dialogues[i], dialogues[j]] = [dialogues[j], dialogues[i]];
    }
    // Slice the first 9 elements of the shuffled array
    const data = dialogues.slice(0, 9);
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}

export async function PUT(request) {
  const { gender, age, english, education, dialogues } = await request.json();
  console.log(gender, age, english, education);
  try {
    const g = gender;
    const a = age;
    const e = english;
    const ed = education;
    await connect();
    dialogues.forEach((dialogue) => {
      // Loop through the quizFeedbacks array
      dialogue.quizFeedbacks.forEach((quizFeedback) => {
        // Find the response with the matching _id and update the answers array
        Response.updateOne(
          {
            _id: dialogue._id,
            answers: { $elemMatch: { quiz: quizFeedback.quiz } }, // Use $elemMatch to match the answer with the quiz _id
          },
          {
            $push: { "answers.$.feedback": quizFeedback.feedback }, // Use $push to append the feedback to the feedback field of the matched answer
          }
        )
          .then((result) => {
            // Do something with the result
            // console.log(result);
          })
          .catch((err) => {
            // Handle the error
            return new NextResponse(err, { status: 404 });
          });
      });
    });
    const userArray = dialogues.map((dialogue) => dialogue._id);
    const user = new User({
      gender: g,
      age: a,
      english: e,
      education: ed,
      dialogue: userArray,
    });
    await user.save();
    return new NextResponse(user, { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
