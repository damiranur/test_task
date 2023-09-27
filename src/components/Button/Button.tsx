import React, {useState} from 'react';
import { Button as ButtonAnt, Modal as ModalAnt } from 'antd';
import { Table } from 'antd';
import {fetchUser} from '../../store/userSlice';
import { fetchPost } from '../../store/postSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store/store';
import classes from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import type { ColumnsType } from 'antd/es/table';
import { IPostData } from '../../store/types';

export const Button: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const user = useSelector((state:RootState) => state.user.usersData);
  const post = useSelector((state:RootState) => state.post.postsData)
  const loading = useSelector((state:RootState) => state.user.loading);
  const error = useSelector((state:RootState) => state.user.error);
  const [showUser, setShowUser] = useState(false)

  const showModal = () => {
    setIsModalOpen(true);
    dispatch(fetchUser());
    setShowUser(true)
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setShowUser(true)
  };

  const showPosts = (userId: number) => {
    setIsModalOpen(true);
    dispatch(fetchPost(userId));
    setShowUser(false)
  };

  const columns: ColumnsType<IPostData> = [
    {
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
  ];


  
  
  return (<div>
    <ButtonAnt type="primary" onClick={showModal}>Open Modal</ButtonAnt>

    <ModalAnt title="Users" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {error && (
        <div className={classes.error}>
          Something went wrong; please review your server connection!
        </div>
      )}
      {loading && (
        <FontAwesomeIcon icon={faRotate} style={{ color: "#26c17e" }} spin />
      )}
      {!loading && !error && showUser && (
        <table >
          {user.map((el) => (
              <div key={el.id} className={classes.userListDate}>
                <ButtonAnt type="text" onClick={() => showPosts(el.id)}>
                  <div className={classes.userName}>{el.name}</div>
                  
                  {/* <div className={classes.date}>email: {el.email}</div>
                  <div className={classes.date}>phone: {el.phone}</div>
                  <div className={classes.date}>website: {el.website}</div> */}
                </ButtonAnt>
              </div>
          ))}
        </table>
      )}
      {post && !showUser && <Table columns={columns} dataSource={post} />}
      </ModalAnt>
  </div>)
};

