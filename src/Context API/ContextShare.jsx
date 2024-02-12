import React, { createContext, useState } from 'react'
export const AddProjectResponseContext = createContext()
export const EditProjectResponseContext = createContext()


function ContextShare({children}) {

    const [AddProjectResponse,setAddProjectResponse] = useState("")
    const [EditProjectResponse,setEditProjectResponse] = useState("")


  return (
    <>
        <AddProjectResponseContext.Provider value={{AddProjectResponse,setAddProjectResponse}}>
          <EditProjectResponseContext.Provider value={{EditProjectResponse,setEditProjectResponse}}>
            {children}
            </EditProjectResponseContext.Provider>
        </AddProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare