import { Slider } from '@mui/material';

const VerSlider = (props) => {
    return <>
        <fieldset className="create-fieldset">
            <div id="slider-Columns" className="flex items-center gap-x-4 slider-container">
                <label htmlFor="range-slider-Columns" className="text-sm text-gray-400">{props.label}</label>
                <Slider
                    size="small"
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    color={props.color}
                    value={props.value}
                    min={props.min}
                    max={props.max}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </div>
        </fieldset>
    </>
}

export default VerSlider;