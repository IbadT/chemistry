import header_img from '/Users/macbook/Desktop/work/chemistry/client/src/header_img.png'

const style = {
    minHeight: "3vh",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginTop: "5%",
    marginLeft: "5%",
    fontSize: "calc(10px + 5vmin)",
}

export const Header = () => {
    return (
        <header style={style}>
            <img style={{ height: "17vh", width: "6vw"}} src={header_img} alt="" />
            <h1 style={{ marginBottom: "3vh"}}>CHEM TODAY</h1>
        </header>
    )
};