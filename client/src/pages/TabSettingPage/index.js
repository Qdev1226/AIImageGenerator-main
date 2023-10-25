import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Alert, Stack, AlertTitle, Divider } from '@mui/material';

import { AI_MAKE_IMG_START, AI_MAKE_IMG_SUCCESS, AI_MAKE_IMG_FAILED, AI_MAKE_IMG_INIT } from '../../actions/config';
import ResultImgItem from '../../components/ResultImgItem';
import OptSlider from '../../components/OptSlider';
import OptSelect from '../../components/OptSelect';
import OptImgDimenItem from '../../components/OptImgDimenItem';
import PendingImgItem from '../../components/PendingImgItem';
import { primaryBtnColor } from '../../stylesheets/colors';
import "./tabsetting.scss";

const TabSettingPage = (props) => {
    // Props
    const { setting, setSetting, aiState } = props;

    // Use Redux
    const aiObj = useSelector(state => state.aiObj)
    const imgObj = useSelector(state => state.img);

    // States
    const [recentImages, setRecentImages] = useState([]);                   // Generated Image Objects
    const [isRecentImgState, setisRecentImgState] = useState(false);

    useEffect(() => {
        setRecentImages(imgObj.recentImages);
    }, [imgObj.recentImages]);


    /**
     * @description
     *  Change image state
     */
    const handleChgImage = (image) => {
        var tmpRecentImgs = recentImages;
        var len = tmpRecentImgs.length;

        for (var i = 0; i < len; i++) {
            if (tmpRecentImgs[i]._id === image._id)
                tmpRecentImgs[i] = image;
        }
        setRecentImages(tmpRecentImgs);
        setisRecentImgState(!isRecentImgState);
    }

    return <>
        <div id="setting-studio-container">
            <aside className="left-sidebar">
                <div className="px-6 space-y-6">
                    <OptSlider
                        min={1}
                        max={6}
                        label={`Columns`}
                        color={primaryBtnColor}
                        // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                        value={setting.columns}
                        onChange={(value) => setSetting({ key: "columns", value: value })}
                    />
                    <OptSelect
                        htmlfor={`model-type`}
                        labelstr={`Model`}
                        options={aiObj.models}
                        value={setting.model_id}
                        onChange={(modelId) => setSetting({ key: "model_id", value: modelId })}
                    />
                    <OptSlider
                        min={1}
                        max={1024}
                        label={`Image Dimensions`}
                        description={`Width × Height of the finished image.`}
                        color={primaryBtnColor}
                        // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                        value={setting.width}
                        onChange={(val) => {
                            setSetting({ key: "width", value: (Math.round(val / 8) * 8) });
                        }}
                    />
                    <OptSlider
                        min={1}
                        max={1024}
                        color={primaryBtnColor}
                        // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                        value={setting.height}
                        onChange={(val) => {
                            setSetting({ key: "height", value: (Math.round(val / 8) * 8) });
                        }}
                    />
                    <fieldset style={{ display: 'flex' }}>
                        <div style={{ flexGrow: 1 }}>
                            <OptImgDimenItem
                                width={512}
                                height={512}
                                active={(setting.width === 512 && setting.height === 512) ? true : false}
                                handleClick={() => {
                                    setSetting([
                                        { key: "width", value: 512 },
                                        { key: "height", value: 512 }
                                    ]);
                                }} />
                        </div>
                        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <label style={{ fontSize: `13px` }}>Good for avatars</label>
                        </div>
                    </fieldset>
                    <OptSlider
                        min={1}
                        max={200}
                        label={`Prompt Guidance`}
                        description={`Higher guidance will make your image closer to your prompt.`}
                        color={primaryBtnColor}
                        // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                        value={Math.round(setting.guidance_scale * 10)}
                        onChange={(val) => setSetting({ key: "guidance_scale", value: (val / 10) })}
                    />
                    <OptSlider
                        min={1}
                        max={50}
                        label={`Quality & Details`}
                        description={`More steps will result in a high quality image but will take longer.`}
                        color={primaryBtnColor}
                        // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                        value={setting.num_inference_steps}
                        onChange={(val) => setSetting({ key: "num_inference_steps", value: val })}
                    />
                    <Divider style={{ backgroundColor: `#5c5c5c`, marginBottom: '12px' }} />
                    {/* <OptSlider
                        min={1}
                        max={30}
                        label={`Quality & Details`}
                        description={`More steps will result in a high quality image but will take longer.`}
                        color={primaryBtnColor}
                        disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                        value={guidanceScale}
                        onChange={(val) => setGuidanceScale(val)}
                    /> */}
                </div>
            </aside>
            <main className='main-content'>
                <div className="draggable-bounds">
                    <div className="top-toolbar">
                    </div>
                    <div className="scroll-container">
                        <div className='scroll-container-outbox'>
                            <div className='scroll-container-inbox'>
                                {
                                    aiState === AI_MAKE_IMG_INIT &&
                                    <Stack sx={{ width: '70%', textAlign: 'left', marginLeft: '15%', marginTop: '5%' }}>
                                        <Alert severity="info">
                                            <AlertTitle>TEXT TO IMAGE</AlertTitle>
                                            Press <strong>Generate</strong> button!
                                        </Alert>
                                    </Stack>
                                }
                                {
                                    aiState === AI_MAKE_IMG_FAILED &&
                                    <Stack sx={{ width: '70%', textAlign: 'left', marginLeft: '15%', marginTop: '5%' }}>
                                        <Alert severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            Generating image is field. — <strong>Try it again!</strong>
                                        </Alert>
                                    </Stack>
                                }
                                <div className="grid-box" style={{ gridTemplateColumns: `repeat(${setting.columns}, minmax(0px, 1fr))` }}>
                                    {
                                        aiState === AI_MAKE_IMG_START && <PendingImgItem />
                                    }
                                    {
                                        aiState === AI_MAKE_IMG_SUCCESS &&
                                        recentImages.map((image, key) =>
                                            <ResultImgItem
                                                url={image.url}
                                                image={image}
                                                changeImg={image => handleChgImage(image)}
                                                remixImg={prompt => setSetting({ key: "prompt", value: prompt })}
                                                key={key}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </>
}

export default TabSettingPage;