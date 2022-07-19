import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import QrPage2 from './QrPage2';
import { addAnalys, blocked, getAll, getOne } from './QrReducer';

function Admin2() {
  const dispatch = useDispatch();
  const result = useSelector(state => state.qr.result);
  const error = useSelector(state => state.qr.error);
  const user = useSelector(state => state.qr.user);
  const resultAnalis = useSelector(state => state.qr.resultAnalis);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      dispatch(getAll());
    } else {
      console.log(user);
    }
  }, [user])


  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      if (result?.state) {
        toast.success(result?.message);
        dispatch(getAll());
        handleClose();
        console.log(result);
      }
    }
  }, [result])

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      toast.error(error);
      toast.error(error?.data);
      toast.error(error?.text);
    }
  }, [error])

  const submitAnaliys = (e) => {
    e.preventDefault();
    var data = {
      laboratoryName: e.target.laboratoryName.value,
      placeOfSampling: e.target.placeOfSampling.value,
      researchMethod: e.target.researchMethod.value,
      passport: e.target.passport.value,
      fullName: e.target.fullName.value,
      birthDate: new Date(e.target.birthDate.value).getTime(),
      sex: e.target.sex.value,
      analysisDate: new Date(e.target.analysisDate.value).getTime(),
      result: e.target.result.value,
      resultDate: new Date(e.target.resultDate.value).getTime(),
    }
    dispatch(addAnalys(data));
  }

  const wiev = (id) => {
    dispatch(getOne({ id }));
    console.log(id);
    handleShow2();
  }
  const deleted = (id) => {
    dispatch(blocked({ id }));
  }

  return (
    <div>
      <>
        <div className='row justify-content-center text-capitalize'>
          <Button variant="success" onClick={handleShow}>
            Bemorni kiritish
          </Button>
        </div>

        <div>
          <Table bordered hover >
            <thead>
              <tr>
                <th>#</th>
                <th>Laboratory Name</th>
                <th>Place of Sampling</th>
                <th>Research Method</th>
                <th>Passport</th>
                <th>Full Name</th>
                <th>Birth Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {user?.map((item, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.laboratoryName}</td>
                  <td>{item.placeOfSampling}</td>
                  <td>{item.researchMethod}</td>
                  <td>{item.passport}</td>
                  <td>{item.fullName}</td>
                  <td>{item.birthDate}</td>
                  <td>{item?.status ? <Button variant="outline-danger" onClick={() => deleted(item?.uuid)}>Bloklash</Button> : <Button variant="outline-success" onClick={() => deleted(item?.uuid)}>Faollashtirish</Button>}</td>
                  <td><Button variant="outline-info" onClick={() => wiev(item?.uuid)}>Ko'rish</Button></td>
                </tr>
              )}
            </tbody>

          </Table>
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Bemorni  Kiritish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitAnaliys} id="analysSubmit">
              <Form.Label>Laboratory (name) / Лаборатория (название): </Form.Label>
              <Form.Control name={'laboratoryName'} value="LIFE LINE LABORATORY OOO" type="text" disable />
              <Form.Label>Place of sampling / Место забора анализа : </Form.Label>
              <Form.Control name={'placeOfSampling'} value="LIFE LINE LABORATORY OOO" type="text" disable />
              <Form.Label>Research method / Метод исследования: </Form.Label>
              <Form.Control name={'researchMethod'} value="Real-Time Polymerase chain reaction method (Real-Time PCR) / Полимеразная цепная реакция в реальном времени (ПЦР)" disable type="text" />
              <Form.Label>Passport / Серия и номер паспорта: </Form.Label>
              <Form.Control name={'passport'} type="text" required />
              <Form.Label>Full name / Полное имя :</Form.Label>
              <Form.Control name={'fullName'} type="text" required />
              <Form.Label>Birth date / Дата рождения :</Form.Label>
              <Form.Control name={'birthDate'} type="date" required />
              <Form.Label>Sex / Пол :</Form.Label>
              <Form.Select name={'sex'} type="text" required >
                <option value="Male / Мужчина">Male / Мужчина</option>
                <option value="Female / Женщина">Female / Жунщина</option>
              </Form.Select>
              <Form.Label>Test result and date / Результат и дата теста : </Form.Label>
              <Form.Select name={'result'} type="text" required  >
                <option value="Positive / Положительный">Positive / Положительный</option>
                <option value="Negative / Отрицательный">Negative / Отрицательный</option>
              </Form.Select>
              <Form.Label>Analysis date / Дата сдачи анализа : </Form.Label>
              <Form.Control name={'analysisDate'} type="datetime-local" required />
              <Form.Label>Result date / Дата резултата анализа : </Form.Label>
              <Form.Control name={'resultDate'} type="datetime-local" required />
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
      </>
      <>
        <Modal show={show2} size="xl" onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>{resultAnalis?.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QrPage2 resultAnalis={resultAnalis} />
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

export default Admin2;