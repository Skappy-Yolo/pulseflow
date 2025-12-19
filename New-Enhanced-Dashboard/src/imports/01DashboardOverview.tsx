import imgImage from "figma:asset/36666cf855ed553ef9169d386505acc21538cc1b.png";
import imgEllipse1 from "figma:asset/2fcb442e1b4067134ced101d8521c56855441614.png";
import imgFlag from "figma:asset/9d3ac511cbcb8ce0c608547f8c88a40e5068d647.png";
import imgFlag1 from "figma:asset/7923ea30b80329a80bf974bf77664da59a009ef6.png";
import imgImage1 from "figma:asset/d6110f528dd640a6c031ab028e5c9b135605d5c6.png";
import imgFlag2 from "figma:asset/6466f0eb60e2c2e2575fc717930bd8c602774bd9.png";
import imgFlag3 from "figma:asset/5c01b0d6744f73936e382d68736478351324ec5d.png";
import { imgPhosphorNormalMagnifyingGlass, imgOutlineInterfaceCaretDown, imgOutlineInterfaceLayout, imgOutlineStatusNotification, imgOutlineInterfaceArrowUp, imgLeavingUsers, imgLeavingUsers1, imgLeavingUsers2, imgPhosphorNormalCaretDown, imgChart, imgCircle, imgCircle1, imgCircle2, imgLine, imgChart1, imgCircle3, imgLine1, imgPhosphorNormalArrowLeft, imgSolidStatusHeartbeat, imgPhosphorDuotoneHouseLine, imgPhosphorNormalCaretDown1, imgPhosphorNormalNotebook, imgPhosphorNormalLeaf, imgPhosphorNormalBookOpen, imgPhosphorNormalCreditCard, imgEllipse2 } from "./svg-ifekl";

function PhosphorNormalMagnifyingGlass() {
  return (
    <div className="absolute left-4 size-5 top-2.5" data-name="Phosphor/Normal/MagnifyingGlass">
      <img className="block max-w-none size-full" src={imgPhosphorNormalMagnifyingGlass} />
    </div>
  );
}

function InputField() {
  return (
    <div className="bg-[rgba(242,243,244,0.5)] h-10 relative rounded-[4px] shrink-0 w-60" data-name="Input Field">
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-12 text-[#959fa3] text-[14px] text-nowrap" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">Search</p>
      </div>
      <PhosphorNormalMagnifyingGlass />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex gap-1.5 items-center justify-center left-3 top-1.5" data-name="Content">
      <div className="bg-center bg-cover bg-no-repeat rounded-[80px] shrink-0 size-4" data-name="Image" style={{ backgroundImage: `url('${imgImage}')` }} />
      <div className="font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4a5154] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">English</p>
      </div>
    </div>
  );
}

function OutlineInterfaceCaretDown() {
  return (
    <div className="absolute left-[87px] size-6 top-1" data-name="Outline/Interface/Caret down">
      <img className="block max-w-none size-full" src={imgOutlineInterfaceCaretDown} />
    </div>
  );
}

function Language() {
  return (
    <div className="bg-[#f5f6f7] h-8 relative rounded-[4px] shrink-0 w-[116px]" data-name="Language">
      <Content />
      <OutlineInterfaceCaretDown />
    </div>
  );
}

function OutlineInterfaceLayout() {
  return (
    <div className="relative shrink-0 size-5" data-name="Outline/Interface/Layout">
      <img className="block max-w-none size-full" src={imgOutlineInterfaceLayout} />
    </div>
  );
}

function OutlineStatusNotification() {
  return (
    <div className="relative shrink-0 size-5" data-name="Outline/Status/Notification">
      <img className="block max-w-none size-full" src={imgOutlineStatusNotification} />
    </div>
  );
}

function Profile() {
  return (
    <div className="bg-[#ffd599] relative rounded-[100px] shrink-0 size-10" data-name="Profile">
      <div className="absolute left-1 size-8 top-1">
        <img className="block max-w-none size-full" height="32" src={imgEllipse1} width="32" />
      </div>
    </div>
  );
}

function Informations() {
  return (
    <div className="content-stretch flex gap-4 items-center justify-center relative shrink-0" data-name="Informations">
      <Language />
      <OutlineInterfaceLayout />
      <OutlineStatusNotification />
      <Profile />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-between left-[280px] px-10 py-4 top-0 w-[1640px]" data-name="Navigation">
      <InputField />
      <Informations />
      <div className="absolute inset-0 pointer-events-none shadow-[1px_0px_0px_0px_inset_#f2f3f4]" />
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0" data-name="Breadcrumbs">
      <div className="font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Here is all Nolum’s portfolio overview</p>
      </div>
    </div>
  );
}

function Breadcrumbs1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-2 items-start justify-start left-[332px] top-24 w-[1548px]" data-name="Breadcrumbs">
      <div className="font-['Public_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#191b1c] text-[16px] w-[1560px]">
        <p className="leading-[23px]">👋 Hey, Consuela.</p>
      </div>
      <Breadcrumbs />
    </div>
  );
}

