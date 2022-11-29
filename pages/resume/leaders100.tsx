import type { NextPage } from "next"
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdMail, } from "react-icons/md";
import Card from "components/Resume/Card";
import CardContentList from "components/Resume/CardContentList";
import SectionTitle from "components/Resume/SectionTitle";
import Divider from "components/Resume/Divider";
import Link from "components/Link";

const Index: NextPage = () => {
  return (
    <div className="my-6 mx-2 sm:mx-4 text-[18px]">

      <div className="block md:flex" >
        <div className="block">
          <div className="h-36 w-36 mr-4">
            <img className="h-full w-full object-center" src="https://i.imgur.com/M9PuQWb.png" alt="avatar" />
          </div>
          <div className="flex flex-col mt-2 md:mt-0">
            <h1 className="mt-auto text-[40px]">張郁欣</h1>
            <h2 className="text-[20px] font-bold">Emi Chang</h2>
            <p className="mt-2">Front-end Developer</p>
          </div>

          <div className="mt-4 text-sm">
            <div className="flex my-1">
              <p className="my-auto mr-2"><FaMapMarkerAlt /></p>
              <p>Taipei, Taiwan.</p>
            </div>
            <div className="flex my-1">
              <p className="my-auto mr-2"><MdMail /></p>
              <p>bell881122@gmail.com</p>
            </div>
            <div className="flex my-1">
              <p className="my-auto mr-2"><AiOutlineGlobal /></p>
              <Link
                txt="Blog"
                url="https://xiaoxiao.blog"
              />
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
        <div className="flex flex-col mt-auto ml-7">
          <p className="font-bold ml-auto">3 年-全端／前端工程師</p>
          <p className="font-bold ml-auto">4 年-視覺／平面設計師</p>
          <p className="mt-4 whitespace-pre-line leading-8 text-justify">
            {`　　想親手打造能給他人帶來價值的網頁／APP 而成為軟體工程師，由全端起步，目前正全心專研網頁前端技術。擁有平面設計、網頁設計經驗，了解如何發想創意，並逐步確認客戶需求。
            　　我喜歡嘗試新事物，熱愛思考和學習，這兩者也都是我的（蓋洛普）天賦。比起發聲更擅長聆聽，察覺他人的需求，樂於在團隊中成為支持者，別人因為自己出的一份力而成功同樣會得到成就感。以成為能夠替他人提供價值、帶來幫助的人為目標，持續提升著自己的專業技能與各種軟實力，想為自己認為更好的世界出一份力。`}
          </p>
        </div>
      </div>
      <Divider />

      <SectionTitle title="SIDE PROJECT" />
      <Card
        reverse
        title="自製部落格"
        subTitle=""
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

          <p className="mt-4">
            <Link
              txt="部落格網址"
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
      <div className="mt-[-50px]"></div>
      <Card
        title="Simple Life"
        subTitle=""
        imgUrl="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
        contentTitle="二手好物交流網站"
        content={<>
          <p>幫助使用者重新找回和物品的關係，讓好物長壽、讓人生樂活。提供交流二手物品、討論斷捨離議題，協助使用者回頭檢視現今的生活方式，以打造自己的簡單幸福生活。未來計畫將朝物品共享、物資永續利用等，進行平台功能開發與優化。</p>
          <p className="mt-4">
            <Link
              txt="Simple Life (Demo 網站)"
              url="https://www.simplelife.site/"
            />
          </p>
          <p className="mt-1">
            <Link
              txt="FB 粉絲專頁"
              url="https://www.facebook.com/simplelifehappiness"
            />
          </p>
          <p className="mt-1">
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
        subTitle=""
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
      <Divider lighter />
      <Card
        title="iThome 鐵人賽"
        subTitle="30 天持續日更挑戰"
        imgUrl="https://i.imgur.com/7zEAU7P.jpg"
        contentTitle="30 天鍊成鐵人"
        content={<>
          <p>iThome 鐵人賽是 IT 行內人矚目的年度慶典。 每年逾千參賽者須以不中斷的 30 天連續寫作，呈現完整的技術主題來爭取獲獎、甚至出版、登台演講等展現自我的舞台。</p>
          <p className="mt-5">
            <p><small className="text-gray-500">2022 年第 14 屆</small></p>
            <p className="font-bold text-[20px]">
              <Link
                txt="就是要搞懂 JavaScript 啦！"
                url="https://ithelp.ithome.com.tw/users/20118140/ironman/5799"
              />
            </p>
            <p>關於 JavaScript 搞不懂的、</p>
            <p>一知半解的、模模糊糊的，</p>
            <p>這一次通通給他弄懂！</p>
          </p>
          <p className="mt-5">
            <p><small className="text-gray-500">2021 年第 13 屆</small></p>
            <p className="font-bold text-[20px]">
              <Link
                txt="前端日常，每天 React 一下"
                url="https://ithelp.ithome.com.tw/users/20118140/ironman/4922"
              />
            </p>
            <p>★ React 基礎概念、常見功能</p>
            <p>★ React Hook 學習筆記</p>
          </p>
          <p className="mt-5">
            <p><small className="text-gray-500">2021 年第 13 屆</small></p>
            <p className="font-bold text-[20px]">
              <Link
                txt="前端補給站，每天一個知識點"
                url="https://ithelp.ithome.com.tw/users/20118140/ironman/4915"
              />
            </p>
            <p>每天整理一個前端知識點，</p>
            <p>建立筆記習慣。</p>
          </p>
          <p className="mt-5">
            <p><small className="text-gray-500">2019 年第 11 屆</small></p>
            <p className="font-bold text-[20px]">
              <Link
                txt="人生第一次的SideProject"
                url="https://ithelp.ithome.com.tw/users/20118140/ironman/2780"
              />
            </p>
            <p>入行成為工程師的自我挑戰，</p>
            <p>做出第一個屬於自己的程式，</p>
            <p>並記錄下其中過程。</p>
          </p>
        </>}
      />

      <Divider />

      <SectionTitle title="EDUCATION" />
      <Card
        title="國立臺灣科技大學"
        subTitle="2010~2014 Taipei, taiwan."
        contentTitle="商業設計系"
        content={<>
          <p>2010 年校園化妝競賽</p>
          <p>2014 年設計系畢業成果展</p>
        </>}
      />
      <Divider lighter />
      <Card
        title="女力學院 Woomanpower"
        subTitle="2021~ Taiwan."
        contentTitle="行銷一班"
        content={<>
          <p>2021 大一 實體班（VIP）</p>
          <p>2022 大二 進階實體班（VVIP）</p>
        </>}
      />

      <Divider />

      <SectionTitle title="WORK EXPERIENCE" />
      <Card
        title="立亨網絡"
        subTitle="2021.09~2022.08 (部門裁撤)"
        contentTitle="Front-End Developer"
        content={
          <CardContentList lists={[
            {
              title: "【主要使用技能】", contentList: [
                "React ( hook & class )",
                "Redux",
                "Next.js",
                "SWR",
                "Material UI ( v4 & v5 )",
                "Ant Design",
                "RESTful API",
                "Drone ( CI / CD )",
              ]
            },
            {
              title: `【負責專案】
              紅獅集團 2022 新版官方網站`, contentList: [
                `獨立開發初版網站
                  。建立網站架構、引入框架
                  。UI 刻板
                  。網站分析埋點 GA
                `,
                "網站維護、除錯、開發新需求主要負責人",
                "網站 SEO 優化",
                "跨瀏覽器 / 跨裝置體驗優化",
              ]
            },
            {
              title: "紅獅集團 2022 新版交易網站", contentList: [
                "協助開發初版網站（完成 40% 以上需求&功能）",
                `協助重構舊版網站功能
                  。Mui v4 → v5
                  。Redux → SWR
                  。套件版本更新
                  。其他...
                `,
              ]
            },
            {
              title: "紅獅集團官方網站（~2021）", contentList: [
                "網站維護、除錯、開發新需求主要負責人",
                "開發支付頁面、串接金流 API（螞蟻金流 / 網銀轉帳）",
                "活動專題頁改版",
                "網站 SEO 優化",
                "跨瀏覽器 / 跨裝置體驗優化",
              ]
            },
            {
              title: "紅獅集團交易網站（~2021）", contentList: [
                "網站維護、除錯、開發新需求主要負責人",
                "友站導流註冊功能開發",
                "網站 SEO 優化",
              ]
            },
            {
              title: "紅獅集團後台管理系統（~2022）", contentList: [
                "網站維護、除錯、開發新需求主要負責人",
              ]
            },
          ]} />
        }
      />
      <Divider lighter />
      <Card
        title="安鈦科技"
        subTitle="2019.08~2021.07"
        contentTitle="Full Stack Developer"
        content={
          <CardContentList lists={[
            {
              title: "【主要使用技能】", contentList: [
                "C#(ASP.NET MVC)",
                "SQL",
                "SSMS",
                "IIS",
                "Angular.js",
                "Knockout.js",
                "Jenkins",
              ]
            },
            {
              title: "高雄師範大學公文管理系統主要負責人", contentList: [
                "開發系統、維護介面、架設站台、建置維護資料庫",
                "處理舊版系統資料轉至新系統",
                "上線後每月完成 20+ 需求數",
                "上線後兩個月內驗收完成，客戶評價滿意",
              ]
            },
            {
              title: "獨立開發、上線、維護教育部青年署HTML版公文系統", contentList: [
                "開發系統、維護介面、架設站台、建置維護資料庫",
                "舊版本系統資料轉檔",
                "參與客戶需求訪談，第一線了解客戶需求",
                "上線後三個月內驗收完成，以利業務進行後續收款",
                "專案自 2020 年 7 月上線至今穩定運作，每月回報維修數在 4 以下",
              ]
            },
            {
              title: "參與團隊開發、上線、維護台大醫院公文系統", contentList: [
                "專案 2021 年 1 月上線後至今穩定運作",
                "參與開發每月完成 30+ 需求數",
                "協助維護並驗收完成",
                "參與客戶需求訪談，第一線了解客戶需求",
                "上線後每月協助完成 20+ 需求數",
              ]
            },
            {
              title: "協助維護多家組織公文系統", contentList: [
                "台灣自來水公司",
                "世新大學",
                "交通部觀光局",
                "其他...",
              ]
            },
          ]} />
        }
      />
      <Divider lighter />
      <Card
        title="Graphic Designer"
        subTitle="2015.02~2019.03"
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
    </div>
  )
}

export default Index;