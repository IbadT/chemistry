import { useEffect, useState } from "react"
import { Btn, Field, Navigation } from '../index'
import { Input } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDQyNTQzfQ.584JBv9RPUgnI3upMppG3J_lfqqOZdU6WKVCPcnV4g4";




// после onSubmit перейти на изначальную страницу изменений

export const EditQuestion = () => {

    const { handleSubmit } = useForm();
    const [hasQuestion, setHasQuestion] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [radio, setRadio] = useState({});
    const [inputResult, setInputResult] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/question", {
            headers: {
                "Content-Type": "applicaiton/json",
                "Authorization": `bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(questions => setQuestions(questions))
    }, []);
    console.log(options);
    
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
        optionJson.map(({id, text}) => setInputResult(prev => [...prev, {id, text}]));
    }

    const handleClick = async () => {

        const updatedResult = options.map(async i => {
            const { id } = i;
            const body = {
                title: i.title
            }
            console.log(body);
            const updatedQuesiton = await fetch(`http://localhost:3000/api/question/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            const result = await updatedQuesiton.json();
            return result;
        })
        await Promise.all(updatedResult);
        
        const newOptions = options.map(i => i.options);
        const promises = newOptions.map(async i => {
            if(i.length === 1) {
                const { id, text, isCorrect } = i[0];
                const body = { text, isCorrect };
                const result = await fetch(`http://localhost:3000/api/option/update/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                });
                const res = await result.json();
                return res;
            } else {
                const newPromise = i.map(async item => {
                    const { id, text, isCorrect } = item;
                    const body = { text, isCorrect };
                    const result = await fetch(`http://localhost:3000/api/option/update/${id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(body)
                    });
                    const res = await result.json();
                    return res;
                });
                const resultNewPromise = await Promise.all(newPromise);
                return resultNewPromise;
            }
        })
        const response = await Promise.all(promises);
        console.log("Successfull update");
        navigate('/');
        return response;
    };

    // check
    const changeInputResult = (id, value) => {
        const newArray = [...inputResult];
        newArray[id].text = value;
        setInputResult(newArray);
    };

    const changeTitle = (ind, value) => {
        const questionWithOptions = [...options];
        questionWithOptions[ind].title = value;
        setOptions(questionWithOptions);
    }
    
    const changeText = (id, ind, value) => {
        const questionWithOptions = [...options];
        questionWithOptions[id].options[ind].text = value;
        setOptions(questionWithOptions);
    };
    
    const changeRadio = (id, truthValue) => {
        const questionWithOptions = [...options];
        const newOptions = questionWithOptions[id].options.map((i, index) => {
            return index === +truthValue ? 
                { ...i, isCorrect: true } : 
                {...i, isCorrect: false}
        });
        console.log(newOptions);
        questionWithOptions[id].options = newOptions;
        setOptions(questionWithOptions);
    }

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
                                options.map((i, id) => (
                                    <>
                                        <Input 
                                            onChange={e => changeTitle(id, e.target.value)}
                                            value={i.title}
                                            style={{display: "flex", justifyContent: "start", width: "100%", marginTop: "5vh"}} 
                                        />
                                        {
                                        i.hasOptions?
                                            <div style={{ display: "flex", justifyContent: "start", flexWrap: "wrap", marginTop: "1vh" }}>
                                                {
                                                i.options.map((i, ind) => (
                                                    <div style={{ display: "flex", flex: "0 1 50%"}}>
                                                        <input id={ind} 
                                                            style={{ display: "flex"}}
                                                            onChange={e => changeRadio(id, e.target.id)} 
                                                            checked={i.isCorrect} 
                                                            type="radio"
                                                        />
                                                        <Input style={{ width: "100%"}} 
                                                            onChange={e => changeText(id, ind, e.target.value)} 
                                                            value={i.text} 
                                                            type="text"
                                                        />
                                                    </div>
                                                ))
                                                }
                                            </div> : 
                                            <Input 
                                                onChange={e => changeText(id, 0, e.target.value)}
                                                type="text"
                                                value={i.text}
                                            />
                                        }
                                    </>
                                )) 
                            }
                            <Btn handleClick={handleClick} title={"Сохранить"}/>
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