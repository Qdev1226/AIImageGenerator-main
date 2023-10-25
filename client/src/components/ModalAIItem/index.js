import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { experimentalStyled as styled, alpha } from '@mui/material/styles';
import { Modal, Backdrop, Box, Fade, Grid, Paper, Button, Popover, IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { searchImgsByKey, addFavourite, followImgAuthor, getImageById } from '../../actions/imgAction';
import handleDownload from '../../utils/downloadfile';
import './modalaiitem.scss';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#2a2f3538',
    ...theme.typography.body2,
    padding: theme.spacing(2),
}));

const DarkPopover = styled(Popover)(({ theme }) => ({
    '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
        backgroundColor: '#2a2c36'
    },
}));

const ModalAIItem = (props) => {
    // Use Props
    const { open, onClose, item, changeImage, remixImage } = props;

    // Use Redux
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const imgObj = useSelector(state => state.img);

    // States
    const [copyPrompt, setCopyPrompt] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const [image, setImage] = useState(item);

    // Redirect Module
    const navigate = useNavigate()

    // Popover
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;
    const handlePopoverClick = (event) => { setAnchorEl(event.currentTarget) };
    const handlePopoverClose = () => { setAnchorEl(null) };

    useEffect(() => {
        dispatch(getImageById({ imageId: item?._id }));
    }, []);

    useEffect(() => {
        setIsFav(imgObj.imageIsFav);
        setIsFollow(imgObj.imageIsFollow);
        setImage(imgObj.image);
    }, [imgObj]);

    /**
     * @description
     *  Copy prompt to clipboard.
     */
    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(item?.prompt).then(
            () => {
                setCopyPrompt(true);
                setInterval(() => {
                    setCopyPrompt(false);
                }, 2000);
            },
            () => {
            }
        );
    }

    /**
     * @description
     *  Add or remove fav option to image.
     */
    const handleFavImg = () => {
        if (auth.isAuthenticated) {
            dispatch(addFavourite({ imageId: item?._id })).then(res => {
                setIsFav(res.isFav);
                changeImage(res.image)
            }).catch(err => console.log("handleFavImg", err));
        } else {
            navigate('/signin');
        }
    }

    /**
     * @description
     *  Follow or unfollow user.
     */
    const handleFollowUser = (isFollow) => {
        if (auth.isAuthenticated) {
            dispatch(followImgAuthor({
                authorId: item?.user_id,
                isFollow: isFollow
            }));
        } else {
            navigate('/signin');
        }
    }

    /**
     * @description
     *  Remix image
     */
    const handleRemixImage = () => {
        remixImage(item?.prompt);
        onClose();
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
            <Fade in={open} >
                <Box className="aiitem-modal">
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid className='left-bar' item xs={12} md={6}>
                            <Item>
                                <div className='origin-image'>
                                    <img src={item?.url} />
                                </div>
                                <div className='btn-util-container'>
                                    <div className='btn-fav-container'>
                                        <Button
                                            variant="text"
                                            size='small'
                                            color='error'
                                            startIcon={isFav ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                                            onClick={() => handleFavImg()} >
                                            {image?.fav_count}
                                        </Button>
                                        {/* <Button variant="outlined" startIcon={<FavoriteIcon />} size='small' color='error'>
                                            1
                                        </Button> */}
                                    </div>
                                    <div className='btn-sub-util-container'>
                                        <Button
                                            variant="text"
                                            startIcon={<FileDownloadIcon />}
                                            size='small'
                                            color='warning'
                                            onClick={() => handleDownload(image?.url)}>
                                            Download
                                        </Button>
                                        {
                                            false &&
                                            <>
                                                <Button variant="text" startIcon={<InsertLinkIcon />} size='small' color='warning'>
                                                    Copy link
                                                </Button>
                                                <Button aria-describedby={id} variant="text" onClick={handlePopoverClick} size='small' color='warning'>
                                                    <MoreHorizIcon />
                                                </Button>
                                                <DarkPopover
                                                    id={id}
                                                    open={openPopover}
                                                    anchorEl={anchorEl}
                                                    onClose={handlePopoverClose}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                                >
                                                    <Button variant="text" startIcon={<TextsmsOutlinedIcon />} size='small' color='warning'>
                                                        Report image
                                                    </Button>
                                                </DarkPopover>
                                            </>
                                        }
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid className='right-bar' item xs={12} md={6}>
                            <Item>
                                <div className='author-container'>
                                    <Link className='link-author' to={``}>
                                        <img src={`https://lh3.googleusercontent.com/a/ALm5wu30nE_WLSzLrZRj67GI-cF5CaueolzIQXCOSD74vg=s96-c`} />
                                        <span>{image?.user_name}</span>
                                    </Link>
                                    <IconButton size="small" color='warning' onClick={() => handleFollowUser(!isFollow)}>
                                        {
                                            isFollow ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize='small' />
                                        }
                                    </IconButton>
                                </div>
                                <h1 className='item-title'>{item?.prompt.split(",")[0]}</h1>
                                <div className='item-action-container'>
                                    <label>Prompt</label>
                                    <div className='item-prompts'>
                                        {
                                            item?.prompt.split(",").map((prompt, key) => (
                                                <p className="item-prompt" key={key}>
                                                    <span className="item-prompt-tag">{prompt}</span>,&nbsp;
                                                </p>
                                            ))
                                        }
                                    </div>
                                    <div className='action-container'>
                                        <Button
                                            variant="outlined"
                                            startIcon={!copyPrompt ? <ContentCopyIcon fontSize='string' /> : <CheckIcon fontSize='string' />}
                                            size='small'
                                            color='warning'
                                            onClick={() => handleCopyPrompt()}>
                                            Copy Prompt
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<AutorenewIcon />}
                                            size='small'
                                            color='warning'
                                            onClick={() => handleRemixImage()}
                                        >
                                            Remix
                                        </Button>
                                        {
                                            false &&
                                            <Button variant="outlined" startIcon={<BorderColorIcon />} size='small' color='warning'>
                                                Edit
                                            </Button>
                                        }
                                    </div>
                                </div>
                            </Item>
                            <Item>
                                <div className='item-details'>
                                    {
                                        item?.width &&
                                        <div className='item-setting'>
                                            <dt>Width</dt>
                                            <dl>{item?.width}</dl>
                                        </div>
                                    }
                                    {
                                        item?.height &&
                                        <div className='item-setting'>
                                            <dt>Height</dt>
                                            <dl>{item?.height}</dl>
                                        </div>
                                    }
                                    {
                                        item?.seed &&
                                        <div className='item-setting'>
                                            <dt>Seed</dt>
                                            <dl>{item?.seed}</dl>
                                        </div>
                                    }
                                    {
                                        item?.guidance_scale &&
                                        <div className='item-setting'>
                                            <dt>Guidance Scale</dt>
                                            <dl>{item?.guidance_scale}</dl>
                                        </div>
                                    }
                                    {
                                        item?.model_id &&
                                        <div className='item-setting'>
                                            <dt>Model</dt>
                                            <dl>{item?.model_id}</dl>
                                        </div>
                                    }
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal >
    </>
}

export default ModalAIItem;