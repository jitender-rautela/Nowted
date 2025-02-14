import { useState } from "react";
import axios, {AxiosError} from "axios";

interface ApiState<T> {
    data?: T;
    loading: boolean;
    error?: {
        error?:string,
        message?:string,
    }|null;
}


function useApiRequest<T=any>(){
    const [apiState, setApiState] = useState<ApiState<T>>({
        data : undefined,
        loading:false,
        error:undefined,

    })

    const callApi = async(url:string, method:"GET"|"POST"|"PATCH"|"PUT"|"DELETE", data?: any)=>{
        setApiState((a)=>({...a, loading:true, error:undefined}));

        try{
            const response = await axios({method, url, data});
            setApiState({data:response.data, loading:false,error:undefined});
        }catch(error){
            const axiosError = error as AxiosError<{ error?: string; message?: string }>;

            setApiState({
                data: undefined,
                loading: false,
                error: {
                  error: axiosError.response?.data?.error || "Unknown Error",
                  message: axiosError.response?.data?.message || "Something went wrong!",
                },
              });
        }
    }

    return{...apiState, callApi}
}

export default useApiRequest