import React, { useEffect } from "react";
import { IRootState, useAppDispatch } from "../../../../store";
import { getUsers, getWithdraws } from "../../../../store/admin/actionCreators";
import { useSelector } from "react-redux";
import { deleteWithdraw } from "../../../../api/admin";
import { IUser, IWithdraw } from "../../../../api/admin/types";
import { Button, Card, Pagination } from "antd";
import { getUser } from "../../../../store/user/actionCreators";
const limit = 10;
const AdminWithdrawsPage = () => {
  const dispatch = useAppDispatch();
  const [offset, setOffset] = React.useState(0);
  const users = useSelector((state: IRootState) => state.user.allUsers);
  const withdraws = useSelector(
    (state: IRootState) => state.admin.withdrawsData.withdraws
  );

  useEffect(() => {
    dispatch(getWithdraws({ offset, limit }));
  }, [offset]);

  useEffect(() => {
    withdraws?.withdrawResponseList.forEach((withdraw) => {
      if (!users[withdraw.userId]) {
        dispatch(
          getUser({
            id: withdraw.userId,
          })
        );
      }
    });
  }, [withdraws]);

  function handleDeleteWithdraw(data: {
    approved: boolean;
    withdrawId: number;
  }) {
    deleteWithdraw(data).then(() => {
      dispatch(getWithdraws());
    });
  }
  return (
    <div>
      {withdraws?.withdrawResponseList.map((e: IWithdraw) => (
        <Card
          title={
            <div>
              {users[e.userId]?.profile?.firstname} {users[e.userId]?.profile?.lastname} wants to withdraw {e.sum}$
            </div>
          }
          style={{ margin: "20px" }}
          key={e.id}
        >
            <p>Email: <b>{users[e.userId]?.profile?.email}</b></p>
            <p>Phone number: <b>{users[e.userId]?.profile?.phone}</b></p>
          <Button
            type="primary"
            onClick={() =>
              handleDeleteWithdraw({ approved: true, withdrawId: e.id })
            }
          >
            Approve
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
            onClick={() =>
              handleDeleteWithdraw({ approved: false, withdrawId: e.id })
            }
          >
            Disapprove
          </Button>
        </Card>
      ))}
      <Pagination
        onChange={(page) => setOffset(page - 1)}
        defaultCurrent={1}
        className="pagination2"
        total={(withdraws?.totalPages ?? 0) * 10}
      />
    </div>
  );
};

export default AdminWithdrawsPage;
