import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImageList, ImageListItem } from '@mui/material';

import { searchImgsByKey, getImageById } from "../../actions/imgAction";
import ModalAIItem from '../../components/ModalAIItem';
import styles from './homepage.module.css';

export default function Homepage() {
    // Use Redux
    const dispatch = useDispatch()
    const authObj = useSelector(state => state.auth)
    const image = useSelector(state => state.img)

    // States
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Redirect Module
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(searchImgsByKey(image.imgSchKeyword));
    }, [])

    /**
     * @description
     *  Show Image Detail Modal
     */
    const handleImage = (imgItem) => {
        setDetailModalOpen(true);
        setSelectedItem(imgItem);

        dispatch(getImageById({ imageId: imgItem._id }));
    }

    /**
     * @description
     *  If logged in go to studio page, not go to login page.
     */
    const handleRemixImage = (prompt) => {
        if (authObj.isAuthenticated) {
            navigate('/create?prompt=' + prompt);
        } else {
            navigate('/signin');
        }
    }

    return (<>
        <ImageList variant="masonry" cols={5} gap={10} style={{ margin: '10px' }}>
            {image?.images?.map((item, key) => (
                <ImageListItem key={key} className={styles.imagelistitem} onClick={() => { handleImage(item) }}>
                    <img
                        src={`${item.url}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.name}
                        loading="lazy"
                    />
                    {/* <ImageListItemBar
                        title={item.user_name}
                        subtitle={item.name}
                        className={styles.imgdesc}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.user_name}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    /> */}
                </ImageListItem>
            ))}
        </ImageList>
        <ModalAIItem open={detailModalOpen} onClose={() => setDetailModalOpen(false)} item={selectedItem} remixImage={prompt => handleRemixImage(prompt)} />
    </>
    );
}