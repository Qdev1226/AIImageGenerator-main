import MDBox from "components/MDBox";
import MDInput from 'components/MDInput';
import { Grid, Radio, RadioGroup } from '@mui/material';
import MDTypography from 'components/MDTypography';
import CheckIcon from '@mui/icons-material/Check';

function PricingCard(props) {
    console.log(props)
    let membership = props.membership
    let showMonth = props.monthly
    const pricingSpecs = [
        'AI Article Writer',
        'Premium Support',
        'Social Media Integration',
        'Content Analytics',
        '100+ AI Templates',
        'Team Collaboration',
        'SEO Optimisation',
        'Customisable Templates'
    ]

    return (
        <MDBox padding="1rem">
            <Grid container spacing={1}>
                <Grid item lg={6}>
                    <MDInput
                        type="number"
                        label={`${membership.title} price`}
                        value={showMonth == 0 ? membership.monthly_price.$numberDecimal : membership.annual_price.$numberDecimal}
                        size="small"
                        style={{ textAlign: 'right' }}
                        // onChange={(e) => setEngineData({ ...membershipData, name: e.target.value })}
                        fullWidth />
                </Grid>
                <Grid item lg={6}>
                    <MDInput
                        type="number"
                        label={`${membership.title} tokens`}
                        value={membership.tokens}
                        size="small"
                        // onChange={(e) => setEngineData({ ...membershipData, name: e.target.value })}
                        fullWidth />
                </Grid>
            </Grid>

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
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    color="white"
                    coloredShadow="info"
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}
                >
                    {membership.title}
                </MDBox>
                {
                    pricingSpecs.length > 0 &&
                    <>
                        <MDBox style={{ padding: '16px 8px 0px 8px', textAlign: 'center' }}>
                            <MDTypography variant="h2" gutterBottom color="white">
                                {showMonth == 0 ? `$${membership.monthly_price.$numberDecimal}/mo` : `$${membership.annual_price.$numberDecimal}/year`}
                            </MDTypography>
                        </MDBox>
                        <MDBox style={{ padding: '0px 32px' }}>
                            <MDBox display="flex" alignItems="center" style={{ color: 'white', margin: '16px' }}>
                                <CheckIcon />
                                <MDTypography variant="button" fontWeight="regular" color="white" style={{ marginLeft: '12px' }}>
                                    &nbsp;{Number(membership.tokens).toLocaleString('en-US')} tokens per month
                                </MDTypography>
                            </MDBox>
                            {
                                pricingSpecs.map((item, index) => (
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
    )
}

export default PricingCard