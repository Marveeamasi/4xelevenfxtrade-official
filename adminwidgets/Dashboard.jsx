'use client'
import Topbar from './Topbar'
import { TbUsersPlus } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineRequestQuote } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState, useMemo } from "react";
import PieChart from '@/components/PieChart';
import DashboardCard from './DashboardCard';
import Empty from '@/components/Empty';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

Chart.register(CategoryScale);

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [totalApprovedAmount, setTotalApprovedAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        console.log('All users:', usersData)
        const transactionsSnapshot = await getDocs(collection(db, 'userTransactions'));
        let allRequests = [];
    
        transactionsSnapshot.forEach((doc) => {
          const userTransactions = doc.data().requests || [];
          allRequests = allRequests.concat(userTransactions);
        });
         setTransactions(allRequests);
        console.log('All requests:', allRequests);
        const totalApprovedAmount = allRequests.filter(request => request.status === 'approved').reduce((sum, request) => sum + parseFloat(request.amount), 0);
  setTotalApprovedAmount(totalApprovedAmount);
  console.log("Total Approved Amount:", totalApprovedAmount);
        const withdrawalsSnapshot = await getDocs(collection(db, 'userWithdrawals'));
        let allWithdrawals = [];
    
        withdrawalsSnapshot.forEach((doc) => {
          const userWithdrawals = doc.data().withdrawals || [];
          allWithdrawals = allWithdrawals.concat(userWithdrawals);
        });
         setWithdrawals(allWithdrawals);
        console.log('All withdrawals:', allWithdrawals);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
  const data = useMemo(() => [
    {
      id: 1,
      status: 'Approved',
      total: transactions.reduce((acc, req) => req.status === 'approved' ? acc + 1 : acc, 0),
    },
    {
      id: 2,
      status: 'Pending',
      total: transactions.reduce((acc, req) => req.status === 'pending' ? acc + 1 : acc, 0),
    },
    {
      id: 3,
      status: 'Failed',
      total: transactions.reduce((acc, req) => req.status === 'failed' ? acc + 1 : acc, 0),
    },
  ], [transactions]);

  const [chartData, setChartData] = useState({
    labels: data.map((data) => data.status), 
    datasets: [
      {
        label: "Request status",
        data: data.map((data) => data.total),
        backgroundColor: [
          "rgb(0, 255, 255,.5)",
          "rgb(255, 255, 0,.5)",
          "rgb(255, 0, 255,.5)"
        ],
        borderColor: "transparent",
        borderWidth: 0
      }
    ]
  });

 useEffect(() => {
    setChartData({
      labels: data.map((d) => d.status),
      datasets: [
        {
          label: "Request status",
          data: data.map((d) => d.total),
          backgroundColor: [
            "rgb(0, 255, 255,.5)",
            "rgb(255, 255, 0,.5)",
            "rgb(255, 0, 255,.5)",
          ],
          borderColor: "transparent",
          borderWidth: 0,
        },
      ],
    });
  }, [data]);

  return (
    <div className='w-full mb-20'>
      <Topbar title='dashboard'/>
      <div className='flex flex-col p-5 gap-2 max-sm:items-center'>
      <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 sm:px-5 '>
        <DashboardCard title='Total income' Icon={GiMoneyStack} sign='$' amount={totalApprovedAmount}/>
        <DashboardCard title='Total users' Icon={TbUsersPlus} sign='' amount={users? users?.length : 0}/>
        <DashboardCard title='Total requests' Icon={MdOutlineRequestQuote} sign='' amount={transactions? transactions?.length : 0}/>
        <DashboardCard title='Total withdrawals' Icon={BiMoneyWithdraw} sign='' amount={withdrawals? withdrawals?.length : 0}/>
      </div>
      <div className='grid grid-cols-1 gap-5 sm:p-5 mt-5'>
      <div className='bg-[#0a0c0c] rounded-lg flex flex-col w-full justify-center items-center p-5'>
      <h1 className='text-2xl'>Request status overview</h1>
       {transactions?.length>0 ? <PieChart chartData={chartData} /> : <Empty message={'No chart to display yet'}/>}
         </div>
         </div>
     </div>
</div>
  )
}
