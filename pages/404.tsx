import type { NextPage } from "next"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PageNotFound: NextPage = () => {
  const router = useRouter();
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    if (countDown === 0) router.push("/");

    const interval = setInterval(() => {
      if (countDown > 0)
        setCountDown(state => state - 1)
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown, router]);

  return (
    <main className="m-4">
      <h1 className="text-[40px]">404 Not Found</h1>
      <p>頁面好像失蹤了QQ</p>
      <p><span className="text-red-500">{countDown}</span> 秒後為您導回首頁喔</p>
    </main>
  );
};

export default PageNotFound;