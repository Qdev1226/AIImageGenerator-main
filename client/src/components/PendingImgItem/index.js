import { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import './pendingimgitem.scss';

const PendingImgItem = (props) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => ((time * 10 + 1) * 0.1).toFixed(1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return <>
        <div className="pending-image-card">
            <img
                src={`./assets/images/loading.gif`}
                alt=""
                style={{ maxWidth: 'min(512px, 100%)' }}
            />
            <span className='timer'>
                {time}s
            </span>
            {/* <IconButton aria-label="delete">
                <DeleteOutlineOutlinedIcon fontSize='small' />
            </IconButton> */}
        </div>
    </>
}

export default PendingImgItem;