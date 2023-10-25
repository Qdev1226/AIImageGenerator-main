/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import { Grid } from '@mui/material';
import { Container } from 'reactstrap';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MDButton from 'components/MDButton';
import CustomSnackbar from "components/MDSnackbar/customSnackbar"
import CategorySelect from '../../components/customSelect'
import EngineSelect from '../../components/customSelect'

import { useDispatch, useSelector } from 'react-redux'
import { addModel, updateModel } from '../../actions/modelAction'

import defaultImg from './default.png'
const { Uploader } = require("uploader");

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

const AddModel = ({ setOpen, open, currentId, setCurrentId, categories, engines }) => {
  const snapbarRef = useRef();
  const dispatch = useDispatch()
  const [modelData, setModelData] = useState({ category: '', engine: '', name: '', description: '', system_content: '', user_content: '', assistant_content: '', tool_logo: defaultImg })
  const model = useSelector((state) => currentId ? state.models.models.find((c) => c._id === currentId) : null)

  const [category, setCategory] = useState('')
  const [engine, setEngine] = useState('')
  const [contentDisabled, setContentDisabled] = useState(false)
  const [matchedEngines, setMatchedEngines] = useState([])

  useEffect(() => {
    if (model) {
      let res = engines.filter((c) => model.category._id === c.category._id)
      setMatchedEngines(res)

      setModelData(model)
      setCategory(model.category._id)
      setEngine(model.engine._id)
    }
  }, [model])

  const handleSubmitModel = (e) => {
    e.preventDefault()
    const { category, engine, name, description, system_content, user_content, assistant_content } = modelData;

    if (category === '' || category === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Select a category to belong."
      });
      return;
    }

    if (engine === '' || engine === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Select a engine to belong."
      });
      return;
    }

    if (name === '' || name === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input name."
      });
      return;
    }

    if (description === '' || description === null) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Input description."
      });
      return;
    }

    if (contentDisabled === false) {
      if (system_content === '' || system_content === null) {
        snapbarRef.current.showSnackbar({
          show: true,
          type: 'warning',
          message: "Input system content."
        });
        return;
      }

      if (assistant_content === '' || assistant_content === null) {
        snapbarRef.current.showSnackbar({
          show: true,
          type: 'warning',
          message: "Input assistant content."
        });
        return;
      }
    }

    if (currentId) {
      dispatch(updateModel(modelData))
    } else {
      dispatch(addModel(modelData))
    }

    clear()
    handleClose()
  }

  const clear = () => {
    setCurrentId(null)
    setModelData({ category: '', engine: '', name: '', description: '', system_content: '', user_content: '', assistant_content: '', tool_logo: defaultImg })
    setEngine('')
    setCategory('')
    setMatchedEngines([])
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    setModelData({ ...modelData, category: event.target.value })
    let res = engines.filter((c) => event.target.value === c.category._id)
    setMatchedEngines(res)
  };

  const handleEngineChange = (event) => {
    setEngine(event.target.value)
    setModelData({ ...modelData, engine: event.target.value })
    let engines = matchedEngines.filter((c) => event.target.value === c._id)
    Number(engines[0].type) <= 1 ? setContentDisabled(false) : setContentDisabled(true)
  };

  const handleClose = () => {
    clear()
    setOpen(false)
  };

  const inputStyle = {
    marginBottom: "16px",
  }

  // Get production API keys from Upload.io
  const uploader = Uploader({
    apiKey: "free"
  });

  const handleUpload = () => {
    uploader.open({ multi: true }).then(files => {
      files.map(f => setModelData({ ...modelData, tool_logo: f.fileUrl }))
    }).catch(err => {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'error',
        message: err
      });
    });
  }

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth="sm">
        <Container style={{ padding: '0 16px' }}>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {currentId ? 'Edit Model' : "Add New Model"}
          </BootstrapDialogTitle>
          <MuiDialogContent>
            <MDBox mt={1}>
              <CategorySelect
                style={inputStyle}
                fullWidth={true}
                value={category}
                data={categories}
                label={'Select category'}
                handleChange={handleCategoryChange}
                showAll={false}
              />
              <EngineSelect
                data={matchedEngines}
                value={engine}
                style={inputStyle}
                fullWidth={true}
                label={'Select engine'}
                handleChange={handleEngineChange}
                showAll={false} />
              <MDInput
                label="Name"
                style={inputStyle}
                value={modelData.name}
                size="small"
                onChange={(e) => setModelData({ ...modelData, name: e.target.value })}
                fullWidth />
              <MDInput
                label="Description"
                style={inputStyle}
                value={modelData.description}
                multiline
                rows={3}
                onChange={(e) => setModelData({ ...modelData, description: e.target.value })}
                fullWidth
              />
              <MDBox>
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={5} style={{ textAlign: 'center' }}>
                    <img width={200} height={160} src={modelData.tool_logo} style={{ borderRadius: '12px' }} /><br />
                    <MDButton variant="contained" color="info" size="small" onClick={handleUpload} style={{ marginTop: '4px' }}>
                      <UploadIcon fontSize='large'></UploadIcon>&nbsp;&nbsp; upload image
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <MDInput
                      label="System content"
                      style={inputStyle}
                      value={modelData.system_content}
                      multiline
                      rows={3}
                      onChange={(e) => setModelData({ ...modelData, system_content: e.target.value })}
                      fullWidth
                      disabled={contentDisabled}
                    />
                    <MDInput
                      label="User content"
                      style={inputStyle}
                      value={modelData.user_content}
                      multiline
                      rows={3}
                      onChange={(e) => setModelData({ ...modelData, user_content: e.target.value })}
                      fullWidth
                      disabled={contentDisabled}
                    />
                    <MDInput
                      label="Assistant content"
                      value={modelData.assistant_content}
                      multiline
                      rows={3}
                      onChange={(e) => setModelData({ ...modelData, assistant_content: e.target.value })}
                      fullWidth
                      disabled={contentDisabled}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </MuiDialogContent>
          <MuiDialogActions>
            <MDButton variant="contained" color="success" size="small" onClick={handleSubmitModel}>
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

export default AddModel