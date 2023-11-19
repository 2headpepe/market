import React, { useEffect } from 'react';
import { IRootState, useAppDispatch } from '../../../../store';
import { getUsers, getWithdraws } from '../../../../store/admin/actionCreators';
import { useSelector } from 'react-redux';
import { deleteWithdraw } from '../../../../api/admin';
import { IUser, IWithdraw } from '../../../../api/admin/types';
import { Button, Card } from 'antd';

const AdminWithdrawsPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getWithdraws());
        dispatch(getUsers());

    }, []);

    const users = useSelector((state: IRootState) => state.admin.usersData.users);
    const withdraws = useSelector((state: IRootState) => state.admin.withdrawsData.withdraws);

    function handleDeleteWithdraw(data: { approved: boolean, withdrawId: number }) {
        deleteWithdraw(data).then(() => {
            dispatch(getWithdraws());
        });
    }
    return (
        <div>

            {withdraws?.withdrawResponseList.map((e: IWithdraw) => <Card title={<div>{users?.userResponseList.find((user: IUser) => user.id === e.userId)?.email} wants to withdraw {e.sum}$</div>} style={{ margin: "20px" }} key={e.id}>
                <Button type="primary" onClick={() => handleDeleteWithdraw({ approved: true, withdrawId: e.id })}>Approve</Button>
                <Button style={{ marginLeft: "20px" }} onClick={() => handleDeleteWithdraw({ approved: false, withdrawId: e.id })}>Disapprove</Button>
            </Card>)}
        </div>
    );
};

export default AdminWithdrawsPage;