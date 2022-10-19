 
import {http} from '../api/http'

export type Tasks ={
    _id:string,
    id:string,
    text:string,
    status:boolean,
}

export const fetchTasks = async():Promise<Tasks[]>=>{
    return await http.get('/todo');
}

export const createTask = async(data:any,config:any):Promise<Tasks[]>=>{
    return await http.post('/todo',data,config);
}

export const checkTask = async(task:Tasks, ):Promise<Tasks[]>=>{
    return await http.patch(`/todo/${task._id}`,task);
}

export const deleteTask =async(id:Tasks):Promise<Tasks[]>=>{
   
    
    return await http.delete(`/todo/${id}`)
}

// user services 

export const fetchUser = async():Promise<Tasks[]>=>{
    return await http.get('/api/user');
}

export const signup = async(data:any):Promise<Tasks[]>=>{
    return await http.post('/api/register',data);
}

export const login = async(data:any):Promise<Tasks[]>=>{
    return await http.post('/api/login',data);
}

export const logout = async():Promise<Tasks[]>=>{
    return await http.post('/api/logout')  ;
}