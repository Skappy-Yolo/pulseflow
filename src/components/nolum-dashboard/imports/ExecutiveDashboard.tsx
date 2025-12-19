import svgPaths from "./svg-uh08erpc9b";
import imgImage from "figma:asset/36666cf855ed553ef9169d386505acc21538cc1b.png";
import imgEllipse1 from "figma:asset/14198890875077652bcbf480d8ba90fc54ee015e.png";
import img04 from "figma:asset/74b05a315adc72a0274bf5b570f8078563ecaa79.png";
import imgImage28 from "figma:asset/3436f51b7b73c55b2035bebee4b03c02aadc4ae3.png";
import imgImage29 from "figma:asset/8bfd0661ac3bffbe787f89b6996a3ccdf4aaaae2.png";
import imgImage30 from "figma:asset/aa365c52806f7631e644101204469fd8b84f80bb.png";

function PhosphorNormalMagnifyingGlass() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[10px]" data-name="Phosphor/Normal/MagnifyingGlass">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Phosphor/Normal/MagnifyingGlass">
          <g id="Vector"></g>
          <path d={svgPaths.p688b600} id="Vector_2" stroke="var(--stroke-0, #191B1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.pcc13e48} id="Vector_3" stroke="var(--stroke-0, #191B1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function InputField() {
  return (
    <div className="absolute bg-[rgba(242,243,244,0.5)] h-[40px] left-[40px] rounded-[4px] top-[16px] w-[240px]" data-name="Input Field">
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal leading-[20px] left-[48px] text-[#959fa3] text-[14px] text-nowrap top-[calc(50%-10px)]">Search</p>
      <PhosphorNormalMagnifyingGlass />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center justify-center left-[12px] top-[6px]" data-name="Content">
      <div className="relative rounded-[80px] shrink-0 size-[16px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[80px] size-full" src={imgImage} />
      </div>
      <p className="font-['Public_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5154] text-[14px] text-nowrap">English</p>
    </div>
  );
}

function OutlineInterfaceCaretDown() {
  return (
    <div className="absolute left-[87px] size-[24px] top-[4px]" data-name="Outline/Interface/Caret down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Caret down">
          <path clipRule="evenodd" d={svgPaths.p13f13f00} fill="var(--fill-0, #7B878C)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Language() {
  return (
    <div className="absolute bg-[#f5f6f7] h-[32px] left-0 rounded-[4px] top-[4px] w-[116px]" data-name="Language">
      <Content />
      <OutlineInterfaceCaretDown />
    </div>
  );
}

function OutlineInterfaceLayout() {
  return (
    <div className="absolute left-[132px] size-[20px] top-[10px]" data-name="Outline/Interface/Layout">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Outline/Interface/Layout">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p27154c00} fill="#4A5154" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p13b36900} fill="#4A5154" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2118fd30} fill="#4A5154" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p684ca00} fill="#4A5154" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function OutlineStatusNotification() {
  return (
    <div className="absolute left-[168px] size-[20px] top-[10px]" data-name="Outline/Status/Notification">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Outline/Status/Notification">
          <path clipRule="evenodd" d={svgPaths.p3598b300} fill="var(--fill-0, #4A5154)" fillRule="evenodd" id="Icon" />
          <circle cx="14.1667" cy="5.83333" fill="var(--fill-0, #E84646)" id="Ellipse 1" r="3" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Profile() {
  return (
    <div className="absolute bg-[rgba(255,213,153,0.04)] left-[204px] rounded-[100px] size-[40px] top-0" data-name="Profile">
      <div className="absolute left-[4px] size-[32px] top-[4px]">
        <img alt="" className="block max-w-none size-full" height="32" src={imgEllipse1} width="32" />
      </div>
    </div>
  );
}

function Informations() {
  return (
    <div className="absolute bg-white h-[40px] left-[1168px] top-[14px] w-[244px]" data-name="Informations">
      <Language />
      <OutlineInterfaceLayout />
      <OutlineStatusNotification />
      <Profile />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-white h-[72px] left-[280px] top-0 w-[1672px]" data-name="Navigation">
      <InputField />
      <Informations />
      <p className="absolute font-['Public_Sans:SemiBold',sans-serif] font-semibold h-[24px] leading-[24px] left-[1451px] text-[#191b1c] text-[16px] top-[18px] w-[189px]">Delphine De Vrij | CPO</p>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_1px_0px_0px_0px_#f2f3f4]" />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[1712px] px-0 py-[24px] top-[1103px] w-[211px]" data-name="Footer">
      <p className="font-['Public_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#626c70] text-[14px] text-center text-nowrap">{`© 2025 -  PulseFlow Inc. `}</p>
    </div>
  );
}

function Breadcrumbs() {
  return <div className="absolute h-[24px] left-0 top-[31px] w-[109px]" data-name="Breadcrumbs" />;
}

function Breadcrumbs1() {
  return (
    <div className="absolute h-[72.5px] left-[332px] top-[96px] w-[1560px]" data-name="Breadcrumbs">
      <p className="absolute font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[23px] left-0 text-[#006aff] text-[48px] text-nowrap top-[11px]">ENIES</p>
      <Breadcrumbs />
      <div className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[50px] leading-[20px] left-[1355px] text-[#626c70] text-[15px] top-[30px] w-[205px]">
        <p className="mb-0">Last updated: 2 minutes ago</p>
        <p>{`Next sync: 3:45 PM `}</p>
      </div>
    </div>
  );
}

function SolidStatusHeartbeat() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Solid/Status/Heartbeat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Solid/Status/Heartbeat">
          <g id="Icon">
            <path d={svgPaths.p16f90f00} fill="var(--fill-0, #005CE8)" />
            <path d={svgPaths.p9f15640} fill="var(--fill-0, #005CE8)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Logo">
      <SolidStatusHeartbeat />
      <p className="capitalize font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-none relative shrink-0 text-[#191b1c] text-[24px] text-nowrap">PulseFlow</p>
    </div>
  );
}

function Logo1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[24px] pr-0 py-0 relative shrink-0" data-name="Logo">
      <Logo />
    </div>
  );
}

function PhosphorDuotoneHouseLine() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Phosphor/Duotone/HouseLine">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Phosphor/Duotone/HouseLine">
          <g id="Vector"></g>
          <path d={svgPaths.p1c357700} fill="var(--fill-0, #005CE8)" id="Vector_2" opacity="0.2" stroke="var(--stroke-0, #005CE8)" strokeWidth="1.25" />
          <path d={svgPaths.p18f83100} id="Vector_3" stroke="var(--stroke-0, #005CE8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M1.2478 16.875H18.7478" id="Vector_4" stroke="var(--stroke-0, #005CE8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p349d5180} id="Vector_5" stroke="var(--stroke-0, #005CE8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function SidebarNavTabs() {
  return (
    <div className="bg-[#f0f6ff] content-stretch flex gap-[12px] items-center justify-center px-[24px] py-[10px] relative shrink-0" data-name="Sidebar Nav/Tabs">
      <PhosphorDuotoneHouseLine />
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#191b1c] text-[14px] w-[200px]">Executive Dashboard</p>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_3px_0px_0px_0px_#0e5fd9]" />
    </div>
  );
}

function SidebarNavTabs1() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">🔔</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Alerts</p>
    </div>
  );
}

