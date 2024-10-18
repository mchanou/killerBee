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
  const [freezbeFilters, setFreezbeFilters] = React.useState(freezbesFilterInitial);
  const [ingredientFilters, setIngredientFilters] = React.useState(freezbesFilterInitial);
  const [procedureFilters, setProcedureFilters] = React.useState(freezbesFilterInitial);
  
  const columnsFreezbe = [
    {
      field: 'IdFreezbe',
      label: 'Freezbe ID',
      sortable: true,
      renderCell: (params) => {
          return (
              <div className="flex items-center max-h-full">
                  <div>
                      <p className="mb-1">{params.IdFreezbe}</p>
                  </div>
              </div>
          );
      },
  },
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
                    <div>{"$"+params.PrixUHTFreezbe}</div>
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

const columnsIngredient = [
  {
    field: 'IdIngredient',
    label: 'Ingredient ID',
    sortable: true,
    renderCell: (params) => {
        return (
            <div className="flex items-center max-h-full">
                <div>
                    <p className="mb-1">{params.IdIngredient}</p>
                </div>
            </div>
        );
    },
},
  {
      field: 'NomIngredient',
      label: 'Ingredient Name',
      sortable: true,
      renderCell: (params) => {
          return (
              <div className="flex items-center max-h-full">
                  <div>
                      <p className="mb-1">{params.NomIngredient}</p>
                  </div>
              </div>
          );
      },
  },
  {
      field: 'DescriptionIngredient',
      label: 'Ingredient Description',
      sortable: false,
      renderCell: (params) => {
          return (
              <div className="flex items-center max-h-full">
                  <div>{params.DescriptionIngredient}</div>
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

const columnsProcedure = [
  {
    field: 'IdProcedure',
    label: 'Procedure ID',
    sortable: true,
    renderCell: (params) => {
        return (
            <div className="flex items-center max-h-full">
                <div>
                    <p className="mb-1">{params.IdProcede}</p>
                </div>
            </div>
        );
    },
},
  {
      field: 'NomProcedure',
      label: 'Procedure Name',
      sortable: true,
      renderCell: (params) => {
          return (
              <div className="flex items-center max-h-full">
                  <div>
                      <p className="mb-1">{params.NomProcede}</p>
                  </div>
              </div>
          );
      },
  },
  {
      field: 'DescriptionProcedure',
      label: 'Procedure Description',
      sortable: false,
      renderCell: (params) => {
          return (
              <div className="flex items-center max-h-full">
                  <div>{params.DescriptionProcede}</div>
              </div>
          );
      },
  },
  {
      field: 'ValidationTest',
      label: 'Validation',
      sortable: false,
      renderCell: (params) => {
          return (
              <div className="flex items-center max-h-full">
                  <div>{params.ValidationTest === true ? "Yes" : "No"}</div>
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

//Get all freezbe data depending of filters
function searchFreezbes(filters, sortColumn, sortDirection) {
  const params = new URLSearchParams({
      IdFreezbe: filters.IdFreezbe,  
      NomFreezbe: filters.NomFreezbe,
      GammeFreezbe: filters.GammeFreezbe,
      PrixUHTFreezbe: filters.PrixUHTFreezbe,
      column: sortColumn ? sortColumn : '',
      direction: sortDirection ? sortDirection : '',
  });
  return apiGET('/api/freezbe', { params });
}

//Get all ingredient data depending of filters
function searchIngredients(filters, sortColumn, sortDirection) {
  const params = new URLSearchParams({
      IdIngredient: filters.IdIngredient,
      NomIngredient: filters.NomIngredient,
      column: sortColumn ? sortColumn : '',
      direction: sortDirection ? sortDirection : '',
  });
  return apiGET('/api/ingredient', { params });
}

//Get all procedure data depending of filters
function searchProcedures(filters, sortColumn, sortDirection) {
  const params = new URLSearchParams({
      IdProcede: filters.IdProcede,
      NomProcede: filters.NomProcede,
      column: sortColumn ? sortColumn : '',
      direction: sortDirection ? sortDirection : '',
  });
  return apiGET('/api/procede', { params });
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
            filters={freezbeFilters}
            defaultSorting={{
              column: 'IdFreezbe',
              direction: 'desc',
          }}
          fetchData={searchFreezbes}
            columns={columnsFreezbe}
            paginationServer={false}
            />
        </TabPanel>
        <TabPanel value="2">
          <KbPanel type="ingredient"/>
          <KbTable
            filters={ingredientFilters}
            defaultSorting={{
              column: 'IdFreezbe',
              direction: 'desc',
          }}
          fetchData={searchIngredients}
            columns={columnsIngredient}
            paginationServer={false}
            />
        </TabPanel>
        <TabPanel value="3">
          <KbPanel type="procedure"/>
          <KbTable
            filters={procedureFilters}
            defaultSorting={{
              column: 'IdFreezbe',
              direction: 'desc',
          }}
          fetchData={searchProcedures}
            columns={columnsProcedure}
            paginationServer={false}
            />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
