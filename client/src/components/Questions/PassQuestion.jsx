import { useEffect, useState } from "react"
import { Btn, Field, Navigation } from '../index'
import { Input } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../helpers/localstorage.ts";

export const PassQuestion = () => {
    
    const token = getTokenFromLocalStorage("token");
    const { handleSubmit } = useForm();
    const [questions, setQuestions] = useState([]);
    const [hasQuestion, setHasQuestion] = useState(false);
    const [allQuestions, setAllQuestions] = useState();
    const [options, setOptions] = useState([]);
    const [inputValues, setInputValues] = useState([]);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/question", {
            headers: {
                "Content-Type": "applicaiton/json",
                "Authorization": `bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(questions => setQuestions(questions));

        fetch(`http://localhost:3000/api/question/getall`, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(questions => questions.json())
        .then(setAllQuestions);

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
    }


    const handleClick = async () => {

        let inputVal = [...inputValues]
        const resInputValue = inputVal.filter((i, ind) => i.question_id !== inputVal[ind+1]?.question_id);

        const ans = allQuestions.map(i => {
            let question = i.options.find(option => {
                const resIV = resInputValue.find(i => i.question_id === option.option_id);

                // option.question_id === resInputValue[0].question_id
                return option.question_id === resIV.question_id
            });
            return question;
        }).filter(i => i);

        const newAnswer = ans.map(i => {
            if(i.question_id === resInputValue[0].question_id) {
                return { 
                    question_id: i.question_id, 
                    answer: resInputValue[0].answer, 
                    isCorrectAnswer: i.text.toLowerCase() === resInputValue[0].answer.toLowerCase(),
                    option_id: i.id
                }
            }
        })
        setAnswers(prev => [...prev, ...newAnswer]);

        const promises = answers.map(async i => {
            const response = await fetch("http://localhost:3000/api/user-answers/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    question_id: i.question_id,
                    option_id: i.option_id,
                    isCorrectAnswer: i.isCorrectAnswer,
                    answer: i.answer,
                })
            });
            const jsonData = response.json();
            return jsonData;
        })
        const result = await Promise.all(promises);
        navigate('/');
        return result;

    };
        
        const changeAnswers = ({ option_id }) => {
            
            // 1. получаем вопрос по id опции
            const r = allQuestions.map(i => {
                let question = i.options.find(option => option.id === option_id);
                return question;
            });
        const questionResult = r.filter(i => i !== undefined)[0];
        
        // 2. по полученному вопросу формируем ответ
        const response = { question_id: questionResult.question_id, option_id, isCorrectAnswer: questionResult.isCorrect, answer: questionResult.text };
        console.log("QR: ", response);

        // 4. проверяем, есть ли данная опция в state и если есть, то изменяем ее
        let oldAnswers = [...answers];
        const index = answers.findIndex(i => i.question_id === response.question_id);
        if(index !== -1) {
            oldAnswers[index] = response;
            setAnswers(oldAnswers);
        } else {
            setAnswers(prev => [...prev, response]);
        };
    }

    const changeText = (question_id, value) => {
        const inputs = [...inputValues];
        inputs[question_id] = { question_id, answer: value };
        const newInputs = inputs.filter(i => i);
        setInputValues(newInputs);
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
                        : (
                        <form onSubmit={handleSubmit}>
                            {
                                options.map((i, index) => (
                                    <>
                                        <div style={{ fontSize: "3vmin", marginTop: "5vh", fontWeight: "900", display: "flex", justifyContent: "start"}}>
                                            {i.title}
                                        </div>
                                        {
                                        i.hasOptions?
                                            <div style={{ display: "flex", justifyContent: "start", flexWrap: "wrap", marginTop: "1vh" }}>
                                                {
                                                i.options.map((i, ind) => (
                                                    <div 
                                                        onClick={() => changeAnswers({option_id: i.id})} 
                                                        style={{ display: "flex", flex: "0 1 50%"}}>
                                                        <input id={ind} 
                                                            style={{ display: "flex"}}
                                                            checked={answers[i.id]?.isCorrect}
                                                            type="radio"
                                                        />
                                                        <div style={{ fontSize: "3vmin"}}>
                                                            {i.text}
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                            </div> : 
                                            <Input 
                                                onChange={e => changeText(i.id, e.target.value)}
                                                type="text"
                                            />
                                        }
                                    </>
                                )) 
                            }
                            <Btn handleClick={handleClick} title={"Завершить тест"}/>
                        </form>
                        )
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