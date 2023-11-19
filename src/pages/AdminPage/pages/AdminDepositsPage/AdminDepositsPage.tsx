import React, { useEffect } from 'react';
import { IRootState, useAppDispatch } from '../../../../store';
import { getDeposits, getUsers } from '../../../../store/admin/actionCreators';
import { useSelector } from 'react-redux';
import { deleteDeposit } from '../../../../api/admin';
import { IDeposit, IUser } from '../../../../api/admin/types';
import { Button, Card } from 'antd';

const AdminDepositsPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getDeposits());
        dispatch(getUsers());

    }, []);

    const users = useSelector((state: IRootState) => state.admin.usersData.users);
    const deposits = useSelector((state: IRootState) => state.admin.depositsData.deposits);


    function handleDeleteDeposit(data: { approved: boolean, depositId: number }) {
        deleteDeposit(data).then(() => {
            dispatch(getDeposits());
        });
    }


    return (
        <div>


            {deposits?.depositResponseList.map((e: IDeposit) => <Card title={<div>{users?.userResponseList.find((user: IUser) => user.id === e.userId)?.email} wants to deposit {e.sum}$</div>} style={{ margin: "20px" }} key={e.id}>
                <Button type="primary" onClick={() => handleDeleteDeposit({ approved: true, depositId: e.id })}>Approve</Button>
                <Button style={{ marginLeft: "20px" }} onClick={() => handleDeleteDeposit({ approved: false, depositId: e.id })}>Disapprove</Button>
            </Card>)}
        </div>
    );
};

export default AdminDepositsPage;