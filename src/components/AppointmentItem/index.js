// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointment, toggleStar} = props
  const {title, date, isStarred, id} = appointment

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const newdate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickingStar = () => {
    toggleStar(id)
  }

  return (
    <li className="list-item">
      <div className="title-star">
        <p>{title}</p>
        <button
          type="button"
          data-testid="star"
          className="button-style"
          onClick={onClickingStar}
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p>Date:{newdate}</p>
    </li>
  )
}

export default AppointmentItem
