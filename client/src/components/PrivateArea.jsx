import { useEffect, useState } from "react"
import { Field, Navigation } from "./index"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDQyNTQzfQ.584JBv9RPUgnI3upMppG3J_lfqqOZdU6WKVCPcnV4g4";

export const PrivateArea = () => {
    // const [test, setTest] = useState();
    const [questions, setQuestions] = useState();
    useEffect(() => {
        fetch("http://localhost:3000/api/question", {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `bearer ${token}`
            }
        }).then(response => response.json())
          .then(questions => setQuestions(questions));
    }, []);

    const handleClick = (id) => {
        // setTest(id);
        fetch(`http://localhost:3000/api/question/${id}`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `bearer ${token}`
            }
        })
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => setQuestions(data));
    };
    console.log("private: ", questions);

    return (
        <>
            {
                !questions?.length ? <>
                    <Field name={"Eduard"}>
                        <div>Empty questions</div>
                    </Field>
                    <div style={{ width: "100vw", display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                        <Navigation />
                    </div>
                </> : <>
                    <Field>
                        { questions.map(({id, name}) => (
                            <div 
                                onClick={() => handleClick(id)} 
                                key={id} 
                                style={{ textDecoration: "underline", display: "flex"}}
                            >   
                                {name}
                            </div>
                        ))}
                    </Field>

                    <div style={{ width: "100vw", display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                        <Navigation />
                    </div>
                </>
            }
        </>
    )
}