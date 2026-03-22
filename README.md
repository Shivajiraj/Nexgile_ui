# Nexgile – FactoryIQ Manufacturing Excellence Portal (Frontend UI Prototype)

## Project Overview

This project is a **frontend UI prototype** of the *FactoryIQ Manufacturing Excellence Portal* based on the provided functional requirement document. The objective of this project is to design a modern enterprise-style manufacturing portal interface demonstrating module navigation, dashboards, and operational visibility without backend integration.

This implementation focuses purely on:

* UI Architecture
* Component Structure
* Navigation Flow
* Enterprise Dashboard Design
* Frontend Engineering Practices

This project runs locally and demonstrates how a manufacturing operations portal could look and function from a user interface perspective.

---

## Technology Stack

### Frontend

* React.js
* JavaScript (ES6)
* HTML5
* CSS3

### Libraries Used

* react-router-dom → Page navigation
* @mui/material → UI components
* @mui/icons-material → Icons
* @emotion/react → Material UI styling dependency
* @emotion/styled → Material UI styling dependency

### Development Tools

* Node.js
* npm
* VS Code
* GitHub

---

## Project Structure

```
src
│
├── components
│   Layout.js
│   Sidebar.js
│   Header.js
│
├── pages
│   Login.js
│   Dashboard.js
│   ProgramTracking.js
│   Production.js
│   Quality.js
│   SupplyChain.js
│   Service.js
│   Documents.js
│
├── App.js
├── App.css
└── index.js
```

---

## Features Implemented

### Core UI Features

* Login interface (UI only)
* Dashboard overview cards
* Sidebar navigation
* Multi-page routing
* Module based UI design
* Search functionality
* Status badges
* Responsive layout structure
* Hover animations
* Modern color theme
* Icons integration
* Reusable layout component

---

## Modules Implemented

### 1 Login Page

Purpose:
Provides entry UI into the system.

Features:

* Username field
* Password field
* Login button
* Navigation to dashboard

Note:
Authentication logic not included (frontend only prototype).

---

### 2 Dashboard

Purpose:
Provide high-level operational overview.

Features:

* Summary cards
* Active project indicators
* Production summary
* Quality issue overview
* Recent activity table

Simulates executive visibility dashboard.

---

### 3 Program Tracking Module

Purpose:
Track project lifecycle from R&D to production.

Features:

* Project listing
* Owner tracking
* Status indicators
* Search filtering

Simulates program management visibility.

---

### 4 Production Visibility Module

Purpose:
Display production order status and progress.

Features:

* Order tracking table
* Quantity tracking
* Production status

Simulates shop floor visibility.

---

### 5 Quality Management Module

Purpose:
Track quality issues and audit records.

Features:

* Issue tracking
* Status monitoring
* Quality workflow display

Simulates NCR/CAPA monitoring interface.

---

### 6 Supply Chain Module

Purpose:
Display purchase orders and supplier data.

Features:

* PO tracking
* Supplier details
* Delivery status

Simulates logistics visibility dashboard.

---

### 7 After Sales Service Module

Purpose:
Display service and repair workflow.

Features:

* Ticket records
* Customer tracking
* Repair status

Simulates RMA/service tracking interface.

---

### 8 Documents Module

Purpose:
Display engineering and operational documents.

Features:

* Document listing
* File type display
* Date tracking

Simulates knowledge/document repository.

---

## Installation Guide

### Prerequisites

Install:

Node.js (LTS):
https://nodejs.org

Verify installation:

```
node -v
npm -v
```

---

## Project Setup

Clone repository:

```
git clone <your repo link>
```

Navigate into project:

```
cd nexgile-ui
```

Install dependencies:

```
npm install
```

Install additional libraries:

```
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

Run project:

```
npm start
```

Open browser:

```
http://localhost:3000
```

---

## How Navigation Works

Routing handled using:

react-router-dom

Flow:

Login → Dashboard → Modules

Routes configured in:

App.js

Each module is implemented as a separate React page component.

---

## How Layout Works

Layout.js provides:

Sidebar
Header
Content Area

All pages use Layout wrapper for consistency.

Structure:

Sidebar → Navigation
Header → Title + Logout
Content → Page UI

---

## UI Design Approach

Design follows enterprise dashboard patterns:

* Fixed sidebar navigation
* Content driven layout
* Card based information display
* Table driven operational data
* Status color indicators
* Minimalist professional theme

Color philosophy:

Blue → Primary system color
Green → Success
Orange → Warning
Red → Critical

---

## Packages Used

Main packages:

react
react-dom
react-router-dom
@mui/material
@mui/icons-material
@emotion/react
@emotion/styled

Development packages automatically installed:

react-scripts
web-vitals
testing-library

---

## What This Project Demonstrates

Frontend skills:

Component design
Routing
Layout architecture
UI structuring
Reusable components
Frontend organization

Concepts demonstrated:

Modular UI design
Separation of concerns
Navigation architecture
Dashboard UI patterns

---

## Limitations

This is a UI prototype only.

Not included:

Backend
Database
Authentication logic
API integration
Real data persistence

This project focuses strictly on frontend UI engineering.

---

## AI Assistance Disclosure

This project was developed with assistance from AI tools for learning and productivity purposes.

AI tools used:

* ChatGPT
* Claude AI

Usage included:

* Understanding project structure
* UI architecture guidance
* Code structure suggestions
* Installation guidance
* Environment setup help
* React workflow understanding

All implementation, integration, testing, and customization were performed as part of the learning process.

This project represents practical application of AI-assisted development ("vibe coding") combined with hands-on implementation and understanding.

---

## Future Improvements

Possible enhancements:

Backend integration
Database connection
Authentication
Role based access
Charts and analytics
API integration
Dark mode
Notifications
File uploads
Search optimization

---

## Learning Outcome

Through this project I practiced:

React fundamentals
Component architecture
Frontend project structuring
Routing
Dashboard design
UI engineering practices
Development environment setup

---

## Author

Shivaji Raj

GitHub:
https://github.com/Shivajiraj

LinkedIn:
https://www.linkedin.com/in/shivaji-raj-55580a309

---

## Project Status

Frontend UI Prototype Completed
Backend Not Implemented

---

## How to Run (Quick Start)

```
npm install
npm start
```

Open:

http://localhost:3000

---

## License

This project is created for educational and demonstration purposes.
