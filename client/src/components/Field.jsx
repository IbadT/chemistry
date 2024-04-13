import React from "react"

const style = {
    backgroundColor: "rgb(87, 87, 87)",
    width: "90vw",
    height: "45vh",
    borderRadius: "20px",
    // margin: "7vh 5vw 0",
    margin: "5vh 5vw 0",
    display: "flex",
    justifyContent: "space-around"
}

export const Field = React.memo(({ name, children, setQuestionId }) => {
    return (
        <div style={style}>
            <div onClick={(e) => console.log(e)} style={{ height: "100%", overflow: "scroll", flexDirection: "column", width: "50%"}}>
                { children }
            </div>
            <div style={{ display: "flex", justifyContent: "end", margin: "4vh 8vw"}}>{name}</div>
        </div>
    )
})