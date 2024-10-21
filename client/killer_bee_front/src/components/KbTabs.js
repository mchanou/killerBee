import * as React from 'react';
import KbPanel from './KbPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import KbTable from './KbTable';
import { Button } from '@mui/material';
import classNames from 'classnames';
import { apiGET } from '../services/apiManager';
import FreezbeFilter from './FreezbeFilter';
import ProcedureFilter from './ProcedureFilter';
import IngredientFilter from './IngredientFilter';
import { useSnackbar } from 'notistack';


export default function Tabs() {
    const enqueueSnackbar = useSnackbar();
    const [value, setValue] = React.useState('1');
  const freezbesFilterEmpty = {
    IdFreezbe: '',
    NomFreezbe: '',
    GammeFreezbe: ''
    };
    const ingredientsFilterEmpty = {
        IdIngredient: '',
        NomIngredient: ''
    };

    const proceduresFilterEmpty = {
        IdProcede: '',
        NomProcede: ''
    };
    let freezbesFilterInitial = freezbesFilterEmpty;
    let ingredientsFilterInitial = ingredientsFilterEmpty;
    let proceduresFilterInitial = proceduresFilterEmpty;
    const [freezbeFilters, setFreezbeFilters] = React.useState(freezbesFilterInitial);
    const [ingredientFilters, setIngredientFilters] = React.useState(ingredientsFilterInitial);
    const [procedureFilters, setProcedureFilters] = React.useState(proceduresFilterInitial);
  
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

 //Check filters fields
 const checkFilters = (type, filters) => {
    if (!filters || !type) return false;

    if(type === "freezbe"){
        if (filters.NomFreezbe && filters.NomFreezbe.length < 3) {
            enqueueSnackbar(
                'Freezbe Name is too short (Min 3 characters required)',
                { variant: 'error' }
            );
            return false;
        }
    
        if (filters.GammeFreezbe && filters.GammeFreezbe.length < 3) {
            enqueueSnackbar(
                'Serial Number is too short (Min 3 characters required)',
                { variant: 'error' }
            );
            return false;
        }
    
        return true;
    }
    else if(type === "ingredient"){
        if (filters.NomIngredient && filters.NomIngredient.length < 3) {
            enqueueSnackbar(
                'Ingredient Name is too short (Min 3 characters required)',
                { variant: 'error' }
            );
            return false;
        }
    
        return true;
    }
    else if(type === "procedure"){
        if (filters.NomProcede && filters.NomProcede.length < 3) {
            enqueueSnackbar(
                'Procedure Name is too short (Min 3 characters required)',
                { variant: 'error' }
            );
            return false;
        }
        return true;
    }

};

//Seach function for filters
const searchFreezbesFilters = async (values) => {
    if (!checkFilters(values)) return;
    setFreezbeFilters(values);
};

//Seach function for filters
const searchIngredientsFilters = async (values) => {
    if (!checkFilters(values)) return;
    setIngredientFilters(values);
};

//Seach function for filters
const searchProceduresFilters = async (values) => {
    if (!checkFilters(values)) return;
    setProcedureFilters(values);
};

//Get all freezbe data depending of filters
function searchFreezbes(filters, sortColumn, sortDirection) {
  const params = new URLSearchParams({
      IdFreezbe: filters.IdFreezbe,  
      NomFreezbe: filters.NomFreezbe,
      GammeFreezbe: filters.GammeFreezbe,
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


  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Freezbe Models" value="1" />
            <Tab label="Ingredients" value="2" />
            <Tab label="Procedures" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <KbPanel type="freezbe"/>
            <FreezbeFilter
            emptyValues={freezbesFilterEmpty}
            searchFunction={searchFreezbesFilters}
            initialValues={freezbesFilterInitial}
            />
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
          <IngredientFilter
            emptyValues={ingredientsFilterEmpty}
            searchFunction={searchIngredientsFilters}
            initialValues={ingredientsFilterInitial}
            />
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
          <ProcedureFilter
            emptyValues={proceduresFilterEmpty}
            searchFunction={searchProceduresFilters}
            initialValues={proceduresFilterInitial}
            />
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
