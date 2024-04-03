import './index.css'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  return (
    <div className="chat-con">
      <h1 className="chat-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width={1000} height={300}>
        <BarChart data={last7DaysVaccination} margin={{top: 5}}>
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="dose 1" fill="#2d87bb" barSize="10%" />
          <Bar dataKey="dose2" name="dose 2" fill="#f54394" barSize="10%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