function ViewPortfolio() {
  return (
    <div className="absolute h-5 left-[-50px] top-[54px] w-[145px]" data-name="View Portfolio">
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-0 text-[#9ba3a9] text-[14px] text-nowrap top-0">
        <p className="leading-[20px] whitespace-pre">EdTech</p>
      </div>
    </div>
  );
}

function Group33454() {
  return (
    <div className="absolute contents left-[-50px] top-[54px]">
      <ViewPortfolio />
    </div>
  );
}

function Group33455() {
  return (
    <div className="absolute contents left-[-50px] top-[54px]">
      <Group33454 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-20 left-0 top-0 w-52" data-name="Heading">
      <div className="absolute font-['Public_Sans:SemiBold',_sans-serif] font-semibold leading-[0] left-[-50px] text-[#191b1c] text-[24px] text-nowrap top-2">
        <p className="leading-[32px] whitespace-pre">ENIES</p>
      </div>
      <Group33455 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[21px] leading-[0] left-[-50px] text-[#57a7e9] text-[11px] top-[37px] w-[74px]">
        <p className="leading-[20px]">33,471 Users</p>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="absolute h-[52px] left-[66px] top-0 w-56" data-name="Contents">
      <Heading />
    </div>
  );
}

function ViewPortfolio1() {
  return <div className="absolute h-5 left-[103px] top-[73px] w-8" data-name="View Portfolio" />;
}

function Group33477() {
  return (
    <div className="absolute contents left-[103px] top-[73px]">
      <ViewPortfolio1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[336px] left-0 top-0 w-[514px]" data-name="Heading">
      <Contents />
      <Group33477 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[22px] leading-[0] left-[161px] text-[#ff272d] text-[40px] top-[108px] w-[149px]">
        <p className="leading-[20px]">45/100</p>
      </div>
    </div>
  );
}

function Group33456() {
  return (
    <div className="absolute contents left-[84px] top-[158px]">
      <div className="absolute bg-[#cfb5b5] h-[23px] left-[84px] opacity-[0.15] rounded-[4px] top-[158px] w-[303px]">
        <div aria-hidden="true" className="absolute border border-[rgba(255,0,0,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33457() {
  return (
    <div className="absolute contents left-9 top-[252px]">
      <div className="absolute bg-[#009dff] h-10 left-9 opacity-[0.15] rounded-[4px] top-[252px] w-[428px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,149,255,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function ViewPortfolio2() {
  return (
    <div className="absolute h-5 left-[427px] top-[34px] w-8" data-name="View Portfolio">
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-0 text-[#018cfe] text-[14px] text-nowrap top-0">
        <p className="leading-[20px] whitespace-pre">View</p>
      </div>
    </div>
  );
}

function Group33453() {
  return (
    <div className="absolute contents left-[427px] top-[34px]">
      <ViewPortfolio2 />
    </div>
  );
}

function Group33480() {
  return (
    <div className="absolute contents left-[420px] top-[34px]">
      <div className="absolute h-[21px] left-[420px] opacity-50 rounded-[4px] top-[34px] w-[47px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,81,255,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function OutlineInterfaceArrowUp3() {
  return (
    <div className="relative size-6" data-name="Outline/Interface/Arrow up">
      <img className="block max-w-none size-full" src={imgOutlineInterfaceArrowUp} />
    </div>
  );
}

function ChartStatus() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[117px] top-[157px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <OutlineInterfaceArrowUp3 />
        </div>
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#e84646] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">{`Marketing →Sales dropped 15% `}</p>
      </div>
    </div>
  );
}

function Group33458() {
  return (
    <div className="absolute contents left-[18px] top-[204px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[18px] opacity-[0.15] rounded-[4px] top-[204px] w-[122px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33459() {
  return (
    <div className="absolute contents left-[147px] top-[204px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[147px] opacity-[0.15] rounded-[4px] top-[204px] w-[122px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33460() {
  return (
    <div className="absolute contents left-[276px] top-[204px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[276px] opacity-[0.15] rounded-[4px] top-[204px] w-[103px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33461() {
  return (
    <div className="absolute contents left-[386px] top-[205px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[386px] opacity-[0.15] rounded-[4px] top-[205px] w-[107px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33462() {
  return (
    <div className="absolute contents left-[18px] top-[204px]">
      <Group33458 />
      <Group33459 />
      <Group33460 />
      <Group33461 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[21px] leading-[0] left-[22px] text-[#e84646] text-[0px] top-[207px] w-[114px]">
        <p className="leading-[20px] text-[11px] whitespace-pre-wrap">
          <span className="font-['Public_Sans:Medium',_sans-serif] font-medium text-black">{`Marketing: `}</span> <span className="font-['Public_Sans:Medium',_sans-serif] font-medium text-[#2f58ff]">850 leads</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[393px] text-[#e84646] text-[0px] top-[207px] w-[100px]">
        <p className="leading-[20px] text-[11px]">
          <span className="text-black">{`Support: `}</span>
          <span className="text-[#ffae00]">8 tickets</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[150px] text-[#e84646] text-[0px] top-[207px] w-[119px]">
        <p className="leading-[20px] text-[11px]">
          <span className="font-['Public_Sans:Medium',_sans-serif] font-medium text-black">Sales: 45 deals</span>
          <span>{` (-15%)`}</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[280px] text-[#e84646] text-[0px] top-[207px] w-24">
        <p className="leading-[20px] text-[11px]">
          <span className="text-black">{`Product: `}</span>
          <span className="text-[#381e1e]">12 active</span>
        </p>
      </div>
    </div>
  );
}

function LeavingUsers() {
  return (
    <div className="absolute inset-[31.25%_5.84%_47.92%_72.37%]" data-name="Leaving Users">
      <div className="absolute bottom-0 left-[-0.89%] right-[-0.89%] top-[-1.43%]">
        <img className="block max-w-none size-full" src={imgLeavingUsers} />
      </div>
    </div>
  );
}

function ActiveVisitors() {
  return (
    <div className="absolute bg-white h-[336px] left-[333px] rounded-[8px] top-[170px] w-[514px]" data-name="Active Visitors">
      <Heading1 />
      <Group33456 />
      <Group33457 />
      <Group33453 />
      <Group33480 />
      <ChartStatus />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[51px] text-[#e84646] text-[14px] top-[262px] w-[413px]">
        <p className="leading-[20px] whitespace-pre-wrap">
          <span className="text-black">{`Assigned: Kenny M.                   |      `}</span> <span className="text-black">Priority:</span>
          <span>{` High`}</span>
        </p>
      </div>
      <Group33462 />
      <LeavingUsers />
    </div>
  );
}

function Group33481() {
  return (
    <div className="absolute contents left-[333px] top-[170px]">
      <ActiveVisitors />
    </div>
  );
}

function Group33479() {
  return (
    <div className="absolute contents left-[333px] top-[170px]">
      <Group33481 />
    </div>
  );
}

function ViewPortfolio3() {
  return (
    <div className="absolute h-5 left-[-60px] top-[54px] w-[145px]" data-name="View Portfolio">
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#9ba3a9] text-[14px] text-nowrap top-0 whitespace-pre">
        <p className="mb-0">Financial Technology</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Group33482() {
  return (
    <div className="absolute contents left-[-60px] top-[54px]">
      <ViewPortfolio3 />
    </div>
  );
}

function Group33483() {
  return (
    <div className="absolute contents left-[-60px] top-[54px]">
      <Group33482 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-20 left-0 top-0 w-52" data-name="Heading">
      <div className="absolute font-['Public_Sans:SemiBold',_sans-serif] font-semibold leading-[0] left-[-60px] text-[#191b1c] text-[24px] text-nowrap top-0.5">
        <p className="leading-[32px] whitespace-pre">Bunqqi</p>
      </div>
      <Group33483 />
    </div>
  );
}

function Contents1() {
  return (
    <div className="absolute h-[52px] left-[66px] top-0 w-56" data-name="Contents">
      <Heading2 />
    </div>
  );
}

function ViewPortfolio4() {
  return <div className="absolute h-5 left-[103px] top-[73px] w-8" data-name="View Portfolio" />;
}

function Group33484() {
  return (
    <div className="absolute contents left-[103px] top-[73px]">
      <ViewPortfolio4 />
    </div>
  );
}

function Group33485() {
  return (
    <div className="absolute contents left-[108px] top-[141px]">
      <div className="absolute bg-[rgba(17,103,20,0.5)] h-[29px] left-[108px] opacity-[0.15] rounded-[4px] top-[141px] w-60">
        <div aria-hidden="true" className="absolute border border-[#116714] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[260px] left-6 top-3 w-[348px]" data-name="Heading">
      <Contents1 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[21px] leading-[0] left-1.5 text-[#57a7e9] text-[11px] top-[34px] w-[74px]">
        <p className="leading-[20px]">2904 Users</p>
      </div>
      <Group33484 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[22px] leading-[0] left-[161px] text-[#116714] text-[40px] top-[108px] w-[149px]">
        <p className="leading-[20px]">94/100</p>
      </div>
      <Group33485 />
    </div>
  );
}

function Group33486() {
  return (
    <div className="absolute contents left-[31px] top-[262px]">
      <div className="absolute bg-[#009dff] h-10 left-[31px] opacity-[0.15] rounded-[4px] top-[262px] w-[428px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,149,255,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function ViewPortfolio5() {
  return (
    <div className="absolute h-5 left-[427px] top-[34px] w-8" data-name="View Portfolio">
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-0 text-[#018cfe] text-[14px] text-nowrap top-0">
        <p className="leading-[20px] whitespace-pre">View</p>
      </div>
    </div>
  );
}

function Group33487() {
  return (
    <div className="absolute contents left-[427px] top-[34px]">
      <ViewPortfolio5 />
    </div>
  );
}

function Group33488() {
  return (
    <div className="absolute contents left-[420px] top-[34px]">
      <div className="absolute h-[21px] left-[420px] opacity-50 rounded-[4px] top-[34px] w-[47px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,81,255,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function ChartStatus1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[154px] top-[157px]" data-name="Chart Status">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#116714] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">✅ All Systems Performing Well</p>
      </div>
    </div>
  );
}

function LeavingUsers1() {
  return (
    <div className="absolute inset-[25.89%_2.43%_47.92%_72.23%]" data-name="Leaving Users">
      <div className="absolute bottom-0 left-[-0.5%] right-0 top-[-1.14%]">
        <img className="block max-w-none size-full" src={imgLeavingUsers1} />
      </div>
    </div>
  );
}

function Group33489() {
  return (
    <div className="absolute contents left-6 top-[209px]">
      <div className="absolute bg-[#227bff] h-[23px] left-6 opacity-[0.15] rounded-[4px] top-[209px] w-[122px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33490() {
  return (
    <div className="absolute contents left-[153px] top-[209px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[153px] opacity-[0.15] rounded-[4px] top-[209px] w-[122px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33491() {
  return (
    <div className="absolute contents left-[282px] top-[209px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[282px] opacity-[0.15] rounded-[4px] top-[209px] w-[103px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33492() {
  return (
    <div className="absolute contents left-[392px] top-[210px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[392px] opacity-[0.15] rounded-[4px] top-[210px] w-[107px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33463() {
  return (
    <div className="absolute contents left-6 top-[209px]">
      <Group33489 />
      <Group33490 />
      <Group33491 />
      <Group33492 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[21px] leading-[0] left-7 text-[#e84646] text-[0px] top-[212px] w-[114px]">
        <p className="leading-[20px] text-[11px]">
          <span className="text-black">{`Marketing: `}</span>
          <span className="text-[#2f58ff]">622 leads</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[399px] text-[#e84646] text-[0px] top-[212px] w-[100px]">
        <p className="leading-[20px] text-[11px]">
          <span className="text-black">{`Support: `}</span>
          <span className="text-[#ffae00]">22 tickets</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[155px] text-[#e84646] text-[0px] top-[212px] w-[122px]">
        <p className="leading-[20px] text-[11px]">
          <span className="font-['Public_Sans:Medium',_sans-serif] font-medium text-black">{`Sales: 119 deals `}</span>
          <span className="text-[#0faf62]">(</span>
          <span className="text-[#0faf62]">+27</span>
          <span className="text-[#0faf62]">%)</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[286px] text-[#e84646] text-[0px] top-[212px] w-24">
        <p className="leading-[20px] text-[11px]">
          <span className="text-black">Product: 43</span>
          <span className="text-[#381e1e]">{` active`}</span>
        </p>
      </div>
    </div>
  );
}

function ActiveVisitors1() {
  return (
    <div className="absolute bg-white h-[336px] left-[858px] rounded-[8px] top-[170px] w-[508px]" data-name="Active Visitors">
      <Heading3 />
      <Group33486 />
      <Group33487 />
      <Group33488 />
      <ChartStatus1 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[46px] text-[#e84646] text-[14px] top-[272px] w-[413px]">
        <p className="leading-[20px] whitespace-pre-wrap">
          <span className="text-black">{`Assigned: Emmanuel O.               |      `}</span> <span className="text-black">Priority:</span> <span className="text-[#0faf62]">Low</span>
        </p>
      </div>
      <LeavingUsers1 />
      <Group33463 />
    </div>
  );
}

function Group33493() {
  return (
    <div className="absolute contents left-[858px] top-[170px]">
      <ActiveVisitors1 />
    </div>
  );
}

function Group33478() {
  return (
    <div className="absolute contents left-[858px] top-[170px]">
      <Group33493 />
    </div>
  );
}

function ViewPortfolio6() {
  return (
    <div className="absolute h-5 left-[-60px] top-[54px] w-[145px]" data-name="View Portfolio">
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-0 text-[#9ba3a9] text-[14px] text-nowrap top-0">
        <p className="leading-[20px] whitespace-pre">E-commerce</p>
      </div>
    </div>
  );
}

function Group33494() {
  return (
    <div className="absolute contents left-[-60px] top-[54px]">
      <ViewPortfolio6 />
    </div>
  );
}

function Group33495() {
  return (
    <div className="absolute contents left-[-60px] top-[54px]">
      <Group33494 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-20 left-0 top-0 w-52" data-name="Heading">
      <div className="absolute font-['Public_Sans:SemiBold',_sans-serif] font-semibold leading-[0] left-[-60px] text-[#191b1c] text-[24px] text-nowrap top-0.5">
        <p className="leading-[32px] whitespace-pre">Tripids</p>
      </div>
      <Group33495 />
    </div>
  );
}

function Contents2() {
  return (
    <div className="absolute h-[52px] left-[66px] top-0 w-56" data-name="Contents">
      <Heading4 />
    </div>
  );
}

function ViewPortfolio7() {
  return <div className="absolute h-5 left-[103px] top-[73px] w-8" data-name="View Portfolio" />;
}

function Group33496() {
  return (
    <div className="absolute contents left-[103px] top-[73px]">
      <ViewPortfolio7 />
    </div>
  );
}

function Group33497() {
  return (
    <div className="absolute contents left-[108px] top-[141px]">
      <div className="absolute bg-[rgba(17,103,20,0.5)] h-[29px] left-[108px] opacity-[0.15] rounded-[4px] top-[141px] w-60">
        <div aria-hidden="true" className="absolute border border-[#116714] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[260px] left-6 top-3 w-[348px]" data-name="Heading">
      <Contents2 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[21px] leading-[0] left-1.5 text-[#57a7e9] text-[11px] top-[34px] w-[74px]">
        <p className="leading-[20px]">11,182 Users</p>
      </div>
      <Group33496 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[22px] leading-[0] left-[161px] text-[#ff8e00] text-[40px] top-[108px] w-[149px]">
        <p className="leading-[20px]">78/100</p>
      </div>
      <Group33497 />
    </div>
  );
}

function Group33498() {
  return (
    <div className="absolute contents left-[31px] top-[262px]">
      <div className="absolute bg-[#009dff] h-10 left-[31px] opacity-[0.15] rounded-[4px] top-[262px] w-[428px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,149,255,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function ViewPortfolio8() {
  return (
    <div className="absolute h-5 left-[427px] top-[34px] w-8" data-name="View Portfolio">
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-0 text-[#018cfe] text-[14px] text-nowrap top-0">
        <p className="leading-[20px] whitespace-pre">View</p>
      </div>
    </div>
  );
}

function Group33499() {
  return (
    <div className="absolute contents left-[427px] top-[34px]">
      <ViewPortfolio8 />
    </div>
  );
}

function Group33500() {
  return (
    <div className="absolute contents left-[420px] top-[34px]">
      <div className="absolute h-[21px] left-[420px] opacity-50 rounded-[4px] top-[34px] w-[47px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,81,255,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function ChartStatus2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[142px] top-[158px]" data-name="Chart Status">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#5b380c] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">❗Product Adoption below target</p>
      </div>
    </div>
  );
}

function LeavingUsers2() {
  return (
    <div className="absolute inset-[30.96%_3.07%_47.92%_71.52%]" data-name="Leaving Users">
      <div className="absolute bottom-0 left-[-0.48%] right-[-0.61%] top-0">
        <img className="block max-w-none size-full" src={imgLeavingUsers2} />
      </div>
    </div>
  );
}

function Group33501() {
  return (
    <div className="absolute contents left-6 top-[209px]">
      <div className="absolute bg-[#227bff] h-[23px] left-6 opacity-[0.15] rounded-[4px] top-[209px] w-[122px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33502() {
  return (
    <div className="absolute contents left-[153px] top-[209px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[153px] opacity-[0.15] rounded-[4px] top-[209px] w-[122px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33503() {
  return (
    <div className="absolute contents left-[282px] top-[209px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[282px] opacity-[0.15] rounded-[4px] top-[209px] w-[103px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33504() {
  return (
    <div className="absolute contents left-[392px] top-[210px]">
      <div className="absolute bg-[#227bff] h-[23px] left-[392px] opacity-[0.15] rounded-[4px] top-[210px] w-[107px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,92,178,0.93)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Group33505() {
  return (
    <div className="absolute contents left-6 top-[209px]">
      <Group33501 />
      <Group33502 />
      <Group33503 />
      <Group33504 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium h-[21px] leading-[0] left-7 text-[#e84646] text-[0px] top-[212px] w-[114px]">
        <p className="leading-[20px] text-[11px]">
          <span className="text-black">{`Marketing: `}</span>
          <span className="text-[#2f58ff]">332 leads</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[399px] text-[#e84646] text-[0px] top-[212px] w-[100px]">
        <p className="leading-[20px] text-[11px]">
          <span className="text-black">Support: 4</span>
          <span className="text-[#ffae00]">{` tickets`}</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[155px] text-[#e84646] text-[0px] top-[212px] w-[122px]">
        <p className="leading-[20px] text-[11px]">
          <span className="font-['Public_Sans:Medium',_sans-serif] font-medium text-black">{`Sales: 47 deals `}</span>
          <span className="text-[#0faf62]">(</span>
          <span className="text-[#0faf62]">+2</span>
          <span className="text-[#0faf62]">%)</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[286px] text-[#e84646] text-[0px] top-[212px] w-24">
        <p className="leading-[20px] text-[11px]">
          <span className="text-black">Product: 16</span>
          <span className="text-[#381e1e]">{` active`}</span>
        </p>
      </div>
    </div>
  );
}

function ActiveVisitors2() {
  return (
    <div className="absolute bg-white h-[336px] left-[1376px] rounded-[8px] top-[170px] w-[514px]" data-name="Active Visitors">
      <Heading5 />
      <Group33498 />
      <Group33499 />
      <Group33500 />
      <ChartStatus2 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[46px] text-[#e84646] text-[14px] top-[272px] w-[413px]">
        <p className="leading-[20px] whitespace-pre-wrap">
          <span className="text-black">{`Assigned: Dieter Van De Bronc        |  `}</span> <span className="text-black">Priority:</span> <span className="text-[#ff8e00]">Medium</span>
        </p>
      </div>
      <LeavingUsers2 />
      <Group33505 />
    </div>
  );
}

function Group33466() {
  return (
    <div className="absolute contents left-[1376px] top-[170px]">
      <ActiveVisitors2 />
    </div>
  );
}

function PhosphorNormalCaretDown() {
  return (
    <div className="absolute right-2.5 size-4 top-1/2 translate-y-[-50%]" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown} />
    </div>
  );
}

function Chart() {
  return (
    <div className="bg-[#f5f6f7] h-8 relative rounded-[4px] shrink-0 w-[114px]" data-name="Chart">
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-2.5 text-[#4a5154] text-[14px] text-nowrap" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">Industry</p>
      </div>
      <PhosphorNormalCaretDown />
    </div>
  );
}

function Heading6() {
  return (
    <div className="bg-white box-border content-stretch flex items-center justify-between px-6 py-3 relative shrink-0 w-[372px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">My Clients</p>
      </div>
      <Chart />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#e5e7e8]" />
    </div>
  );
}

function Chart1() {
  return (
    <div className="relative shrink-0 size-[154px]" data-name="Chart">
      <div className="absolute inset-[-1.95%_-1.95%_-1.98%_-1.95%]">
        <img className="block max-w-none size-full" src={imgChart} />
      </div>
    </div>
  );
}

function SubHeading() {
  return (
    <div className="bg-[#f5f6f7] box-border content-stretch flex font-['Public_Sans:Medium',_sans-serif] font-medium gap-[59px] items-start justify-start leading-[0] opacity-70 px-6 py-2 relative shrink-0 text-[#4a5154] text-[10px] uppercase w-[400px]" data-name="Sub-Heading">
      <div className="relative shrink-0 w-[87px]">
        <p className="leading-none">Client name</p>
      </div>
      <div className="relative shrink-0 w-20">
        <p className="leading-none">total users</p>
      </div>
      <div className="relative shrink-0 w-[58px]">
        <p className="leading-none">Industry</p>
      </div>
    </div>
  );
}

function PageName() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-[85px]" data-name="Page Name">
      <div className="relative shrink-0 size-2" data-name="Circle">
        <img className="block max-w-none size-full" src={imgCircle} />
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[14px] w-[132px]">
        <p className="leading-[20px]">Tripids</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[84px] items-start justify-start relative shrink-0 w-[376px]" data-name="Row">
      <PageName />
      <div className="font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4a5154] text-[14px] w-[43px]">
        <p className="leading-[20px]">11,182</p>
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0faf62] text-[14px] w-[105px]">
        <p className="leading-[20px]">E-commerce</p>
      </div>
    </div>
  );
}

function PageName1() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-[85px]" data-name="Page Name">
      <div className="relative shrink-0 size-2" data-name="Circle">
        <img className="block max-w-none size-full" src={imgCircle1} />
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[14px] w-[69px]">
        <p className="leading-[20px]">ENIES</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-20 items-start justify-start relative shrink-0 w-[376px]" data-name="Row">
      <PageName1 />
      <div className="font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4a5154] text-[14px] w-[52px]">
        <p className="leading-[20px]">33,471</p>
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0faf62] text-[14px] w-[105px]">
        <p className="leading-[20px]">EdTech</p>
      </div>
    </div>
  );
}

function PageName2() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-[85px]" data-name="Page Name">
      <div className="relative shrink-0 size-2" data-name="Circle">
        <img className="block max-w-none size-full" src={imgCircle2} />
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[14px] w-[132px]">
        <p className="leading-[20px]">Bunqqi</p>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[84px] items-start justify-start relative shrink-0 w-[376px]" data-name="Row">
      <PageName2 />
      <div className="font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4a5154] text-[14px] w-[43px]">
        <p className="leading-[20px]">2904</p>
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0faf62] text-[14px] w-[105px]">
        <p className="leading-[20px]">FinTech</p>
      </div>
    </div>
  );
}

function Tables() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-center justify-center relative shrink-0 w-[400px]" data-name="Tables">
      <SubHeading />
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function MostVisitedPage() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-6 h-[462px] items-center justify-center left-[1466px] overflow-clip pb-6 pt-0 px-0 rounded-[8px] top-[566px] w-[426px]" data-name="Most Visited Page">
      <Heading6 />
      <Chart1 />
      <Tables />
    </div>
  );
}

function XToX() {
  return (
    <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal h-[62px] leading-[0] left-[366px] text-[#b0b7ba] text-[12px] text-nowrap top-[920px] w-[1062px]" data-name="X TO X">
      <div className="absolute left-[52px] top-6">
        <p className="leading-[14px] text-nowrap whitespace-pre">November 01</p>
      </div>
      <div className="absolute left-[406.5px] text-center top-6 translate-x-[-50%]">
        <p className="leading-[14px] text-nowrap whitespace-pre">November 10</p>
      </div>
      <div className="absolute left-[753.5px] text-center top-6 translate-x-[-50%]">
        <p className="leading-[14px] text-nowrap whitespace-pre">November 20</p>
      </div>
      <div className="absolute left-[1038px] text-right top-6 translate-x-[-100%]">
        <p className="leading-[14px] text-nowrap whitespace-pre">November 30</p>
      </div>
    </div>
  );
}

function YToY() {
  return (
    <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal h-[274px] leading-[0] left-[378px] text-[#b0b7ba] text-[12px] text-nowrap top-[650px] w-[21.897px]" data-name="Y TO Y">
      <div className="absolute left-0 top-0">
        <p className="leading-[14px] text-nowrap whitespace-pre">100</p>
      </div>
      <div className="absolute left-0 top-[52px]">
        <p className="leading-[14px] text-nowrap whitespace-pre">80</p>
      </div>
      <div className="absolute left-0 top-[104px]">
        <p className="leading-[14px] text-nowrap whitespace-pre">60</p>
      </div>
      <div className="absolute left-0 top-[156px]">
        <p className="leading-[14px] text-nowrap whitespace-pre">40</p>
      </div>
      <div className="absolute left-0 top-52">
        <p className="leading-[14px] text-nowrap whitespace-pre">20</p>
      </div>
      <div className="absolute left-0 top-[260px]">
        <p className="leading-[14px] text-nowrap whitespace-pre">0</p>
      </div>
    </div>
  );
}

function Line() {
  return (
    <div className="absolute h-[260px] left-[400px] top-[657px] w-[1006px]" data-name="Line">
      <div className="absolute bottom-0 left-0 right-0 top-[-0.38%]">
        <img className="block max-w-none size-full" src={imgLine} />
      </div>
    </div>
  );
}

function ChartBg() {
  return (
    <div className="absolute contents left-[366px] top-[650px]" data-name="Chart BG">
      <XToX />
      <YToY />
      <Line />
    </div>
  );
}

function Chart2() {
  return (
    <div className="absolute inset-[32.93%_26.74%_54.45%_20.83%]" data-name="Chart">
      <div className="absolute bottom-0 left-[-0.1%] right-[-0.1%] top-[-0.37%]">
        <img className="block max-w-none size-full" src={imgChart1} />
      </div>
    </div>
  );
}

function PhosphorNormalCaretDown1() {
  return (
    <div className="absolute right-2.5 size-4 top-1/2 translate-y-[-50%]" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown} />
    </div>
  );
}

function Chart3() {
  return (
    <div className="bg-[#f5f6f7] h-8 relative rounded-[4px] shrink-0 w-[114px]" data-name="Chart">
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-2.5 text-[#4a5154] text-[14px] text-nowrap" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">This Month</p>
      </div>
      <PhosphorNormalCaretDown1 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[670px] items-center justify-start left-[366px] px-6 py-3 top-[566px] w-[1062px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">{`Comparative Client  Performance`}</p>
      </div>
      <Chart3 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#e5e7e8]" />
    </div>
  );
}

function PageName3() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-[73px]" data-name="Page Name">
      <div className="relative shrink-0 size-2" data-name="Circle">
        <img className="block max-w-none size-full" src={imgCircle3} />
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[14px] w-[132px]">
        <p className="leading-[20px]">Bunqqi</p>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="absolute content-stretch flex items-start justify-start left-[599px] top-[991px]" data-name="Row">
      <PageName3 />
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0faf62] text-[14px] w-[72px]">
        <p className="leading-[20px]">+5.4%</p>
      </div>
    </div>
  );
}

function PageName4() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-[71px]" data-name="Page Name">
      <div className="relative shrink-0 size-2" data-name="Circle">
        <img className="block max-w-none size-full" src={imgCircle} />
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[14px] w-[132px]">
        <p className="leading-[20px]">ENIES</p>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="absolute content-stretch flex items-start justify-start left-[426px] top-[991px]" data-name="Row">
      <PageName4 />
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#af0f0f] text-[14px] w-[72px]">
        <p className="leading-[20px]">-8.3%</p>
      </div>
    </div>
  );
}

function Group33464() {
  return (
    <div className="absolute contents left-[366px] top-[566px]">
      <ChartBg />
      <Chart2 />
      <Heading7 />
      <div className="absolute flex inset-[30.25%_28.49%_60.24%_21.41%] items-center justify-center">
        <div className="flex-none h-[158.917px] rotate-[2.586deg] w-[955.808px]">
          <div className="relative size-full" data-name="LINE">
            <div className="absolute inset-[-0.63%_-0.1%]">
              <img className="block max-w-none size-full" src={imgLine1} />
            </div>
          </div>
        </div>
      </div>
      <Row3 />
      <Row4 />
    </div>
  );
}

function Group33465() {
  return (
    <div className="absolute contents left-[366px] top-[566px]">
      <div className="absolute bg-white h-[406px] left-[366px] rounded-[3px] top-[622px] w-[1062px]" />
      <Group33464 />
    </div>
  );
}

function PhosphorNormalCaretDown2() {
  return (
    <div className="absolute right-2.5 size-4 top-1/2 translate-y-[-50%]" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown} />
    </div>
  );
}

function Chart4() {
  return (
    <div className="bg-[#f5f6f7] h-8 relative rounded-[4px] shrink-0 w-[114px]" data-name="Chart">
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-2.5 text-[#4a5154] text-[14px] text-nowrap" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">This Year</p>
      </div>
      <PhosphorNormalCaretDown2 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-between left-[52px] px-6 py-3 top-0 w-[1355px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Product Lifecycles</p>
      </div>
      <Chart4 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#e5e7e8]" />
    </div>
  );
}

function SubChart() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[64.432px] ml-[9.6px] mt-[78.527px] rounded-[40px] w-[12.8px]" data-name="Progress" />
    </div>
  );
}

function SubChart1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0faf62] h-[67px] ml-[7.8px] mt-[76px] rounded-[40px] w-4" data-name="Rounded rectangle" />
    </div>
  );
}

function SubChart2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[39.264px] ml-[9.6px] mt-[103.696px] rounded-[40px] w-[12.8px]" data-name="Progress" />
    </div>
  );
}

function SubChart3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[74.5px] ml-[9.6px] mt-[68.459px] rounded-[40px] w-[12.8px]" data-name="Progress" />
    </div>
  );
}

function SubChart4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[56.378px] ml-[9.6px] mt-[86.581px] rounded-[40px] w-[12.8px]" data-name="Progress" />
    </div>
  );
}

function SubChart5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[69.466px] ml-[9.6px] mt-[73.493px] rounded-[40px] w-[12.8px]" data-name="Progress" />
    </div>
  );
}

function Chart5() {
  return (
    <div className="absolute content-stretch flex h-[151px] items-center justify-between leading-[0] left-32 top-[156px] w-[293px]" data-name="Chart">
      <SubChart />
      <SubChart1 />
      <SubChart2 />
      <SubChart3 />
      <SubChart4 />
      <SubChart5 />
    </div>
  );
}

function SubChart6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[81px] ml-2.5 mt-[62px] rounded-[40px] w-3" data-name="Progress" />
    </div>
  );
}

function SubChart7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[rgba(255,142,0,0.86)] h-[39px] ml-[7.8px] mt-[104px] rounded-[40px] w-4" data-name="Rounded rectangle" />
    </div>
  );
}

function SubChart8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[70px] ml-[9.6px] mt-[73px] rounded-[40px] w-[13px]" data-name="Progress" />
    </div>
  );
}

function SubChart9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[88px] ml-[9.4px] mt-[55px] rounded-[40px] w-[13px]" data-name="Progress" />
    </div>
  );
}

function SubChart10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-28 ml-[9.2px] mt-[31px] rounded-[40px] w-[13px]" data-name="Progress" />
    </div>
  );
}

function SubChart11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[70px] ml-2.5 mt-[73px] rounded-[40px] w-3" data-name="Progress" />
    </div>
  );
}

function Chart6() {
  return (
    <div className="absolute content-stretch flex h-[151px] items-center justify-between leading-[0] left-[583px] top-[158px] w-[293px]" data-name="Chart">
      <SubChart6 />
      <SubChart7 />
      <SubChart8 />
      <SubChart9 />
      <SubChart10 />
      <SubChart11 />
    </div>
  );
}

function SubChart12() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-10 ml-2.5 mt-[103px] rounded-[40px] w-3" data-name="Progress" />
    </div>
  );
}

function SubChart13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#005fe7] h-[70px] ml-[7.8px] mt-[73px] rounded-[40px] w-4" data-name="Rounded rectangle" />
    </div>
  );
}

function SubChart14() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[45px] ml-[9.6px] mt-[98px] rounded-[40px] w-[13px]" data-name="Progress" />
    </div>
  );
}

function SubChart15() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[30px] ml-[9.4px] mt-[113px] rounded-[40px] w-[13px]" data-name="Progress" />
    </div>
  );
}

