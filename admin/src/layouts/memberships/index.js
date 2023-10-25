// React Hook & Redux  
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Radio, RadioGroup } from '@mui/material';

import MDButton from 'components/MDButton';
import Icon from '@mui/material/Icon';
import SaveIcon from '@mui/icons-material/Save';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomSnackbar from "components/MDSnackbar/customSnackbar"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import PricingCard from './pricingcard'

import DefaultTokenSetting from './defaultTokenSetting';
import { fetchFreeTokenCount, updateFreeTokenCount, } from '../../actions/freeTokenAction'
import { fetchMemberships, updateMemberships, } from '../../actions/membershipAction'
import { clearAction } from '../../actions/engineAction'
import { rgb } from "chroma-js";
function Engines() {
  const snapbarRef = useRef();
  const memberships = useSelector(state => state.memberships)

  console.log(memberships)
  const engines = useSelector(state => state.engines)
  const dispatch = useDispatch()

  const [openDlg, setOpenDlg] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [currentId, setCurrentId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('-1')

  const [showMonthly, setShowMonthly] = useState(0)

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
    dispatch(fetchFreeTokenCount())
    dispatch(fetchMemberships())
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

  const submitMembership = () => {

  }

  const handleShowMonth = (e) => {
    console.log(e.target.value)
    e.target.value === '0' ? setShowMonthly(0) : setShowMonthly(1)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDBox mb={2}>
              <DefaultTokenSetting />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox display="flex" pt={1} px={2}>
                <Grid container>
                  <Grid item lg={10} style={{ display: 'flex' }}>
                    <MDBox
                      variant="gradient"
                      bgColor="info"
                      color="white"
                      coloredShadow="info"
                      borderRadius="xl"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="4rem"
                      height="4rem"
                      mt={-2.5}
                      mr={2}
                    >
                      <ShoppingCartCheckoutIcon fontSize="medium" color="inherit" />
                    </MDBox>
                    <MDBox>
                      <h4 style={{ color: rgb(52, 71, 103) }}>Manage memberships</h4>
                      <span style={{ fontSize: 14, color: rgb(123, 128, 154) }}>Edit price and tokens per month</span>
                    </MDBox>
                  </Grid>
                  <Grid item lg={2} style={{ textAlign: 'right' }}>
                    <MDBox lineHeight={1.25}>
                      <MDButton variant="contained" color="success" size="small" onClick={submitMembership} >
                        <SaveIcon>add</SaveIcon>
                        &nbsp;SAVE
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <FormControl ml={5} style={{ marginBottom: '8px', marginLeft: '24px', marginTop: '16px' }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={showMonthly}
                      onChange={handleShowMonth}
                    >
                      <FormControlLabel value="0" style={{ marginRight: 24 }} control={<Radio />} label="Monthly" />
                      <FormControlLabel value="1" style={{ marginRight: 24 }} control={<Radio />} label="Annual" />
                    </RadioGroup>
                  </FormControl>
                  {console.log(memberships.memberships)}
                  <Grid container spacing={2}>
                    {
                      memberships.memberships.map((membership, index) => (
                        <Grid item lg={4} key={index}>
                          <PricingCard membership={membership} monthly={showMonthly} />
                        </Grid>
                      ))
                    }
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <CustomSnackbar ref={snapbarRef} />
    </DashboardLayout >
  );
}



export default Engines;
