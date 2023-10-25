import { useState } from 'react';

import OptImgNumItem from '../OptImgNumItem';

const OptImgNum = (props) => {

    // Number of Images
    const [imgNums, setImgNums] = useState([{
        active: true,
        num: 1,
    }, {
        active: false,
        num: 2,
    }, {
        active: false,
        num: 3,
    }, {
        active: false,
        num: 4,
    }]);

    const handleimgNumChange = (idx) => {
        setImgNums(imgNums.map((item, key) => {
            if (key === idx) {
                props.onChange(item.num);
                return { ...item, active: true }
            }
            return { ...item, active: false }
        }))
    }

    return <>
        <fieldset className="create-fieldset py-8">
            <label>Number of Images</label>
            {/* <p>Select the number of images you would like to generate.</p> */}
            <div className="flex gap-x-2">
                {
                    imgNums.map((imgNum, key) => <OptImgNumItem key={key} item={imgNum} onClick={() => handleimgNumChange(key)} />)
                }
            </div>
        </fieldset>
    </>
}

export default OptImgNum;