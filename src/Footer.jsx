import './Footer.css';
import propTypes from 'prop-types';
function Footer(props){
    let currentDate = new Date;
    return (<footer className='Footer'><p>{props.children}</p><p>Copyleft © {currentDate.getFullYear()}</p></footer>);
}
Footer.propTypes = {
    children: propTypes.string
  };
export default Footer;