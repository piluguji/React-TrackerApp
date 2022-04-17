import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, formStatus} ) => { 
    return (
    <header className = 'header'>
        <h1> {title}</h1>
        <Button
          color = {formStatus ? 'red' : 'steelblue'}
          text = {formStatus ? 'Close' : 'Add'} 
          onClick = {onAdd}></Button>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker', 
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'blue'
// }

export default Header