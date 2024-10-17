import React from 'react'
import { Pie } from 'react-chartjs-2'

export default function PieChart({ chartData }) {
    return (
      <div className='sm:w-[400px] sm:h-[400px] max-xsm:w-[300px] max-xsm:h-[300px]'>
          <Pie
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                }
              }
            }}
          />
          </div>
      )
}
