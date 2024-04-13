import { useEffect, useState } from "react"
import { Input } from "antd";
import { Btn } from './Button'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDQyNTQzfQ.584JBv9RPUgnI3upMppG3J_lfqqOZdU6WKVCPcnV4g4";


// добавить функционал для отслеживания правильных ответов
// добавить функционал для добавления ВСЕХ тестов, а не отдельного с отдим вариантом ответа
export const FindQuestionWithOptions = ({ id }) => {

    const [test, setTest] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/question/${id}`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(test => setTest([test]));
    }, [id]);

    const handleClick = async () => {
        // добавить функционал для добавления ответов теста
    }

    return (
        <>
            {
                test.length ? test.map(({ options, question}, ind) => (
                        question?.hasOptions ? (
                            <div key={ind}>
                                <div>{question?.title}</div>
                                {
                                    options.map(i => (
                                        <div key={i.id} style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                            <input id="1" type="radio"/>
                                            <div>{i.text}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div key={ind}>
                                <div>{question?.title}</div>
                                <Input type="text" placeholder="Введите ответ"/>
                            </div>
                        )
                )) : null
            }
            <Btn handleClick={handleClick} title={"Завершить тест"}/>
        </>
    )
}