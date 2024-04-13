import { useState } from "react"
import { Btn } from "../Button";
import { useForm } from 'react-hook-form';
import { Input, Space } from "antd";
import { getTokenFromLocalStorage, setTokenToLocalStorage } from '../../helpers/localstorage.ts'
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const isAuth = getTokenFromLocalStorage("token");
    const [login, setLogin] = useState({});
    const navigate = useNavigate();

    const handleClick = async () => {
        const url = 'http://localhost:3000/api/user/login'
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ email: login.email, password: login.password })
        });
        const token = await response.json();
        console.log(token);
        setTokenToLocalStorage("token", token);
        navigate('/')
    }

    const onSubmit = (data) => {
        console.log(data)
    }
    
    return (
        <>
        {
            isAuth ? 
            <Navigate to={"/"}/> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Login</label>
                <Space direction="vertical" style={{ width: '100%'}}>
                    <Input {...register("email", { required: true })} 
                        onChange={(e) => setLogin(prev => ({...prev, email: e.target.value}))} 
                        type="text" 
                        placeholder="Введите email"
                    />
                    <Input.Password {...register("password", { required: true })} 
                        onChange={(e) => setLogin(prev => ({...prev, password: e.target.value}))} 
                        type="text" 
                        placeholder="Введите пароль"
                    />
                    <Btn handleClick={handleClick} title={"Войти"}/>
                </Space>
            </form>

        }
        </>
    )
}