import React, { useEffect } from 'react';
import { IRootState, useAppDispatch } from '../../../../store';
import { getUsers } from '../../../../store/admin/actionCreators';
import { useSelector } from 'react-redux';
import { IUser } from '../../../../api/admin/types';
import { Button, Card } from 'antd';
import { deleteUser } from '../../../../api/admin';

const AdminUsersPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
      }, []);

    const users = useSelector((state: IRootState) => state.admin.usersData.users);

    const usersToDisplay = users?.userResponseList;

    function handleDeleteUser(id: number) {
        deleteUser({ id }).then(() => {
          dispatch(getUsers());
        })
      }

    const userCard = (e: IUser | undefined) => {
        if (!e) return <></>
        return <Card style={{ margin: "20px" }} title={<h3>{e.firstname + ' ' + e.lastname}</h3>} >
            <p>Email: {<b>{e.email}</b>}</p>
            <p>Registration date: {<b>{e.registrationDate}</b>}</p>
            <p>Balance: {<b>{e.balance}</b>}</p>
            <p>Rating: {<b>{e.rating ?? 0}</b>}</p>
            <div style={{display:"flex",gap:"20px",marginTop:"40px"}}>
                <Button type='primary'>Products</Button>
                <Button danger onClick={() => handleDeleteUser(e.id)}>Delete this user</Button>
            </div>
        </Card>
    }
    return (
        <div>
            {
                usersToDisplay?.length ?
                    usersToDisplay.map(userCard) : <div>No users</div>
            }

        </div>
    );
};

export default AdminUsersPage;