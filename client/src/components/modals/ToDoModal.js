import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function ToDoModal(props) {
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.toDoText);
  const [date, setDate] = useState(props.toDoDate);
  const [importance, setImportance] = useState(props.importance);

  const [show, setShow] = useState(false);
  const [toDoObj, setToDoObj] = useState({});

  const handleShow = () => setShow(true);
  const [err, setErr] = useState([]);
  const handleClose = () => {
    setShow(false);
    setErr([]);
  };
  useEffect(() => {
    setToDoObj({
      title: title,
      toDoText: text,
      toDoDate: date,
      importance: importance,
    });
  }, [title, text, date, importance]);
  const handleUpdateReq = (id, toDoObj) => {
    axios
      .patch(`http://localhost:3002/todo/${id}`, toDoObj)
      .then((res) => {
        setErr([]);
        window.location.reload();
      })
      .catch((error) => {
        setErr(error);
      });
  };
  const handleNewToDo = (toDoObj) => {
    console.log(toDoObj);
    axios
      .post(`http://localhost:3002/todo`, toDoObj)
      .then((res) => {
        setErr([]);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setErr(error.response.data.message);
      });
  };
  return (
    <>
      {props.id ? (
        <Button
          variant='primary'
          onClick={handleShow}
          style={{ background: "white", color: "blue" }}
        >
          Update{" "}
        </Button>
      ) : (
        <Button
          variant='primary'
          onClick={handleShow}
          style={{ background: "white", color: "blue" }}
        >
          New To-DO{" "}
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className='Auth-form'
            id='to-do'
            onSubmit={(e) => {
              console.log(err);
              e.preventDefault();
              if (err.length !== 0) e.preventDefault();

              // eslint-disable-next-line no-lone-blocks
              {
                props.id
                  ? handleUpdateReq(props.id, toDoObj)
                  : handleNewToDo(toDoObj);
              }
            }}
          >
            <div className='Auth-form-content'>
              <div className='form-group mt-3'>
                <label>Title</label>

                <input
                  value={title}
                  className='form-control mt-1'
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Title...'
                />
              </div>
              <div className='form-group mt-3'>
                <label>To-Do</label>

                <input
                  className='form-control mt-1'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder='To-Do...'
                />
              </div>
              <div className='form-group mt-3'>
                <label>Date</label>

                <input
                  className='form-control mt-1'
                  value={date}
                  type='date'
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder='Date...'
                />
              </div>
              <div className='form-group mt-3'>
                <label>importance</label>

                <select
                  className='form-control mt-1'
                  value={importance}
                  onChange={(e) => setImportance(e.target.value)}
                >
                  <option value=''>Select Importance</option>
                  <option value='Improtant'>Improtant</option>
                  <option value='Very important'>Very important</option>
                  <option value='Extremly important'>Extremly important</option>
                </select>
              </div>
              {err ? <div style={{ color: "red" }}>{err}</div> : null}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button form='to-do' type='submit' variant='primary'>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ToDoModal;
