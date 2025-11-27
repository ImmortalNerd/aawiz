"use client";
import Card from "@/components/main/card";
import { IconSearch } from "@/icons/icon-search";
import { IconUser } from "@/icons/icon-users";
import { IUser } from "@/types/user/user.interface";
import React, { useState } from "react";
//-------------------
type Props = {
  users: IUser[];
};

const UserListView = ({ users }: Props) => {
  const [tableData, setTableData] = useState<IUser[]>(users);

  return (
    <Card>
      <div className="grid grid-rows-[auto_auto_1fr] gap-5 overflow-x-auto">
        <div className="flex gap-3 items-center">
          <IconUser />
          <h1 className="font-semibold">Users</h1>
        </div>
        <div className="flex gap-4 items-center p-3 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900">
          <IconSearch />
          <input
            type="text"
            placeholder="Search Users..."
            className="w-full outline-none bg-transparent"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setTableData(users);
                return;
              }
              setTableData(
                users.filter((user) =>
                  user.name.toLowerCase().includes(value.toLowerCase()) ||
                  user.email.toLowerCase().includes(value.toLowerCase())
                )
              );
            }}
          />
        </div>
        <div className="border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-white dark:bg-slate-900 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700 overflow-y-auto max-h-96">
              {tableData.length > 0 ? (
                tableData.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      index % 2 === 0
                        ? "bg-slate-50 dark:bg-slate-800"
                        : "bg-white dark:bg-slate-900"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {user.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400"
                  >
                    No user found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default UserListView;
