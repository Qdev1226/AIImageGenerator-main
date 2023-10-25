import styles from './styles.module.css';

const ImgRadioButton = (props) => {
    return <>
        <label >
            <input
                type="radio"
                className={styles.inputRadio}
                checked={props.checked}
                onChange={() => { }} />
            <img
                src={props?.url}
                className={styles.imgItem}
                onClick={() => props?.onChange(props?.url)} />
        </label>
    </>
}

export default ImgRadioButton;