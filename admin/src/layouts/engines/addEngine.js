/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import FormControl from '@mui/material/FormControl';
import { Container } from 'reactstrap';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MDButton from 'components/MDButton';
import { Grid, Radio, RadioGroup } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

import CustomSnackbar from "components/MDSnackbar/customSnackbar"
import CategorySelect from '../../components/customSelect'
import engineTypes from './engineTypes';

import { useDispatch, useSelector } from 'react-redux'
import { addEngine, updateEngine } from '../../actions/engineAction'

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}


const AddEngine = ({ setOpen, open, currentId, setCurrentId, categories }) => {

  const snapbarRef = useRef();
  const dispatch = useDispatch()
  const [engineData, setEngineData] = useState({ type: '', engine_title: '', res_type: 0, name: '', key1: '', value1: '', api: '', key2: '', value2: '', key3: '', value3: '', category: '' })
  const engine = useSelector((state) => currentId ? state.engines.engines.find((c) => c._id === currentId) : null)
  const [category, setCategory] = useState('')
  const [showResponseType, setShowResponseType] = useState(false)

  useEffect(() => {
    if (engine) {
      engine.engine_title = engineTypes[Number(engine.type)].title
      setEngineData(engine)
      setCategory(engine.category._id)
      if (Number(engine.type) > 1)
        setShowResponseType(true)
      else
        setShowResponseType(false)
    }
  }, [engine])

  const EngineTypeSelect = () => {
    return (
      <>
        <FormControl sx={{ minWidth: 150 }} size="large" fullWidth>
          <InputLabel id="demo-simple-select-label">Select engine type</InputLabel>
          <Select
            labelId="engine-type-select-label"
            id="engine-type-select"
            style={{ marginBottom: '16px' }}
            value={engineData.type}
            label='Select engine type'
            sx={{ height: 36 }}
            onChange={handleEngineTypeChange}
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
              engineTypes && engineTypes.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </>
    );
  }

  const handleSubmitEngine = (e) => {
    e.preventDefault()
    const { name, key1, value1, key2, value2, key3, value3, api, category } = engineData;
    if (name === '' || name === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input name."
      });
      return;
    }

    if (key1 === '' || key1 === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input key1."
      });
      return;
    }

    if (value1 === '' || value1 === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input value1."
      });
      return;
    }

    if (key1 !== '' && key1 !== null && value1 === '' || value1 === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input value1."
      });
      return;
    }

    if (value1 !== '' && value1 !== null && key1 === '' || key1 === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input key1."
      });
      return;
    }

    if (key2 !== '' && key2 !== null && value2 === '' || value2 === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input value2."
      });
      return;
    }

    if (value2 !== '' && value2 !== null && key2 === '' || key2 === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input key2."
      });
      return;
    }

    if ((key3 !== '' && key3 !== null) && (value3 === '' || value3 === null)) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input value3."
      });
      return;
    }

    if ((value3 !== '' && value3 !== null) && (key3 === '' || key3 === null)) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input key3."
      });
      return;
    }

    if (api === '' || api === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input api."
      });
      return;
    }

    if (category === '' || category === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Select a category to belong."
      });
      return;
    }

    if (currentId) {
      dispatch(updateEngine(engineData))
    } else {
      dispatch(addEngine(engineData))
    }

    clear()
    handleClose()
  }

  const clear = () => {
    setCurrentId(null)
    setEngineData({ category: '0', type: '', engine_title: '', res_type: 0, name: '', key1: '', value1: '', key2: '', value2: '', key3: '', value3: '', api: '', category: '' })
    setCategory('')
    setShowResponseType(false)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    setEngineData({ ...engineData, category: event.target.value })
  };

  const handleClose = () => {
    clear()
    setOpen(false)
  };

  const handleEngineTypeChange = (event) => {
    let value = Number(event.target.value)
    if (value > 1)
      setShowResponseType(true)
    else
      setShowResponseType(false)
    setEngineData({ ...engineData, type: event.target.value, engine_title: engineTypes[value].title })
  }

  const handleResponseOptionChange = (event) => {
    setEngineData({ ...engineData, res_type: event.target.value })
  }

  const inputStyle = {
    marginBottom: "16px",
  }

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth="sm">
        <Container style={{ padding: '16px' }}>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {currentId ? 'Edit Engine' : "Add New Engine"}
          </BootstrapDialogTitle>

          <MuiDialogContent style={{ paddingTop: 16 }}>
            <CategorySelect
              fullWidth={true}
              value={category}
              label={'Select category'}
              data={categories}
              showAll={false}
              handleChange={handleCategoryChange}
              style={inputStyle}
            />
            <EngineTypeSelect />
            {
              showResponseType && <FormControl style={{ marginBottom: '8px' }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={engineData.res_type}
                  onChange={handleResponseOptionChange}
                >
                  <FormControlLabel value="0" style={{ marginRight: 24 }} control={<Radio />} label="Get response" />
                  <FormControlLabel value="1" style={{ marginRight: 24 }} control={<Radio />} label="No response" />
                </RadioGroup>
              </FormControl>
            }
            <MDBox>
              <MDInput
                label="Name"
                style={inputStyle}
                value={engineData.name}
                size="small"
                onChange={(e) => setEngineData({ ...engineData, name: e.target.value })}
                fullWidth />
              <Grid container spacing={1}>
                <Grid item xs={6} md={6} lg={6}>
                  <MDInput
                    label="Header key1"
                    style={inputStyle}
                    value={engineData.key1}
                    size="small"
                    onChange={(e) => setEngineData({ ...engineData, key1: e.target.value })}
                    fullWidth />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <MDInput
                    label="Header value1"
                    style={inputStyle}
                    value={engineData.value1}
                    size="small"
                    onChange={(e) => setEngineData({ ...engineData, value1: e.target.value })}
                    fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} md={6} lg={6}>
                  <MDInput
                    label="Header key2"
                    style={inputStyle}
                    value={engineData.key2}
                    size="small"
                    onChange={(e) => setEngineData({ ...engineData, key2: e.target.value })}
                    fullWidth />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <MDInput
                    label="Header value2"
                    style={inputStyle}
                    value={engineData.value2}
                    size="small"
                    onChange={(e) => setEngineData({ ...engineData, value2: e.target.value })}
                    fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} md={6} lg={6}>
                  <MDInput
                    label="Header key3"
                    style={inputStyle}
                    value={engineData.key3}
                    size="small"
                    onChange={(e) => setEngineData({ ...engineData, key3: e.target.value })}
                    fullWidth />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <MDInput
                    label="Header value3"
                    style={inputStyle}
                    value={engineData.value3}
                    size="small"
                    onChange={(e) => setEngineData({ ...engineData, value3: e.target.value })}
                    fullWidth />
                </Grid>
              </Grid>

              <MDInput
                label="Endpoint api"
                style={inputStyle}
                value={engineData.api}
                size="small"
                onChange={(e) => setEngineData({ ...engineData, api: e.target.value })}
                fullWidth />

            </MDBox>
          </MuiDialogContent>
          <MuiDialogActions>
            <MDButton variant="contained" color="success" size="small" onClick={handleSubmitEngine}>
              <SaveIcon>add</SaveIcon>
              &nbsp;SAVE
            </MDButton>
          </MuiDialogActions>
        </Container>
      </Dialog>
      <CustomSnackbar ref={snapbarRef} />
    </>
  );
}

export default AddEngine