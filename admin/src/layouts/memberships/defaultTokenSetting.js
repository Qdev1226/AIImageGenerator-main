import React, { useState, useEffect, useRef } from 'react';
// @mui material components
import Card from "@mui/material/Card";
import MDButton from 'components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, Radio, RadioGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import TokenIcon from '@mui/icons-material/Token';
import { useDispatch, useSelector } from 'react-redux'
import MDBox from "components/MDBox";
import { rgb } from "chroma-js";

import CustomSnackbar from "components/MDSnackbar/customSnackbar"
import tokenCounts from './tokenCounts'
import { updateFreeTokenCount, } from '../../actions/freeTokenAction'
import { clearAction } from '../../actions/engineAction'

function DefaultTokenSetting() {
    const snapbarRef = useRef();
    const dispatch = useDispatch()
    const defaultTokenCount = useSelector(state => state.defaultTokenCount)
    const [freeToken, setFreeToken] = useState(0)

    useEffect(() => {
        defaultTokenCount.count.count && setFreeToken(defaultTokenCount.count.count)
    }, [defaultTokenCount.count.count])


    useEffect(() => {
        let message = ''
        if (defaultTokenCount.actionType === '') return;
        if (defaultTokenCount.actionType === 'update') {
            message = 'Successfully updated.'
        }
        snapbarRef.current.showSnackbar({
            show: true,
            type: 'success',
            message: message
        });
        dispatch(clearAction())
    }, [defaultTokenCount.refresh])

    const handleFreeTokenOptionChange = (event) => {
        setFreeToken(event.target.value)
    }

    const saveFreeTokenCount = () => {
        dispatch(updateFreeTokenCount({ 'count': freeToken }))
    }

    return (
        < Card >
            <MDBox display="flex" pt={1} px={2}>
                <Grid container>
                    <Grid item lg={10} style={{ display: 'flex' }}>
                        <MDBox
                            variant="gradient"
                            bgColor="info"
                            color="white"
                            coloredShadow="info"
                            borderRadius="xl"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="4rem"
                            height="4rem"
                            mt={-2.5}
                            mr={2}
                        >
                            <TokenIcon fontSize="medium" color="inherit" />
                        </MDBox>
                        <MDBox>
                            <h4 style={{ color: rgb(52, 71, 103) }}>Free tokens</h4>
                            <span style={{ fontSize: 14, color: rgb(123, 128, 154) }}>Set default number of free tokens when user register</span>
                        </MDBox>
                    </Grid>
                    <Grid item lg={2} style={{ textAlign: 'right' }}>
                        <MDBox lineHeight={1.25}>
                            <MDButton variant="contained" color="success" size="small" onClick={saveFreeTokenCount} >
                                <SaveIcon>add</SaveIcon>
                                &nbsp;SAVE
                            </MDButton>
                        </MDBox>
                    </Grid>

                </Grid>
            </MDBox>
            <MDBox pb={2} px={2} pt={2} pl={3}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={freeToken}
                    onChange={handleFreeTokenOptionChange}
                >
                    {
                        tokenCounts && tokenCounts.map((item, index) => (
                            <FormControlLabel key={index} value={item} style={{ marginRight: 24 }} control={<Radio />} label={Number(item).toLocaleString('en-US') + ' tokens'} />
                        ))
                    }
                </RadioGroup>
            </MDBox>
            <CustomSnackbar ref={snapbarRef} />
        </Card >
    );
}

export default DefaultTokenSetting