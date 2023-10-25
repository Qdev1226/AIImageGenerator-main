import { useState } from "react";

import { IconButton } from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import "./optfilter.scss";

const OptFilter = (props) => {
    const [clicked, setClicked] = useState(false);

    return <>
        <div className="filter-box">
            <div className="chose-box">
                <button className='btn-filter-item' onClick={() => props.handleClick(!props.opened)}>
                    <span className='img-container'>
                        <img
                            alt={props.title}
                            src={props.img}
                            decoding="async"
                            data-nimg="fill"
                        />
                    </span>
                    <div className="title">
                        {props.title}
                    </div>
                    {
                        props.active &&
                        <div className="img-option">
                            <ExpandMoreOutlinedIcon fontSize='small' />
                        </div>
                    }
                </button>
                <IconButton size="small" onClick={() => props.handleClick(!props.opened)}>
                    {
                        props.opened ?
                            <VisibilityOffIcon size="small" sx={{ color: 'white' }} />
                            :
                            <VisibilityIcon size="small" sx={{ color: 'white' }} />
                    }

                </IconButton>
            </div>
            {/* <div className="popup-box">
                <div className="scrollbar">
                    <div className="grid-column">
                        {
                            filters.map((filter, key) => (
                                <OptFilterItem
                                    title={filter.title}
                                    active={filter.state}
                                    img={filter.image}
                                    key={key}
                                    onClick={() => window.alert(key)} />
                            ))
                        }
                    </div>
                </div>
            </div> */}
        </div>
    </>
}

const filters = [{
    title: "None",
    image: "https://storage.googleapis.com/pai-marketing/filters/ominous_escape.png",
    prompt: "",
    state: true
}, {
    title: "Colorpop",
    image: "https://storage.googleapis.com/pai-marketing/filters/elizaport_style.png",
    prompt: "",
    state: false
}, {
    title: "Instaport",
    image: "https://storage.googleapis.com/pai-marketing/filters/instaport_style.png",
    prompt: "",
    state: false
}, {
    title: "Playtoon",
    image: "https://storage.googleapis.com/pai-marketing/filters/pltn-style.png",
    prompt: "",
    state: false
}, {
    title: "Woolitize",
    image: "https://storage.googleapis.com/pai-marketing/filters/woolitize.jpeg",
    prompt: "",
    state: false
}, {
    title: "App Icons",
    image: "https://storage.googleapis.com/pai-marketing/filters/appicon-style.jpg",
    prompt: "",
    state: false
}, {
    title: "Retro Futurism",
    image: "https://storage.googleapis.com/pai-marketing/filters/retrofuturism.png",
    prompt: "",
    state: false
}, {
    title: "Origamip",
    image: "https://storage.googleapis.com/pai-marketing/filters/origami.png",
    prompt: "",
    state: false
}, {
    title: "Black and white",
    image: "https://storage.googleapis.com/pai-marketing/filters/haze.png",
    prompt: "",
    state: false
}, {
    title: "None",
    image: "https://storage.googleapis.com/pai-marketing/filters/ominous_escape.png",
    prompt: "",
    state: true
}, {
    title: "Colorpop",
    image: "https://storage.googleapis.com/pai-marketing/filters/elizaport_style.png",
    prompt: "",
    state: false
}, {
    title: "Instaport",
    image: "https://storage.googleapis.com/pai-marketing/filters/instaport_style.png",
    prompt: "",
    state: false
}, {
    title: "Playtoon",
    image: "https://storage.googleapis.com/pai-marketing/filters/pltn-style.png",
    prompt: "",
    state: false
}, {
    title: "Woolitize",
    image: "https://storage.googleapis.com/pai-marketing/filters/woolitize.jpeg",
    prompt: "",
    state: false
}, {
    title: "App Icons",
    image: "https://storage.googleapis.com/pai-marketing/filters/appicon-style.jpg",
    prompt: "",
    state: false
}, {
    title: "Retro Futurism",
    image: "https://storage.googleapis.com/pai-marketing/filters/retrofuturism.png",
    prompt: "",
    state: false
}, {
    title: "Origamip",
    image: "https://storage.googleapis.com/pai-marketing/filters/origami.png",
    prompt: "",
    state: false
}, {
    title: "Black and white",
    image: "https://storage.googleapis.com/pai-marketing/filters/haze.png",
    prompt: "",
    state: false
}];

export default OptFilter;