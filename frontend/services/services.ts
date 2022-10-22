 
import {http} from '../api/http'

export type Tasks ={
    _id:string,
    id:string,
    text:string,
    status:boolean,
}

 
    // Perform localStorage action
     
 

 
 
  


export const fetchTasks = async(token:any):Promise<Tasks[]>=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    
    return await http.get('/todo',config);
}

export const createTask = async(data:any,token:any):Promise<Tasks[]>=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
  
    
    return await http.post('/todo',data,config);
}

export const checkTask = async(task:Tasks,token:string ):Promise<Tasks[]>=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await http.patch(`/todo/${task._id}`,task,config);
}

export const deleteTask =async(id:Tasks,token:string):Promise<Tasks[]>=>{
   
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await http.delete(`/todo/${id}`,config)
}

// user services 

export const fetchUser = async(token:any):Promise<Tasks[]>=>{
    const config = {
        headers: { Authorization: `Bearer ${token?.access_token}` }
    };
    return await http.get('/api/user',config);
}

export const signup = async(data:any):Promise<Tasks[]>=>{
    return await http.post('/api/register',data, );
}

export const login = async(data:any):Promise<Tasks[]>=>{
    return await http.post('/api/login',data);
}

export const logout = async():Promise<Tasks[]>=>{
    return await http.post('/api/logout')  ;
}