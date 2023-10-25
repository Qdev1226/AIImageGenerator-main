import { Uploader } from "uploader";

import Slider from '@mui/material/Slider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import './optimgtoimg.scss';
import { IconButton } from "@mui/material";

const OptImgToImg = (props) => {

    // Props
    const { img, onSetInitImg } = props;
    console.log(props);
    const uploader = Uploader({ apiKey: 'free' }); // Your real API key.

    /**
     * @description
     *  Load init image.
     */
    const loadInitImg = () => {
        uploader.open({ maxFileCount: 1 }).then(
            files => {
                const fileUrl = files.map(x => x.fileUrl).join("\n");
                console.log(fileUrl);
                onSetInitImg(fileUrl);
            },
            error => {
                console.log(error);
            }
        );
    }

    return <>
        <fieldset className="opt-image-setting">
            <label>Image to Image</label>
            <p>Upload an image to use as inspiration.</p>
            <fieldset>
                <div className="field-init-img">
                    {
                        props?.img === "" ?
                            <div className="file-upload">
                                <div className="mr-3">
                                    <label>
                                        <AddCircleOutlineIcon onClick={() => { loadInitImg() }} />
                                    </label>
                                </div>
                            </div>
                            :
                            <>
                                <div className="image-to-image-container">
                                    <img src={img} alt="Initial" />
                                    <div className="btn-container">
                                        <IconButton onClick={() => onSetInitImg("")} color='error' ><DeleteOutlineOutlinedIcon /></IconButton>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </fieldset>
        </fieldset>
    </>
}

export default OptImgToImg;