function SubChart16() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#ff272d] h-[95px] ml-[9.2px] mt-12 rounded-[40px] w-[13px]" data-name="Progress" />
    </div>
  );
}

function SubChart17() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Sub-Chart">
      <div className="[grid-area:1_/_1] bg-[#f0f6ff] h-[149px] ml-0 mt-0 rounded-[40px] w-8" data-name="BG" />
      <div className="[grid-area:1_/_1] bg-[#0e5fd9] h-[69.466px] ml-[9.6px] mt-[73.493px] rounded-[40px] w-[12.8px]" data-name="Progress" />
    </div>
  );
}

function Chart7() {
  return (
    <div className="absolute content-stretch flex h-[151px] items-center justify-between leading-[0] left-[1114px] top-[148px] w-[293px]" data-name="Chart">
      <SubChart12 />
      <SubChart13 />
      <SubChart14 />
      <SubChart15 />
      <SubChart16 />
      <SubChart17 />
    </div>
  );
}

function Group33506() {
  return (
    <div className="absolute contents left-[143px] top-[359px]">
      <div className="absolute bg-[#bababa] h-[39px] left-[143px] opacity-10 rounded-[7px] top-[427px] w-[1279px]">
        <div aria-hidden="true" className="absolute border-[#009c58] border-[3px] border-solid inset-0 pointer-events-none rounded-[7px]" />
      </div>
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-[188px] text-[#005fe7] text-[14px] top-[367px] w-[139px]">
        <p className="leading-[24px]">See Tripids overview</p>
      </div>
      <div className="absolute bg-[#007af9] h-[39px] left-[179px] opacity-10 rounded-[7px] top-[359px] w-[152px]" />
    </div>
  );
}

function Group33467() {
  return (
    <div className="absolute contents left-[679px] top-[359px]">
      <div className="absolute bg-[#007af9] h-[39px] left-[679px] opacity-10 rounded-[7px] top-[359px] w-[152px]" />
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-[688px] text-[#005fe7] text-[14px] top-[367px] w-[139px]">
        <p className="leading-[24px]">See ENIES overview</p>
      </div>
    </div>
  );
}

function Group33468() {
  return (
    <div className="absolute contents left-[1195px] top-[359px]">
      <div className="absolute bg-[#007af9] h-[39px] left-[1195px] opacity-10 rounded-[7px] top-[359px] w-[152px]" />
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-[1204px] text-[#005fe7] text-[14px] top-[367px] w-[139px]">
        <p className="leading-[24px]">See Bunqqi overview</p>
      </div>
    </div>
  );
}

function ProductLifecycle() {
  return (
    <div className="absolute bg-white h-[488px] left-[366px] overflow-clip rounded-[8px] top-[1074px] w-[1526px]" data-name="Product Lifecycle">
      <Heading8 />
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-44 text-[#191b1c] text-[20px] text-nowrap top-[92px]">
        <p className="leading-[24px] whitespace-pre">Marketing → Sales</p>
      </div>
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-36 text-[16px] text-[rgba(0,0,0,0.5)] top-[321px] w-[267px]">
        <p className="leading-[24px]">Tripids ranks 3rd of 5 similar clients</p>
      </div>
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-[604px] text-[16px] text-[rgba(0,0,0,0.5)] top-[321px] w-[271px]">
        <p className="leading-[24px]">ENIES ranks 5th of 5 similar clients</p>
      </div>
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-[1129px] text-[16px] text-[rgba(0,0,0,0.5)] top-[321px] w-[293px]">
        <p className="leading-[24px]">Bunqqi ranks 1st of 5 similar clients</p>
      </div>
      <div className="absolute font-['Public_Sans:Bold',_sans-serif] font-bold leading-[0] left-[652px] text-[#191b1c] text-[20px] text-nowrap top-[92px]">
        <p className="leading-[24px] whitespace-pre">
          <span className="font-['Public_Sans:Regular',_sans-serif] font-normal">Sales</span> <span className="font-['Public_Sans:Regular',_sans-serif] font-normal">→ Product</span>
        </p>
      </div>
      <div className="absolute font-['Public_Sans:Bold',_sans-serif] font-bold leading-[0] left-[1166px] text-[#191b1c] text-[20px] text-nowrap top-[92px]">
        <p className="leading-[24px] whitespace-pre">
          <span className="font-['Public_Sans:Regular',_sans-serif] font-normal">Product</span> <span className="font-['Public_Sans:Regular',_sans-serif] font-normal">→ Support</span>
        </p>
      </div>
      <Chart5 />
      <Chart6 />
      <Chart7 />
      <div className="absolute bg-[#007af9] h-[39px] left-40 opacity-10 rounded-[7px] top-[85px] w-[209px]" />
      <Group33506 />
      <Group33467 />
      <Group33468 />
      <div className="absolute bg-[#ff8e00] h-[39px] left-[625px] opacity-10 rounded-[7px] top-[84px] w-[209px]" />
      <div className="absolute bg-[#00aa60] h-[39px] left-[1146px] opacity-10 rounded-[7px] top-[85px] w-[209px]" />
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-[119px] text-[16px] text-[rgba(0,0,0,0.5)] top-[434px] w-[1303px]">
        <p className="leading-[24px] whitespace-pre-wrap">
          <span className="text-[rgba(255,0,4,0.5)]">{`💡     `}</span>
          <span>{` Bunqqi`}</span>
          <span className="text-[#00aa60]">{` excels at sales conversion`}</span>
          <span>{` but has `}</span>
          <span className="text-[#ff272d]">higher support ticket rates</span>
          <span>{` than sector peers. `}</span>
          <span className="text-[#005fe7]">Recommend analyzing onboarding process for product usability improvements.</span>
        </p>
      </div>
    </div>
  );
}

function PhosphorNormalCaretDown3() {
  return (
    <div className="absolute right-2.5 size-4 top-1/2 translate-y-[-50%]" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown} />
    </div>
  );
}

function Chart8() {
  return (
    <div className="bg-[#f5f6f7] h-8 opacity-0 relative rounded-[4px] shrink-0 w-[114px]" data-name="Chart">
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-2.5 text-[#4a5154] text-[14px] text-nowrap" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">This Month</p>
      </div>
      <PhosphorNormalCaretDown3 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="bg-white box-border content-stretch flex items-center justify-between px-6 py-3 relative shrink-0 w-[372px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">To-Dos</p>
      </div>
      <Chart8 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#e5e7e8]" />
    </div>
  );
}

function PhosphorNormalArrowLeft() {
  return (
    <div className="relative shrink-0 size-5" data-name="Phosphor/Normal/ArrowLeft">
      <img className="block max-w-none size-full" src={imgPhosphorNormalArrowLeft} />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f0f6ff] box-border content-stretch flex gap-2.5 items-start justify-start p-[10px] relative rounded-[100px] shrink-0" data-name="Button">
      <PhosphorNormalArrowLeft />
    </div>
  );
}

function PhosphorNormalArrowLeft1() {
  return (
    <div className="relative shrink-0 size-5" data-name="Phosphor/Normal/ArrowLeft">
      <img className="block max-w-none size-full" src={imgPhosphorNormalArrowLeft} />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f0f6ff] box-border content-stretch flex gap-2.5 items-start justify-start p-[10px] relative rounded-[100px]" data-name="Button">
      <PhosphorNormalArrowLeft1 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[316px]" data-name="Heading">
      <Button />
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191b1c] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">July 2025</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function CalenderComponents() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-3.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#b4bbc5] text-[12px] text-center w-10">
        <p className="leading-[14px]">Mo</p>
      </div>
    </div>
  );
}

function CalenderComponents1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-3.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#b4bbc5] text-[12px] text-center w-10">
        <p className="leading-[14px]">Tu</p>
      </div>
    </div>
  );
}

