import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const CustomSelect = (props) => {
    return (
        <>
            <FormControl sx={{ minWidth: 150 }} size="large" fullWidth={props.fullWidth}>
                <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.value}
                    label={props.label}
                    sx={{ height: 36 }}
                    style={props.style}
                    onChange={props.handleChange}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                '& .MuiMenuItem-root': {
                                    padding: 1,
                                },
                                'border': '1px solid #ccc',
                                'height': '200px',
                                'overflowY': 'auto'
                            },
                        },
                    }}
                >
                    {
                        props.showAll &&
                        <MenuItem key='-1' value={'-1'}>All</MenuItem>
                    }
                    {
                        props.data && props.data.map((item, index) => (
                            <MenuItem key={index} value={item._id}>
                                {item.name}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </>
    );
}

export default CustomSelect