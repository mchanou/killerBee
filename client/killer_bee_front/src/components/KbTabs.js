import * as React from 'react';
import KbPanel from './KbPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import KbTable from './KbTable';
import { Button } from '@mui/material';
import authService from '../services/auth.service';
import classNames from 'classnames';
import { apiGET } from '../services/apiManager';


export default function Tabs() {
  const [value, setValue] = React.useState('1');
  const freezbesFilterEmpty = {
    NomFreezbe: '',
    GammeFreezbe: '',
    PrixUHTFreezbe: ''
};
let freezbesFilterInitial = freezbesFilterEmpty;
  const [filters, setFilters] = React.useState(freezbesFilterEmpty);
  
  const columns = [
    {
        field: 'NomFreezbe',
        label: 'Freezbe Name',
        sortable: true,
        renderCell: (params) => {
            return (
                <div className="flex items-center max-h-full">
                    <div>
                        <p className="mb-1">{params.NomFreezbe}</p>
                    </div>
                </div>
            );
        },
    },
    {
        field: 'DescriptionFreezbe',
        label: 'Freezbe Description',
        sortable: false,
        renderCell: (params) => {
            return (
                <div className="flex items-center max-h-full">
                    <div>{params.DescriptionFreezbe}</div>
                </div>
            );
        },
    },
    {
        field: 'PrixUHTFreezbe',
        label: 'Freezbe Price',
        sortable: false,
        renderCell: (params) => {
            return (
                <div className="flex items-center max-h-full">
                    <div>{params.PrixUHTFreezbe}</div>
                </div>
            );
        },
    },
    {
        field: 'GammeFreezbe',
        label: 'Freezbe Product Line',
        sortable: true,
        renderCell: (params) => {
            return (
                <div className="flex flex-col max-h-full">
                    <div>
                        {params.GammeFreezbe
                            ? params.GammeFreezbe
                            : ''}
                    </div>
                </div>
            );
        },
    },
    {
        field: 'actions',
        label: '',
        type: 'actions',
        sortable: false,
        renderCell: (params) => {
            return (
                <div>
                    <div className="flex items-center">
                      IN MAINTENANCE
                    </div>
                </div>
            );
        },
    },
];

//Get all licenses data depending of filters
function searchFreezbes(filters, sortColumn, sortDirection) {
  const params = new URLSearchParams({
      NomFreezbe: filters.NomFreezbe,
      GammeFreezbe: filters.GammeFreezbe,
      PrixUHTFreezbe: filters.PrixUHTFreezbe,
      column: sortColumn ? sortColumn : '',
      direction: sortDirection ? sortDirection : '',
  });
  return apiGET('/api/freezbe', { params });
}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function logout(){
    authService.logout();
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Freezbe Models" value="1" />
            <Tab label="Ingredients" value="2" />
            <Tab label="Procedures" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <KbPanel type="freezbe"/>
            <KbTable
            filters={filters}
            defaultSorting={{
              column: 'IdFreezbe',
              direction: 'desc',
          }}
          fetchData={searchFreezbes}
            columns={columns}
            paginationServer={false}
            />
        </TabPanel>
        <TabPanel value="2">
          <KbPanel type="ingredient"/>
        </TabPanel>
        <TabPanel value="3">
          <KbPanel type="procedure"/>
        </TabPanel>
      </TabContext>
      <Button variant='contained' onClick={logout}>Log out</Button>
    </Box>
  );
}