function CalenderComponents2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-3.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#b4bbc5] text-[12px] text-center w-10">
        <p className="leading-[14px]">We</p>
      </div>
    </div>
  );
}

function CalenderComponents3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-3.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#b4bbc5] text-[12px] text-center w-10">
        <p className="leading-[14px]">Th</p>
      </div>
    </div>
  );
}

function CalenderComponents4() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-3.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#b4bbc5] text-[12px] text-center w-10">
        <p className="leading-[14px]">Fr</p>
      </div>
    </div>
  );
}

function CalenderComponents5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-3.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#b4bbc5] text-[12px] text-center w-10">
        <p className="leading-[14px]">Sa</p>
      </div>
    </div>
  );
}

function CalenderComponents6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-3.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#b4bbc5] text-[12px] text-center w-10">
        <p className="leading-[14px]">Su</p>
      </div>
    </div>
  );
}

function Day() {
  return (
    <div className="content-stretch flex gap-1.5 items-start justify-start relative shrink-0" data-name="Day">
      <CalenderComponents />
      <CalenderComponents1 />
      <CalenderComponents2 />
      <CalenderComponents3 />
      <CalenderComponents4 />
      <CalenderComponents5 />
      <CalenderComponents6 />
    </div>
  );
}

function CalenderComponents7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b0b7ba] text-[14px] text-center w-10">
        <p className="leading-[20px]">31</p>
      </div>
    </div>
  );
}

