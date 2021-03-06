import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Cropper from '../components/Cropper';
import API from '../utils/API';

require('dotenv').config();

const AccountPage = ({user}) => {

  console.log(user)
  /** ===== User Profile Info ====== */
  const tempId = user; // for login state

  const [submit, setSubmit] = useState(1);
  console.log(submit)
  // User 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Profile 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [about, setAbout] = useState('');
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');
  const [link3, setLink3] = useState('');

  // To handle profile info input 
  const [infoInput, setInfoInput] = useState('');

  const inputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setInfoInput({...value, [name]: value})

    console.log(infoInput)
  }

  // Profile Pic 
  const [uploadFiles, setUploadFiles] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(false);

  const userFields = ["firstName", "lastName", "profession", "about", "link1", "link2", "link3"];

  useEffect(() => {
    document.title = `Music eXchange | Account`;
    // For demonstration purposes, we mock an API call.
    API.getSavedUsersById(tempId).then((res) => {
      // console.log(res.data)
      if (res.data) {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setFirstName(res.data.profile.firstName);
        setLastName(res.data.profile.lastName);
        setProfession(res.data.profile.profession)
        setAbout(res.data.profile.about);
        setLink1(res.data.profile.link1);
        setLink2(res.data.profile.link2);
        setLink3(res.data.profile.link3);
        setProfilePic(res.data.profile.profilePic);
      }
    });
  }, [submit]);

  /** ===== Upload Profile info ===== */
  // Function to upload and image to Cloudinary
  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', uploadFiles[0]);
    data.append('upload_preset', 'MusiceXchange'); // must be same name as upload
    setLoading(true)
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, // API base url
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json() // get json response
    API.updateProfile(tempId, "profilePic", file.secure_url);
    // setProfilePic(file.secure_url);
    setLoading(false);

    setSubmit(submit + 1); // for some reason incrementing changes the state
  }

  // Upload Profile Information
  const handleSubmit = async () => {
    handleClose(); // closes the modal
    if (infoInput.firstNameInput) await API.updateProfile(tempId, "firstName", infoInput.firstNameInput);
    if (infoInput.lastNameInput) await API.updateProfile(tempId, "lastName", infoInput.lastNameInput);
    if (infoInput.professionInput) await API.updateProfile(tempId, "profession", infoInput.professionInput);
    if (infoInput.aboutInput) await API.updateProfile(tempId, "about", infoInput.aboutInput);
    if (infoInput.link1Input) await API.updateProfile(tempId, "link1", infoInput.link1Input);
    if (infoInput.link2Input) await API.updateProfile(tempId, "link2", infoInput.link2Input);
    if (infoInput.link3Input) await API.updateProfile(tempId, "link3", infoInput.link3Input);

    if (uploadFiles) {
      uploadImage();
    } else {
      setSubmit(submit + 1); // for some reason incrementing changes the state
    }
  }

  /** ===== Bootstrap modal ===== */
  // State and Functions for Bootstrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const uploadFileState = e => {
    const files = e.target.files;
    console.log(files)
    setUploadFiles(files);
  }

  return (
    <Container fluid>
      <h1>{username}</h1>
      <h4>{email}</h4>
      <Row>
        <Col>
          <Button variant="dark" onClick={handleShow}>
            Edit User Profile
          </Button>
        </Col>
      </Row>

      {profilePic ? (
        loading ? (<h3>Loading...</h3>) : (<Image src={profilePic} style={{ width: "350px" }} roundedCircle />)
      ) : (
          <Image src="https://via.placeholder.com/350" roundedCircle />
        )}
      <h4>First name: {firstName}</h4>
      <h4>Last name: {lastName}</h4>
      <h4>Profession: {profession}</h4>
      <h4>Bio: {about}</h4>
      <h4>{link1}</h4>
      <h4>{link2}</h4>
      <h4>{link3}</h4>

      {/** Display Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              {/** Profile Info */}

              <Form.Label>First name:</Form.Label>
              <Form.Control type="text" placeholder="first name"
                name="firstNameInput"
                onChange={inputChange}
              />

              <Form.Label>Last name:</Form.Label>
              <Form.Control type="text" placeholder="last name"
                name="lastNameInput"
                onChange={inputChange}
              />

              <Form.Label>Profession:</Form.Label>
              <Form.Control type="text" placeholder="profession"
                name="professionInput"
                onChange={inputChange}
              />

              <Form.Label>Bio:</Form.Label>
              <Form.Control type="text" placeholder="bio"
                name="aboutInput"
                onChange={inputChange}
              />

              <Form.Label>Website links</Form.Label>
              <Form.Control type="text" placeholder="Link"
                name="link1Input"
                onChange={inputChange}
              />
              <Form.Control type="text" placeholder="Link"
                name="link2Input"
                onChange={inputChange}
              />
              <Form.Control type="text" placeholder="Link"
                name="link3Input"
                onChange={inputChange}
              />
              {/** Upload Pick */}
              <ListGroup>
                <ListGroup.Item>
                  <Form.File
                    id="uploadImageControl"
                    label="Upload Profile Picture:"
                    name="file"
                    onChange={uploadFileState}
                  // onChange={uploadImage}
                  />
                </ListGroup.Item>
              </ListGroup>

            {/** Cropped Pic */}
            {/* <ListGroup>
                <ListGroup.Item>
                  <Cropper onChange={uploadFileState}/>
                  <Form.File
                    id="uploadImageControl"
                    label="Upload Profile Picture:"
                    name="file"
                    onChange={uploadFileState}
                  // onChange={uploadImage}
                  />
                </ListGroup.Item>
              </ListGroup> */}

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/** Buttons */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <input name="file" type="file"
        class="file-upload" data-cloudinary-field="image_id"
        data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/> */}

      {/* <CloudinaryContext cloudName="dxp5wxx2f">
        <Image publicId="sample" format="jpg">
        <Transformation crop="fill" gravity="faces" width="300" height="200"/>
        </Image>
      </CloudinaryContext> */}
    </Container>


  )
}

export default AccountPage;