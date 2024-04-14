import { useEffect, useState } from "react"
import { Btn, Field, Navigation } from './index'
import { Input } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDQyNTQzfQ.584JBv9RPUgnI3upMppG3J_lfqqOZdU6WKVCPcnV4g4";


export const PrivateArea = () => {
    
    const { handleSubmit } = useForm();
    const [questions, setQuestions] = useState([]);
    const [hasQuestion, setHasQuestion] = useState(false);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();


    // получить ответы с таблицы (answers)
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
        const options = await fetch(`http://localhost:3000/api/question/getall`, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        const optionJson = await options.json();
        setOptions(optionJson);
        // optionJson.map(({id, text}) => setInputResult(prev => [...prev, {id, text}]));
    }


    // добавить логику для добавления ответов в конкретные поля
    const handleClick = async () => {
        setOptions([])
    };
    
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
                                        <div style={{ fontSize: "3vmin", marginTop: "5vh", fontWeight: "900", display: "flex", justifyContent: "start"}}>
                                            {i.title}
                                        </div>
                                        {
                                        i.hasOptions?
                                            <div style={{ display: "flex", justifyContent: "start", flexWrap: "wrap", marginTop: "1vh" }}>
                                                {
                                                i.options.map((i, ind) => (
                                                    <div onClick={() => changeRadio(id, ind)} style={{ display: "flex", flex: "0 1 50%"}}>
                                                        <input id={ind} 
                                                            style={{ display: "flex"}}
                                                            onChange={e => changeRadio(id, e.target.id)} 
                                                            checked={i.isCorrect} 
                                                            type="radio"
                                                        />
                                                        <div style={{ fontSize: "3vmin", backgroundColor: i.isCorrect?"green":"red"}}>
                                                            {i.text}
                                                        </div>
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
                            <Btn handleClick={handleClick} title={"Вернуться назад"}/>
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














// import { useEffect, useState } from "react"
// import { Field, Navigation } from "./index"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDQyNTQzfQ.584JBv9RPUgnI3upMppG3J_lfqqOZdU6WKVCPcnV4g4";

// export const PrivateArea = () => {
//     // const [test, setTest] = useState();
//     const [questions, setQuestions] = useState();
//     useEffect(() => {
//         fetch("http://localhost:3000/api/question", {
//             headers: {
//                 "Content-Type": "application/json;charset=utf-8",
//                 "Authorization": `bearer ${token}`
//             }
//         }).then(response => response.json())
//           .then(questions => setQuestions(questions));
//     }, []);

//     const handleClick = (id) => {
//         // setTest(id);
//         fetch(`http://localhost:3000/api/question/${id}`, {
//             headers: {
//                 "Content-Type": "application/json;charset=utf-8",
//                 "Authorization": `bearer ${token}`
//             }
//         })
//         .then(response => response.json())
//         // .then(data => console.log(data))
//         .then(data => setQuestions(data));
//     };
//     console.log("private: ", questions);

//     return (
//         <>
//             {
//                 !questions?.length ? <>
//                     <Field name={"Eduard"}>
//                         <div>Empty questions</div>
//                     </Field>
//                     <div style={{ width: "100vw", display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
//                         <Navigation />
//                     </div>
//                 </> : <>
//                     <Field>
//                         { questions.map(({id, name}) => (
//                             <div 
//                                 onClick={() => handleClick(id)} 
//                                 key={id} 
//                                 style={{ textDecoration: "underline", display: "flex"}}
//                             >   
//                                 {name}
//                             </div>
//                         ))}
//                     </Field>

//                     <div style={{ width: "100vw", display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
//                         <Navigation />
//                     </div>
//                 </>
//             }
//         </>
//     )
// }