function CalenderComponents8() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">1</p>
      </div>
    </div>
  );
}

function CalenderComponents9() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">2</p>
      </div>
    </div>
  );
}

function CalenderComponents10() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">3</p>
      </div>
    </div>
  );
}

function CalenderComponents11() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">4</p>
      </div>
    </div>
  );
}

function CalenderComponents12() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">5</p>
      </div>
    </div>
  );
}

function CalenderComponents13() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">6</p>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-1.5 items-start justify-start relative shrink-0" data-name="1">
      <CalenderComponents7 />
      <CalenderComponents8 />
      <CalenderComponents9 />
      <CalenderComponents10 />
      <CalenderComponents11 />
      <CalenderComponents12 />
      <CalenderComponents13 />
    </div>
  );
}

function CalenderComponents14() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">7</p>
      </div>
    </div>
  );
}

function CalenderComponents15() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">8</p>
      </div>
    </div>
  );
}

function CalenderComponents16() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">9</p>
      </div>
    </div>
  );
}

function CalenderComponents17() {
  return (
    <div className="bg-[#005ce8] box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white w-10">
        <p className="leading-[20px]">10</p>
      </div>
    </div>
  );
}

function CalenderComponents18() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">11</p>
      </div>
    </div>
  );
}

function CalenderComponents19() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">12</p>
      </div>
    </div>
  );
}

