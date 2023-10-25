import './opttextarea.scss';

const OptTextarea = (props) => {
    return <>
        <fieldset id="opt-textarea">
            {props.label && <label htmlFor={props.labelfor}>{props.label}</label>}
            {props.description && <p>{props.description}</p>}
            <textarea
                id={props.labelfor}
                placeholder={props.placeholder}
                className="opt-textarea-input"
                style={{ minHeight: `${props.minHeight}px` }}
                value={props.value?props.value:""}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </fieldset>
    </>
}

export default OptTextarea;