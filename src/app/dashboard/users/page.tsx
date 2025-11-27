import React, { Suspense } from "react";
import UserListView from "../_components/users/user-list-view";
import { getUsers } from "@/actions/users/get-users";
//-------------------------------

const page = async () => {
  const users = await getUsers();

  return (
    <Suspense
      fallback={
        <div className="h-[calc(100svh-57px)] w-full flex justify-center items-center">
          <span className="loader"></span>
        </div>
      }
    >
      <UserListView users={users} />
    </Suspense>
  );
};

export default page;
