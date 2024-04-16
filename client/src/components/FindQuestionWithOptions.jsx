import { useEffect, useState } from "react"
import { Input } from "antd";
import { Btn } from './Button'
import { getTokenFromLocalStorage } from "../helpers/localstorage.ts";

export const FindQuestionWithOptions = ({ id }) => {

    const token = getTokenFromLocalStorage("token");
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