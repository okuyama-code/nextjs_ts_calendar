import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

const EventModal = () => {
  const [title, setTitle] = useState("");
  
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/3">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">
            {"="}
          </span>
          <div>
            <button  className=" text-gray-400 cursor-pointer">
              <MdDeleteForever />
            </button>
            <button
            // onClick={() => setShowEventModal(false)}
            >
              <span className=" text-gray-400">
                <IoIosClose />
              </span>
            </button>
          </div>
        </header>

        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* <p>{daySelected.format("dddd, MMMM DD")}</p> */}




          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            // onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  )
}

export default EventModal
