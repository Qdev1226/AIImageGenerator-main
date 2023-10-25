import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';

// @mui/icons-material
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SvgIcon from '@mui/material/SvgIcon';
import './styles.css'

// import actions
import { fetchModels, deleteModel } from '../../actions/modelAction';

// import do-data, spin icon
import Spinner from "../../components/Spinner";
import NoData from '../../components/SvgIcons/NoData'

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

const ModelsTable = ({ open, setOpen, currentId, setCurrentId, searchKey, selectedCategory, selectedEngine }) => {
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const loading = useSelector(state => state.models.loading)

  const models = useSelector(state => state.models)
  const modelsData = models.models

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (selectedModelId) => {
    setOpen((open) => !open)
    setCurrentId(selectedModelId)
  }

  const handleDelete = (id) => {
    dispatch(deleteModel(id))
    setPage(0);
  }

  useEffect(() => {
    setPage(0)
  }, [searchKey, selectedCategory, selectedEngine])

  useEffect(() => {
    const searchQuery = { category: selectedCategory, engine: selectedEngine, searchKey: searchKey, page: page, rowsPerPage: rowsPerPage }
    dispatch(fetchModels(searchQuery));
  }, [searchKey, models.refresh, page, selectedCategory, selectedEngine])

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px' }}>
      <Spinner />
    </div>
  }

  if (modelsData.length === 0) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px' }}>
      <NoData />
      <p style={{ padding: '40px', color: 'gray', textAlign: 'center' }}>No Models yet. Click the ADD NEW BUTTON to add model</p>
    </div>
  }

  const rows = modelsData
  const emptyRows = rowsPerPage - modelsData.length

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const cellStyle = { fontSize: 14, borderBottom: 'none', padding: '8px', textAlign: 'left', color: '#7B809A', }
  const headerStyle = { borderBottom: 'none', textAlign: 'left', fontSize: 12, color: '#7B809A', padding: '12px 8px' }

  return (
    <Table aria-label="custom pagination table">
      <TableHead style={{ display: 'table-header-group' }}>
        <TableRow style={{ borderBottom: '1px solid #ddd' }}>
          <TableCell style={{ ...headerStyle, width: '5%', textAlign: 'center' }}>NO</TableCell>
          <TableCell style={{ ...headerStyle, width: '10%' }}>CATEGORY</TableCell>
          <TableCell style={{ ...headerStyle, width: '10%' }}>ENGINE</TableCell>
          <TableCell style={{ ...headerStyle, width: '10%' }}>NAME</TableCell>
          <TableCell style={{ ...headerStyle, width: '15%' }}>DESCRIPTION</TableCell>
          <TableCell style={{ ...headerStyle, width: '15%' }}>SYSTEM CONTENT</TableCell>
          <TableCell style={{ ...headerStyle, width: '12%' }}>USER CONTENT</TableCell>
          <TableCell style={{ ...headerStyle, width: '15%' }}>ASSISTANT CONTENT</TableCell>
          <TableCell style={{ ...headerStyle, width: '8%', textAlign: 'center' }}>ACTION</TableCell>
        </TableRow>
      </TableHead>
      <TableBody >
        {rows.length > 0 &&
          rows.map((row, index) => (
            <TableRow key={row._id}>
              <TableCell style={{ ...cellStyle, textAlign: 'center' }}>{page * rowsPerPage + index + 1}</TableCell>
              <TableCell style={cellStyle}>
                {row.category.name}
              </TableCell>
              <TableCell style={cellStyle}>{row.engine.name}</TableCell>
              <TableCell style={cellStyle}>{row.name}</TableCell>
              <TableCell style={cellStyle}>
                <div className='textContainerStyle'>
                  {row.description}
                </div>
              </TableCell>
              <TableCell style={cellStyle}>
                <div className='textContainerStyle'>
                  {row.system_content}
                </div>
              </TableCell>
              <TableCell style={cellStyle}>
                <div className='textContainerStyle'>
                  {row.user_content}
                </div>
              </TableCell>
              <TableCell style={cellStyle}>
                <div className='textContainerStyle'>
                  {row.assistant_content}
                </div>
              </TableCell>
              <TableCell style={cellStyle}>
                <IconButton title='edit' onClick={() => handleEdit(row._id)}>
                  <SvgIcon color="info" fontSize="medium">
                    <path d="M22 24H2v-4h20v4zM13.06 5.19l3.75 3.75L7.75 18H4v-3.75l9.06-9.06zm4.82 2.68-3.75-3.75 1.83-1.83c.39-.39 1.02-.39 1.41 0l2.34 2.34c.39.39.39 1.02 0 1.41l-1.83 1.83z" />
                  </SvgIcon>
                </IconButton>
                <IconButton title="delete" onClick={() => handleDelete(row._id)}>
                  <SvgIcon color="primary" fontSize="medium">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                  </SvgIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={4} />
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            colSpan={9}
            count={models.totalCount}
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
    </Table >
  );
}

export default ModelsTable