import React, { useState, useEffect } from 'react'
import { Card, Button, Image , Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserCard from '../UserCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import defaultProfilePic from '../../assets/svg/profile.svg';

// Material-UI icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

// import { Card, CardMedia, Button, CardContent, Typography } from "@material-ui/core"


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const styles  = {
  customButtons: {
    backgroundColor: 'transparent',
    outline: '0px',
    border: '0px', 
    color: '#747474',
  },
  buttonIcon: {
    fontSize: '15px',
  }
}

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group d-flex justify-content-between">
      <div className={currentSlide === 0 ? 'disable' : ''} 
        onClick={() => previous()} 
        style={styles.customButtons}
      >
        <ArrowBackIosIcon style={styles.buttonIcon}/>
      </div>
      <div onClick={() => next()}
        style={styles.customButtons}
      > 
        <ArrowForwardIosIcon  style={styles.buttonIcon}/>
      </div>
    </div>
  );
};

const UserList = ({ users }) => {
  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      infinite={true}
      keyBoardControl={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      arrows={false} 
      renderButtonGroupOutside={true}
      customButtonGroup={<ButtonGroup />}
    >
      {users.map(user =>
        <div style={{ width: '11rem' }}>
          <UserCard user={user} />
          <div>
            <div style={{ fontSize: '18px' }}>{user.profile.firstName} {user.profile.lastName}</div>
            <div>{user.profile.profession}</div>
          </div>
        </div>
      )}
    </Carousel>)
}
export default UserList;

