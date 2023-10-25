import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { primaryBackColor, primaryBtnColor } from '../../stylesheets/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: primaryBackColor,
    '&:hover': {
        backgroundColor: primaryBtnColor,
    },
}));

export default function CustomizedButtons(props) {
    return (
        <ColorButton variant="contained">{props.btnName}</ColorButton>
    );
}