function Links() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Links">
      <SidebarNavTabs />
      <SidebarNavTabs1 />
    </div>
  );
}

function Apps() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0" data-name="Apps">
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#959fa3] text-[12px] uppercase w-[232px]">PORTFOLIO</p>
      <Links />
    </div>
  );
}

function PhosphorNormalCaretDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Phosphor/Normal/CaretDown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Phosphor/Normal/CaretDown">
          <g id="Vector"></g>
          <path d="M13 6L8 11L3 6" id="Vector_2" stroke="var(--stroke-0, #959FA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function SidebarNavTabs2() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center justify-center px-[24px] py-[10px] relative shrink-0" data-name="Sidebar Nav/Tabs">
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-black text-nowrap">🔄</p>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#626c70] text-[14px] w-[172px]">Lifecycle Health</p>
      <PhosphorNormalCaretDown />
    </div>
  );
}

function PhosphorNormalCaretDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Phosphor/Normal/CaretDown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Phosphor/Normal/CaretDown">
          <g id="Vector"></g>
          <path d="M13 6L8 11L3 6" id="Vector_2" stroke="var(--stroke-0, #959FA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function SidebarNavTabs3() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center justify-center px-[24px] py-[10px] relative shrink-0" data-name="Sidebar Nav/Tabs">
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-black text-nowrap">📊</p>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#626c70] text-[14px] w-[172px]">Key Metrics</p>
      <PhosphorNormalCaretDown1 />
    </div>
  );
}

