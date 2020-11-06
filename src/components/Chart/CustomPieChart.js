import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useHistory } from 'react-router-dom';

export default function CustomPieChart({ stat, main = false }) {
    const galaxyList = ['Planning and Defining', 'Design', 'Implementation', 'Testing and Maintainance']
  const [selected, setSelected] = useState(-1);
  const [hovered, setHovered] = useState(undefined);

  const data = stat.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }
    return entry;
  });

  const history = useHistory();

  return (
    <div style={{ textAlign: 'center' }}>
      <PieChart
      style={ !main ? {width: '52%', height: '52%'} : {width: '100%', height: '100%'}}
      data={data}
      radius={PieChart.defaultProps.radius - 6}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      label={({ dataEntry }) => dataEntry.title }
              labelStyle={{
                  fontSize: main ? '3px' : '6px',
                  labelPosition: 50
              }}
      onClick={(event, index) => {
          setSelected(index === selected ? undefined : index);
          history.push(`/admin/galaxy/${galaxyList[index]}`)

      }}
      onMouseOver={(_, index) => {
          setHovered(index);
      }}
      onMouseOut={() => {
          setHovered(undefined);
      }}
      />
    </div>
  );
}