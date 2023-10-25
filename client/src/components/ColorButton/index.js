import { Button } from '@mui/material';

import { styled } from '@mui/material/styles';

const ClrButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#5c22c6'),
    backgroundColor: '#5c22c6',
    '&:hover': {
        backgroundColor: '#481ca3',
    },
}));

const ColorButton = (props) => {
    return <>
        <ClrButton variant="contained" onClick={props.handle}>
            <span>{props.name}</span>
        </ClrButton>
    </>
}

export default ColorButton;