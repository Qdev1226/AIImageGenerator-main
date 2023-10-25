/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import { Container } from 'reactstrap';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MDButton from 'components/MDButton';
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

import { useDispatch, useSelector } from 'react-redux'
import { addCategory, updateCategory } from '../../actions/categoryAction'

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

const AddCategory = ({ setOpen, open, currentId, setCurrentId }) => {
  const snapbarRef = useRef();
  const dispatch = useDispatch()

  const [categoryData, setCategoryData] = useState({ name: '' })

  const category = useSelector((state) => currentId ? state.categories.categories.find((c) => c._id === currentId) : null)

  useEffect(() => {
    if (category) {
      setCategoryData(category)
    }
  }, [category])

  const handleSubmitCategory = (e) => {
    e.preventDefault()
    const { name } = categoryData;

    if (name === '') {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Type category name..."
      });
      return;
    }

    if (currentId) {
      const updateData = {
        _id: categoryData._id,
        name: name
      }
      dispatch(updateCategory(updateData))
    } else {
      dispatch(addCategory(categoryData))
    }

    clear()
    handleClose()
  }

  const clear = () => {
    setCurrentId(null)
    setCategoryData({ name: '' })
  }

  const handleClose = () => {
    clear()
    setOpen(false)
  };

  const inputStyle = {
    marginBottom: "14px",
  }

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth="sm">
        <Container style={{ padding: '16px' }}>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {currentId ? 'Edit Category' : "Add New Category"}
          </BootstrapDialogTitle>

          <MuiDialogContent>
            <MDBox mt={3}>
              <MDInput
                label="Type category name..."
                style={inputStyle}
                value={categoryData.name}
                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                fullWidth />
            </MDBox>
          </MuiDialogContent>
          <MuiDialogActions>
            <MDButton variant="contained" color="success" size="small" onClick={handleSubmitCategory}>
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

export default AddCategory