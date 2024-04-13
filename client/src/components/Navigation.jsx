import { Link, Outlet } from "react-router-dom"
import { Btn } from "./Button";
import { textForButton } from '../helpers/buttonNavigation.js';


export const Navigation = () => {
    return (
        <>
            <Outlet />
            {
              textForButton.map((i, ind) => 
                <Link key={ind} to={i.path}>
                    <Btn title={i.title}/>
                </Link>)
            }
        </>
    )
}