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

// add EngineTable, Add Engine 
import EnginesTable from './enginesTable'
import AddEngine from './addEngine'
import CategorySelect from '../../components/customSelect'

import { clearAction } from '../../actions/engineAction'

import { fetchAllCategories } from '../../actions/categoryAction';

function Engines() {
  const snapbarRef = useRef();
  const categories = useSelector(state => state.categories)
  const engines = useSelector(state => state.engines)
  const dispatch = useDispatch()

  const [openDlg, setOpenDlg] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [currentId, setCurrentId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('-1')

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
    dispatch(fetchAllCategories())
  }, [])

  useEffect(() => {
    let message = ''
    if (engines.actionType === '') return;
    if (engines.actionType === 'add') {
      message = 'Successfully created.'
    } else if (engines.actionType === 'delete') {
      message = 'Successfully deleted.'
    } else if (engines.actionType === 'update') {
      message = 'Successfully updated.'
    }

    snapbarRef.current.showSnackbar({
      show: true,
      type: 'success',
      message: message
    });

    dispatch(clearAction())
  }, [engines.refresh])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox px={2} py={2}>
                <MDBox display="flex" style={{ float: 'left' }}>
                  <CategorySelect data={categories.categories} handleChange={handleCategoryChange} value={selectedCategory} label={'Show categories'} showAll={true} />
                  <TextField id="outlined-basic" label="Search engine name" variant="outlined" style={{ marginLeft: 8 }} size="small" onChange={handleSearchInputChange} />
                </MDBox>
                <MDButton style={{ float: 'right' }} variant="contained" color="success" size="small" onClick={() => setOpenDlg(!openDlg)}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new engine
                </MDButton>
              </MDBox>
              <AddEngine
                open={openDlg}
                setOpen={setOpenDlg}
                currentId={currentId}
                setCurrentId={setCurrentId}
                categories={categories.categories}
              />
              <EnginesTable
                open={openDlg}
                setOpen={setOpenDlg}
                setCurrentId={setCurrentId}
                searchKey={searchKey}
                selectedCategory={selectedCategory} />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <CustomSnackbar ref={snapbarRef} />
    </DashboardLayout>
  );
}

export default Engines;
