import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import QrPage2 from './QrPage2';
import { addAnalys, addAnalys2, blocked, deleteAnalysis, getAll, getImage, getOne } from './QrReducer';
import logo from "./image/logo.png"
import { Link, useNavigate } from 'react-router-dom';

function Admin() {
  const dispatch = useDispatch();
  const result = useSelector(state => state.qr.result);
  const error = useSelector(state => state.qr.error);
  const user = useSelector(state => state.qr.user);
  const resultAnalis = useSelector(state => state.qr.resultAnalis);
  const image = useSelector(state => state.qr.image);
  const [show, setShow] = useState(false);
  const [imgId, setImgId] = useState();
  const [show2, setShow2] = useState(false);
  const [file, setFile] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (id) => {
    setImgId(id);
    // dispatch(getImage(id));
    setShow2(true)
  };
  const firstUpdate = useRef(true);
  const history = useNavigate();

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      dispatch(getAll());
    } else {

    }
  }, [user])


  useEffect(() => {
    if (firstUpdate.current) {
      // firstUpdate.current = false;
    } else {
      console.log(image, "image");
    }
  }, [image])

  useEffect(() => {
    if (firstUpdate.current) {
      // firstUpdate.current = false;
    } else {
      toast.success(result);
    }
  }, [result])

  useEffect(() => {
    if (firstUpdate.current) {
      // firstUpdate.current = false;
    } else {
      toast.error(error);
      toast.error(error?.data);
      // toast.error(error?.text);
      // toast.success(result);
    }
  }, [error])

  const submitAnaliys = (e) => {
    e.preventDefault();
    // var file = e.target
    var data = new FormData();
    data.append('files', file);
    dispatch(addAnalys(data));
    // dispatch(addAnalys2(data));
    console.log(data, "dataaa");
  }

  const getFile = (e) => {
    setFile(e.target.files[0])
    // history("/");
  }

  return (
    <div className='position-relative'>

      <div className='leftBar'>
        <a href="/" className='photo'  >
          <img src={logo} alt="" width={"100%"} />
          <span className='textLine'>LIfe line Laboratory</span>
        </a>
      </div>

      <Link to={'/page'}>
        <Button>Push to page</Button>
      </Link>



      <div className='headerMenu'>
        <div className='row justify-content-center text-capitalize'>
          <Button variant="outline-success" onClick={handleShow}>
            Bemorni kiritish
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Id</th>
            </tr>
            <tbody>
              {user?.map((item, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td onClick={() => handleShow2(item.id)}>{item.name}</td>
                  <td>{item.id}</td>
                </tr>
              )}
            </tbody>
          </thead>
        </Table>
        <div>

        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Bemorni  Kiritish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitAnaliys} id="analysSubmit">
              <Form.Label>Laboratory (name) / Лаборатория (название): </Form.Label>
              <Form.Control name={'file'} type="file" accept="image/*" onChange={getFile} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Yopish
            </Button>
            <Button variant="success" type="submit" form="analysSubmit" >
              Saqlash
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <>
        <Modal show={show2} size="xl" onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>{resultAnalis?.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={"http://185.217.131.74:8899/test/api/img/image/" + imgId} width={200} height={200} />
            {/* <img src={"http://192.168.43.134:8899/test/api/img/image/" + imgId} width={200} height={200} alt={"http://192.168.1.102:8899/test/api/img/" + imgId} /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Yopish
            </Button>

          </Modal.Footer>
        </Modal></>
    </div>
  )
}

export default Admin