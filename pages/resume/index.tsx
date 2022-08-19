import type { NextPage } from "next"
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdMail, } from "react-icons/md";
import Card from "components/Resume/Card";
import CardContentList from "components/Resume/CardContentList";
import SectionTitle from "components/Resume/SectionTitle";
import Divider from "components/Resume/Divider";
import Link from "components/Link";

const Index: NextPage = () => {
  return (
    <div className="my-6 mx-2 sm:mx-4">
      <div className="block md:flex" >
        <div className="block sm:flex">
          <div className="h-36 w-36 mr-4">
            <img className="h-full w-full object-center" src="https://i.imgur.com/M9PuQWb.png" alt="avatar" />
          </div>
          <div className="flex flex-col mt-2 md:mt-0">
            <h1 className="mt-auto text-[40px]">張郁欣</h1>
            <h2 className="text-[20px] font-bold">Yu-hsin Chang</h2>
            <p className="mt-2">Front-end Developer</p>
          </div>
        </div>
        <div className="md:ml-auto mt-6 md:mt-auto">
          <div className="flex my-1">
            <p className="my-auto mr-2"><FaMapMarkerAlt /></p>
            <p>Taipei, Taiwan.</p>
          </div>
          <div className="flex my-1">
            <p className="my-auto mr-2"><MdMail /></p>
            <p>bell881122@gmail.com</p>
          </div>
          <div className="flex my-1">
            <p className="my-auto mr-2"><BsLinkedin /></p>
            <Link
              txt="LinkedIn"
              url="https://www.linkedin.com/in/emi-chang"
            />
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

      <Divider />

      <SectionTitle title="SKILL" />
      <div className="flex-none sm:flex mt-3 justify-between">
        <div className="mb-6">
          <p className="font-bold text-[18px]">Front-end / JS</p>
          <ul className="list-disc ml-5">
            <li>JavaScript(ES6+)</li>
            <li>TypeScript</li>
            <li>React (hook {`&`} component)</li>
            <li>Redux</li>
            <li>Next.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>webpack</li>
          </ul>
        </div>
        <div className="mb-6 mx-0 sm:mx-5">
          <p className="font-bold text-[18px]">Layout</p>
          <ul className="list-disc ml-5">
            <li>Material-UI</li>
            <li>Bootstrap</li>
            <li>TailwindCSS</li>
            <li>Sass / SCSS</li>
            <li>styled-components</li>
            <li>Storybook</li>
          </ul>
        </div>
        <div className="mb-6">
          <p className="font-bold text-[18px]">Back-End / Other</p>
          <ul className="list-disc ml-5">
            <li>Git(GitHub / GitLab)</li>
            <li>RESTful API</li>
            <li>MongoDB</li>
            <li>Firebase</li>
            <li>Nginx</li>
            <li>CI/CD (Drone, Vercel, Jenkins)</li>
            <li>.Net(C#)</li>
            <li>SQL</li>
          </ul>
        </div>
      </div>

      <Divider />

      <SectionTitle title="SIDE PROJECT" />
      <Card
        title="MetaWall"
        subTitle="2022 (with group)"
        imgUrl="https://i.imgur.com/NxCCSY6.png"
        contentTitle="區塊鏈社群概念網站"
        content={<>
          <p><b>前端技術</b></p>
          <p>・React.js</p>
          <p>・Recoil</p>
          <p>・Next.js</p>
          <p>・Storybook</p>
          <p>・Axios</p>
          <p>・TailwindCSS</p>

          <p className="mt-4"><b>後端技術</b></p>
          <p>・Express.js</p>
          <p>・MongoDB/Mongoose</p>
          <p>・Imgur API</p>
          <p>・swagger</p>
          <p>・第三方支付（藍新金流）</p>
          <p>・WebSocket（聊天室）</p>
          <p>・JsonWebToken（註冊登入）</p>

          <p className="mt-4">
            <Link
              txt="MetaWall (Demo)"
              url="https://metawall-dusky.vercel.app/"
            />
          </p>
          <p><small className="block h-4 font-bold">體驗帳密</small></p>
          <p><small className="block h-4">帳號：test@gmail.com</small></p>
          <p><small className="block h-4">密碼：1234qwer</small></p>
          <div className="mt-6">
            {[
              { txt: "前端 Github", url: "https://github.com/ayugioh2003/metawall" },
              { txt: "後端 Github", url: "https://github.com/ayugioh2003/metawallBackend" },
              { txt: "共筆文件", url: "https://hackmd.io/@ayugioh2003/HyI-c-Gf9/%2FQH2BCKRVS5aCN9EFnUeGsw" },
              { txt: "簡報 PPT", url: "https://docs.google.com/presentation/d/16gBUbxeFbYuLoI1Pta_NekDQ22DGRXCV5SF_6RyiIII/edit#slide=id.g133c16ca88c_4_0" },
            ].map(item =>
              <div key={item.txt} className="mr-4">
                <Link
                  txt={item.txt}
                  url={item.url}
                />
              </div>
            )}
          </div>
        </>}
      />
      <Divider lighter />
      <Card
        reverse
        title="Markdown Blog"
        subTitle="2022 (under construction…)"
        imgUrl="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
        contentTitle="自己的部落格自己做"
        content={<>
          <p>{
            `各種部落格平台框架
            挑挑揀揀難以抉擇，
            那不如自己做一個吧！
            從無到有體驗部落格成形過程，
            樣式功能自由搭配，
            100% 客製化的選擇！`
          }</p>

          <p className="mt-4"><b>前端技術</b></p>
          <p>・React.js</p>
          <p>・Next.js</p>
          <p>・Typescript</p>
          <p>・TailwindCSS</p>
          <p>・gray-matter</p>
          <p>・Markdown-it</p>

          <p className="mt-4"><b>其他</b></p>
          <p>・Vercel (CI/CD)</p>

          <p className="mt-4"><b>後續開發規劃</b></p>
          <p>・網站效能優化</p>
          <p>・SEO 優化</p>
          <p>・新增站內搜尋</p>

          <p className="mt-4">
            <Link
              txt="Markdown Blog"
              url="https://www.xiaoxiao.blog/"
            />
          </p>
          <p>
            <Link
              txt="GitHub"
              url="https://github.com/bell881122/markdown-blog"
            />
          </p>
        </>}
      />
      <Divider lighter />
      <Card
        title="Simple Life"
        subTitle="2020-2021"
        imgUrl="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
        contentTitle="二手好物交流網站"
        content={<>
          <p>幫助使用者重新找回和物品的關係，讓好物長壽、讓人生樂活。提供交流二手物品、討論斷捨離議題，協助使用者回頭檢視現今的生活方式，以打造自己的簡單幸福生活。未來計畫將朝物品共享、物資永續利用等，進行平台功能開發與優化。</p>
          <p className="mt-4 font-bold">Dependencies</p>
          <p>
            {`・React v17.0.1 (SPA)
              ・Firebase v8.2.9
              ・Material-UI (RWD)
              ・Moment.js`}
          </p>
          <p className="mt-4">
            <Link
              txt="Simple Life (Demo)"
              url="https://www.simplelife.site/"
            />
          </p>
          <p>
            <Link
              txt="GitHub"
              url="https://github.com/bell881122/SimpleLife"
            />
          </p>
        </>}
      />
      <Divider lighter />
      <Card
        reverse
        title="我們的書櫃"
        subTitle="coming soon..."
        imgUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        contentTitle="分享書籍，共創閱讀體驗"
        content={<>
          <p>{
            `想看書就得買書？
              不買就只能預約圖書館，等到地老天荒？
              我家翻過好幾遍的書你想看，
              他家放在架子上積灰的畫冊我好想要。

              讓我的書櫃變成你的書櫃，
              我們一起分享好書，享受閱讀吧！
              `
          }</p>
          <p className="mt-3 text-gray-400">coming soon...</p>
        </>}
      />

      <Divider />

      <SectionTitle title="WORK EXPERIENCE" />
      <Card
        title="立亨網絡"
        subTitle="2021.09 - present"
        contentTitle="Front-End Developer"
        content={
          <CardContentList lists={[
            {
              title: "【主要使用技能】", contentList: [
                "・React ( hook & class )",
                "・Redux",
                "・Next.js",
                "・SWR",
                "・Material UI ( v4 & v5 )",
                "・Ant Design",
                "・RESTful API",
                "・Drone ( CI / CD )",
              ]
            },
            {
              title: `【負責專案】
              紅獅集團 2022 新版官方網站`, contentList: [
                "・獨立開發初版網站",
                "　。建立網站架構、引入框架",
                "　。UI 刻板",
                "　。網站分析埋點 GA",
                "・網站維護、除錯、開發新需求主要負責人",
                "・網站 SEO 優化",
                "・跨瀏覽器 / 跨裝置體驗優化",
              ]
            },
            {
              title: "紅獅集團 2022 新版交易網站", contentList: [
                "・協助開發初版網站（完成 40% 以上需求&功能）",
                "・協助重構舊版網站功能",
                "　。Mui v4 → v5",
                "　。Redux → SWR",
                "　。套件版本更新",
                "　。其他...",
              ]
            },
            {
              title: "紅獅集團官方網站（~2021）", contentList: [
                "・網站維護、除錯、開發新需求主要負責人",
                "・開發支付頁面、串接金流 API（螞蟻金流 / 網銀轉帳）",
                "・活動專題頁改版",
                "・網站 SEO 優化",
                "・跨瀏覽器 / 跨裝置體驗優化",
              ]
            },
            {
              title: "紅獅集團交易網站（~2021）", contentList: [
                "・網站維護、除錯、開發新需求主要負責人",
                "・友站導流註冊功能開發",
                "・網站 SEO 優化",
              ]
            },
            {
              title: "紅獅集團後台管理系統（~2022）", contentList: [
                "・網站維護、除錯、開發新需求主要負責人",
              ]
            },
          ]} />
        }
      />
      <Divider lighter />
      <Card
        title="安鈦科技"
        subTitle="2019.08 - 2021.07"
        contentTitle="Full Stack Developer"
        content={
          <CardContentList lists={[
            {
              title: "高雄師範大學公文系統管理系統主要負責人", contentList: [
                "・開發系統、維護介面、架設站台、建置維護資料庫",
                "・處理舊版系統資料轉至新系統",
                "・上線後每月完成 20+ 需求數",
                "・上線後兩個月內驗收完成，客戶評價滿意",
              ]
            },
            {
              title: "獨立開發、上線、維護教育部青年署HTML版公文系統", contentList: [
                "・開發系統、維護介面、架設站台、建置維護資料庫",
                "・舊版本系統資料轉檔",
                "・參與客戶需求訪談，第一線了解客戶需求",
                "・上線後三個月內驗收完成，以利業務進行後續收款",
                "・專案自 2020 年 7 月上線至今穩定運作，每月回報維修數在 4 以下",
              ]
            },
            {
              title: "參與團隊開發、上線、維護台大醫院公文系統", contentList: [
                "・專案 2021 年 1 月上線後至今穩定運作",
                "・參與開發每月完成 30+ 需求數",
                "・協助維護並驗收完成",
                "・參與客戶需求訪談，第一線了解客戶需求",
                "・上線後每月協助完成 20+ 需求數",
              ]
            },
            {
              title: "協助維護多家組織公文系統", contentList: [
                "・台灣自來水公司",
                "・世新大學",
                "・交通部觀光局",
                "・其他...",
              ]
            },
          ]} />
        }
      />
      <Divider lighter />
      <Card
        title="Graphic Designer"
        subTitle="2015.02 - 2019.03"
        content={
          <CardContentList lists={[
            {
              title: "冰河森林數位科技", contentList: [
                "〈Barocco Nuts〉品牌網頁設計、維護",
                "〈Playwoods〉品牌 EDM 企劃、設計排版",
              ]
            },
            {
              title: "大風文創出版", contentList: [
                "大風／繪虹／愛手作書系文宣品設計",
              ]
            },
            {
              title: "國立政治大學", contentList: [
                "《竹南鎮誌》封面設計、內頁插圖、圖表繪製",
                "《台灣原住民族部落事典》設計風格、內頁版型規劃",
              ]
            },
          ]} />
        }
      />

      <Divider />

      <SectionTitle title="EDUCATION" />
      <Card
        title="國立臺灣科技大學"
        subTitle="Taipei, taiwan."
        contentTitle="商業設計系"
        content={<>
          <p>2010 年校園化妝競賽</p>
          <p>2014 年設計系畢業成果展</p>
        </>}
      />
      <Divider lighter />
      <Card
        title="女力學院 Woomanpower"
        subTitle="Taiwan."
        contentTitle="行銷一班"
        content={<>
          <p>2021 大一 實體班（VIP）</p>
          <p>2022 大二 進階實體班（VVIP）</p>
        </>}
      />
    </div>
  )
}

export default Index