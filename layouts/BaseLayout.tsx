import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { contextList } from 'config/config';
import styles from './BaseLayout.module.scss';

type Props = {
  children: JSX.Element,
};

const BaseLayout = ({ children }: Props) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => setShowMenu(state => !state);
  const handleLink = (url: string) => router.push(url);

  return (
    <div className='relative bg-gray-100 min-h-screen'>
      {showMenu &&
        <div className='sm:hidden' onClick={() => handleShowMenu()}>
          <div className='fixed top-0 left-0 w-full min-h-screen bg-[rgba(0,0,0,0.5)]' />
          <div className="fixed mt-10 w-full bg-gray-100">
            {contextList.map(item =>
              <div key={item} onClick={() => handleLink(`/post/${item}`)} className="mx-4 p-2 border-b cursor-pointer hover:text-gray-800 text-gray-500">
                {item}
              </div>
            )}
          </div>
        </div>
      }
      <div className="h-10 border-[rgb(8,145,178,0.3)] bg-white w-full fixed shadow-xl">
        <div className='py-[5px] px-4 flex items-stretch sm:items-baseline max-w-[1000px] mx-auto'>
          <Link href="/">
            <h1 className='mr-auto font-bold text-[20px] text-cyan-700 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap'>笑笑的程式人生</h1>
          </Link>
          <div className="hidden sm:flex">
            {contextList.map(item =>
              <span key={item} onClick={() => handleLink(`/post/${item}`)} className="block ml-4 cursor-pointer text-gray-500">
                {item}
              </span>
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
          <span
            className='text-white font-bold mr-4 cursor-pointer'
            onClick={() => handleLink("/about-me")}
          >關於我</span>
          <a
            className='text-white font-bold mr-4'
            href="https://github.com/bell881122"
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