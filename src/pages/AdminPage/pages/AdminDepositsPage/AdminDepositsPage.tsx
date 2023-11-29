import React, { useEffect } from "react";
import { IRootState, useAppDispatch } from "../../../../store";
import { getDeposits, getUsers } from "../../../../store/admin/actionCreators";
import { useSelector } from "react-redux";
import { deleteDeposit } from "../../../../api/admin";
import { IDeposit, IUser } from "../../../../api/admin/types";
import { Button, Card, Pagination } from "antd";
import { getUser } from "../../../../store/user/actionCreators";

const limit = 10;
const AdminDepositsPage = () => {
  const dispatch = useAppDispatch();
  const [offset, setOffset] = React.useState(0);

  const users = useSelector((state: IRootState) => state.user.allUsers);
  const deposits = useSelector(
    (state: IRootState) => state.admin.depositsData.deposits
  );
  useEffect(() => {
    dispatch(getDeposits({ offset, limit }));
  }, [offset]);

  useEffect(() => {
    deposits?.depositResponseList.forEach((deposit) => {
      if (!users[deposit.userId]) {
        dispatch(
          getUser({
            id: deposit.userId,
          })
        );
      }
    });
  }, [deposits]);

  function handleDeleteDeposit(data: { approved: boolean; depositId: number }) {
    deleteDeposit(data).then(() => {
      dispatch(getDeposits({ offset, limit }));
    });
  }

  return (
    <div>
      {deposits?.depositResponseList.map((e: IDeposit) => (
        <Card
          title={
            <div>
              {users[e.userId]?.profile?.firstname} {users[e.userId]?.profile?.lastname} wants to deposit {e.sum}$
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
              handleDeleteDeposit({ approved: true, depositId: e.id })
            }
            style={{marginTop:"20px"}}
          >
            Approve
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
            onClick={() =>
              handleDeleteDeposit({ approved: false, depositId: e.id })
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
        total={(deposits?.totalPages ?? 0) * 10}
      />
    </div>
  );
};

export default AdminDepositsPage;
