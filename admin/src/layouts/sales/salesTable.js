import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment'

// @mui/icons-material
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import BackgroundLetterAvatars from 'components/MDAvatar/BackgroundLetterAvatars';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import SvgIcon from '@mui/material/SvgIcon';

// import actions
import { fetchSales, deleteSale } from '../../actions/saleAction';

// import do-data, spin icon
import Spinner from "../../components/Spinner";
import NoData from '../../components/SvgIcons/NoData'
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

// pagination actions
function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: '16px' }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRightIcon />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const SalesTable = ({ searchKey }) => {
  const dispatch = useDispatch()
  const snapbarRef = useRef();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const loading = useSelector(state => state.sales.loading)

  const sales = useSelector(state => state.sales)
  const salesData = sales.sales

  console.log(salesData)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(0)
  }, [searchKey])

  useEffect(() => {
    const searchQuery = { searchKey: searchKey, page: page, rowsPerPage: rowsPerPage }
    dispatch(fetchSales(searchQuery));
  }, [searchKey, sales.refresh, page])

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px' }}>
      <Spinner />
    </div>
  }

  if (salesData.length === 0) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px' }}>
      <NoData />
      <p style={{ padding: '40px', color: 'gray', textAlign: 'center' }}>No Sales yet.</p>
    </div>
  }

  const rows = salesData
  const emptyRows = rowsPerPage - salesData.length

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const cellStyle = { fontSize: 13, borderBottom: 'none', padding: '12px 18px', textAlign: 'left', color: '#344767' }
  const headerStyle = { borderBottom: 'none', textAlign: 'left', fontSize: 12, color: '#7B809A', padding: '12px 18px' }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="custom pagination table">
        <TableHead style={{ display: 'table-header-group' }}>
          <TableRow style={{ borderBottom: '1px solid #ddd' }}>
            <TableCell style={headerStyle}>NO</TableCell>
            <TableCell style={headerStyle}>DATE</TableCell>
            <TableCell style={headerStyle}>USER</TableCell>
            <TableCell style={headerStyle}>PRICING</TableCell>
            <TableCell style={headerStyle}>REVENUE</TableCell>
            <TableCell style={headerStyle}>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.length > 0 &&
            rows.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell style={{ ...cellStyle, width: '8%' }}>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell style={{ ...cellStyle, width: "15%" }}>{moment(row.created_at).format('DD MM yyyy, hh:mm')}</TableCell>
                <TableCell style={{ ...cellStyle, fontWeight: 600, width: '30%' }}>
                  <MDBox display="flex" alignItems="center" lineHeight={1}>
                    <BackgroundLetterAvatars name={row.user_name} size="sm" />
                    <MDBox ml={2} lineHeight={1}>
                      <MDTypography display="block" variant="button" fontWeight="medium">
                        {row.user_name}
                      </MDTypography>
                      <MDTypography variant="caption">{row.user_email}</MDTypography>
                    </MDBox>
                  </MDBox>
                </TableCell>
                <TableCell style={{ ...cellStyle, width: "10%" }}>
                  <MDBox ml={-1}>
                    <MDBadge badgeContent={row.role_idx === 0 ? "Free" : row.role_idx === 1 ? "$19 / mo" : "$29 / mo"} color={row.role_idx === 0 ? "warning" : row.role_idx === 1 ? "info" : "success"} variant="gradient" size="sm" />
                  </MDBox>
                </TableCell>
                <TableCell style={{ ...cellStyle, width: '10%' }}>
                  {'$' + row.price}
                </TableCell>
                <TableCell style={{ ...cellStyle, width: '10%' }}>
                  <IconButton onClick={() => dispatch(deleteSale(row._id, snapbarRef))}>
                    <SvgIcon color="primary" fontSize="medium">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 15, 20]}
              colSpan={8}
              count={sales.totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <CustomSnackbar ref={snapbarRef} />
    </TableContainer>
  );
}

export default SalesTable