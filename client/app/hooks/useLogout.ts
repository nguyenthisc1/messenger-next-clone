import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/store";
import { useCallback } from "react";
import storage from "../helpers/localStorage";
import { LOGOUT_SUCCESS } from "../redux/reducer/auth.slice";
import { PATH } from "../constants/path";

export function useLogout() {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const logout = useCallback(() => {
        storage.removeAccessToken()
        storage.removePersist()
        storage.removeValueIntoKey('email')
        dispatch(LOGOUT_SUCCESS())
        router.push(PATH.HOME)
    }, [dispatch, router])

    return logout
}