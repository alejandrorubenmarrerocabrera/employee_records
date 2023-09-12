"use client"
import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

const queryClient = new QueryClient();


export default function ShowAllUsers() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchAllEmployees />
    </QueryClientProvider>

  )
}

function deleteUser(userId) {

}

function updateUser(userId) {

}

function FetchAllEmployees() {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch("api/getData").then(res => res.json())
  )

    if(isLoading) {
      return <div>Loading...</div>
    }

    if (error) return "An error has occurred: " + error.message
    
    return (
      <div>
        <h1 className='text-3xl m-2'>Employees</h1>
        <ul>
          {data.map(employee => (
            <li key={employee.employee_id}>
              <div>
              Name: {employee.first_name} {employee.last_name}
              </div>
              <div>
                Birthday: {
                  new Date(employee.birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
              }
              </div>
              <div>
              Age: {employee.age}
              </div>
              <div>
              Id: {employee.employee_id}
              </div>
              <button type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              
              >Delete user</button>
              <button type="button"
                class="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              
              >Update user</button>
            </li>
            
          ))}
        </ul>
      </div>
    )
}