# PulseFlow Dashboard Routing Guide

## Overview
PulseFlow now features two separate dashboard experiences accessed through URL hash routing:

## Routes

### Consultant Dashboard (Default)
- **URL**: `#consultant` or `/` (default)
- **User**: Consuela N. (Portfolio Manager)
- **Description**: Portfolio management dashboard for consultants managing multiple client projects
- **Features**:
  - Client portfolio overview
  - Project tracking
  - Performance metrics
  - Client cards with health scores
  - Comparative analytics
  - Lifecycle analysis

### Executive Dashboard
- **URL**: `#executive`
- **User**: Delphine C. (Chief Product Officer)
- **Description**: High-level strategic dashboard for executives
- **Features**:
  - Executive overview with critical alerts
  - Full funnel performance visualization
  - Key metrics by department
  - Integrations management
  - Team access control
  - Strategic insights and bottleneck analysis

## Switching Between Dashboards

### From Consultant to Executive
Click your profile dropdown → "Switch to Executive View"

### From Executive to Consultant
Click your profile dropdown → "Switch to Consultant View"

## Implementation Details

- **Technology**: Hash-based routing (`window.location.hash`)
- **State Management**: React hooks with `useEffect` for route listening
- **Components**: Separate component trees for each dashboard type
- **Responsive**: Both dashboards are mobile-first and fully responsive

## Available Pages

### Executive Dashboard Pages
- Executive Overview (`executive-overview`)
- Alerts (`alerts`)
- Lifecycle Health (`lifecycle-health`)
- Key Metrics (`key-metrics`)
- Funnel Overview (`funnel-overview`)
- Bottlenecks (`bottlenecks`)
- Integrations (`integrations`) ✅ Implemented
- Data Quality (`data-quality`)
- Sync Status (`sync-status`)
- Attribution (`attribution`)
- Conversion Rates (`conversion-rates`)
- Reports (`reports`)
- Executive Summary (`executive-summary`)
- Board Deck (`board-deck`)
- Department Heads (`department-heads`) ✅ Implemented (Team Management)
- Settings (`settings`)

### Consultant Dashboard Pages
- Overview (`overview`) ✅ Implemented
- Clients (`clients`) ✅ Implemented
- Analytics (with submenus)
- Reports
- Settings
- Team

## Development Notes

- The routing system is built to be easily extensible
- New pages can be added by:
  1. Creating the component in the appropriate folder (`/components/executive/` or `/components/dashboard/`)
  2. Adding the route condition in `App.tsx`
  3. Adding the navigation link in the respective sidebar component
