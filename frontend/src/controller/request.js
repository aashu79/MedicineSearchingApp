import axiosInstance from "./axiosInstance";






class Request {
    getRequest = async (url, token)=>{
        const headers = {};
        if(token){
            headers.Authorization = "Bearer " + token;
        }
        try {
            const response = await axiosInstance.get(url, {headers: headers});
            return response;
        } catch (error) {
            throw error;
        }
        }

        postRequest = async (url, token, data)=>{
            try {
                let headers = {};
                if(token){
                    headers.Authorization = "Bearer " + token;
                }
                const response = await axiosInstance.post(url, data, {headers});
                return response;
             } catch(error){
                throw error
             }
        }

        patchRequest = async (url, token, data)=>{
            try {
                let headers = {};
                if(token){
                    headers.Authorization = "Bearer " + token;
                }
                const response = await axiosInstance.patch(url, data, {headers});
                return response;

            } catch (error) {
                throw error;
            }
        }

        deleteRequest = async (url, token)=>{
            try {
                let headers = {};
                console.log()
                if(token){
                    headers.Authorization = "Bearer " + token;
                }
                console.log(headers);
                const response = await axiosInstance.delete(url, {
                    headers
                });
                return response;
            } catch (error) {
                throw error;
            }
        }
}



export default Request;
