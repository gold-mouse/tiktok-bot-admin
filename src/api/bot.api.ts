import axios from "../axios"

interface IUserLogin {
    username: string;
    password: string;
}

interface IFollow_favorite {
    username: string;
    link: string;
}

interface ISearchParams {
    keyword: string;
    username: string;
    comment: string;
}

export const closeChromeAPI = async (username: string) => {
    try {
        const response = await axios.get("/close-driver", { params: { username } })
        return response.data
    } catch (error: any) {
        throw new Error(error?.response?.data?.message ?? "Something went wrong!")
    }
}


export const fetch_usersAPI = async () => {
    try {
        const response = await axios.get("/get-users")
        return response.data
    } catch (error: any) {
        throw new Error(error?.response?.data?.message ?? "Something went wrong!")
    }
}

export const searchAPI = async (params: ISearchParams) => {
    try {
        const response = await axios.get("/keyword-search", { params })
        return response.data
    } catch (error: any) {
        throw new Error(error?.response?.data?.message ?? "Something went wrong!")
    }
}

export const loginAPI = async (data: IUserLogin) => {
    try {
        const response = await axios.post("/user-login", data)
        return response.data
    } catch (error: any) {
        throw new Error(error?.response?.data?.message ?? "Something went wrong!")
    }
}

export const botActionAPI = async (data: IFollow_favorite) => {
    try {
        const response = await axios.post("/total-action", data)
        return response.data
    } catch (error: any) {
        throw new Error(error?.response?.data?.message ?? "Something went wrong!")
    }
}
