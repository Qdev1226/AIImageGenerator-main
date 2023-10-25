// React Hook & Redux  
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// @mui material components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from 'components/MDButton';
import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

// import actions
import { fetchAllModels, fetchModels } from 'actions/modelAction';
import { fetchRoles, updateRole } from 'actions/roleAction';

export default function Pricings() {
  const snapbarRef = useRef();
  const dispatch = useDispatch()
  const models = useSelector(state => state.models)
  const roles = useSelector(state => state.roles)
  // const checkedModels = useSelector(state => state.checkedModels)
  const modelsData = models.models
  const rolesData = roles.roles
  const [role, setRole] = useState(0)
  const [checkedModelIds, setCheckedModelIds] = useState(new Map())
  const checkedItems = new Map()

  const handleSaveModel = () => {
    console.log(checkedItems)
    const updateData = {
      'role': role,
      'checkedModelIds': checkedModelIds
    }
    dispatch(updateRole(updateData, snapbarRef))
  }

  const MyFormControlLabel = (props) => {
    const radioGroup = useRadioGroup();
    let checked = false;
    if (radioGroup) {
      checked = Number(radioGroup.value) === Number(props.value);
    }
    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
  };

  const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      '.MuiFormControlLabel-label': checked && {
        color: theme.palette.info.main,
      },
    }),
  );

  useEffect(() => {
    console.log('first loading')
    // dispatch(fetchAllModels());
    dispatch(fetchRoles())
  }, [])

  const handleOptionChange = (e) => {
    setRole(e.target.value)
    // fetchModels({ index: e.target.value })
  }

  const handleCheckModel = (e) => {
    checkedItems.set(e.target.id, e.target.checked)
    setCheckedModelIds(checkedItems)
  }

  if (!localStorage.getItem('token'))
    window.location.href = '/'

  // rolesData.length > 0 && rolesData.map((item) => (Number(item.index) === Number(role) ? setCheckedModelIds(item.models) : []))

  console.log('checkedModelIds', checkedModelIds)
  var stateArr = [true, false, true, true]

  // <FormControlLabel key={row._id} control={<Checkbox onChange={handleCheckModel} id={row._id} checked={checkedModelIds.length > 0 && checkedModelIds.map((item) => (item === row._id) ? true : false )}/>} label={row.name} />

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={2} spacing={3}>
        <Card>
          <MDBox px={2} py={1} display="flex" justifyContent="space-between" alignItems="center">
            <RadioGroup
              name="use-radio-group"
              onChange={handleOptionChange}
              defaultValue={0}
              row
            >
              {
                rolesData.length > 0 &&
                rolesData.map((row, index) => (
                  <MyFormControlLabel key={row._id} value={row.index} label={row.role} control={<Radio />} style={{ marginRight: '48px' }} />
                ))
              }
            </RadioGroup>
            <MDButton variant="contained" color="success" size="small" onClick={handleSaveModel}>
              <Icon sx={{ fontWeight: "bold" }}>save</Icon>
              &nbsp;save
            </MDButton>
          </MDBox>
        </Card>
        <Grid container mt={1} spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor={"success"}
                color={"white"}
                coloredShadow={"success"}
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="50%"
                height="2.3rem"
                mt={-2.5}
                ml={2}
              >
                Selected Models
              </MDBox>
              <Grid container style={{ padding: '24px' }}>
                <Grid item xs={2} md={2} lg={2}></Grid>
                <Grid item xs={10} md={6} lg={6}>
                  <FormGroup>
                    {
                      modelsData.length > 0 && rolesData.length > 0 &&
                      modelsData.map((row, index) => {
                        // console.log(row._id)
                        // var models = rolesData[0].models
                        // var checkedState = false
                        // for (let i = 0; i < models.length; i++) {
                        //   if (models[i] === row._id) {
                        //     checkedState = true
                        //     return checkedState
                        //   }
                        // }
                        // console.log('models[0]=', models[0])
                        // console.log('checkedState=', checkedState)
                        return (
                          // <FormControlLabel key={row._id} control={<Checkbox onChange={handleCheckModel} id={row._id} checked={checkedModelIds.length > 0 && checkedModelIds.map((item) => (item === row._id) ? true : false )}/>} label={row.name} />
                          <FormControlLabel key={row._id} control={<Checkbox onChange={handleCheckModel} id={row._id} checked={stateArr[index]} />} label={row.name} />
                        )
                      })
                    }
                  </FormGroup>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor={"success"}
                color={"white"}
                coloredShadow={"success"}
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="50%"
                height="2.3rem"
                mt={-2.5}
                ml={2}
              >
                Pricing
              </MDBox>
              <Grid container px={4}>
                <Grid item xs={12} md={12} lg={12}>
                  <MDBox padding="1rem">
                    <MDBox
                      variant="gradient"
                      bgColor={'dark'}
                      color={'white'}
                      borderRadius="lg"
                      coloredShadow={'dark'}
                      py={3}
                      px={1}
                      mt={2}
                    >
                      {
                        rolesData.length > 0 && Number(role) >= 0 &&
                        <>
                          <MDBox style={{ padding: '16px 8px', textAlign: 'center' }}>
                            <MDTypography variant="h2" gutterBottom color="white">
                              {rolesData[Number(role)].role}
                            </MDTypography>
                          </MDBox>
                          <MDBox style={{ padding: '0px 16px' }}>
                            {
                              rolesData[Number(role)].contents.map((item, index) => (
                                <MDBox key={index} display="flex" alignItems="center" style={{ color: 'white', margin: '16px' }}>
                                  <CheckIcon />
                                  <MDTypography variant="button" fontWeight="regular" color="white" style={{ marginLeft: '12px' }}>
                                    &nbsp;{item}
                                  </MDTypography>
                                </MDBox>
                              ))
                            }
                          </MDBox>
                        </>
                      }
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox >
      <Footer />
      <CustomSnackbar ref={snapbarRef} />
    </DashboardLayout >
  );
}