function CalenderComponents20() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">13</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex gap-1.5 items-start justify-start relative shrink-0" data-name="2">
      <CalenderComponents14 />
      <CalenderComponents15 />
      <CalenderComponents16 />
      <CalenderComponents17 />
      <CalenderComponents18 />
      <CalenderComponents19 />
      <CalenderComponents20 />
    </div>
  );
}

function CalenderComponents21() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">16</p>
      </div>
    </div>
  );
}

function CalenderComponents22() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">17</p>
      </div>
    </div>
  );
}

function CalenderComponents23() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">18</p>
      </div>
    </div>
  );
}

function CalenderComponents24() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">19</p>
      </div>
    </div>
  );
}

function CalenderComponents25() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">20</p>
      </div>
    </div>
  );
}

function CalenderComponents26() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">21</p>
      </div>
    </div>
  );
}

function CalenderComponents27() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">22</p>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex gap-1.5 items-start justify-start relative shrink-0" data-name="3">
      <CalenderComponents21 />
      <CalenderComponents22 />
      <CalenderComponents23 />
      <CalenderComponents24 />
      <CalenderComponents25 />
      <CalenderComponents26 />
      <CalenderComponents27 />
    </div>
  );
}

function CalenderComponents28() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">23</p>
      </div>
    </div>
  );
}

function CalenderComponents29() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">24</p>
      </div>
    </div>
  );
}

function CalenderComponents30() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">25</p>
      </div>
    </div>
  );
}

function CalenderComponents31() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">26</p>
      </div>
    </div>
  );
}

function CalenderComponents32() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">27</p>
      </div>
    </div>
  );
}

function CalenderComponents33() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">28</p>
      </div>
    </div>
  );
}

function CalenderComponents34() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">29</p>
      </div>
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex gap-1.5 items-start justify-start relative shrink-0" data-name="4">
      <CalenderComponents28 />
      <CalenderComponents29 />
      <CalenderComponents30 />
      <CalenderComponents31 />
      <CalenderComponents32 />
      <CalenderComponents33 />
      <CalenderComponents34 />
    </div>
  );
}

function CalenderComponents35() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center w-10">
        <p className="leading-[20px]">30</p>
      </div>
    </div>
  );
}

function CalenderComponents36() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b0b7ba] text-[14px] text-center w-10">
        <p className="leading-[20px]">1</p>
      </div>
    </div>
  );
}

function CalenderComponents37() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b0b7ba] text-[14px] text-center w-10">
        <p className="leading-[20px]">2</p>
      </div>
    </div>
  );
}

function CalenderComponents38() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b0b7ba] text-[14px] text-center w-10">
        <p className="leading-[20px]">3</p>
      </div>
    </div>
  );
}

function CalenderComponents39() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b0b7ba] text-[14px] text-center w-10">
        <p className="leading-[20px]">4</p>
      </div>
    </div>
  );
}

function CalenderComponents40() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b0b7ba] text-[14px] text-center w-10">
        <p className="leading-[20px]">5</p>
      </div>
    </div>
  );
}

function CalenderComponents41() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-[4px] shrink-0" data-name="Calender Components">
      <div className="flex flex-col font-['Public_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b0b7ba] text-[14px] text-center w-10">
        <p className="leading-[20px]">6</p>
      </div>
    </div>
  );
}

function Component5() {
  return (
    <div className="content-stretch flex gap-1.5 items-start justify-start relative shrink-0" data-name="5">
      <CalenderComponents35 />
      <CalenderComponents36 />
      <CalenderComponents37 />
      <CalenderComponents38 />
      <CalenderComponents39 />
      <CalenderComponents40 />
      <CalenderComponents41 />
    </div>
  );
}

function Calender() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative shrink-0" data-name="Calender">
      <Day />
      <Component1 />
      <Component2 />
      <Component3 />
      <Component4 />
      <Component5 />
    </div>
  );
}

function Calender1() {
  return (
    <div className="content-stretch flex flex-col gap-3 items-start justify-start relative rounded-[12px] shrink-0" data-name="Calender">
      <Heading10 />
      <Calender />
    </div>
  );
}

function Calendar() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-6 items-center justify-center left-[366px] overflow-clip pb-6 pt-0 px-0 rounded-[8px] top-[1592px]" data-name="Calendar">
      <Heading9 />
      <Calender1 />
    </div>
  );
}

function PhosphorNormalCaretDown4() {
  return (
    <div className="absolute right-2.5 size-4 top-1/2 translate-y-[-50%]" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown} />
    </div>
  );
}

