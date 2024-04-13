import { useEffect, useState } from "react"
import { Btn, Field, Navigation } from '../index'
import { Input } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDQyNTQzfQ.584JBv9RPUgnI3upMppG3J_lfqqOZdU6WKVCPcnV4g4";




// после onSubmit перейти на изначальную страницу изменений
// после обновления приходит результат body: [object Object] в консоль

export const EditQuestion = () => {
    
    const { handleSubmit } = useForm();
    const [hasQuestion, setHasQuestion] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [radio, setRadio] = useState({});
    const [inputResult, setInputResult] = useState([]);
    const navigate = useNavigate();
    
    console.log("Q", options);

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
    
    const takeId = async (id) => {
        setHasQuestion(prev => !prev);

        // const options = await fetch(`http://localhost:3000/api/option/${id}`, {
        const options = await fetch(`http://localhost:3000/api/question/getall`, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        const optionJson = await options.json();
// [{id: 149, text: 'Пао', isCorrect: false, question_id: 23, createdAt: '2024-04-13T12:44:10.486Z', …}
// {id: 150, text: 'Марсель', isCorrect: false, question_id: 23, createdAt: '2024-04-13T12:44:10.490Z', …}
// {id: 151, text: 'Париж', isCorrect: true, question_id: 23, createdAt: '2024-04-13T12:44:10.492Z', …}
// {id: 152, text: 'Лион', isCorrect: false, question_id: 23, createdAt: '2024-04-13T12:44:10.495Z', …}]

        setOptions(optionJson);
        optionJson.map(({id, text}) => setInputResult(prev => [...prev, {id, text}]))
        // setQuestions(prev => [prev.find(i => i.id === id)])
        // setHasQuestion(prev => !prev);

        // const options = await fetch(`http://localhost:3000/api/option/${id}`, {
        //     headers: {
        //         "Content-Type": "application/json; charset=utf-8",
        //     }
        // })
        // const optionJson = await options.json();
        // setOptions(optionJson);
        // optionJson.map(({id, text}) => setInputResult(prev => [...prev, {id, text}]))
    }

    const changeInputResult = (id, value) => {
        const newArray = [...inputResult];
        newArray[id].text = value;
        setInputResult(newArray);
    }

    const onSubmit = async (data) => {
        const { id } = questions[0];
        // const answerResult = {}
        const updatedQuesiton = await fetch(`http://localhost:3000/api/question/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: questions[0].title,
                hasQuestions: hasQuestion
            })
        })
        if(updatedQuesiton.status) {
            const promises = inputResult.map(async (i, ind) => {
                const { id, text } = i;
                const isCorrect = +radio.active-1 === ind;
                const result = await fetch(`http://localhost:3000/api/option/update/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ text, isCorrect })
                });
                const res = await result.json();
                return res;
            })
            
            const response = await Promise.all(promises)
            console.log("Successfull update");
            navigate('/');
            return response;
        } else {
            console.log("Faild update");
        }
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {
                                options.map((i, ind) => (
                                    <>
                                        <Input 
                                            onChange={e => setQuestions(prev => [{ id: prev[0].id, title: e.target.value }])}
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
                                                            onChange={e => setRadio({ active: e.target.id})} 
                                                            checked={radio.active === `${ind}`} 
                                                            type="radio"
                                                        />
                                                        <Input style={{ width: "100%"}} 
                                                            onChange={e => changeInputResult(ind, e.target.value)} 
                                                            value={i.text} 
                                                            type="text"
                                                        />
                                                    </div>
                                                ))
                                                }
                                            </div> : 
                                            <Input 
                                                onChange={e => changeInputResult(0, e.target.value)}
                                                type="text"
                                                value={i.text}
                                            />
                                        }
                                    </>
                                )) 
                            }
                            <Btn handleClick={onSubmit} title={"Сохранить"}/>
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
}





                                    // <>
                                    //     <div style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                    //         <input id="1" onChange={e => setRadio({ active: e.target.id })} checked={radio.active === '1'} type="radio"/>
                                    //         <Input style={{ width: "100%"}} 
                                    //             onChange={e => changeInputResult(0, e.target.value)} 
                                    //             value={inputResult[0]?.text} 
                                    //             type="text"
                                    //         />
                                    //     </div>

                                    //     <div style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                    //         <input id="2" onChange={e => setRadio({ active: e.target.id })} checked={radio.active === '2'} type="radio"/>
                                    //         <Input style={{ width: "100%"}} 
                                    //             onChange={e => changeInputResult(1, e.target.value)} 
                                    //             value={inputResult[1]?.text} 
                                    //             type="text"
                                    //         />
                                    //     </div>

                                    //     <div style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                    //         <input id="3" onChange={e => setRadio({ active: e.target.id })} checked={radio.active === '3'} type="radio"/>
                                    //         <Input style={{ width: "100%"}} 
                                    //             onChange={e => changeInputResult(2, e.target.value)} 
                                    //             value={inputResult[2]?.text} 
                                    //             type="text"
                                    //         />
                                    //     </div>

                                    //     <div style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                    //         <input id="4" onChange={e => setRadio({ active: e.target.id })} checked={radio.active === '4'} type="radio"/>
                                    //         <Input style={{ width: "100%"}} 
                                    //             onChange={e => changeInputResult(3, e.target.value)} 
                                    //             value={inputResult[3]?.text} 
                                    //             type="text"
                                    //         />
                                    //     </div> 
                                    // </> 
                                    // : 
                                    // <Input 
                                    //     onChange={e => changeInputResult(0, e.target.value)}
                                    //     type="text"
                                    //     value={inputResult[0]?.text}
                                    // />