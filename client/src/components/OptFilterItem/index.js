import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import './optfilteritem.scss';

const OptFilterItem = (props) => {
    return <>
        <button
            className='btn-filter-item'
            style={{ borderColor: `${props.active === true ? '#93C5FD' : 'transparent'}` }}
            onClick={() => props.handleClick()}
        >
            <span className='img-container'>
                <img
                    alt={props.title}
                    src={props.img}
                    decoding="async"
                    data-nimg="fill"
                />
            </span>
            <div className="title" style={{ width: `${props.width ? props.width : 90}px` }}>
                {props.title}
            </div>
            {
                props.active &&
                <div className="img-option">
                    <ExpandMoreOutlinedIcon fontSize='small' />
                </div>
            }
        </button>
    </>
}

export default OptFilterItem;