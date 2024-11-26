'use client'
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { AuthContext } from "@/context/AuthContext";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { PiUploadFill } from "react-icons/pi";;
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';
import { arrayUnion, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

export default function page({params}) {
  const {currentUser} = useContext(AuthContext) 
  if(!currentUser){ window.location.href = '/login' }
    const [selectMethod, setSelectMethod] = useState('');
    const [copied, setCopied] = useState(false);
    const [isBNB, setIsBNB] = useState(false);
    const [isBTC, setIsBTC] = useState(false);
    const [isUpld, setIsUpld] = useState(false);
    const [file, setFile] = useState(null);
    const [amount, setAmount] = useState('');
    const [selectedPlan, setSelectedPlan] = useState({});
    const[loading, setLoading] = useState(false);
    const planName = params.id;
    const [refId, setRefId] = useState('');

    let imageLink = '';
    const plans = [
      {name: 'worker', rate:'12% Weekly'},
      {name: 'student', rate:'10% Weekly'},
      {name: 'platinium', rate:'15% Weekly'},
      {name: 'retirement', rate:'20% Weekly'},
    ]

  const sendEmail = async (emailData) => {
    try {
        const response = await axios.post('/api/emailRecieve', emailData);
        console.log(response.data.message || 'Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        console.log('Failed to send email. Please try again.');
    }
};
  

    useEffect(()=>{
      const fetchRefId = async()=> {
        try{
        const userDoc = await getDoc(doc(db, 'users', currentUser?.uid));
        if (userDoc.exists()) setRefId(userDoc.data()?.refId);
      }
        catch(err){
          console.log(err)
        }
      }
     fetchRefId();
    },[currentUser?.uid]);

    useEffect(()=>{
      setSelectedPlan(plans.filter(p=> p.name === planName)[0]);
    },[])

    async function captureAndStoreScreenshot(blob, requestId) {
      try {
        setLoading(true);
        imageLink = ''; 
        let downloadURL = '';
        const screenshotRef = ref(storage, `screenshots/${Date.now()}.png`);
        await uploadBytes(screenshotRef, blob);
        downloadURL = await getDownloadURL(screenshotRef);
        if (downloadURL) {
          imageLink = downloadURL;
          await sendScreenshotNotification(
            planName,
            currentUser?.displayName,
            currentUser?.email,
            imageLink,
            requestId,
            amount
          );
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        imageLink = ''; 
        console.error(err);
      }
    }
    
    async function sendScreenshotNotification(planName, username, userEmail, screenshotURL, requestId, amount) {
      setLoading(true)
      await sendEmail({
            to_email: userEmail,
            subject: '4Elevenfxtrade: Transaction request',
            message: `Hi Admin,
            amount: ${amount},
            user: ${username}
            email: ${userEmail}
            screenshotURL: ${screenshotURL}
            plan: ${planName}.
            Visit https://www.4xeleventrade.com/admin for more information.
        `,
        })
        
        .then(async() => {
          await updateDoc(doc(db,'userTransactions',currentUser.uid),{
            requests: arrayUnion({
              id: requestId,
              plan: planName,
              date: Timestamp.now(),
              status: "pending",
              amount: amount,
              user: currentUser.email,
              img: screenshotURL,
              refId: refId,
              userId: currentUser.uid,
              username: currentUser.displayName,
            })
           });
           
          setLoading(false)
        alert('Transfer request has been sent successfully')
        setAmount('');
        setFile(null);
        })
        .catch((error) => {
          setLoading(false)
         alert(error.message)
          console.error('Error sending email:', error);
        });
    }

    const handleCopy = () => {
        const textToCopy = document.querySelector(".copy-text").textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      };

      const handleCopyI = () => {
        const textToCopy = document.querySelector(".copy-textI").textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      };

    const handleChange = (e)=> {
       setSelectMethod(e.target.value)
    }

    const handleUpload = (e)=>{
        setFile(e.target.files[0]);
    }

    useEffect(()=>{
        if(selectMethod==='BTC'){
            setIsBNB(false);
            setIsBTC(true);
            setIsUpld(true);
        }else{
            setIsBNB(false);
            setIsBTC(false);
            setIsUpld(false);
        }
    },[selectMethod])

    const handlePayment = () => {
      setLoading(false)
      const requestId = uuidv4();
     captureAndStoreScreenshot(file, requestId)
    }

  return (
    <div className='flex w-full'>
      <Sidebar title='invest'/>
      <div className='w-full mb-20'>
      <Topbar title={`${currentUser?.displayName || ''}/ payment`}/>
      <div className='flex flex-col p-5 gap-2 max-sm:items-center'>
        <h1 className='text-2xl w-full max-sm:text-center capitalize'>{selectedPlan.name}</h1>
        <h2 className='text-col font-bold w-full max-sm:text-center mt-10'>{`Start earning on an interest rate of up ${selectedPlan.rate}`}</h2>
        <select onChange={handleChange} value={selectMethod} name="" id="" className="bg-transparent mt-5 outline-none p-5 border border-[#00eaff0a] rounded-lg">
            <option value="Choose payment method" className="p-2 text-[#a2a1ab]">Choose payment method</option>
            <option value="BTC" className="p-2 text-[#a2a1ab]">BTC</option>
        </select>
       {isBTC && <div className="p-5 rounded-lg relative bg-[#00eaff0a] w-full flex flex-wrap gap-2 justify-between items-center">
        <span className="copy-text font-[200]">bc1q948zzmmlglurv6vfq8wazjxth3n45w9e6wdy38</span>
        <IoCopy onClick={handleCopy} className="text-3xl text-[#00eaff75] cursor-pointer"/>
        {copied && (
            <div className="absolute bottom-0 right-0 p-2 text-black font-bold bg-[#00eaffb0] rounded-lg">
              Copied!
            </div>
          )}
        </div>}
        {isUpld && <div className="w-full mt-5 flex flex-col max-sm:items-center">
            <h1 className="text-sm max-sm:w-full max-sm:text-center">4elevenfxtrade ensures a secure and safe payment process, please drop a screenshot as proof of payment</h1>
            <input onChange={handleUpload} type="file" id='upload' accept="image/*" className=" hidden"/>
            <label htmlFor="upload" className="flex justify-center items-center w-[300px] py-5 rounded-lg mt-5 border border-[#00eaff15] animate-pulse">
              <PiUploadFill className="text-5xl"/></label>
              {file && <img src={URL.createObjectURL(file)} alt="Selected image" className="w-[300px] rounded-lg h-auto object-contain"/>}
              <input type="number" maxLength={16} onChange={(e)=> setAmount(e.target.value)} placeholder="Enter amount" className="text-center flex justify-center outline-none bg-transparent border-b border-b-[#00eaff15] items-center w-[300px] mt-5"/>
            </div>}
           {file && amount && <button onClick={handlePayment} className="mt-5 bg-col py-5 w-[300px] hover:opacity-[.8] text-black font-bold rounded-lg">Done</button>}
      </div>

      </div>

      {loading && <div className='w-screen h-screen fixed z-[1111] flex justify-center items-center bg-[#000000ea]'>
        <img src="/loader.svg" alt="loading.."/></div>}
    </div>
  )
}
