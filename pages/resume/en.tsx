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
            <h2 className="text-[20px] font-bold">Emi Chang</h2>
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
        contentTitle="Blockchain community concept website"
        content={<>
          <p><b>Front-end</b></p>
          <p>・React.js</p>
          <p>・Recoil</p>
          <p>・Next.js</p>
          <p>・Storybook</p>
          <p>・Axios</p>
          <p>・TailwindCSS</p>

          <p className="mt-4"><b>Back-end</b></p>
          <p>・Express.js</p>
          <p>・MongoDB/Mongoose</p>
          <p>・Imgur API</p>
          <p>・swagger</p>
          <p>・Third party payment {"(NewebPay)"}</p>
          <p>・WebSocket {"(Chat room)"}</p>
          <p>・JsonWebToken {"(Sign up/Sign in)"}</p>

          <p className="mt-4">
            <Link
              txt="MetaWall (Demo)"
              url="https://metawall-dusky.vercel.app/"
            />
          </p>
          <p><small className="block h-4 font-bold">demo account</small></p>
          <p><small className="block h-4">Account: test@gmail.com</small></p>
          <p><small className="block h-4">Password: 1234qwer</small></p>
          <div className="mt-6">
            {[
              { txt: "Front-end Github", url: "https://github.com/ayugioh2003/metawall" },
              { txt: "Back-end Github", url: "https://github.com/ayugioh2003/metawallBackend" },
              { txt: "Collaborative documents", url: "https://hackmd.io/@ayugioh2003/HyI-c-Gf9/%2FQH2BCKRVS5aCN9EFnUeGsw" },
              { txt: "PowerPoint", url: "https://docs.google.com/presentation/d/16gBUbxeFbYuLoI1Pta_NekDQ22DGRXCV5SF_6RyiIII/edit#slide=id.g133c16ca88c_4_0" },
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
        subTitle="2022"
        imgUrl="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
        contentTitle="DIY your own blog"
        content={<>
          <p>{
            `It is difficult to choose the framework of various blog platforms.
            Why don't you make one yourself!
            Experience the blog forming process from scratch,
            choose your own 100% customizable style features!`
          }</p>

          <p className="mt-4"><b>Front-end</b></p>
          <p>・React.js</p>
          <p>・Next.js</p>
          <p>・Typescript</p>
          <p>・TailwindCSS</p>
          <p>・gray-matter</p>
          <p>・Markdown-it</p>

          <p className="mt-4"><b>Other</b></p>
          <p>・Vercel (CI/CD)</p>

          <p className="mt-4"><b>Under construction</b></p>
          <p>・Website performance optimization</p>
          <p>・SEO</p>
          <p>・Site Search</p>

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
        contentTitle="Used good exchange website"
        content={<>
          <p>
            {`A platform for users to exchange second-hand items.
          Help users to regain their relationship with items,
          Make used goods live longer.
          Create their own simple and happy life.`}
          </p>
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
        title="Our bookcases"
        subTitle="coming soon..."
        imgUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        contentTitle="Share books in our bookcases"
        content={<>
          <p>{
            `If you want to read books, you can only buy books?
            You want to read the books that I have read hundreds of times.
            And I really want the picture book on the dusty shelf at his house.

            Make my bookcase your bookcase.
            Let's share good books together and enjoy reading!`
          }</p>
          <p className="mt-3 text-gray-400">coming soon...</p>
        </>}
      />

      <Divider />

      <SectionTitle title="WORK EXPERIENCE" />
      <Card
        title="LH Network Service Ltd."
        subTitle="2021.09 - 2022.08 (Department was disbanded.)"
        contentTitle="Front-End Developer"
        content={
          <CardContentList lists={[
            {
              title: "【Main skills】", contentList: [
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
              title: `【Project】
              RLC(Red Lion Capital) 2022 New Official Website`, contentList: [
                `Independently develop the first version of the website.
                  。Build website architecture
                  。Event Tracking(GA)
                `,
                "Maintain, debug, develop new requirements(main person in charge)",
                "SEO",
                "Cross-browser/cross-device optimization",
              ]
            },
            {
              title: "RLC(Red Lion Capital) 2022 New Trading Website", contentList: [
                "Assist in developing the first version of the website.(More than 40% requirements & functions)",
                `Assist in refactoring legacy site functionality
                  。Mui v4 → v5
                  。Redux → SWR
                  。Update plug-in version
                `,
              ]
            },
            {
              title: "RLC(Red Lion Capital) Official Website (~2021)", contentList: [
                "Maintain, debug, develop new requirements(main person in charge)",
                "Payment function development(CashFlow API)",
                "Event page revision",
                "SEO",
                "Cross-browser/cross-device optimization",
              ]
            },
            {
              title: "RLC(Red Lion Capital) 2022 Trading Website (~2021)", contentList: [
                "Maintain, debug, develop new requirements(main person in charge)",
                "Diversion Registration function development",
                "SEO",
              ]
            },
            {
              title: "RLC(Red Lion Capital) CMS (~2022)", contentList: [
                "Maintenance, debugging and developing new requirements",
              ]
            },
          ]} />
        }
      />
      <Divider lighter />
      <Card
        title="A.T.Information Systems"
        subTitle="2019.08 - 2021.07"
        contentTitle="Full Stack Developer"
        content={
          <CardContentList lists={[
            {
              title: "【Main skills】", contentList: [
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
              title: "NATIONAL KAOHSIUNG NORMAL UNIVERSITY - Document Management System Development",
              contentList: [
                "(Independently) System development, system maintenance、server setup、database construction and maintenance",
                "Old version system data transfer",
                "Acceptance completed within two months after launch",
              ]
            },
            {
              title: "Youth Development Administration(Ministry of Education) - Document Management System Development",
              contentList: [
                "(Independently) System development, system maintenance、server setup、database construction and maintenance",
                "Old version system data transfer",
                "Participate in customer demand interviews",
                "Acceptance completed within three months after launch",
              ]
            },
            {
              title: "National Taiwan University Hospital - Document Management System Development",
              contentList: [
                "(Assist in) System development, system maintenance、server setup、database construction and maintenance",
                "Participate in customer demand interviews",
              ]
            },
            {
              title: "Assist in maintaining document systems",
              contentList: [
                "Taiwan Water Corporation",
                "Tourism Bureau(Ministry of Transportation and Communications)",
                "Shih Hsin University",
                "Other organizations...",
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
              title: "IceWoods Digital Technology", contentList: [
                "〈Barocco Nuts〉Brand website designing and maintenance",
                "〈Playwoods〉EDM planning and designing",
              ]
            },
            {
              title: "Wind Wind International Company Ltd.", contentList: [
                "Wind Wind / Rainbow / Love Handmade promotional materials designing",
              ]
            },
            {
              title: "National Chengchi University", contentList: [
                "《Annals of Zhunan Town》Cover design, graphic drawing",
                "《Taiwan Aboriginal Tribes》Design style, inner page layout designing",
              ]
            },
          ]} />
        }
      />

      <Divider />

      <SectionTitle title="EDUCATION" />
      <Card
        title="National Taiwan University of Science and Technology"
        subTitle="Taipei, Taiwan."
        contentTitle="Department of Commercial Design"
        content={<>
          <p>2010 Annual Campus Makeup Contest</p>
          <p>2014 Graduation Design Exhibition</p>
        </>}
      />
      <Divider lighter />
      <Card
        title="Woomanpower Online School"
        subTitle="Taiwan."
        contentTitle="Marketing class"
        content={<>
          <p>2021 First grade {`(VIP)`}</p>
          <p>2022 Second grade {`(VVIP)`}</p>
        </>}
      />
    </div>
  )
}

export default Index