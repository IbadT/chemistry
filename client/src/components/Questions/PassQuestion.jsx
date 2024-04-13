import { useEffect, useState } from "react"
import { Field, Navigation } from '../index'
import { FindQuestionWithOptions } from '../FindQuestionWithOptions'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDQyNTQzfQ.584JBv9RPUgnI3upMppG3J_lfqqOZdU6WKVCPcnV4g4";


export const PassQuestion = () => {
    
    const [questions, setQuestions] = useState([]);
    const [enterId, setEnterId] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/api/question", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(questions => setQuestions(questions))
    }, []);

    useEffect(() => {
        setQuestions([])
    }, [enterId])


    // useEffect(() => {
    //     fetch(`http://localhost:3000/api/question/${enterId}`, {
    //         headers: {
    //             "Content-Type": "application/json;charset=utf-8",
    //             "Authorization": `bearer ${token}`
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(question => setEnterdQ(question))
    // }, [enterId]);
    
    // const changeQuesions = async (id) => {
    //     setEnterId(id); 
        // console.log(id);
        // console.log(enterId);
        // const enteredQuestion = questions.find(i => i.id === id);
        // const response = await fetch(`http://localhost:3000/api/question/${id}`, {
        //     headers: {
        //         "Content-Type": "application/json;charset=utf-8",
        //         "Authorization": `bearer ${token}`
        //     }
        // })
        // const resonseJson = await response.json();
        // const result = await resonseJson;
        // setEnterdQ(result);
        // setQuestions([])
    // }

    return (
        <>
            {
                questions.length ? 
                    <Field name={"Eduard"}>
                        { questions.map(i => (
                            <div 
                                key={i.id} 
                                onClick={() => setEnterId(i.id)} 
                                style={{ cursor: "pointer", marginTop: "2vh", textDecoration: "underline", display: "flex", fontSize: '3vmin'}}
                            >
                                {i.name}
                            </div>
                        ))}
                    </Field> : (
                        <Field>
                            <FindQuestionWithOptions id={enterId}/>
                        </Field>
                    )
            }
            <div style={{ width: "100vw", display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                <Navigation />
            </div>
        </>
    )
};






                // enteredQ?.question ? (
                //     enteredQ.map((i) => ( console.log(i),
                //         i.question.hasOption ? 
                //         <Field>
                //             <div>{i.question.name}</div>
                //             {
                //                 i.options.map(i => (console.log(i),
                //                     <>
                //                         {/* <input type="radio"/> */}
                //                         <div>{i.options.text}</div>
            
                //                         {/* <input type="radio"/>
                //                         <div>{i.options.text}</div>
            
                //                         <input type="radio"/>
                //                         <div>{i.options.text}</div>
            
                //                         <input type="radio"/>
                //                         <div>{i.options.text}</div> */}
                //                     </>
                                    
                //                 ))
                //             }

                //         </Field> : (
                //             <div>FALSE</div>
                //         // <Field>
                //         //     <div>{i.question.name}</div>
                //         //     <input type="text"/>
                //         // </Field>
                //         )

                //     ))
                //     // <div>{enteredQ.question.name}</div>
                // ) : null