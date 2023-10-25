import { red } from '@mui/material/colors';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import './optslider.scss';

const StyledSlider = styled((props) => (
    <Slider
        {...props}
    />
))({
    '& .css-14pt78w-MuiSlider-rail': {
        backgroundColor: '#656468',
        height: '3px'
    },
    '& .css-1n40zqk-MuiSlider-track': {
        backgroundColor: '#8d72fc',
        height: '3px'
    },
    '& .css-14gf62f-MuiSlider-thumb': {
        backgroundColor: '#8d72fc',
        border: '2px solid #8d72fc',
        width: '15px',
        height: '15px'
    },
    '& .css-14gf62f-MuiSlider-thumb:hover': {
        boxShadow: '0px 0px 0px 8px #8d72fc64'
    },
    '& .css-14gf62f-MuiSlider-thumb.Mui-active': {
        boxShadow: '0px 0px 0px 8px #8d72fc64'
    },
    '& .Mui-disabled': {
        backgroundColor: '#434343'
    }
});

const OptSlider = (props) => {
    return <>
        <fieldset id="opt-slider">
            {props.label && <label>{props.label} </label>}
            {props.description && <p>{props.description}</p>}
            <div className="opt-slider-container">
                <StyledSlider
                    size="small"
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    max={props.max}
                    min={props.min}
                    value={props.value}
                    disabled={!props.disabled ? false : true}
                    onChange={(e) => props.onChange(e.target.value)}
                />
                <input
                    type="text"
                    className="slider-input"
                    value={props.value}
                    max={props.max}
                    min={props.min}
                    disabled={!props.disabled ? false : true}
                    onChange={(e) => {
                        if (e.target.value > props.max || e.target.value < props.min)
                            return;
                        props.onChange(e.target.value)
                    }} />
            </div>
        </fieldset>
    </>
}

export default OptSlider;