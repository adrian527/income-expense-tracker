import React, { useEffect } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { useSelector, useDispatch } from "react-redux";
import { getProfileAction } from "../../redux/slices/users";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  // get data
  const { error, loading, profile } = useSelector((state) => state.users);

  return (
    <>
      {loading ? (
        <h2 className="text-center text-green-500 text-lg mt-5">Loading...</h2>
      ) : error ? (
        <h2 className="text-red-600 text-center mt-5 text-lg">{error}</h2>
      ) : (
        <>
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  );
};

export default MainDashBoard;
