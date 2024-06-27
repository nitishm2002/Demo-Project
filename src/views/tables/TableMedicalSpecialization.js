import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import CustomDataGrid from "src/@core/components/data-grid";
import { formatCurrency } from "src/utils/utils";

function TableMedicalSpecialization({
    rows,
    totalCount,
    setCurrentPage,
    currentPage,
    setPageSize,
    pageSize,
    loading,
    toggleEdit,
    toggleDelete,
}) {

    return <CustomDataGrid
        loading={loading}
        rowCount={totalCount}
        rows={rows}
        columns={[
            {
                field: 'title',
                flex: 0.3,
                minWidth: 180,
                sortable: false,
                headerName: 'Title',
                renderCell: ({ row }) => <Typography noWrap variant='body2' title={row.title}>
                    {row.title}
                </Typography>
            },
            {
                field: 'description',
                flex: 0.5,
                minWidth: 180,
                sortable: false,
                headerName: 'Description',
                renderCell: ({ row }) => <Typography noWrap variant='body2' title={row.description}>
                    {row.description}
                </Typography>
            },
            {
                field: 'link',
                flex: 0,
                sortable: false,
                headerName: 'Link',
                renderCell: ({ row }) => <Box>
                    <Link to={row.link} target="_blank" rel="noopener noreferrer">
                        <LinkIcon />
                    </Link>
                </Box>
            },
            {
                field: 'cost_per_unit',
                flex: 0.2,
                minWidth: 170,
                sortable: false,
                headerName: 'Cost Per Unit',
                renderCell: ({ row }) => <Typography noWrap variant='body2' title={formatCurrency(row.cost_per_unit)}>
                    {formatCurrency(row.cost_per_unit)}
                </Typography>
            },
            {
                field: 'actions',
                flex: 0,
                minWidth: 170,
                sortable: false,
                headerName: 'Actions',
                renderCell: ({ row }) => <Box display='flex' alignItems='center' gap='10px'>
                    <IconButton size="small" color="primary" variant="outlined" onClick={(e) => toggleEdit(e, "edit", row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="secondary" onClick={(e) => toggleDelete(e, row)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
        ]}
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
    />

}

export default TableMedicalSpecialization
