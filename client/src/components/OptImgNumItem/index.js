const OptImgNum = (props) => {
    return <>
        <input type="radio" className="radio-input" checked={props.item.active} onChange={e => { }} />
        <label onClick={() => props.onClick()}>{props.item.num}</label>
    </>
}

export default OptImgNum;