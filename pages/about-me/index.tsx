import type { NextPage } from 'next'
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { MdMail, } from "react-icons/md";
import Link from "components/Link";

const Index: NextPage = () => {
  return (
    <div className='my-6 mx-auto block sm:flex flex-wrap sm:flex-nowrap w-[90%] sm:w-auto'>
      <div
        className='mx-auto sm:mx-0 py-10 px-8 w-min-[500px] sm:w-auto flex flex-col items-center rounded-lg bg-cyan-800 text-gray-300'
        style={{ boxShadow: "4px 4px 12px 3px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="h-36 w-36">
          <img className="h-full w-full rounded-full object-center" src="https://i.imgur.com/cOCeXgk.png" alt="avatar" />
        </div>
        <div className='flex flex-col mt-4 font-bold'>
          <h1 className="mt-auto text-[40px] text-white">Emi Chang</h1>
          <p className="mt-2 ml-1">Front-end Developer</p>
        </div>
        <div className="mt-6">
          <div className="flex my-1">
            <p className="my-auto mr-2"><FaMapMarkerAlt /></p>
            <p>Taipei, Taiwan.</p>
          </div>
          <div className="flex my-1">
            <p className="my-auto mr-2"><MdMail /></p>
            <p>bell881122@gmail.com</p>
          </div>
          <div className="flex my-1">
            <p className="my-auto mr-2"><BsGithub /></p>
            <Link
              txt="GitHub"
              url="https://github.com/bell881122"
            />
          </div>
        </div>
      </div>
      <div className='py-6 sm:py-10 px-4 sm:px-8 leading-relaxed text-[20px] text-center sm:text-left whitespace-pre-line'>
        <p>{
          `2 年全端 + 1 年前端。

           愛好研究各種新技術，
           經常沉迷於 Debug 的成就感。
           各種 Side Project 持續挖坑中。
           
           成為攻城獅後
           自動觸發的謎之事件，
           是草稿匣裡永遠會自動生出
           需要整理的新筆記。
           
           Side Project 夥伴招募中，
           一起來做地圖找書服務吧。

           歡迎私訊討論敲打餵食～`
        }</p>
      </div>
    </div>
  )
}

export default Index