// React Hook & Redux  
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

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

// add CategoryTable, Add Category 
import CategoriesTable from './categoriesTable'
import AddCategory from './addCategory'

import { clearAction } from '../../actions/categoryAction'

function Categories() {
  const snapbarRef = useRef();
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const [openDlg, setOpenDlg] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [currentId, setCurrentId] = useState(null);

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

  useEffect(() => {
    let message = ''
    if (categories.actionType === '') return;
    if (categories.actionType === 'add') {
      message = 'Successfully created.'
    } else if (categories.actionType === 'delete') {
      message = 'Successfully deleted.'
    } else if (categories.actionType === 'update') {
      message = 'Successfully updated.'
    }

    snapbarRef.current.showSnackbar({
      show: true,
      type: 'success',
      message: message
    });

    dispatch(clearAction())
  }, [categories.actionType])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox px={2} py={2} display="flex" justifyContent="space-between" alignItems="center">
                <TextField id="outlined-basic" label="Search category name" variant="outlined" size="small" onChange={handleSearchInputChange} />
                <MDButton variant="contained" color="success" size="small" onClick={() => setOpenDlg(!openDlg)}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new category
                </MDButton>
              </MDBox>
              <AddCategory
                open={openDlg}
                setOpen={setOpenDlg}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
              <CategoriesTable
                open={openDlg}
                setOpen={setOpenDlg}
                setCurrentId={setCurrentId}
                searchKey={searchKey} />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <CustomSnackbar ref={snapbarRef} />
    </DashboardLayout>
  );
}

export default Categories;
