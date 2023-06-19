import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toDoList } from "../redux/actions/toDoList";
import { login } from "../redux/actions/user";

import { useNavigate } from "react-router-dom";
import ToDoModal from "../components/modals/ToDoModal";
import StatModal from "../components/modals/StatModal";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [reqError, setReqError] = useState();
  const [filter, setFilter] = useState();

  const [showStatModal, setShowStatModal] = useState(false);
  const { toDoList: list } = useSelector((state) => state.toDoList);
  const [stat, setStat] = useState();

  const { loggedUser } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const handleToDoList = (toDo) => {
    dispatch(toDoList(toDo));
  };

  const handleLogout = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3002/users/logout`)
      .then((res) => {
        dispatch(login(null));
        setLoading(false);
        handleToDoList([]);
        navigate("/login");
      })
      .catch((error) => {
        setReqError(error.response.message);
      });
  };

  const handleToDoDelete = (id) => {
    axios
      .delete(`http://localhost:3002/todo/${id}`)
      .then((res) => {})
      .catch((error) => {});
  };

  useEffect(() => {
    loggedUser
      ? axios
          .get(
            `http://localhost:3002/users/${loggedUser?.id}/toDo?page=${page}&limit=2`
          )
          .then((res) => {
            handleToDoList(res.data.data);
            setLoading(false);
            setTotalPages(Math.ceil(res.data.totalResults / 2));
          })
          .catch((error) => {
            setLoading(false);
            setReqError(error?.response.message);
          })
      : navigate("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/users/${loggedUser?.id}/toDo${filter}`)
      .then((res) => {
        setStat(res.data.data);
        setShowStatModal(true);
        console.log(stat);
        console.log(filter);
      })
      .catch((error) => {
        setReqError(error?.response.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  const pages = new Array(totalPages).fill(null).map((v, i) => i);
  return (
    <div>
      <link
        rel='stylesheet'
        // href='https://allyoucan.cloud/cdn/icofont/1.0.1/icofont.css'
        integrity='sha384-jbCTJB16Q17718YM9U22iJkhuGbS0Gd2LjaWb4YJEZToOPmnKDjySVa323U+W7Fv'
      />

      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='osahan-account-page-left shadow-sm bg-white h-100'>
              <div className='border-bottom p-4'>
                <div className='osahan-user text-center'>
                  <div className='osahan-user-media'>
                    <div className='osahan-user-media-body'>
                      <h6 className='mb-2'>{loggedUser?.name}</h6>
                      <p>{loggedUser?.email}</p>
                      <button
                        className='btn btn-sm btn-primary float-right'
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <ul
                className='nav nav-tabs flex-column border-0 pt-4 pl-4 pb-4'
                id='myTab'
                role='tablist'
              >
                {list?.length !== 0 ? (
                  <div>
                    <Button
                      className='text-center align-items-center'
                      variant='primary'
                      style={{
                        backgroundColor: "blue",
                        marginBottom: "0.5rem",
                      }}
                      onClick={() => {
                        setFilter("?importance=Improtant");
                      }}
                    >
                      important
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "blue",
                        marginBottom: "0.5rem",
                      }}
                      className=' text-center align-items-center '
                      variant='primary'
                      onClick={() => {
                        setFilter("?importance=Very important");
                      }}
                    >
                      Very important
                    </Button>{" "}
                    <Button
                      style={{
                        backgroundColor: "blue",
                        marginBottom: "0.5rem",
                      }}
                      className='text-center align-items-center'
                      variant='primary'
                      onClick={() => {
                        setFilter("?importance=Extremly important");
                      }}
                    >
                      Extremly important
                    </Button>
                    <StatModal
                      show={showStatModal}
                      onHide={() => setShowStatModal(false)}
                      statToDo={stat}
                    />
                  </div>
                ) : null}
              </ul>
            </div>
          </div>

          <div className='col-md-9'>
            <div className='osahan-account-page-right shadow-sm bg-white p-4 h-100'>
              <div className='tab-content' id='myTabContent'>
                <div
                  className='tab-pane  fade  active show'
                  id='orders'
                  role='tabpanel'
                  aria-labelledby='orders-tab'
                >
                  <h4 className='font-weight-bold mt-0 mb-4'>To-DO</h4>
                  {totalPages ? (
                    <h6>
                      page {page} of {totalPages}
                    </h6>
                  ) : null}

                  <div className='bg-white card mb-4 order-list shadow-sm'>
                    <div className='gold-members p-4'>
                      <div className='media'>
                        {reqError && (
                          <div style={{ color: "red" }}>{reqError}</div>
                        )}
                        {loading && list.length === 0 ? (
                          <p>Loading...</p>
                        ) : list?.length === 0 ? (
                          <div>
                            <p>No to-do found.</p>
                          </div>
                        ) : (
                          list?.map((value, key) => (
                            <div className='media-body' key={value.id}>
                              <h5 className='mb-2'>{value.title}</h5>
                              <p className='text-gray mb-3'>
                                <i className='icofont-list'></i>{" "}
                                {value.toDoText}
                                <br></br>
                                <i className='icofont-clock-time ml-2'></i>
                                {" Date Issued :  "}
                                {
                                  new Date(value.dateIssued)
                                    .toISOString()
                                    .split("T")[0]
                                }
                                <br />
                                <i className='icofont-clock-time ml-2'></i>
                                {" Date : "}
                                {
                                  new Date(value.toDoDate)
                                    .toISOString()
                                    .split("T")[0]
                                }
                                <br />
                                <i className='icofont-clock-time ml-2'></i>
                                {" Importance : "}
                                {value.importance}
                                <br></br>
                              </p>
                              <div className='float-right'>
                                <ToDoModal {...value} />

                                <a
                                  className='btn btn-sm btn-primary'
                                  href=' '
                                  onClick={() => handleToDoDelete(value.id)}
                                >
                                  <i className='icofont-refresh'></i> Delete
                                </a>
                                <br></br>
                              </div>
                              <hr />
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  {pages.map((pageIndex) => (
                    <Button
                      style={{ margin: "0.5rem" }}
                      color='blue'
                      onClick={() => setPage(pageIndex + 1)}
                    >
                      {pageIndex + 1}
                    </Button>
                  ))}
                  <hr />

                  <ToDoModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
