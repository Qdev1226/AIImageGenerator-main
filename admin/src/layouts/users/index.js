// React Hook & Redux  
import { useState, useRef } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';

import MDButton from 'components/MDButton';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

// add UserTable, Add User 
import UsersTable from './usersTable'

function Users() {
  const snapbarRef = useRef();

  const [openDlg, setOpenDlg] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  // const [currentId, setCurrentId] = useState(null);

  if (!localStorage.getItem('token'))
    window.location.href = '/'

  const handleSearchInputChange = (e) => {
    const pattern = /\\/
    if (e.target.value.search(pattern) !== -1) {
      e.preventDefault()
      snapbarRef.current.showSnackbar({
        show: true,
        type: 'warning',
        message: "Search text should not contain \\ letter"
      });
      return
    }
    setSearchKey(e.target.value)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox>
                <MDBox px={2} py={2} display="flex" justifyContent="space-between" alignItems="center">
                  <TextField id="outlined-basic" label="Search Name, Email" variant="outlined" size="small" onChange={handleSearchInputChange} />
                </MDBox>
                <UsersTable
                  open={openDlg}
                  setOpen={setOpenDlg}
                  // setCurrentId={setCurrentId}
                  searchKey={searchKey} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <CustomSnackbar ref={snapbarRef} />
    </DashboardLayout>
  );
}

export default Users;
