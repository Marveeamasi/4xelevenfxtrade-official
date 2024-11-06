'use client'
import About from '@/components/About'
import ContactUs from '@/components/ContactUs'
import Count from '@/components/Count'
import CryptoSlider from '@/components/CryptoSlider'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Plans from '@/components/Plans'
import Testimony from '@/components/Testimony'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export default function page() {
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  function generateRandomWalletAddress() {
    return '0x' + Math.floor(Math.random() * 16777215).toString(16);
  }

  function getRandomDollarValue() {
    return Math.floor(Math.random() * 10000);
  }

  const dataStructure = {
    walletAddress: generateRandomWalletAddress(),
    lastDeposit: getRandomDollarValue(), 
    amountWithdrawn: getRandomDollarValue(), 
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = { ...dataStructure };
      const notificationType = Math.random() > 0.5 ? 'deposit' : 'withdrawal';

    toast(`${notificationType} of ${newData[notificationType === 'deposit' ? 'lastDeposit' : 'amountWithdrawn']} from ${newData.walletAddress}`, {
      position: 'bottom-left', 
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

      setNotifications([
        ...notifications,
        {
          type: notificationType,
          amount: newData[notificationType === 'deposit' ? 'lastDeposit' : 'amountWithdrawn'],
          address: newData.walletAddress,
          id: crypto.randomUUID(),
        },
      ]);

      if(data.length>5){
        data.shift();
      }

      setData([...data, newData]);

      setTimeout(() => {
        setNotifications(notifications.filter((n) => n.id !== newData.id));
      }, 2000);
    }, Math.floor(Math.random() * 7000) + 3000);

    return () => clearInterval(intervalId);
  }, [data, notifications]);

  const onLoad = () => {
        console.log('onLoad works!');
    };

  return (
    <>
    <div className='bg-contain bg-no-repeat' style={{backgroundImage: `url('background2.webp')`}}>
    <Header/>
    <div id='home'>
    <Hero/>
    </div>
    <CryptoSlider/>
    <div id='about'>
    <About/>
    </div>
    <HowItWorks/>
    <Count/>
    <div id='plans'>
    <Plans/>
    </div>
    <Testimony data={data} /> 
    <div id='contact'> 
    <ContactUs/>
    </div>
    <Footer/>
    <ToastContainer />
    <TawkMessengerReact propertyId="672b798e4304e3196addf0db" widgetId="1ic0t5uqf" onLoad={onLoad}/>
    </div>
    </>
  )
}
