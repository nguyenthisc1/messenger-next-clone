"use client";

import {
    useGetListUserNotCurrentQuery
} from "@/app/apis/users.api";
import storage from "@/app/helpers/localStorage";
import { useAppSelector } from "@/app/redux/store";
import UserBox from "./user-box";

export default function UserList() {
    const { user } = useAppSelector((state) => state.auth);
    const userStorage = storage.getValueFromKey('user')
    const getListUserNotCurrentApi = useGetListUserNotCurrentQuery(user ? user.email : userStorage);
    
    return (
        <aside
            className="
      fixed 
      inset-y-0 
      pb-20
      lg:pb-0
      lg:left-20 
      lg:w-80 
      lg:block
      overflow-y-auto 
      border-r 
      border-gray-200
      block w-full left-0
    "
        >
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-2xl font-bold text-neutral-800 py-4">
                        People
                    </div>
                </div>
                {getListUserNotCurrentApi.data?.data.map((item: UserItem) => (
                    <UserBox key={item.id} data={item} />
                ))}
            </div>
        </aside>
    );
}
