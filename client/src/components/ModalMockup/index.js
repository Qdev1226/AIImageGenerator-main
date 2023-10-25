import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { experimentalStyled as styled } from '@mui/material/styles';
import { Modal, Backdrop, Box, Fade, Grid, Paper, Divider, Stack, Alert, AlertTitle } from '@mui/material';

import { mockupImage } from '../../actions/mockupAction';
import { MOCKUP_IMG_INITIAL, MOCKUP_IMG_START, MOCKUP_IMG_SUCCESS, MOCKUP_IMG_FAILED_GET, MOCKUP_IMG_FAILED_MAKE } from '../../actions/config';

import OptSelect from '../../components/OptSelect';
import OptSlider from '../OptSlider';
import ColorButton from '../ColorButton';
import { primaryBtnColor } from '../../stylesheets/colors';
import PendingImgItem from '../PendingImgItem';
import './mockupmodal.scss';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#2a2f3538',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const MockupModal = (props) => {
    // Props
    const { open, onClose, item } = props;

    // Redux
    const dispatch = useDispatch();
    const authObj = useSelector(state => state.authObj)
    const mockupObj = useSelector(state => state.mockupObj)

    // States
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState(1);                  // Colum count to show image.
    const [mockupTypeIdx, setMockupTypeIdx] = useState(0);            // MockupType Index
    const [mockupImgs, setMockupImgs] = useState([]);
    const [mockupTypes, setMockupTypes] = useState([]);
    const [mockupState, setMockupState] = useState(MOCKUP_IMG_INITIAL);

    useEffect(() => {
        // Rearrange the mockuptypes
        var mockupTypeArr = [];
        var length = tempMockupTypes.length;
        for (var i = 0; i < length; i++) {
            mockupTypeArr.push({ value: i, name: tempMockupTypes[i].productName });
        }
        setMockupTypes(mockupTypeArr);
    }, []);

    useEffect(() => {
        console.log(mockupObj.mockups);
        console.log(loading);
        setMockupImgs(mockupObj?.mockups);
        setMockupState(mockupObj?.state);
    }, [mockupObj]);

    /**
     * @description
     *  Mock up image using mockup Type and give image.
     */
    const mockupImageByType = () => {
        console.log('--- mockupImageByType ---', mockupTypeIdx);
        try {
            dispatch(mockupImage(tempMockupTypes[mockupTypeIdx], item.url));
        } catch (err) {
            console.log(err);
        }
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
                <Box className="mockup-modal">
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid className='left-bar' item xs={12} sm={6} md={4} lg={3}>
                            <Item>
                                <div className='origin-image'>
                                    <img className='' src={item.url} />
                                </div>
                                <div className='option-container'>
                                    <OptSelect
                                        htmlfor={`mockuptype`}
                                        labelstr={`Mockup Type`}
                                        options={mockupTypes}
                                        value={mockupTypeIdx}
                                        onChange={(typeIdx) => setMockupTypeIdx(typeIdx)}
                                    />
                                </div>
                                <OptSlider
                                    min={1}
                                    max={6}
                                    label={`Columns`}
                                    color={primaryBtnColor}
                                    // disabled={(authObj?.user?.role_idx === 1 || authObj?.user?.role_idx === 2) ? false : true}
                                    value={columns}
                                    onChange={(value) => setColumns(value)}
                                />
                                <Divider />
                                <div className='option-generate'>
                                    <ColorButton variant="contained" name={`Print to T-shirt`} handle={() => mockupImageByType()} />
                                </div>
                            </Item>
                        </Grid>
                        <Grid className='right-bar' item xs={12} sm={6} md={8} lg={9}>
                            <Item>
                                {
                                    mockupState == MOCKUP_IMG_INITIAL &&
                                    <Stack sx={{ width: '70%', textAlign: 'left', marginLeft: '15%', marginTop: '5%' }}>
                                        <Alert severity="info">
                                            <AlertTitle>Mock up</AlertTitle>
                                            Press <strong>PRINT TO T-SHIRT</strong> button!
                                        </Alert>
                                    </Stack>
                                }
                                <div className='loading-field'>
                                    {
                                        mockupState == MOCKUP_IMG_START &&
                                        <PendingImgItem />
                                    }
                                </div>
                                {
                                    (mockupState == MOCKUP_IMG_FAILED_MAKE || mockupState == MOCKUP_IMG_FAILED_GET) &&
                                    <Stack sx={{ width: '70%', textAlign: 'left', marginLeft: '15%', marginTop: '5%' }}>
                                        <Alert severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            Printing mockup image is failed. — <strong>Try it again!</strong>
                                        </Alert>
                                    </Stack>
                                }
                                <div className='result-field' style={{ gridTemplateColumns: `repeat(${columns}, minmax(0px, 1fr))` }}>
                                    {
                                        mockupState == MOCKUP_IMG_SUCCESS &&
                                        mockupImgs?.map((mockupImg, key) => <img className='' src={mockupImg.mockup_url} key={key} />)
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

const tempMockupTypes = [{
    productName: "Men's shirt",
    productId: 71,
    variantIds: [4012, 4013, 4014, 4017, 4018, 4019],
    front: true,
    back: true
}, {
    productName: "Men's shirt (All-over shirts)",
    productId: 276,
    variantIds: [9050, 9053, 9052, 9050],
    front: true,
    back: true
},
// {
//     productName: "Men's shirt (Polo shirts)",
//     productId: 340,
//     variantIds: [15436, 9905, 15435, 9904],
//     front: true,
//     back: true
// }, 
{
    productName: "Men's shirt (Tank tops)",
    productId: 365,
    variantIds: [10402, 10442, 10427, 10397],
    front: true,
    back: true
},
{
    productName: "Men's shirt (3/4 sleeve shirts)",
    productId: 233,
    variantIds: [8159, 8162, 8321, 8331],
    front: true,
    back: false
},
{
    productName: "Men's shirt (Long sleeve shirts)",
    productId: 57,
    variantIds: [3457, 3458, 3459, 3458],
    front: true,
    back: true
},
{
    productName: "Men's shirt (Embroidered shirts)",
    productId: 12,
    variantIds: [565, 567, 566, 474],
    front: true,
    back: true
},
{
    productName: "Men's Jackets & vests",
    productId: 390,
    variantIds: [10878, 10879, 10881, 10877],
    front: true,
    back: true
},
// {
//     productName: "Mens' Hoodies & sweatshirts (Hoodies)",
//     productId: 475,
//     variantIds: [12320, 12299, 12319, 12299],
//     front: false,
//     back: true
// }, 
{
    productName: "Men's Hoodies & sweatshirts (Sweatshirts)",
    productId: 411,
    variantIds: [11258, 11261, 11256, 11247],
    front: true,
    back: true
},
// {
//     productName: "Men's Bottoms (Sweatpaints & joggers)",
//     productId: 412,
//     variantIds: [11269, 11280, 11278, 11267],
//     front: true,
//     back: true
// }, 
{
    productName: "Men's Bottoms (Underwear)",
    productId: 428,
    variantIds: [11446, 11447, 11448, 11448],
    front: true,
    back: false
},
// {
//     productName: "Men's Bottoms (Leggings)",
//     productId: 288,
//     variantIds: [9147, 9146, 9146, 9146],
//     front: true,
//     back: true
// }, 
{
    productName: "Men's Bottoms (Shorts)",
    productId: 571,
    variantIds: [14642, 14641, 14639, 14640],
    front: true,
    back: true
},
{
    productName: "Men's Bottoms (Pants)",
    productId: 604,
    variantIds: [15516, 15522, 15518, 15518],
    front: true,
    back: true
},
{
    productName: "Men's Swimwear",
    productId: 571,
    variantIds: [14642, 14641, 14639, 14640],
    front: true,
    back: true
},
{
    productName: "Women's Shirts (T-shirts)",
    productId: 110,
    variantIds: [4903, 4906, 4898, 4948],
    front: true,
    back: true
},
// {
//     productName: "Women's Shirts (All-over shirts)",
//     productId: 261,
//     variantIds: [8885, 8888, 8885, 8889],
//     front: true,
//     back: true
// }, 
{
    productName: "Women's Shirts (Tank tops)",
    productId: 163,
    variantIds: [6678, 6655, 6666, 6681],
    front: true,
    back: true
},
{
    productName: "Women's Shirts (Cropt tops)",
    productId: 187,
    variantIds: [7319, 7320, 7317, 7320],
    front: true,
    back: true
},
{
    productName: "Women's Shirt (Embroidered shirts)",
    productId: 110,
    variantIds: [4903, 4906, 4898, 4948],
    front: true,
    back: true
},
// {
//     productName: "Women's Shirt (3/4 sleeve shirts)",       // this is man.
//     productId: 233,
//     variantIds: [8315, 8159, 8162, 8321],
//     front: true,
//     back: false
// },
{
    productName: "Women's Shirt (Long sleeve shirts)",
    productId: 302,
    variantIds: [9339, 9335, 9335, 9333],
    front: true,
    back: true
},
{
    productName: "Women's Dresses",
    productId: 589,
    variantIds: [15105, 15110, 15108, 15104],
    front: true,
    back: true
}, 
{
    productName: "Women's Swimwear",
    productId: 272,
    variantIds: [9014, 9016, 9014, 9020],
    front: true,
    back: true
},
{
    productName: "Women's Sports bras",
    productId: 387,
    variantIds: [10859, 10859, 10865, 10859],
    front: true,
    back: true
},
{
    productName: "Women's Hoodies & sweatshirts (Hoodies)",
    productId: 317,
    variantIds: [9646, 9648, 9633, 9643],
    front: true,
    back: true
}, 
{
    productName: "Women's Hoodies & sweatshirts (Sweatshirts)",     // This is a man.
    productId: 316,
    variantIds: [10151, 9625, 10149, 10152],
    front: true,
    back: true
},
{
    productName: "Women's Jackets & vests",
    productId: 619,
    variantIds: [15801, 15796, 15802, 15798],
    front: true,
    back: true
}, 
// {
//     productName: "Women's Bottoms (Sweatpants & joggers)",   // This is man.
//     productId: 618,
//     variantIds: [15746, 15754, 15744, 15745],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Women's Bottoms (Leggings)",
//     productId: 460,
//     variantIds: [11954, 11957, 11955, 11959],
//     front: true,
//     back: true
// }, 
{
    productName: "Women's Bottoms (Skirts)",
    productId: 314,
    variantIds: [9610, 9606, 9606, 9612],
    front: true,
    back: true
},
{
    productName: "Women's Bottoms (Shorts)",
    productId: 330,
    variantIds: [9805, 9805, 9805, 9807],
    front: true,
    back: true
}, 
{
    productName: "Women's Bottoms (Pants)",     // Not Woman
    productId: 604,
    variantIds: [15516, 15516, 15516, 15522],
    front: true,
    back: true
},
// {
//     productName: "Women's Robes",
//     productId: 527,
//     variantIds: [13305, 13305, 13306],
//     front: true,
//     back: true
// }, 
{
    productName: "Kids & youth's' All kids & youth clothing",
    productId: 511,
    variantIds: [12863, 12869, 12855, 12854],
    front: true,
    back: true
},
{
    productName: "Kids&youth's Shirts (T-shirts)",
    productId: 306,
    variantIds: [9425, 9421, 9418, 10301],
    front: true,
    back: true
}, {
    productName: "Kids&youth's Shirts (All-over shirts)",
    productId: 385,
    variantIds: [10829, 10826, 10824, 10826],
    front: true,
    back: true
}, {
    productName: "Kids&youth's Shirts (3/4 sleeve shirts)",
    productId: 453,
    variantIds: [11778, 11779],
    front: true,
    back: true
}, {
    productName: "Kids&youth's Shirts (Long sleeve shirts)",
    productId: 511,
    variantIds: [12863, 12869, 12855, 12854],
    front: true,
    back: true
},
// {
//     productName: "Kids&youth's Jackets",
//     productId: 436,
//     variantIds: [11524, 11527, 11528, 11527],
//     front: true,
//     back: true
// }, 
{
    productName: "Kids&youth's Hoodles",
    productId: 370,
    variantIds: [10473, 10502, 10481, 10502],
    front: true,
    back: true
},
// {
//     productName: "Kids&youth's Hats",
//     productId: 429,
//     variantIds: [11458, 11458, 11456, 11459],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Kids&youth's Leggings",
//     productId: 322,
//     variantIds: [9697, 9701, 9701, 9698],
//     front: true,
//     back: true
// }, 
{
    productName: "Kids&youth's Body bodysuits",
    productId: 308,
    variantIds: [9439, 9441, 10333, 9450],
    front: true,
    back: true
},
// {
//     productName: "Kids&youth's Swimwear",
//     productId: 346,
//     variantIds: [9973, 9973, 9977, 9973],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Hats's All hats (Beanies)",
//     productId: 81,
//     variantIds: [4522, 4522, 4522, 4522],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Hats's All hats (Dad hats)",
//     productId: 491,
//     variantIds: [12691, 12690, 12689, 12692],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Hats's All hats (Snapbacks)",
//     productId: 99,
//     variantIds: [4802, 4807, 4792, 7842],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Hats's All hats (Trucker hats)",
//     productId: 100,
//     variantIds: [4813, 4812, 4812, 4819],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Hats's All hats (5-panel hats)",
//     productId: 92,
//     variantIds: [4627, 4622, 4628, 4623],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Hats's All hats (Mesh hats)",
//     productId: 252,
//     variantIds: [8749, 8747, 8747, 8754],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Hats's All hats (Bucket hats)",
//     productId: 379,
//     variantIds: [10735, 10735, 10735, 10735],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Hats's All hats (Visors)",
//     productId: 265,
//     variantIds: [8913, 8916, 8913, 8913],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Accessories's Patches",
//     productId: 516,
//     variantIds: [15560, 12983, 12981, 12981],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Accessories's Bags",
//     productId: 262,
//     variantIds: [8894, 8894, 8894, 8894],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Accessories's Hair accessories",
//     productId: 545,
//     variantIds: [13082, 13082, 13082, 13082, 13082],
//     front: true,
//     back: true
// }, 
{
    productName: "Accessories's Face masks",
    productId: 630,
    variantIds: [16033, 16033, 16033, 16032],
    front: true,
    back: false
},
// {
//     productName: "Accessories's Foot wear",
//     productId: 502,
//     variantIds: [12679, 12679, 12678, 12674],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Accessories's Tech accessories",
//     productId: 181,
//     variantIds: [11703, 13427, 11704, 9621],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Home&living's Puzzles",
//     productId: 534,
//     variantIds: [13432, 13432, 13432, 13432],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Home&living's Wall art",
//     productId: 588,
//     variantIds: [15137, 15137, 15137, 15134],
//     front: true,
//     back: true
// }, 
{
    productName: "Home&living's Home decor",
    productId: 645,
    variantIds: [16270, 16270, 16270, 16270],
    front: true,
    back: false
},
// {
//     productName: "Home&living's Drinkware&coasters",
//     productId: 19,
//     variantIds: [1320, 4830, 1320, 1320],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Home&living's Stationery",
//     productId: 518,
//     variantIds: [13097, 13097, 13097, 13097],
//     front: true,
//     back: true
// }, 
// {
//     productName: "Home&living's Aprons",
//     productId: 297,
//     variantIds: [9286, 9287, 9286, 9287],
//     front: true,
//     back: true
// }, 
{
    productName: "Home&living's Fabrics",
    productId: 524,
    variantIds: [13217, 13217, 13217, 13217],
    front: true,
    back: false
},
// {
//     productName: "Home&living's Towels",
//     productId: 259,
//     variantIds: [8874, 8874, 8874, 8874],
//     front: true,
//     back: true
// }, 
{
    productName: "Home&living's Pet products",
    productId: 630,
    variantIds: [16033, 16033, 16033, 16032],
    front: true,
    back: false
}];

export default MockupModal;