function SidebarNavTabs4() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">🚦</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Funnel Overview</p>
    </div>
  );
}

function SidebarNavTabs5() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">⚡</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Bottlenecks</p>
    </div>
  );
}

function SidebarNavTabs6() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">🔌</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Integrations</p>
    </div>
  );
}

function SidebarNavTabs7() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">✅</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Data Quality</p>
    </div>
  );
}

function SidebarNavTabs8() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">🔄</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Sync Status</p>
    </div>
  );
}

function SidebarNavTabs9() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">📈</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Attribution</p>
    </div>
  );
}

function SidebarNavTabs10() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">🎯</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Conversion Rates</p>
    </div>
  );
}

function SidebarNavTabs11() {
  return (
    <div className="bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] px-[24px] py-[10px] relative shrink-0 text-[14px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">📔</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Reports</p>
    </div>
  );
}

function Links1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Links">
      <SidebarNavTabs2 />
      <SidebarNavTabs3 />
      <SidebarNavTabs4 />
      <SidebarNavTabs5 />
      <SidebarNavTabs6 />
      <SidebarNavTabs7 />
      <SidebarNavTabs8 />
      <SidebarNavTabs9 />
      <SidebarNavTabs10 />
      <SidebarNavTabs11 />
    </div>
  );
}

function Pages() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0" data-name="Pages">
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#959fa3] text-[12px] uppercase w-[232px]">INSIGHTS</p>
      <Links1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-0 top-[16px]" data-name="Content">
      <Logo1 />
      <Apps />
      <Pages />
    </div>
  );
}

function PhosphorNormalNotebook() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Phosphor/Normal/Notebook">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Phosphor/Normal/Notebook">
          <g id="Vector"></g>
          <path d="M8.75 8.75H13.75" id="Vector_2" stroke="var(--stroke-0, #626C70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M8.75 11.25H13.75" id="Vector_3" stroke="var(--stroke-0, #626C70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p113adb00} id="Vector_4" stroke="var(--stroke-0, #626C70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M6.25 3.125V16.875" id="Vector_5" stroke="var(--stroke-0, #626C70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function SidebarNavTabs12() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center justify-center px-[24px] py-[10px] relative shrink-0" data-name="Sidebar Nav/Tabs">
      <PhosphorNormalNotebook />
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#626c70] text-[14px] w-[200px]">Executive Summary</p>
    </div>
  );
}

function PhosphorNormalBookOpen() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Phosphor/Normal/BookOpen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Phosphor/Normal/BookOpen">
          <g id="Vector"></g>
          <path d={svgPaths.p9330380} id="Vector_2" stroke="var(--stroke-0, #626C70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p3257780} id="Vector_3" stroke="var(--stroke-0, #626C70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function PhosphorNormalCaretDown2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Phosphor/Normal/CaretDown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Phosphor/Normal/CaretDown">
          <g id="Vector"></g>
          <path d="M13 6L8 11L3 6" id="Vector_2" stroke="var(--stroke-0, #959FA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function SidebarNavTabs13() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center justify-center px-[24px] py-[10px] relative shrink-0" data-name="Sidebar Nav/Tabs">
      <PhosphorNormalBookOpen />
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#626c70] text-[14px] w-[172px]">Board Deck</p>
      <PhosphorNormalCaretDown2 />
    </div>
  );
}

function Links2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Links">
      <SidebarNavTabs12 />
      <SidebarNavTabs13 />
    </div>
  );
}

function Pages1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-center justify-center left-1/2 top-[calc(50%+215px)] translate-x-[-50%] translate-y-[-50%]" data-name="Pages">
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#959fa3] text-[12px] uppercase w-[232px]">REPORTS</p>
      <Links2 />
    </div>
  );
}

function Links3() {
  return <div className="absolute h-[40px] left-0 top-[755px] w-[280px]" data-name="Links" />;
}

function SidebarNavTabs14() {
  return (
    <div className="absolute bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] left-0 px-[24px] py-[10px] text-[14px] top-[853px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">👥</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Department Heads</p>
    </div>
  );
}

