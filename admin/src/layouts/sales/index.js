// React Hook & Redux  
import { useState, useRef } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

// add SaleTable, Add Sale 
import SalesTable from './salesTable'

function Sales() {
  const snapbarRef = useRef();
  
  const [openDlg, setOpenDlg] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  
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
                  <TextField id="outlined-basic" label="Name, Email" variant="outlined" size="small" onChange={handleSearchInputChange}/>
                </MDBox>
                <SalesTable 
                  open={openDlg}
                  setOpen={setOpenDlg}
                  searchKey={searchKey}/>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <CustomSnackbar ref={snapbarRef} />
    </DashboardLayout>
  );
}

export default Sales;
