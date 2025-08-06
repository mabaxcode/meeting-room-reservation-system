"use client"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { FormEventHandler, useRef } from 'react'
import { Head, useForm } from '@inertiajs/react'
import InputError from '@/components/input-error'
import { toast } from "sonner"


type BorangTempahanProps = {
  rooms: { id: number; name: string }[];
};

export default function BorangTempahan({ rooms }: BorangTempahanProps) {

  const formRef = useRef<HTMLFormElement>(null);
  const title = useRef<HTMLSelectElement>(null);
  const reason = useRef<HTMLSelectElement>(null);
  const meeting_room_id = useRef<HTMLSelectElement>(null);
  const remark = useRef<HTMLSelectElement>(null);
  const start_time = useRef<HTMLSelectElement>(null);
  const end_time = useRef<HTMLSelectElement>(null);

  const { errors, post, reset, setData, data } = useForm({
      title: '',
      reason: '',
      meeting_room_id: '',
      remark: '',
      start_time: '',
      end_time: '',
  });

  const saveReservation: FormEventHandler = (e) => {
      e.preventDefault();
      post(route('store.reservation'), {
          preserveScroll: true,
          // onSuccess: () => reset(),
          onSuccess: () => {
            reset(),
            // toast("Berjaya!", {
            //   description: "Tempahan telah berjaya dibuat",
            // })
            toast.success("Berjaya!", {
              description: "Tempahan telah berjaya dibuat",
            })
            console.log('success');
          },
          onError: (errors) => {
              // toast.error("There was a problem submitting the form.")
              if (errors.title) { title.current?.focus(); }
              if (errors.reason) { reason.current?.focus(); }
              if (errors.meeting_room_id) { meeting_room_id.current?.focus(); }
              if (errors.remark) { remark.current?.focus(); }
              if (errors.start_time) { start_time.current?.focus(); }
              if (errors.end_time) { end_time.current?.focus(); }
          },
      });
  };

  const handleCancel = () => {
      if (formRef.current) {
          formRef.current.reset();
      }
  };


  return (
    <form ref={formRef} onSubmit={saveReservation} className="space-y-6">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Borang Tempahan Bilik Mesyuarat</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Sila lengkapkan borang di bawah untuk membuat tempahan bilik mesyuarat.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
              <label htmlFor="tajuk" className="block text-sm/6 font-medium text-gray-900">
                Tajuk
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    // placeholder="janesmith"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />

                  
                </div>
                <InputError className="mt-2" message={errors.title} />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                Agenda
              </label>
              <div className="mt-2">
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  value={data.reason}
                  onChange={(e) => setData('reason', e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <InputError className="mt-2" message={errors.reason} />
              {/* <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p> */}
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                Bilik Mesyuarat
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="meeting_room_id"
                  name="meeting_room_id"
                  autoComplete="bilik-name"
                  value={data.meeting_room_id}
                  onChange={(e) => setData('meeting_room_id', e.target.value)}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>Sila Pilih</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
      
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
              <InputError className="mt-2" message={errors.meeting_room_id} />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                Tarikh & Masa Mula
              </label>
              <div className="mt-2">
                <input
                  id="start_time"
                  name="start_time"
                  type="datetime-local"
                  autoComplete="end_time-val"
                  value={data.start_time}
                  onChange={(e) => setData('start_time', e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <InputError className="mt-2" message={errors.start_time} />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
              Tarikh & Masa Tamat
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="end_time"
                  type="datetime-local"
                  autoComplete="end_time-val"
                  value={data.end_time}
                  onChange={(e) => setData('end_time', e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <InputError className="mt-2" message={errors.end_time} />
            </div>
            

            

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                Catatan
              </label>
              <div className="mt-2">
                <textarea
                  id="remark"
                  name="remark"
                  rows={3}
                  value={data.remark}
                  onChange={(e) => setData('remark', e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {/* <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p> */}
              {/* <InputError className="mt-2" message={errors.remark} /> */}
            </div>

            
          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          
        </div> */}
      </div>

      <div className="flex items-center justify-end gap-x-6">
        <button 
        type="button" 
        className="text-sm/6 font-semibold text-gray-900"
        onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Tempah
        </button>
      </div>
    </form>
  )
}
