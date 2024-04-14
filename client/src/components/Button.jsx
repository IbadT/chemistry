import React from 'react';
import { Button } from 'antd';

const style = {
    borderColor: "rgb(190, 123, 50)",
    borderWidth: '2px',
    width: "35vw",
    fontSize: "4.5vmin",
    borderRadius: "25px",
    marginTop: "4vh",
    height: "7vh",
    background: "transparent",
    fontWeight: "bold",
}

export const Btn = ({ title, handleClick }) => {
    return (
        <Button style={style} type="primary" onClick={handleClick}>
            <div style={{ 
                marginBottom: "3vh",
                height: "100%", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                }}>
                    {title}
            </div>
        </Button>
    )
};