/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from 'react';
import { contextList } from 'config/config';
import styles from './BaseLayout.module.scss';

type Props = {
  children: JSX.Element,
};

const BaseLayout = ({ children }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => setShowMenu(state => !state);

  return (
    <div className='relative bg-gray-100 min-h-screen'>
      {showMenu &&
        <div className='sm:hidden' onClick={() => handleShowMenu()}>
          <div className='fixed top-0 left-0 w-full min-h-screen bg-[rgba(0,0,0,0.5)]' />
          <div className="fixed mt-10 w-full bg-gray-100">
            {contextList.map(item =>
              <a key={item} href={`/post/${item}`} className="block mx-4 p-2 border-b cursor-pointer hover:text-gray-800 text-gray-500">
                {item}
              </a>
            )}
          </div>
        </div>
      }
      <div className="h-10 border-[rgb(8,145,178,0.3)] bg-white w-full fixed shadow-xl">
        <div className='py-[5px] px-4 flex items-stretch sm:items-baseline max-w-[1000px] mx-auto'>
          <div className="mr-auto">
            <a href="/">
              <h1 className='mr-auto font-bold text-[20px] text-cyan-700 text-ellipsis overflow-hidden whitespace-nowrap'>笑笑的程式人生</h1>
            </a>
          </div>
          <div className="hidden sm:flex">
            {contextList.map(item =>
              <a key={item} href={`/post/${item}`}>
                <span className="block ml-4 text-gray-500">
                  {item}
                </span>
              </a>
            )}
          </div>
          <div onClick={() => handleShowMenu()} className="sm:hidden w-6 py-[6px] cursor-pointer">
            <div className={showMenu ? styles.closeIcon : styles.menuIcon}></div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-6 px-4 max-w-[1000px] min-h-[calc(100vh-theme(space.8))] mx-auto">
        {children}
      </div>
      <div className="h-8 bg-cyan-700 w-full flex ">
        <small className='my-auto px-4 max-w-[1000px] mx-auto text-gray-300 text-ellipsis overflow-hidden whitespace-nowrap'>
          <a
            href="/about-me"
            className='text-white font-bold mr-3'
          >關於我</a>
          <a
            className='text-white font-bold mr-3'
            href="https://github.com/bell881122/markdown-blog"
            target="_blank"
            rel="noreferrer"
          >Github</a>
          Copyright © Emi {new Date().getFullYear()}
        </small>
      </div>
    </div >
  )
}

export default BaseLayout