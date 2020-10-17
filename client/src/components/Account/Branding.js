import { StylesContext } from '@material-ui/styles';
import React from 'react';
// Bootstrap
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
// SVGs
import defaultProfilePic from '../../assets/svg/profile.svg';


const styles = {
  h2: {
    fontSize: '16px', 
    fontWeight: 700
  }
}

const Branding = ({profilePic}) => {
  return <>
    <div className='profile-picture mt-4'>
      <h2 style={styles.h2}>Profile picture</h2>
      {profilePic ? (<Image src={profilePic} style={{width: '200px'}}/>)
        : (<Image src={defaultProfilePic} style={{width: '200px'}}/>)
      }
      
      <a href='#' variant='outline-dark'>Change</a>
    </div>
    
  </>
}

export default Branding;