import React, {useState} from 'react';
import { Button as ButtonAnt, Modal as ModalAnt } from 'antd';
import {fetchUser} from '../../store/userSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store/store';
import classes from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

export const Button: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const user = useSelector((state:RootState) => state.user.usersData);
  const loading = useSelector((state:RootState) => state.user.loading);
  const error = useSelector((state:RootState) => state.user.error);

  const showModal = () => {
    setIsModalOpen(true);
    dispatch(fetchUser());
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  
  return (<div>
    <ButtonAnt type="primary" onClick={showModal}>Open Modal</ButtonAnt>
    <ModalAnt title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {error && (
        <div className={classes.error}>
          Something went wrong; please review your server connection!
        </div>
      )}
      {loading && (
        <FontAwesomeIcon icon={faRotate} style={{ color: "#26c17e" }} spin />
      )}
      {!loading && !error && (
        <ul className={classes.expertiseList}>
          {user.map((el) => (
            <div key={el.id}>
              <div className={classes.expertiseListDate}>
                <ButtonAnt type="text">
                  <div className={classes.date}>{el.name}</div>
                  {/* <div className={classes.date}>email: {el.email}</div>
                  <div className={classes.date}>phone: {el.phone}</div>
                  <div className={classes.date}>website: {el.website}</div> */}
                </ButtonAnt>
              </div>
            </div>
          ))}
        </ul>
      )}
      </ModalAnt>
  </div>)
};

