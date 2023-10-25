import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { experimentalStyled as styled } from '@mui/material/styles';
import { Modal, Backdrop, Box, Fade, Grid, Paper, Divider, Stack, Alert, AlertTitle } from '@mui/material';
import { SUP_RESOLUTION_IMG_INITIAL, SUP_RESOLUTION_IMG_START, SUP_RESOLUTION_IMG_SUCCESS, SUP_RESOLUTION_IMG_FAILED } from '../../actions/config';
import { setSuperResInitImg, makeSuperResolution } from '../../actions/superResAction';

import OptSlider from '../OptSlider';
import ColorButton from '../ColorButton';
import PendingImgItem from '../PendingImgItem';
import { primaryBtnColor } from '../../stylesheets/colors';
import './modalenhance.scss';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#2a2f3538',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const ModalEnhance = (props) => {
    // Props
    const { open, onClose, item } = props;

    // Use Redux
    const dispatch = useDispatch();
    const aiObj = useSelector(state => state.aiObj)
    const superResObj = useSelector(state => state.superResObj)

    // State
    const [scale, setScale] = useState(1);
    const [supResState, setSupResState] = useState(SUP_RESOLUTION_IMG_INITIAL);
    const [superImgUrl, setSuperImgUrl] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setSupResState(superResObj?.state);
        setSuperImgUrl(superResObj?.result);
    }, [superResObj]);

    /**
     * @description
     *  Generate super resolution image using api
     */
    const variateImage = () => {
        console.log("--------------- handleSupResolution --------------");
        try {
            const settings = {
                "key": process.env.REACT_APP_STABLE_DIFFUSION_API_KEY,
                "url": item.url,
                "scale": scale,
                "webhook": null,
                "face_enhance": false
            };

            dispatch(makeSuperResolution(settings)).then(res => {
                console.log("makeSuperResolution - Success", res);
            }).catch(err => {
                console.log("makeSuperResolution - Err", err);
                setErrorMsg(err);
            });
        } catch (err) {
            console.log("handleSupResolution - Err", err);
            setErrorMsg(err);
        };
    }

    return <>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            style={{ overflowY: 'auto' }}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open} >
                <Box className="enhance-modal">
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid className='left-bar' item xs={12} sm={6} md={4} lg={3}>
                            <Item>
                                <div className='origin-image'>
                                    <img className='' src={item.url} />
                                </div>
                                <OptSlider
                                    min={1}
                                    max={4}
                                    label={`Scale`}
                                    color={primaryBtnColor}
                                    // disabled={(authObj?.user?.role_idx === 1 || authObj?.user?.role_idx === 2) ? false : true}
                                    value={scale}
                                    onChange={(value) => setScale(value)}
                                />
                                <Divider />
                                <div className='option-generate'>
                                    <ColorButton variant="contained" name={`Enhance`} handle={() => variateImage()} />
                                </div>
                            </Item>
                        </Grid>
                        <Grid className='right-bar' item xs={12} sm={6} md={8} lg={9}>
                            <Item>
                                {
                                    supResState === SUP_RESOLUTION_IMG_INITIAL &&
                                    <Stack sx={{ width: '70%', textAlign: 'left', marginLeft: '15%', marginTop: '5%' }} >
                                        <Alert severity="warning">
                                            <AlertTitle>Pending</AlertTitle>
                                            Please generate a new enhance image.
                                        </Alert>
                                    </Stack>
                                }
                                {
                                    supResState === SUP_RESOLUTION_IMG_START &&
                                    <PendingImgItem />
                                }
                                <div className='result-field'>
                                    {
                                        supResState === SUP_RESOLUTION_IMG_SUCCESS &&
                                        <img className='' src={superImgUrl} />
                                    }
                                </div>
                                {
                                    supResState === SUP_RESOLUTION_IMG_FAILED &&
                                    <Stack sx={{ width: '70%', textAlign: 'left', marginLeft: '15%', marginTop: '5%' }}>
                                        <Alert severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            Making enhance image is failed.
                                            {errorMsg &&
                                                <strong >- {errorMsg}</strong>
                                            }
                                        </Alert>
                                    </Stack>
                                }
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal >
    </>
}

export default ModalEnhance;