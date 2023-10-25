/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import { Container } from 'reactstrap';
import { Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MDButton from 'components/MDButton';
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

import { useDispatch, useSelector } from 'react-redux'
import { addFilter, updateFilter } from '../../actions/filterAction'

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

const AddFilter = ({ setOpen, open, currentId, setCurrentId }) => {
  const snapbarRef = useRef();
  const dispatch = useDispatch()

  const [filterData, setFilterData] = useState({ name: '', prompt: '', avatar: defaultImg })

  const filter = useSelector((state) => currentId ? state.filters.filters.find((c) => c._id === currentId) : null)

  useEffect(() => {
    if (filter) {
      setFilterData(filter)
    }
  }, [filter])

  // Get production API keys from Upload.io
  const uploader = Uploader({
    apiKey: "free"
  });

  const handleUpload = () => {
    uploader.open({ multi: true }).then(files => {
      if (files.length === 0) {
        snapbarRef.current.showSnackbar({
          show: true,
          type: 'warning',
          message: "No files selected."
        });
      } else {
        files.map(f => setFilterData({ ...filterData, avatar: f.fileUrl }))
      }
    }).catch(err => {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'error',
        message: err
      });
    });
  }

  const handleSubmitFilter = (e) => {
    e.preventDefault()
    const { name, prompt, avatar } = filterData;

    if (name === '') {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Type filter name..."
      });
      return;
    }

    if (prompt === '') {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Type prompt name..."
      });
      return;
    }

    if (currentId) {
      const updateData = {
        _id: filterData._id,
        name: name,
        prompt: prompt,
        avatar: avatar
      }
      dispatch(updateFilter(updateData, snapbarRef))
    } else {
      dispatch(addFilter(filterData, snapbarRef))
    }

    clear()
    handleClose()
  }

  const clear = () => {
    setCurrentId(null)
    setFilterData({ name: '', prompt: '', avatar: defaultImg })
  }

  const handleClose = () => {
    clear()
    setOpen(false)
  };

  const inputStyle = {
    marginBottom: "14px",
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth="md">
      <Container style={{ padding: '16px' }}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {currentId ? 'Edit Filter' : "Add New Filter"}
        </BootstrapDialogTitle>

        <MuiDialogContent>
          <MDBox mt={3}>
            <Grid container spacing={2} >
              <Grid item xs={12} lg={4} style={{ textAlign: 'center' }}>
                <img width={200} height={160} src={filterData.avatar} style={{ borderRadius: '12px' }} /><br />
                <MDButton variant="contained" color="info" size="small" onClick={handleUpload} style={{ marginTop: '4px' }}>
                  <UploadIcon fontSize='large'></UploadIcon>&nbsp;&nbsp; upload image
                </MDButton>
              </Grid>
              <Grid item xs={12} lg={8}>
                <MDInput
                  label="Type filter name..."
                  style={inputStyle}
                  value={filterData.name}
                  onChange={(e) => setFilterData({ ...filterData, name: e.target.value })}
                  fullWidth />
                <MDInput
                  label="Type prompt content..."
                  style={inputStyle}
                  value={filterData.prompt}
                  onChange={(e) => setFilterData({ ...filterData, prompt: e.target.value })}
                  fullWidth
                  multiline rows={6} />
                <MDButton variant="contained" color="success" size="small" onClick={handleSubmitFilter} style={{ float: 'right' }}>
                  <SaveIcon>add</SaveIcon>
                  &nbsp;SAVE
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </MuiDialogContent>
      </Container>
      <CustomSnackbar ref={snapbarRef} />
    </Dialog>
  );
}

export default AddFilter