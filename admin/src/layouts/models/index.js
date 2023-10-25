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

// add ModelTable, Add Model 
import ModelsTable from './modelsTable'
import AddModel from './addModel'
import CategorySelect from '../../components/customSelect'
import EngineSelect from '../../components/customSelect'

import { clearAction } from '../../actions/modelAction'

import { fetchAllCategories } from '../../actions/categoryAction';
import { fetchAllEngines } from '../../actions/engineAction';

function Models() {
  const snapbarRef = useRef();
  const dispatch = useDispatch()

  // initialize categories, engines, models data
  const categories = useSelector(state => state.categories)
  const engines = useSelector(state => state.engines)
  const models = useSelector(state => state.models)

  const [openDlg, setOpenDlg] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [currentId, setCurrentId] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState('-1')
  const [selectedCategory, setSelectedCategory] = useState('-1')
  const [matchedEngines, setMatchedEngines] = useState([])

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
    dispatch(fetchAllEngines())
  }, [])

  useEffect(() => {
    let message = ''
    if (models.actionType === '') return;
    if (models.actionType === 'add') {
      message = 'Successfully created.'
    } else if (models.actionType === 'delete') {
      message = 'Successfully deleted.'
    } else if (models.actionType === 'update') {
      message = 'Successfully updated.'
    }

    snapbarRef.current.showSnackbar({
      show: true,
      type: 'success',
      message: message
    });

    dispatch(clearAction())
  }, [models.refresh])

  const handleEngineChange = (e) => {
    setSelectedEngine(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    let res = engines.engines.filter((c) => e.target.value === c.category._id)
    setSelectedEngine('-1')
    setMatchedEngines(res)
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
                  <CategorySelect data={categories.categories} handleChange={handleCategoryChange} value={selectedCategory} label={'Show categories'} showAll={true} />&nbsp;&nbsp;
                  <EngineSelect data={matchedEngines} handleChange={handleEngineChange} value={selectedEngine} label={'Show engines'} showAll={true} />
                  <TextField id="outlined-basic" label="Search model name" variant="outlined" style={{ marginLeft: 8 }} size="small" onChange={handleSearchInputChange} />
                </MDBox>
                <MDButton style={{ float: 'right' }} variant="contained" color="success" size="small" onClick={() => setOpenDlg(!openDlg)}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new model
                </MDButton>
              </MDBox>
              <AddModel
                open={openDlg}
                setOpen={setOpenDlg}
                currentId={currentId}
                setCurrentId={setCurrentId}
                categories={categories.categories}
                engines={engines.engines}
              />
              <ModelsTable
                open={openDlg}
                setOpen={setOpenDlg}
                setCurrentId={setCurrentId}
                searchKey={searchKey}
                selectedCategory={selectedCategory}
                selectedEngine={selectedEngine} />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <CustomSnackbar ref={snapbarRef} />
    </DashboardLayout>
  );
}

export default Models;
