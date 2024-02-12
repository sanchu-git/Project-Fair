import { commonAPI } from './commonApi'
import {SERVER_URL} from './serverUrl'

//  register
export const registerAPI = async (user)=>{
   return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

// Login

export const loginAPI = async (user)=>{
   return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

// ADD PROJECT API

export const addProjectAPI = async (reqBody,reqHeader)=>{
   return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

// HOMEPROJECT API

export const getHomeProjectAPI = async ()=>{
   return await commonAPI("GET",`${SERVER_URL}/home-projects`,"","")

}

// ALLPROJECT API

export const getAllProjectAPI = async (searchKey,reqHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader)

}

// USERPROJECT API

export const getUserProjectAPI = async (reqHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)

}

// edi Project

export const editProjectAPI = async (id,reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/project/edit/${id}`,reqBody,reqHeader)
}

// Project/remove

export const deleteProjectAPI = async (id,reqHeader)=>{
   return await commonAPI("DELETE",`${SERVER_URL}/project/remove/${id}`,{},reqHeader)
}

// user/edit

export const updateUserProfileAPI = async (reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}
