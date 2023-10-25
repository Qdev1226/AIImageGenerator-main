import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import './optselect.scss';

const OptSelect = (props) => {
    const { htmlfor, labelstr, options, value, onChange } = props;

    return <>
        <fieldset id="opt-select">
            <label htmlFor={htmlfor}>{labelstr}</label>
            <div className="opt-select-container">
                <select name={htmlfor} id={htmlfor} onChange={e => onChange(e.target.value)} value={value}>
                    {
                        options?.map((option, key) => <option value={key} key={key}>{option.name}</option>)
                    }
                </select>
                <ExpandMoreOutlinedIcon fontSize='small' />
            </div>
        </fieldset>
    </>;
}

export default OptSelect;