function Chart9() {
  return (
    <div className="bg-[#f5f6f7] h-8 opacity-0 relative rounded-[4px] shrink-0 w-[114px]" data-name="Chart">
      <div className="absolute font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] left-2.5 text-[#4a5154] text-[14px] text-nowrap" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">This Month</p>
      </div>
      <PhosphorNormalCaretDown4 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-between left-0 px-6 py-3 top-0 w-[1103px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Team</p>
      </div>
      <Chart9 />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#e5e7e8]" />
    </div>
  );
}

function Group33469() {
  return (
    <div className="absolute contents font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[39px] text-[#191b1c] text-[13px] text-center text-nowrap top-14">
      <div className="absolute left-[125px] top-14 translate-x-[-50%]">
        <p className="leading-[24px] text-nowrap whitespace-pre">1 Senior Full-Stack Engineer</p>
      </div>
      <div className="absolute left-[103.5px] top-20 translate-x-[-50%]">
        <p className="leading-[24px] text-nowrap whitespace-pre">1 Frontend Developer</p>
      </div>
      <div className="absolute left-[102px] top-[104px] translate-x-[-50%]">
        <p className="leading-[24px] text-nowrap whitespace-pre">1 Backend Developer</p>
      </div>
      <div className="absolute left-[95.5px] top-32 translate-x-[-50%]">
        <p className="leading-[24px] text-nowrap whitespace-pre">1 DevOps Engineer</p>
      </div>
    </div>
  );
}

function MapLocation() {
  return (
    <div className="content-stretch flex flex-col gap-4 h-[19.536px] items-start justify-start relative w-[37.997px]" data-name="Map Location">
      <div className="bg-center bg-cover bg-no-repeat h-5 relative shrink-0 w-[38px]" data-name="Flag" style={{ backgroundImage: `url('${imgFlag}')` }}>
        <div aria-hidden="true" className="absolute border border-[#f5f6f7] border-solid inset-[-1px] pointer-events-none" />
      </div>
    </div>
  );
}

function Heading12() {
  return <div className="content-stretch flex flex-col gap-1 h-[24px] items-start justify-start w-[71.855px]" data-name="Heading" />;
}

function Group33476() {
  return (
    <div className="absolute contents left-[449px] top-[197px]">
      <div className="absolute flex h-[19.995px] items-center justify-center left-[816.01px] top-[198px] w-[38.231px]">
        <div className="flex-none rotate-[0.702deg] skew-x-[359.969deg]">
          <MapLocation />
        </div>
      </div>
      <div className="absolute flex h-[24.878px] items-center justify-center left-[449px] top-[197px] w-[72.145px]">
        <div className="flex-none rotate-[0.702deg] skew-x-[359.969deg]">
          <Heading12 />
        </div>
      </div>
    </div>
  );
}

function Group33474() {
  return (
    <div className="absolute contents left-[449px] top-[197px]">
      <Group33476 />
    </div>
  );
}

function MapLocation1() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-start justify-start relative" data-name="Map Location">
      <div className="bg-center bg-cover bg-no-repeat h-5 relative shrink-0 w-[38px]" data-name="Flag" style={{ backgroundImage: `url('${imgFlag1}')` }}>
        <div aria-hidden="true" className="absolute border border-[#f5f6f7] border-solid inset-[-1px] pointer-events-none" />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative w-[70.303px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] w-[69.588px]">
        <p className="leading-[24px]">Belgium</p>
      </div>
    </div>
  );
}

function Group33471() {
  return (
    <div className="absolute contents left-[816px] top-[47px]">
      <div className="absolute flex h-[20.474px] items-center justify-center left-[816px] top-12 w-[38.247px]">
        <div className="flex-none rotate-[0.717deg]">
          <MapLocation1 />
        </div>
      </div>
      <div className="absolute flex h-[24.878px] items-center justify-center left-[869px] top-[47px] w-[70.592px]">
        <div className="flex-none rotate-[0.717deg]">
          <Heading13 />
        </div>
      </div>
    </div>
  );
}

function MapLocation2() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-start justify-start relative w-[36.011px]" data-name="Map Location">
      <div className="flex h-[23.449px] items-center justify-center relative shrink-0 w-[36.285px]">
        <div className="flex-none rotate-[359.283deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[23px] w-9" data-name="image 1" style={{ backgroundImage: `url('${imgImage1}')` }} />
        </div>
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative w-[70.303px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] w-[69.588px]">
        <p className="leading-[24px]">France</p>
      </div>
    </div>
  );
}

function Group33472() {
  return (
    <div className="absolute contents left-[816px] top-[97px]">
      <div className="absolute flex h-[23.886px] items-center justify-center left-[816px] top-[98px] w-[36.291px]">
        <div className="flex-none rotate-[0.717deg]">
          <MapLocation2 />
        </div>
      </div>
      <div className="absolute flex h-[24.878px] items-center justify-center left-[869px] top-[97px] w-[70.592px]">
        <div className="flex-none rotate-[0.717deg]">
          <Heading14 />
        </div>
      </div>
    </div>
  );
}

function MapLocation3() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-start justify-start relative" data-name="Map Location">
      <div className="bg-center bg-cover bg-no-repeat h-5 relative shrink-0 w-[38px]" data-name="Flag" style={{ backgroundImage: `url('${imgFlag2}')` }}>
        <div aria-hidden="true" className="absolute border border-[#f5f6f7] border-solid inset-[-1px] pointer-events-none" />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative w-[70.303px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] w-[69.588px]">
        <p className="leading-[24px]">Germany</p>
      </div>
    </div>
  );
}

function Group33473() {
  return (
    <div className="absolute contents left-[816px] top-[147px]">
      <div className="absolute flex h-[20.474px] items-center justify-center left-[816px] top-[148px] w-[38.247px]">
        <div className="flex-none rotate-[0.717deg]">
          <MapLocation3 />
        </div>
      </div>
      <div className="absolute flex h-[24.878px] items-center justify-center left-[869px] top-[147px] w-[70.592px]">
        <div className="flex-none rotate-[0.717deg]">
          <Heading15 />
        </div>
      </div>
    </div>
  );
}

function MapLocation4() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-start justify-start relative" data-name="Map Location">
      <div className="bg-center bg-cover bg-no-repeat h-5 relative shrink-0 w-[38px]" data-name="Flag" style={{ backgroundImage: `url('${imgFlag3}')` }}>
        <div aria-hidden="true" className="absolute border border-[#f5f6f7] border-solid inset-[-1px] pointer-events-none" />
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative w-[70.303px]" data-name="Heading">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[16px] w-[69.588px]">
        <p className="leading-[24px]">Romania</p>
      </div>
    </div>
  );
}

function Group33475() {
  return (
    <div className="absolute contents left-[816px] top-[247px]">
      <div className="absolute flex h-[20.474px] items-center justify-center left-[816px] top-[248px] w-[38.247px]">
        <div className="flex-none rotate-[0.717deg]">
          <MapLocation4 />
        </div>
      </div>
      <div className="absolute flex h-[24.878px] items-center justify-center left-[869px] top-[247px] w-[70.592px]">
        <div className="flex-none rotate-[0.717deg]">
          <Heading16 />
        </div>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="absolute h-[342px] left-0 top-14 w-[1069px]" data-name="Row">
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[83px] text-[20px] text-[rgba(25,27,28,0.51)] text-center text-nowrap top-[23px] translate-x-[-50%]">
        <p className="leading-[24px] whitespace-pre">Engineering</p>
      </div>
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[63.5px] text-[20px] text-[rgba(25,27,28,0.51)] text-center text-nowrap top-[233px] translate-x-[-50%]">
        <p className="leading-[24px] whitespace-pre">Product</p>
      </div>
      <Group33469 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[878.5px] text-[20px] text-[rgba(25,27,28,0.51)] text-center text-nowrap top-2 translate-x-[-50%]">
        <p className="leading-[24px] whitespace-pre">Working Location</p>
      </div>
      <Group33474 />
      <div className="absolute flex h-[25.243px] items-center justify-center left-[869px] top-[197px] w-[99.746px]">
        <div className="flex-none rotate-[0.717deg]">
          <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative text-[#191b1c] text-[16px] w-[99.463px]">
            <p className="leading-[24px]">Netherlands</p>
          </div>
        </div>
      </div>
      <Group33471 />
      <Group33472 />
      <Group33473 />
      <Group33475 />
    </div>
  );
}

function Group33470() {
  return (
    <div className="absolute contents font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[39px] text-[#191b1c] text-[13px] text-center text-nowrap top-[326px]">
      <div className="absolute left-[97px] top-[326px] translate-x-[-50%]">
        <p className="leading-[24px] text-nowrap whitespace-pre">1 Product Manager</p>
      </div>
      <div className="absolute left-[90.5px] top-[350px] translate-x-[-50%]">
        <p className="leading-[24px] text-nowrap whitespace-pre">1 UI/UX Designer</p>
      </div>
    </div>
  );
}

function OperatingSystem() {
  return (
    <div className="absolute bg-white h-[398px] left-[787px] overflow-clip rounded-[8px] top-[1592px] w-[1103px]" data-name="Operating System">
      <Heading11 />
      <Row5 />
      <Group33470 />
      <div className="absolute bg-[#0083ff] h-[22px] left-[975px] rounded-[7px] top-5 w-[94px]" />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-[1022.5px] text-[13px] text-center text-nowrap text-white top-[18px] translate-x-[-50%]">
        <p className="leading-[24px] whitespace-pre">{`Manage `}</p>
      </div>
    </div>
  );
}

function Links() {
  return (
    <div className="content-stretch flex font-['Public_Sans:Regular',_sans-serif] font-normal gap-2 items-start justify-start leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center text-nowrap" data-name="Links">
      <div className="relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">Documentation</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">•</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">Privacy Policy</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">•</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">FAQs</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-between left-[349px] px-0 py-6 top-[2015px] w-[1542px]" data-name="Footer">
      <div className="font-['Public_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#626c70] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">{`© 2025 -  PulseFlow Inc. `}</p>
      </div>
      <Links />
    </div>
  );
}

function SolidStatusHeartbeat() {
  return (
    <div className="relative shrink-0 size-8" data-name="Solid/Status/Heartbeat">
      <img className="block max-w-none size-full" src={imgSolidStatusHeartbeat} />
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-1.5 items-center justify-start relative shrink-0" data-name="Logo">
      <SolidStatusHeartbeat />
      <div className="capitalize font-['Public_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#191b1c] text-[24px] text-nowrap">
        <p className="leading-none whitespace-pre">PulseFlow</p>
      </div>
    </div>
  );
}

function Logo1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-center pl-6 pr-0 py-0 relative shrink-0" data-name="Logo">
      <Logo />
    </div>
  );
}

function PhosphorDuotoneHouseLine() {
  return (
    <div className="relative shrink-0 size-5" data-name="Phosphor/Duotone/HouseLine">
      <img className="block max-w-none size-full" src={imgPhosphorDuotoneHouseLine} />
    </div>
  );
}

