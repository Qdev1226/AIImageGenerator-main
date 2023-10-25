import './optdimenitem.scss'

const ImgDimension = (props) => {
    return <>
        <div
            className="opt-img-dimen-item"
            onClick={() => props.handleClick()}>
            <input
                type="radio"
                className="radio-input"
                checked={props.active}
                onChange={() => { }} />
            <label
                htmlFor={`image-dim-${props.id}`}
                className="!text-[11px]"
                style={{ width: '98px' }}>
                {props.width} × {props.height}
            </label>
        </div>
    </>
}

export default ImgDimension;