function SidebarNavTabs15() {
  return (
    <div className="absolute bg-white content-stretch flex font-['Public_Sans:Medium',sans-serif] font-medium gap-[12px] items-center justify-center leading-[20px] left-0 px-[24px] py-[10px] text-[14px] top-[898px]" data-name="Sidebar Nav/Tabs">
      <p className="relative shrink-0 text-black text-nowrap">⚙️</p>
      <p className="relative shrink-0 text-[#626c70] w-[200px]">Settings</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-[841px]">
      <SidebarNavTabs14 />
      <p className="absolute font-['Public_Sans:Medium',sans-serif] font-medium leading-none left-[24px] text-[#959fa3] text-[12px] top-[841px] uppercase w-[232px]">TEAM</p>
      <SidebarNavTabs15 />
    </div>
  );
}

function ChiefProductOfficerDelphine() {
  return (
    <div className="absolute bg-white h-[1080px] left-0 top-0 w-[280px]" data-name="Chief Product Officer - Delphine">
      <Content1 />
      <Pages1 />
      <Links3 />
      <Group />
    </div>
  );
}

function Info() {
  return <div className="absolute h-[52.647px] left-[18px] top-[20px] w-[120.157px]" data-name="Info" />;
}

function ChartStatus() {
  return <div className="absolute h-[13.703px] left-[217.53px] top-[98.86px] w-[28.647px]" data-name="Chart Status" />;
}