function SidebarNavTabs() {
  return (
    <div className="bg-[#f0f6ff] box-border content-stretch flex gap-3 items-center justify-center px-6 py-2.5 relative shrink-0" data-name="Sidebar Nav/Tabs">
      <PhosphorDuotoneHouseLine />
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#191b1c] text-[14px] w-[200px]">
        <p className="leading-[20px]">Overview</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[3px_0px_0px_0px_inset_#0e5fd9]" />
    </div>
  );
}

function SidebarNavTabs1() {
  return (
    <div className="bg-white box-border content-stretch flex font-['Public_Sans:Medium',_sans-serif] font-medium gap-3 items-center justify-center leading-[0] px-6 py-2.5 relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <div className="relative shrink-0 text-black text-nowrap">
        <p className="leading-[20px] whitespace-pre">👥</p>
      </div>
      <div className="relative shrink-0 text-[#626c70] w-[200px]">
        <p className="leading-[20px]">Clients</p>
      </div>
    </div>
  );
}

function PhosphorNormalCaretDown5() {
  return (
    <div className="relative shrink-0 size-4" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown1} />
    </div>
  );
}

function SidebarNavTabs2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-10 items-center justify-center px-6 py-2.5 relative shrink-0" data-name="Sidebar Nav/Tabs">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#626c70] text-[14px] w-[172px]">
        <p className="leading-[20px] whitespace-pre-wrap">{`         Cross-Client Insights`}</p>
      </div>
      <PhosphorNormalCaretDown5 />
    </div>
  );
}

function Links1() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0" data-name="Links">
      <SidebarNavTabs />
      <SidebarNavTabs1 />
      <SidebarNavTabs2 />
    </div>
  );
}

function Apps() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-center justify-center relative shrink-0" data-name="Apps">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#959fa3] text-[12px] uppercase w-[232px]">
        <p className="leading-none">PORTFOLIO</p>
      </div>
      <Links1 />
    </div>
  );
}

function PhosphorNormalCaretDown6() {
  return (
    <div className="relative shrink-0 size-4" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown1} />
    </div>
  );
}

function SidebarNavTabs3() {
  return (
    <div className="bg-white box-border content-stretch flex gap-3 items-center justify-center px-6 py-2.5 relative shrink-0" data-name="Sidebar Nav/Tabs">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[20px] whitespace-pre">🔄</p>
      </div>
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#626c70] text-[14px] w-[172px]">
        <p className="leading-[20px]">Lifecycle Analysis</p>
      </div>
      <PhosphorNormalCaretDown6 />
    </div>
  );
}

function PhosphorNormalNotebook() {
  return (
    <div className="relative shrink-0 size-5" data-name="Phosphor/Normal/Notebook">
      <img className="block max-w-none size-full" src={imgPhosphorNormalNotebook} />
    </div>
  );
}

function PhosphorNormalCaretDown7() {
  return (
    <div className="relative shrink-0 size-4" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown1} />
    </div>
  );
}

function SidebarNavTabs4() {
  return (
    <div className="bg-white box-border content-stretch flex gap-3 items-center justify-center px-6 py-2.5 relative shrink-0" data-name="Sidebar Nav/Tabs">
      <PhosphorNormalNotebook />
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#626c70] text-[14px] w-[172px]">
        <p className="leading-[20px]">Benchmarking</p>
      </div>
      <PhosphorNormalCaretDown7 />
    </div>
  );
}

function Links2() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0" data-name="Links">
      <SidebarNavTabs3 />
      <SidebarNavTabs4 />
    </div>
  );
}

function Pages() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-center justify-center relative shrink-0" data-name="Pages">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#959fa3] text-[12px] uppercase w-[232px]">
        <p className="leading-none">ANALYTICS</p>
      </div>
      <Links2 />
    </div>
  );
}

function SidebarNavTabs5() {
  return (
    <div className="bg-white box-border content-stretch flex font-['Public_Sans:Medium',_sans-serif] font-medium gap-3 items-center justify-center leading-[0] px-6 py-2.5 relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <div className="relative shrink-0 text-black text-nowrap">
        <p className="leading-[20px] whitespace-pre">👥</p>
      </div>
      <div className="relative shrink-0 text-[#626c70] w-[200px]">
        <p className="leading-[20px]">Team Members</p>
      </div>
    </div>
  );
}

function PhosphorNormalLeaf() {
  return (
    <div className="relative shrink-0 size-5" data-name="Phosphor/Normal/Leaf">
      <img className="block max-w-none size-full" src={imgPhosphorNormalLeaf} />
    </div>
  );
}

function SidebarNavTabs6() {
  return (
    <div className="bg-white box-border content-stretch flex gap-3 items-center justify-center px-6 py-2.5 relative shrink-0" data-name="Sidebar Nav/Tabs">
      <PhosphorNormalLeaf />
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#626c70] text-[14px] w-[200px]">
        <p className="leading-[20px]">Integrations</p>
      </div>
    </div>
  );
}

function PhosphorNormalBookOpen() {
  return (
    <div className="relative shrink-0 size-5" data-name="Phosphor/Normal/BookOpen">
      <img className="block max-w-none size-full" src={imgPhosphorNormalBookOpen} />
    </div>
  );
}

function PhosphorNormalCaretDown8() {
  return (
    <div className="relative shrink-0 size-4" data-name="Phosphor/Normal/CaretDown">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCaretDown1} />
    </div>
  );
}

function SidebarNavTabs7() {
  return (
    <div className="bg-white box-border content-stretch flex gap-3 items-center justify-center px-6 py-2.5 relative shrink-0" data-name="Sidebar Nav/Tabs">
      <PhosphorNormalBookOpen />
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#626c70] text-[14px] w-[172px]">
        <p className="leading-[20px]">Reports Center</p>
      </div>
      <PhosphorNormalCaretDown8 />
    </div>
  );
}

function Links3() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0" data-name="Links">
      <SidebarNavTabs5 />
      <SidebarNavTabs6 />
      <SidebarNavTabs7 />
    </div>
  );
}

function Pages1() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-center justify-center relative shrink-0" data-name="Pages">
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#959fa3] text-[12px] uppercase w-[232px]">
        <p className="leading-none">Management</p>
      </div>
      <Links3 />
    </div>
  );
}

function Content1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-6 items-start justify-start left-0 top-4" data-name="Content">
      <Logo1 />
      <Apps />
      <Pages />
      <Pages1 />
    </div>
  );
}

function PhosphorNormalCreditCard() {
  return (
    <div className="relative shrink-0 size-5" data-name="Phosphor/Normal/CreditCard">
      <img className="block max-w-none size-full" src={imgPhosphorNormalCreditCard} />
    </div>
  );
}

function SidebarNavTabs8() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-3 items-center justify-center left-0.5 px-6 py-2.5 top-[572px]" data-name="Sidebar Nav/Tabs">
      <PhosphorNormalCreditCard />
      <div className="font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#626c70] text-[14px] w-[200px]">
        <p className="leading-[20px]">Billing</p>
      </div>
    </div>
  );
}

function SidebarNavTabs9() {
  return (
    <div className="absolute bg-white box-border content-stretch flex font-['Public_Sans:Medium',_sans-serif] font-medium gap-3 items-center justify-center leading-[0] left-0.5 px-6 py-2.5 text-[14px] top-[612px]" data-name="Sidebar Nav/Tabs">
      <div className="relative shrink-0 text-black text-nowrap">
        <p className="leading-[20px] whitespace-pre">⚙️</p>
      </div>
      <div className="relative shrink-0 text-[#626c70] w-[200px]">
        <p className="leading-[20px]">Settings</p>
      </div>
    </div>
  );
}

function ConsultingTeamNolumDashboard() {
  return (
    <div className="absolute bg-white h-[2122px] left-0 overflow-clip top-0 w-80" data-name="Consulting Team - Nolum/Dashboard">
      <Content1 />
      <div className="absolute font-['Public_Sans:Medium',_sans-serif] font-medium leading-[0] left-4 text-[#959fa3] text-[12px] top-[540px] uppercase w-[232px]">
        <p className="leading-none">admin</p>
      </div>
      <SidebarNavTabs8 />
      <SidebarNavTabs9 />
    </div>
  );
}

export default function Component01DashboardOverview() {
  return (
    <div className="bg-[#f5f6f7] relative size-full" data-name="01_Dashboard_Overview">
      <Navigation />
      <Breadcrumbs1 />
      <Group33479 />
      <Group33478 />
      <Group33466 />
      <MostVisitedPage />
      <Group33465 />
      <ProductLifecycle />
      <Calendar />
      <OperatingSystem />
      <Footer />
      <ConsultingTeamNolumDashboard />
      <div className="absolute left-[675px] size-8 top-[1890px]">
        <img className="block max-w-none size-full" src={imgEllipse2} />
      </div>
      <div className="absolute left-[630px] size-8 top-[1810px]">
        <img className="block max-w-none size-full" src={imgEllipse2} />
      </div>
      <div className="absolute left-[490px] size-8 top-[1890px]">
        <img className="block max-w-none size-full" src={imgEllipse2} />
      </div>
    </div>
  );
}