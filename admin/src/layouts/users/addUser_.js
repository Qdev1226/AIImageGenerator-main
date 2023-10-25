/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import SaveIcon from '@mui/icons-material/Save';
import MDInput from 'components/MDInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MDButton from 'components/MDButton';
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

import { useDispatch, useSelector } from 'react-redux'
import { addUser, updateUser } from '../../actions/userAction'
import { fetchRoles } from '../../actions/roleAction'
import * as EmailValidator from 'email-validator';
import { Container } from 'reactstrap';

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

const AddUser = ({ setOpen, open, currentId, setCurrentId }) => {
  const snapbarRef = useRef();
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({ name: '', email: '', password: '', confirmPassword: '', userId: '', roleId: null, follow_cnt: 0 })

  const user = useSelector((state) => currentId ? state.users.users.find((c) => c._id === currentId) : null)
  const { roles } = useSelector((state) => state.roles)
  const [role, setRole] = useState('')

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  useEffect(() => {
    dispatch(fetchRoles())
  }, [])

  const handleChange = (event) => {
    setUserData({ ...userData, role_idx: event.target.value })
    setRole(event.target.value);
  };

  const SelectAutoWidth = (props) => {
    const roles = props.roles
    return (
      <div>
        <FormControl variant="standard" sx={{ minWidth: 150, width: '100%' }}>
          <InputLabel id="demo-simple-select-standard-label">Pricing Role</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={role}
            onChange={handleChange}
            label="Price Role"
          >
            {
              roles.map((role, index) => (
                <MenuItem key={index} value={role.index}>
                  {role.role}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    );
  }

  const handleSubmitUser = (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword, roleId } = userData;

    if (name === '') {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Invaild name"
      });
      return;
    }

    if (email === '' || !EmailValidator.validate(email)) {
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Invaild email"
      });
      return;
    }

    if (!currentId) {
      if (password === '' || confirmPassword === '' || password !== confirmPassword) {
        snapbarRef.current.showSnackbar({
          show: true,
          type: 'warning',
          message: "Invaild password"
        });
        return;
      }
    }

    if (currentId) {
      if (roleId === '') {
        snapbarRef.current.showSnackbar({
          show: true,
          type: 'warning',
          message: "Please select roles"
        });
        return;
      }
      const updateData = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role_idx: userData.role_idx,
        follow_cnt: userData.follow_cnt
      }
      dispatch(updateUser(updateData, snapbarRef))
    } else {
      dispatch(addUser(userData, snapbarRef))
    }

    clear()
    handleClose()
  }

  const clear = () => {
    setCurrentId(null)
    setUserData({ name: '', email: '', password: '', confirmPassword: '', roleId: '' })
  }

  const handleClose = () => {
    clear()
    setOpen(false)
  };

  const inputStyle = {
    display: "block",
    marginBottom: "16px",
    width: "100%",
    fontSize: "0.8rem",
    lineHeight: 1.25,
    color: "#55595c",
    border: 'none',
    borderRadius: "3px",
  }

  return (
    <>
      <form>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth >
          <Container style={{ padding: '16px' }}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              {currentId ? 'Edit User' : "Add New User"}
            </BootstrapDialogTitle>
            <MuiDialogContent>
              <div className="customInputs" style={{ paddingTop: '8px' }}>
                <MDInput
                  error={false}
                  style={inputStyle}
                  label="Name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  fullWidth
                />

                <MDInput
                  error={false}
                  style={inputStyle}
                  label="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  fullWidth
                />
                {
                  currentId ? "" :
                    <MDInput
                      style={inputStyle}
                      label="Password"
                      defaultValue=""
                      type="text"
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      fullWidth
                    />
                }
                {
                  currentId ? '' :
                    <MDInput
                      style={inputStyle}
                      label="Confirm Password"
                      type="text"
                      defaultValue=""
                      onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                      fullWidth
                    />
                }
                {
                  currentId ?
                    <MDInput
                      error={false}
                      style={inputStyle}
                      label="Number of Followers"
                      value={userData.follow_cnt}
                      type="number"
                      onChange={(e) => setUserData({ ...userData, follow_cnt: e.target.value })}
                      fullWidth
                    /> : ''
                }
                <SelectAutoWidth
                  roles={roles}
                  style={inputStyle}
                />
              </div>
            </MuiDialogContent>
            <MuiDialogActions>
              <MDButton variant="contained" color="success" size="small" onClick={handleSubmitUser}>
                <SaveIcon>add</SaveIcon>
                &nbsp;SAVE
              </MDButton>
            </MuiDialogActions>
          </Container>
        </Dialog>
        <CustomSnackbar ref={snapbarRef} />
      </form>
    </>
  );
}

export default AddUser