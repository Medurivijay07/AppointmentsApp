// Write your code here
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', starred: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitting = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickingStarred = () => {
    this.setState({starred: true})
  }

  onClickingUnstar = () => {
    this.setState({starred: false})
  }

  render() {
    const {appointmentsList, title, date, starred} = this.state
    const filteredAppointmentsList = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    return (
      <div className="main-container">
        <div className="form-card">
          <div className="top-style">
            <div className="form-related">
              <h1>Add Appointment</h1>
              <form className="form-container" onSubmit={this.onSubmitting}>
                <label htmlFor="title">TITLE</label>
                <input
                  className="title-input"
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date">DATE</label>
                <input
                  id="date"
                  type="date"
                  className="date-input"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="added-appointments">
            <h1>Appointments</h1>
            {starred ? (
              <button
                type="button"
                className="star-button"
                onClick={this.onClickingUnstar}
              >
                starred
              </button>
            ) : (
              <button
                type="button"
                className="starred-button"
                onClick={this.onClickingStarred}
              >
                Starred
              </button>
            )}
          </div>
          <ul className="unordered-list">
            {starred
              ? filteredAppointmentsList.map(eachItem => (
                  <AppointmentItem
                    appointment={eachItem}
                    key={eachItem.id}
                    toggleStar={this.toggleStar}
                  />
                ))
              : appointmentsList.map(eachItem => (
                  <AppointmentItem
                    appointment={eachItem}
                    key={eachItem.id}
                    toggleStar={this.toggleStar}
                  />
                ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
