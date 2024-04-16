import { useEffect, useState } from "react"
import { Field, Navigation } from './index'
import { getTokenFromLocalStorage } from "../helpers/localstorage.ts";

export const PrivateArea = () => {
    
    const token = getTokenFromLocalStorage("token");
    console.log(token);

    const [questions, setQuestions] = useState([]);
    const [hasQuestion, setHasQuestion] = useState(false);
    const [options, setOptions] = useState([]);
    const [allAnswers, setAllAnswers] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/api/user-answers/get-all", {
            headers: {
                "Content-Type": "applicaiton/json",
                "Authorization": `bearer ${token}`
            }
        })
            .then(answers => answers.json())
            .then(setAllAnswers);
        fetch("http://localhost:3000/api/question", {
            headers: {
                "Content-Type": "applicaiton/json",
                "Authorization": `bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(questions => setQuestions(questions));
    }, []);

    const takeId = async (id) => {
        setHasQuestion(prev => !prev);
        const options = await fetch(`http://localhost:3000/api/question/getall`, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        const optionJson = await options.json();
        setOptions(optionJson);
    };

    return (
        <>
            <Field>
            {
                questions.map(({name, id}) => (
                    <div key={id}>
                    {
                        !hasQuestion ? 
                        <div
                            key={id} 
                            onClick={() => takeId(id)}
                            style={{ textDecoration: "underline", display: "flex", cursor: "pointer", fontSize: "3vmin", marginTop: "1vh" }}
                        >
                            {name}
                        </div>
                        : <>
                                {
                                    options.map(i => (
                                        <>
                                            <div style={{ fontSize: "3vmin"}}>{i.title}</div>
                                            {
                                                allAnswers.map(answer => (
                                                    <>
                                                        {
                                                            i.id === answer.question_id ? 
                                                            <div 
                                                                style={{ 
                                                                    fontWeight: "bold", 
                                                                    fontSize: "2.5vmin",
                                                                    backgroundColor: answer.isCorrectAnswer ? "green" : "red" 
                                                                }}>
                                                                    {answer.answer}
                                                            </div> : 
                                                            null
                                                        }                                                  
                                                    </>
                                                ))
                                            }
                                        </>
                                    ))
                                }
                            </>
                    }
                    </div>
                ))
            }
            </Field>
            <div style={{ width: "100vw", display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                <Navigation />
            </div>
        </>
    )
};