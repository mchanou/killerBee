import * as React from 'react';
import KbPanel from './KbPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import KbTable from './KbTable';


export default function Tabs() {
  const [value, setValue] = React.useState('1');


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        </TabPanel>
        <TabPanel value="2">
          <KbPanel type="ingredient"/>
        </TabPanel>
        <TabPanel value="3">
          <KbPanel type="procedure"/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
