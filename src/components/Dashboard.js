import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { format } from 'date-fns';
const Dashboard = () => {
  const navigate = useNavigate();
    const [userList, setUserList] = useState([]);

    const formatDate = (dateString) => {
     return format(new Date(dateString), 'dd.MM.yyyy');
   };
   const callApiUserList = async () => {
    try {
    const url= process.env.REACT_APP_API_URL + 'user/userlist';
    const response = await axios.get(url,{
      headers: {
        authtoken: `Bearer ${localStorage.getItem('token')}`,
      },
    });
      setUserList(response.data);
    }
    catch (error) {
      navigate('/login');
    }
  }

  useEffect(() => {
    callApiUserList();
  }, [])
  return (
    <>
            <h1>Available Users</h1>
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Sr No</th>
          <th>User Name</th>
          <th>User Email</th>
          <th>DOB</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {
       userList.length > 0 ? ( userList.map((item, index) => (
           
            <tr key={index + item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{formatDate(item.dob)}</td>
              <td>{formatDate(item.date)}</td>
            </tr>
          )))
          : (
            <tr>
              <td colSpan="6">No Result Found</td>
            </tr>
          )}
        
      </tbody>
    </table>
    </>
  )
}

export default Dashboard