function Group16() {
  return (
    <div className="absolute contents left-[17px] top-[19px]">
      <Info />
      <ChartStatus />
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents left-[542px] top-[155px]">
      <p className="absolute font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] left-[570.11px] text-[#e84646] text-[20px] text-nowrap top-[155px]">2 Critical Issues Requiring Immediate Attention</p>
      <div className="absolute inset-[78%_62.89%_12.63%_35.73%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
          <path d={svgPaths.p1a96f00} fill="var(--fill-0, #E84646)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents left-[17px] top-[19px]">
      <p className="absolute font-['Public_Sans:Medium',sans-serif] font-medium h-[90px] leading-[20px] left-[667px] text-[#ffbf00] text-[96px] top-[85px] w-[218px]">78%</p>
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal leading-[20px] left-[18px] text-[#626c70] text-[20px] text-nowrap top-[20px]">Product Lifecycle Health Overview</p>
      <Group25 />
    </div>
  );
}

function CardAlignLeft() {
  return (
    <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[200px] left-[339px] rounded-[8px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.03)] top-[192px] w-[1517px]" data-name="Card/Align/Left">
      <Group16 />
      <Group26 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[339px] top-[192px]">
      <CardAlignLeft />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-[339px] top-[192px]">
      <Group10 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents left-[339px] top-[192px]">
      <Group12 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents left-[339px] top-[192px]">
      <Group15 />
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents left-[339px] top-[626px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[454px] left-[339px] rounded-[5px] top-[626px] w-[1521px]" />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents left-[339px] top-[419px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[181px] left-[339px] rounded-[5px] top-[419px] w-[299.451px]" />
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[15.261px] leading-[20px] left-[435.53px] text-[#626c70] text-[16px] top-[486px] w-[108.119px]">MARKETING</p>
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[15px] leading-[20px] left-[673.55px] text-[#626c70] text-[13px] top-[501px] w-[53.748px]">5.3%</p>
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[15px] leading-[20px] left-[1071.72px] text-[#626c70] text-[13px] top-[502px] w-[53.748px]">26.7%</p>
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[15px] leading-[20px] left-[1478.67px] text-[#626c70] text-[13px] top-[503px] w-[53.748px]">65%</p>
      <p className="absolute font-['Public_Sans:Bold',sans-serif] font-bold h-[22px] leading-[20px] left-[435.53px] text-[#15ad01] text-[20px] top-[517px] w-[111.883px]">850 leads</p>
      <div className="absolute h-[41px] left-[466.24px] top-[433px] w-[52.651px]" data-name="04">
        <div className="absolute inset-[-4.88%_-3.8%]">
          <img alt="" className="block max-w-none size-full" height="45" src={img04} width="56.651" />
        </div>
      </div>
    </div>
  );
}

function OutlineInterfaceArrowUp() {
  return (
    <div className="relative size-[24px]" data-name="Outline/Interface/Arrow up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Arrow up">
          <path d={svgPaths.p2037a480} fill="var(--fill-0, #05A630)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ChartStatus1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[398.78px] top-[556px] w-[166.007px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <OutlineInterfaceArrowUp />
        </div>
      </div>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#308b05] text-[14px] text-nowrap">+12% this week</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[398.23px] top-[557px]">
      <div className="absolute bg-[#59a94f] border border-[rgba(4,150,9,0.93)] border-solid h-[21.587px] left-[398.23px] opacity-[0.15] rounded-[4px] top-[557px] w-[176.599px]" />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[398.23px] top-[556px]">
      <ChartStatus1 />
      <Group1 />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents left-[339px] top-[419px]">
      <Group27 />
      <Group9 />
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents left-[744.85px] top-[419px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[181px] left-[744.85px] rounded-[5px] top-[419px] w-[299.451px]" />
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[16.344px] leading-[20px] left-[869.9px] text-[#626c70] text-[16px] top-[485px] w-[75.243px]">SALES</p>
      <p className="absolute font-['Public_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[854.54px] text-[#ff0101] text-[20px] top-[513px] w-[100.914px]">45 deals</p>
    </div>
  );
}

function OutlineInterfaceArrowUp1() {
  return (
    <div className="relative size-[24px]" data-name="Outline/Interface/Arrow up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Arrow up">
          <path d={svgPaths.p2037a480} fill="var(--fill-0, #FF0000)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ChartStatus2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[811.37px] top-[554px] w-[162.893px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <OutlineInterfaceArrowUp1 />
        </div>
      </div>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#f00000] text-[14px] text-nowrap">-15% this week</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[811.76px] top-[556px]">
      <div className="absolute bg-[red] border border-[red] border-solid h-[23px] left-[811.76px] opacity-[0.15] rounded-[4px] top-[556px] w-[168.921px]" />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[811.37px] top-[554px]">
      <ChartStatus2 />
      <Group2 />
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents left-[744.85px] top-[419px]">
      <Group28 />
      <Group11 />
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents left-[665.87px] top-[419px]">
      <Group37 />
      <div className="absolute h-0 left-[665.87px] top-[528px] w-[51.554px]">
        <div className="absolute inset-[-8.66px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 18">
            <path d={svgPaths.p24e1c900} fill="var(--stroke-0, #C0C2C3)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[875.3px] size-[42.94px] top-[432.03px]" data-name="image 28">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage28} />
      </div>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents left-[1556.55px] top-[419px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[181px] left-[1556.55px] rounded-[5px] top-[419px] w-[299.451px]" />
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[16px] leading-[20px] left-[1666.24px] text-[#626c70] text-[16px] top-[485px] w-[94.333px]">SUPPORT</p>
      <p className="absolute font-['Public_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[1658.56px] text-[#ffbf66] text-[20px] top-[514px] w-[121.755px]">8 tickets</p>
    </div>
  );
}

function OutlineInterfaceArrowUp2() {
  return (
    <div className="relative size-[24px]" data-name="Outline/Interface/Arrow up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Arrow up">
          <path d={svgPaths.p2037a480} fill="var(--fill-0, #FF0000)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[4.13px] top-0">
      <div className="absolute bg-[#ff8e00] border border-[#ff8e00] border-solid h-[23px] left-[4.13px] opacity-[0.15] rounded-[4px] top-0 w-[153px]" />
    </div>
  );
}

function ChartStatus3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[1620.87px] top-[553px] w-[162.893px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <OutlineInterfaceArrowUp2 />
        </div>
      </div>
      <Group3 />
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#ff8e00] text-[14px] text-nowrap">+33% this week</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents left-[1620.87px] top-[553px]">
      <ChartStatus3 />
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents left-[1556.55px] top-[419px]">
      <Group29 />
      <Group13 />
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents left-[1477.57px] top-[419px]">
      <Group38 />
      <div className="absolute h-0 left-[1477.57px] top-[528px] w-[51.554px]">
        <div className="absolute inset-[-8.66px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 18">
            <path d={svgPaths.p24e1c900} fill="var(--stroke-0, #C0C2C3)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[1687px] size-[42.94px] top-[432.03px]" data-name="image 28">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage29} />
      </div>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents left-[1150.7px] top-[419px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[181px] left-[1150.7px] rounded-[5px] top-[419px] w-[299.451px]" />
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[16px] leading-[20px] left-[1268.07px] text-[#626c70] text-[16px] top-[485px] w-[96.526px]">PRODUCT</p>
      <p className="absolute font-['Public_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[1261.48px] text-[#006aff] text-[20px] top-[513px] w-[110.786px]">12 active</p>
    </div>
  );
}

function OutlineInterfaceArrowUp3() {
  return (
    <div className="relative size-[24px]" data-name="Outline/Interface/Arrow up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Arrow up">
          <path d={svgPaths.p2037a480} fill="var(--fill-0, #006AFF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ChartStatus4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[1217.22px] top-[554px] w-[162.893px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg] scale-y-[-100%]">
          <OutlineInterfaceArrowUp3 />
        </div>
      </div>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#006aff] text-[14px] text-nowrap">Stable</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[1253.81px] top-[555px]">
      <div className="absolute bg-[#006aff] border border-[#006aff] border-solid h-[23px] left-[1253.81px] opacity-[0.15] rounded-[4px] top-[555px] w-[110.786px]" />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents left-[1217.22px] top-[554px]">
      <ChartStatus4 />
      <Group4 />
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents left-[1150.7px] top-[419px]">
      <Group31 />
      <Group14 />
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents left-[1071.72px] top-[419px]">
      <Group39 />
      <div className="absolute h-0 left-[1071.72px] top-[528px] w-[51.554px]">
        <div className="absolute inset-[-8.66px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 18">
            <path d={svgPaths.p24e1c900} fill="var(--stroke-0, #C0C2C3)" id="Arrow 1" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[1283.34px] size-[42.94px] top-[435.03px]" data-name="image 29">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage30} />
      </div>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute contents left-[339px] top-[419px]">
      <Group36 />
      <Group40 />
      <Group42 />
      <Group41 />
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents left-[345px] top-[873px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[181px] left-[345px] rounded-[5px] top-[873px] w-[299.451px]" />
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[15px] leading-[20px] left-[369px] text-[#626c70] text-[20px] top-[896px] w-[258px]">Monthly Recurring Revenue</p>
      <p className="absolute font-['Public_Sans:Bold',sans-serif] font-bold h-[22px] leading-[20px] left-[442px] text-[#15ad01] text-[24px] top-[936px] w-[111.883px]">€ 45,200</p>
    </div>
  );
}

function OutlineInterfaceArrowUp4() {
  return (
    <div className="relative size-[24px]" data-name="Outline/Interface/Arrow up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Arrow up">
          <path d={svgPaths.p2037a480} fill="var(--fill-0, #05A630)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ChartStatus5() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[410.55px] top-[984px] w-[166.007px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <OutlineInterfaceArrowUp4 />
        </div>
      </div>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#308b05] text-[14px] text-nowrap">+8% vs last month</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[410px] top-[985px]">
      <div className="absolute bg-[#59a94f] border border-[rgba(4,150,9,0.93)] border-solid h-[21.587px] left-[410px] opacity-[0.15] rounded-[4px] top-[985px] w-[176.599px]" />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[410px] top-[984px]">
      <ChartStatus5 />
      <Group5 />
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute contents left-[345px] top-[873px]">
      <Group32 />
      <Group18 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents left-[1479px] top-[873px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[181px] left-[1479px] rounded-[5px] top-[873px] w-[299.451px]" />
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[15px] leading-[20px] left-[1571px] text-[#626c70] text-[20px] top-[894px] w-[117px]">Active Users</p>
      <p className="absolute font-['Public_Sans:Bold',sans-serif] font-bold h-[22px] leading-[20px] left-[1593px] text-[24px] text-black top-[935px] w-[72px]">2,156</p>
    </div>
  );
}

function OutlineInterfaceArrowUp5() {
  return (
    <div className="relative size-[24px]" data-name="Outline/Interface/Arrow up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Arrow up">
          <path d={svgPaths.p133cac00} fill="var(--fill-0, #FF272D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ChartStatus6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[1551.55px] top-[984px] w-[166.007px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <OutlineInterfaceArrowUp5 />
        </div>
      </div>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#ff272d] text-[14px] text-nowrap">-3% vs last month</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[1551px] top-[985px]">
      <div className="absolute bg-[#ff272d] border border-[#ff272d] border-solid h-[21.587px] left-[1551px] opacity-[0.15] rounded-[4px] top-[985px] w-[176.599px]" />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents left-[1551px] top-[984px]">
      <ChartStatus6 />
      <Group6 />
    </div>
  );
}

function Group52() {
  return (
    <div className="absolute contents left-[1479px] top-[873px]">
      <Group33 />
      <Group19 />
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents left-[1097px] top-[873px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[181px] left-[1097px] rounded-[5px] top-[873px] w-[299.451px]" />
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[15px] leading-[20px] left-[1208px] text-[#626c70] text-[20px] top-[896px] w-[116px]">Churn Rate</p>
      <p className="absolute font-['Public_Sans:Bold',sans-serif] font-bold h-[22px] leading-[20px] left-[1234px] text-[#ff272d] text-[24px] top-[936px] w-[64px]">3.2%</p>
    </div>
  );
}

function OutlineInterfaceArrowUp6() {
  return (
    <div className="relative size-[24px]" data-name="Outline/Interface/Arrow up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Arrow up">
          <path d={svgPaths.p133cac00} fill="var(--fill-0, #FF272D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ChartStatus7() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[1178.55px] top-[984px] w-[166.007px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <OutlineInterfaceArrowUp6 />
        </div>
      </div>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#ff272d] text-[14px] text-nowrap">-0.8% improvement</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[1178px] top-[985px]">
      <div className="absolute bg-[#ff272d] border border-[#ff272d] border-solid h-[21.587px] left-[1178px] opacity-[0.15] rounded-[4px] top-[985px] w-[176.599px]" />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents left-[1178px] top-[984px]">
      <ChartStatus7 />
      <Group7 />
    </div>
  );
}

function Group51() {
  return (
    <div className="absolute contents left-[1097px] top-[873px]">
      <Group34 />
      <Group22 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents left-[345px] top-[873px]">
      <Group50 />
      <Group52 />
      <Group51 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents left-[720px] top-[873px]">
      <div className="absolute bg-white border border-[#e5e7e8] border-solid h-[181px] left-[720px] rounded-[5px] top-[873px] w-[299.451px]" />
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[16px] leading-[20px] left-[764.15px] text-[#626c70] text-[20px] top-[902px] w-[224px]">Customer Health Score</p>
      <p className="absolute font-['Public_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[827.15px] text-[#ff8000] text-[24px] top-[939px] w-[100.914px]">72/100</p>
    </div>
  );
}

function OutlineInterfaceArrowUp7() {
  return (
    <div className="relative size-[24px]" data-name="Outline/Interface/Arrow up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Outline/Interface/Arrow up">
          <path d={svgPaths.p2037a480} fill="var(--fill-0, #FF8000)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ChartStatus8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[781.15px] top-[983px] w-[162.893px]" data-name="Chart Status">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <OutlineInterfaceArrowUp7 />
        </div>
      </div>
      <p className="font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#ff8000] text-[14px] text-nowrap">-6 points this week</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[781.54px] top-[985px]">
      <div className="absolute bg-[#ff8000] border border-[#ff8000] border-solid h-[23px] left-[781.54px] opacity-[0.15] rounded-[4px] top-[985px] w-[168.921px]" />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents left-[781.15px] top-[983px]">
      <ChartStatus8 />
      <Group8 />
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute contents left-[720px] top-[873px]">
      <Group35 />
      <Group23 />
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute contents left-[720px] top-[873px]">
      <Group44 />
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute contents left-[345px] top-[873px]">
      <Group43 />
      <Group45 />
    </div>
  );
}

function MyClientsOverview() {
  return (
    <div className="absolute bg-[#f5f6f7] h-[1171px] left-0 overflow-clip top-0 w-[1952px]" data-name="My Clients Overview">
      <Navigation />
      <Footer />
      <Breadcrumbs1 />
      <p className="absolute font-['Public_Sans:Medium',sans-serif] font-medium leading-[20px] left-[635px] text-[14px] text-center text-white top-[606px] translate-x-[-50%] w-[40px]">5+</p>
      <ChiefProductOfficerDelphine />
      <Group17 />
      <div className="absolute flex h-[3.969px] items-center justify-center left-[335px] top-[444px] w-[1549px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.147deg]">
          <div className="h-0 relative w-[1549.005px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1549 1">
                <line id="Line 57" opacity="0.3" stroke="var(--stroke-0, #C6C6C7)" x2="1549.01" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group30 />
      <Group46 />
      <Group47 />
      <div className="absolute h-[215px] left-[339px] top-[629px] w-[1521px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1521 215">
          <path d={svgPaths.p23acb680} fill="var(--fill-0, #FF272D)" id="Rectangle 152" opacity="0.1" />
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[1171px] left-0 top-0 w-[1952px]">
      <MyClientsOverview />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute bg-[#ff272d] h-[33px] left-[352px] opacity-30 rounded-[100px] top-[646px] w-[36px]" data-name="Icon">
      <div className="size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function TimeDue() {
  return (
    <div className="absolute content-stretch flex gap-[14px] items-start left-[360px] top-[650px]" data-name="Time/Due">
      <div className="h-[18.749px] relative shrink-0 w-[20.995px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
          <path d={svgPaths.p2dc04580} fill="var(--fill-0, #E84646)" id="Vector" />
        </svg>
      </div>
      <p className="font-['Public_Sans:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#ff272d] text-[20px] text-nowrap">Critical Alerts</p>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents left-[352px] top-[646px]">
      <Icon />
      <TimeDue />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#005ce8] content-stretch flex gap-[8px] items-center justify-center left-[1516px] px-[24px] py-0 rounded-[160px] top-[703px]" data-name="Button">
      <p className="capitalize font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[40px] relative shrink-0 text-[14px] text-nowrap text-white">{`Assign To `}</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#005ce8] content-stretch flex gap-[8px] items-center justify-center left-[1682px] px-[24px] py-0 rounded-[160px] top-[703px]" data-name="Button">
      <p className="capitalize font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[40px] relative shrink-0 text-[14px] text-nowrap text-white">Investigate</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute bg-[#ff272d] h-[33px] left-[348px] opacity-50 rounded-[100px] top-[703px] w-[36px]" data-name="Icon">
      <div className="size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function TimeDue1() {
  return (
    <div className="absolute content-stretch flex font-bold gap-[22px] items-start leading-[20px] left-[361px] text-[20px] top-[709px]" data-name="Time/Due">
      <p className="font-['Public_Sans:Bold',sans-serif] h-[18px] relative shrink-0 text-[#ff272d] w-[10px]">1</p>
      <p className="font-['Public_Sans:Bold','Noto_Sans:Bold',sans-serif] relative shrink-0 text-black text-nowrap">Marketing→Sales Conversion Drop</p>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents left-[348px] top-[703px]">
      <Icon1 />
      <TimeDue1 />
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute contents left-[348px] top-[703px]">
      <p className="absolute font-['Public_Sans:Regular','Noto_Sans:Regular',sans-serif] font-normal h-[15px] leading-[20px] left-[394px] text-[#ff272d] text-[13px] top-[735px] w-[722px]">Conversion rate decreased 15% this week (6.2% → 5.3%). Potential lead quality issue or sales process bottleneck</p>
      <Button />
      <Button1 />
      <Group21 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#005ce8] content-stretch flex gap-[8px] items-center justify-center left-[1516px] px-[24px] py-0 rounded-[160px] top-[787px]" data-name="Button">
      <p className="capitalize font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[40px] relative shrink-0 text-[14px] text-nowrap text-white">{`Assign To `}</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#005ce8] content-stretch flex gap-[8px] items-center justify-center left-[1682px] px-[24px] py-0 rounded-[160px] top-[787px]" data-name="Button">
      <p className="capitalize font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[40px] relative shrink-0 text-[14px] text-nowrap text-white">Review Tickets</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute bg-[#ff272d] h-[33px] left-[348px] opacity-50 rounded-[100px] top-[787px] w-[36px]" data-name="Icon">
      <div className="size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function TimeDue2() {
  return (
    <div className="absolute content-stretch flex font-['Public_Sans:Bold',sans-serif] font-bold gap-[22px] items-start leading-[20px] left-[361px] text-[20px] top-[793px]" data-name="Time/Due">
      <p className="h-[18px] relative shrink-0 text-[#ff272d] w-[10px]">2</p>
      <p className="relative shrink-0 text-black text-nowrap">Support Ticket Volume Spike</p>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents left-[348px] top-[787px]">
      <Icon2 />
      <TimeDue2 />
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute contents left-[348px] top-[787px]">
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[15px] leading-[20px] left-[394px] text-[#ff272d] text-[13px] top-[819px] w-[722px]">33% increase in support volume this week. May indicate product usability issues requiring investigation</p>
      <Button2 />
      <Button3 />
      <Group24 />
    </div>
  );
}

export default function ExecutiveDashboard() {
  return (
    <div className="relative size-full" data-name="Executive Dashboard">
      <Frame />
      <Group20 />
      <Group48 />
      <Group49 />
    </div>
  );
}