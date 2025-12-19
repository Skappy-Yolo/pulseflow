import svgPaths from "./svg-b9btvxme69";

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

function Content() {
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

export default function ChiefProductOfficerDelphine() {
  return (
    <div className="bg-white relative size-full" data-name="Chief Product Officer - Delphine">
      <Content />
      <Pages1 />
      <Links3 />
      <Group />
    </div>
  );
}