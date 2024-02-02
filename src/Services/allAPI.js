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