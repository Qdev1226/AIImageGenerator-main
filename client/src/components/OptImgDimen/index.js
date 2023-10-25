import { useState } from "react";

import OptImgDimenItem from '../../components/OptImgDimenItem';

const OptImgDimen = (props) => {
    // Image Dimensions List
    const [dimens, setDimens] = useState([{
        active: true,
        width: 512,
        height: 512
    }, {
        active: false,
        width: 1024,
        height: 1024
    }, {
        active: false,
        width: 640,
        height: 384
    }, {
        active: false,
        width: 384,
        height: 640
    }, {
        active: false,
        width: 768,
        height: 512
    }, {
        active: false,
        width: 512,
        height: 768
    }]);

    const handleDimenChange = (idx) => {
        setDimens(dimens.map((item, key) => {
            if (key === idx) {
                props.onChgWidth(item.width);
                props.onChgHeight(item.height);
                return { ...item, active: true }
            }
            return { ...item, active: false }
        }))
    }

    return <>
        <fieldset className="create-fieldset">
            <label>Image Dimensions</label>
            {/* <p>Width × Height of the finished image.</p> */}
            <div className="flex flex-row flex-wrap gap-x-2 gap-y-2">
                {
                    dimens.map((dimen, key) =>
                        <OptImgDimenItem key={key} dimen={dimen} onChange={() => handleDimenChange(key)} />
                    )
                }
            </div>
            {/* <div className="text-sm grey-100 mt-1">
                <p>Buy a <a target="_blank" href="https://playgroundai.com/pricing" style={{ color: 'rgb(118, 173, 255)' }} rel="noreferrer">Pro plan</a> for any width or height up to 1536px</p>
            </div> */}
        </fieldset>
    </>
}

export default OptImgDimen;