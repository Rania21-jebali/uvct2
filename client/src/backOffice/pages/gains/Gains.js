import React from 'react'
import Chart from '../../components/chart/Chart'
import {userData} from '../../components/chart/userData';

function Gains() {
  return (
    <div>
    <h2>Mes gains</h2>
        <Chart data={userData} grid dataKey="Active User"/>
    </div>
  )
}

export default Gains