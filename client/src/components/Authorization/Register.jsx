import { useState } from "react"
import { Btn } from "../Button";
import { useForm } from 'react-hook-form';
import { Input, Space } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from '../../helpers/localstorage.ts'

export const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [login, setLogin] = useState({});
    const hasToken = getTokenFromLocalStorage("token");
    const navigate = useNavigate();

    const handleClick = async () => {
        const url = 'http://localhost:3000/api/user/register'
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(login)
        });
        navigate('/login')
    }

    const onSubmit = (data) => {
        console.log(`DATA: ${data}`);
    }
    
    return (
        <>
            {
                hasToken ? <Navigate to={'/login'}/> : 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Register</label>
                    <Space direction="vertical" style={{ width: '100%'}}>
                        <Input {...register("user_name", { required: true })} 
                            onChange={(e) => setLogin(prev => ({...prev, user_name: e.target.value}))} 
                            type="text" 
                            placeholder="Введите свое имя"
                        />
                        <Input {...register("email", { required: true })} 
                            onChange={(e) => setLogin(prev => ({...prev, email: e.target.value}))} 
                            type="text" 
                            placeholder="Введите email"
                        />
                        <Input.Password {...register("password", { required: true, min: 2 })} 
                            aria-invalid={errors.password ? "true" : "false"}
                            onChange={(e) => setLogin(prev => ({...prev, password: e.target.value}))} 
                            type="text" 
                            placeholder="Введите пароль"
                        />
                        {errors.password && <p role="alert">{errors.password.message}</p>}
                        <Btn handleClick={handleClick} title={"Войти"}/>
                    </Space>
                </form>
            }
        </>
    )
}