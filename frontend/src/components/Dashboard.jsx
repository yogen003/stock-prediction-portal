import { useEffect } from 'react'
import AxiosInstance from '../AxiosInstance'

const Dashboard = () => {
    useEffect(()=>{
        const fetChProtectedData = async() =>{
            try{
                const response = await AxiosInstance.get('/protected-view/',{
                });
                console.log("Success",response.data);
            }
            catch(error){
                console.log("Error fetching data", error);
            }
        }
        fetChProtectedData()
    }, [])
  return (
    <div className='text-light container'>Dashboard</div>
  )
}

export default Dashboard
