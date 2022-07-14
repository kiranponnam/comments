import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MainComponents from "./MainComments";
export const Comments: FC<any> = (props: any) => {
  const userData = useSelector((state: any) => state?.session);
  return (
    <>
      {userData?.data?.payload ? (
        <>
          <MainComponents
            commentsUrl="http://localhost:3004/comments"
            currentUserId="1"
          />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
