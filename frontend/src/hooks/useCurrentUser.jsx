import { useEffect } from "react";
import api from '../utils/axios.js';
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice.js";

function useCurrentUser()
{
    const dispatch = useDispatch()
    useEffect(() =>
    {
        const get = async () =>
        {
            try {
                const { data } = await api.get("/api/me")
                dispatch(
                    setUserData({
                        ...data.user,
                        _id: data.user._id || data.user.userId,
                    }),
                )
            } catch (error) {
                console.log(error)
            }
        }
        get()
    }, [])
}
export default useCurrentUser;