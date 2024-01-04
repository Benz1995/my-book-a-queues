"use client"
import React,{useState ,useEffect} from 'react';
import { useFormState } from 'react-dom'
import { createQueue } from './actions'
import { redirect } from 'next/navigation'
import swal from 'sweetalert';
export default function Formqueue() {
  const initialState = {
    message: '',
    status: 0,
  }
  const [state, formAction] = useFormState(createQueue, initialState)
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // ตรวจสอบ state ทุกครั้งที่มีการเปลี่ยนแปลง
    console.log('State changed:', state);
    if(state.status ){
      if(state.status == 200){
        swal(state.title, state.message, "success");
        redirect(`/myqueue/${state.queue}`)
      }else{
        swal(state.title, state.message, "warning");
      }
      setIsLoading(false) 
    }
  }, [state]);
  return (
    <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">ระบบจองคิวออนไลน์</h1>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full" action={formAction}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                ชื่อ:
              </label>
              <input
                className="input input-bordered w-full"
                id="name"
                type="text"
                placeholder="ชื่อ"
                name="name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                นามสกุล:
              </label>
              <input
                className="input input-bordered w-full"
                id="surname"
                type="text"
                placeholder="นามสกุล"
                name="surname"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                เบอร์โทร:
              </label>
              <input
                className="input input-bordered w-full "
                id="phone"
                type="text"
                placeholder="เบอร์โทร"
                name="phone"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                อีเมล์:
              </label>
              <input
                className="input input-bordered w-full "
                id="email"
                type="text"
                placeholder="อีเมล์"
                name="email"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="buttun"
                disabled={isLoading}
              >
                จองคิว
              </button>
            </div>
          </form>
    </div>
  );
}

