'use client'
import DashboardCard from '@/components/DashboardCard'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { RiHandCoinFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useContext, useEffect, useMemo, useState } from "react";
import PieChart from '@/components/PieChart';
import WithdrawHistory from '@/components/WithdrawHistory';
import { AuthContext } from '@/context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import Empty from '@/components/Empty';
import Script from 'next/script';



Chart.register(CategoryScale);

export default function page() {

  const {currentUser} = useContext(AuthContext);
  if(!currentUser){ window.location.href = '/login' }
  const [requestItems, setRequestItems] = useState([]);
  const [currents, setCurrents] = useState([]);
  const [totalInitial, setTotalInitial] = useState(0);
  const [totalCurrentAmount, setTotalCurrentAmount] = useState(0);
  const planRates = {
    worker: 12,
    student: 10,
    platinium: 15,
    retirement: 20,
  };

  const planDurations = {
    worker: 30,
    student: 14,
    platinium: 90,
    retirement: 365,
  };

  useEffect(() => { 
    
    const unT = onSnapshot(
      doc(db, 'userTransactions', currentUser?.uid),
      (docSnapshot) => {
        if (docSnapshot?.exists) {
          const requests = docSnapshot?.data()?.requests || [];
          setRequestItems(requests);
        } else {
          console.error("User transactions document not found");
        }
      },
      (error) => {
        console.error("Error fetching transactions data:", error);
      }
    );

   const onC = onSnapshot(
      doc(db, 'userCurrents', currentUser?.uid),
      (docSnapshot) => {
        if (docSnapshot?.exists) {
          const currentData = docSnapshot?.data()?.currents || [];
          setCurrents(currentData);
          console.log(currentData)
          const updateValues = () => {
            const totalIn = currentData.reduce((acc, current) => {
              const initialValue = parseFloat(current.initial);
              if (!isNaN(initialValue)) {
                return acc + initialValue;
              }
              return acc;
            }, 0);
            setTotalInitial(totalIn)
           const totalCur = currentData.reduce((acc, current) => {
            const profit = parseFloat(current.profit);
           
    if (!isNaN(profit)) {
      return acc + profit;
    }
    return acc;
  }, 0);
  setTotalCurrentAmount(totalCur);
       }
        updateValues();
        } else {
          console.error("User currents document not found");
        }
      },
      (error) => {
        console.error("Error fetching currents data:", error);
      }
    );
  
    return () => {
      unT();
      onC();
    };
  }, [currentUser.uid]);

  const data = useMemo(() => [
    {
      id: 1,
      status: 'Approved',
      total: requestItems.reduce((acc, req) => req.status === 'approved' ? acc + 1 : acc, 0),
    },
    {
      id: 2,
      status: 'Pending',
      total: requestItems.reduce((acc, req) => req.status === 'pending' ? acc + 1 : acc, 0),
    },
    {
      id: 3,
      status: 'Failed',
      total: requestItems.reduce((acc, req) => req.status === 'failed' ? acc + 1 : acc, 0),
    },
  ], [requestItems]);

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
    <>
        <Script
        id="livechat-script"
        strategy="lazyOnload" // Load the script lazily to avoid blocking the page load
      >
        {`
          function add_chatinline(){
            var hccid=37670133;
            var nt=document.createElement("script");
            nt.async=true;
            nt.src="https://mylivechat.com/chatinline.aspx?hccid="+hccid;
            var ct=document.getElementsByTagName("script")[0];
            ct.parentNode.insertBefore(nt,ct);
          }
          add_chatinline();
        `}
      </Script>
    <div className='flex w-full'>
      <Sidebar title={'dashboard'}/>
      <div className='w-full'>
      <Topbar title={`${currentUser?.displayName || ''}/ dashboard`}/>
      <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 px-5'>
        <DashboardCard title='Total investment' link={`/invest`} Icon={RiHandCoinFill} sign='$' amount={totalInitial}/>
        <DashboardCard title='Total profit' link={`/currents`} Icon={GiReceiveMoney} sign='$' amount={totalCurrentAmount}/>
        <DashboardCard title='Currents' link={`/currents`} Icon={FaMoneyBillTrendUp} sign='' amount={currents?.length}/>
      </div>
      <div className='grid grid-cols-1 gap-5 p-5'>
      <div className='bg-[#0a0c0c] rounded-lg flex flex-col w-full justify-center items-center p-5'>
      <h1 className='text-2xl'>Request status overview</h1>
       {requestItems?.length>0 ? <PieChart chartData={chartData} /> : <Empty message={'Invest in a trade plan to visualize your transaction requests'}/>}
         </div>
         </div>
         <div className='grid grid-cols-1 p-5 pt-0 mb-20'>
         <div className='bg-[#0a0c0c] rounded-lg flex flex-col w-full justify-center items-center p-5 '>
           <h1 className='text-2xl'>Withdrawal history</h1>
         <WithdrawHistory/>
         </div>
         </div>
      </div>
    </div>
      </>
  )
}
 
