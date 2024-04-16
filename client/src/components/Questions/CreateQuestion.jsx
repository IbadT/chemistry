import { useState } from "react"
import { Navigation } from "../Navigation";
import { Field } from "../index";
import { Button, Input } from "antd";
import { useForm } from "react-hook-form";
import { Btn } from "../index";
import { getTokenFromLocalStorage } from "../../helpers/localstorage.ts";


export const CreateQuestion = () => {
    const {register, handleSubmit} = useForm();
    const [test, setTest] = useState({});
    const token = getTokenFromLocalStorage("token")

    const [firstInput, setFirstInput] = useState({});
    const [secondInput, setSecondInput] = useState({});
    const [thirdInput, setThirdInput] = useState({});
    const [fourthInput, setFourthInput] = useState({});

    const [inputValue, setInputValue] = useState('');
    const [isHasOptions, setHasOptions] = useState(true);

    const [radio, setRadio] = useState({});

    const handleClick = async () => {
        const responseQuestion = await fetch("http://localhost:3000/api/question/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
                name: test.name,
                title: test.title,
                hasOptions: isHasOptions,
            })
        })
        const { id } = await responseQuestion.json();
        
        if(isHasOptions) {
            const options = [firstInput, secondInput, thirdInput, fourthInput];
            const optionTrue = +radio.active;
            const optionsResult = options.map((i, index) => index+1 === optionTrue ? {...i, isCorrect: true, question_id: id} : { ...i, question_id: id });
            
            const promises = optionsResult.map(async i => {
                const createdOptions = await fetch("http://localhost:3000/api/option/create", {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${token}`
                    },
                    body: JSON.stringify(i)
                });
                const optionsJson = await createdOptions.json();
                return await optionsJson;
            });
            const result = await Promise.all(promises);
            return result;
        } else {
            const response = await fetch("http://localhost:3000/api/option/create", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: inputValue,
                    isCorrect: true,
                    question_id: id
                })
            })
            await response.json();
            setInputValue('');
        }
        setTest(prev => ({...prev, title: ''}));
        setFirstInput({});
        setSecondInput({});
        setThirdInput({});
        setFourthInput({});
    }

    return (
        <div>
            <Button 
                style={{ marginTop: "7vh", backgroundColor: "transparent", color: "white", }} 
                onClick={() => setHasOptions(prev => !prev)}
            >
                Cменить варианты ответа
            </Button>
            <Field>
                    <form onSubmit={handleSubmit}>
                        <Input {...register("name", { required: true })} onChange={(e) => setTest(prev => ({...prev, name: e.target.value}))} 
                            type="text" 
                            placeholder="Введите название теста"
                            value={test.name}
                        />
                        <Input {...register("title", { required: true })} onChange={e => setTest(prev => ({...prev, title: e.target.value}))}
                            type="text"
                            placeholder="Введите название вопроса"
                            value={test.title}
                        />

                        {
                            isHasOptions ? (
                                <div style={{ display: 'flex', flexDirection: 'column'}}>

                                    <div style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                        <input id="1" onChange={e => setRadio({ active: e.target.id })} checked={radio.active === '1'} type="radio"/>
                                        <Input style={{ width: "100%"}} onChange={e => setFirstInput(prev => ({...prev, text: e.target.value}))} value={firstInput.text} type="text"/>
                                    </div>
                                    
                                    <div style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                        <input id="2" onChange={e => setRadio({ active: e.target.id })} checked={radio.active === '2'} type="radio"/>
                                        <Input style={{ width: "100%"}} onChange={e => setSecondInput(prev => ({...prev, text: e.target.value}))} value={secondInput.text} type="text"/>
                                    </div>
                                    
                                    <div style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                        <input id="3" onChange={e => setRadio({ active: e.target.id })} checked={radio.active === '3'} type="radio"/>
                                        <Input style={{ width: "100%"}} onChange={e => setThirdInput(prev => ({...prev, text: e.target.value}))} value={thirdInput.text} type="text"/>
                                    </div>
                                    
                                    <div style={{ display: "flex", justifyContent: "start", marginTop: "3vh" }}>
                                        <input id="4" onChange={e => setRadio({ active: e.target.id })} checked={radio.active === '4'} type="radio"/>
                                        <Input style={{ width: "100%"}} onChange={e => setFourthInput(prev => ({...prev, text: e.target.value}))} value={fourthInput.text} type="text"/>
                                    </div>

                                </div>

                            ) : (
                                <Input 
                                    onChange={e => setInputValue(e.target.value)} 
                                    type="text" 
                                    placeholder="Введите правильный ответ для вопроса" 
                                    value={inputValue}
                                />
                            )
                        }

                        <Btn handleClick={handleClick} title={"Создать"}>Создать</Btn>
                    </form>
            </Field>
            <Navigation />
        </div>
    )
}