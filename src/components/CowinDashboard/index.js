import './index.css'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const status = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  inSuccess: 'SUCCESS',
  inFailure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: status.initial,
    last7DaysVaccination: [],
    vaccineByAge: [],
    vaccineByGender: [],
  }

  componentDidMount() {
    this.renderVaccinationData()
  }

  renderVaccinationData = async () => {
    this.setState({apiStatus: status.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok) {
      const data = await response.json()
      console.log(response)
      console.log(data)
      const vaccineByAge = data.vaccination_by_age
      const vaccineByGender = data.vaccination_by_gender
      const last7DaysVaccination = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      this.setState({
        apiStatus: status.inSuccess,
        last7DaysVaccination,
        vaccineByAge,
        vaccineByGender,
      })
    } else {
      this.setState({apiStatus: status.inFailure})
    }
  }

  onLoadingPage = () => (
    <div className="loading-con" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  onFailurePage = () => (
    <div className="loading-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        width="70%"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  onSuccessPage = () => {
    const {last7DaysVaccination, vaccineByGender, vaccineByAge} = this.state
    return (
      <div>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccineByGender={vaccineByGender} />
        <VaccinationByAge vaccineByAge={vaccineByAge} />
      </div>
    )
  }

  getHomePage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.inProgress:
        return this.onLoadingPage()
      case status.inFailure:
        return this.onFailurePage()
      case status.inSuccess:
        return this.onSuccessPage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-container">
        <div className="website-con-heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            width="25px"
          />
          <h1 className="cowin-heading">Co-WIN</h1>
        </div>
        <h1 className="cowin-para">CoWIN Vaccination In India</h1>
        {this.getHomePage()}
      </div>
    )
  }
}

export default CowinDashboard
