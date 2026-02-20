
# Fleet Service Logs Manager

React + TypeScript + Vite application for managing vehicle service logs with draft auto-save functionality.


##  Tech Stack

* ⚛️ React 18
* 🔷 TypeScript
* ⚡ Vite
* 🧠 Redux Toolkit
* 💾 Redux Persist
* 🎨 Material UI (MUI)
* 📊 MUI DataGrid
* 📝 React Hook Form + Yup

---

## Features

### Service Log Form

* Create new service logs
* Validation with Yup
* Auto-update of End Date
* Auto-save draft functionality
* Draft saving status (idle / saving / saved)

### Draft System

* Automatic draft creation
* Edit existing drafts
* Mark draft as saved after submission
* Persistent storage (localStorage)

### Service Logs Table

* Search by:

  * Provider ID
  * Service Order
  * Car ID
* Filter by:

  * Service Type
  * Start Date
* Pagination support
* Edit & Delete actions


---

## Installation

```bash
git clone <your-repository-url>
cd your-project
npm install
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## State Management

### draftsSlice

Handles:

* Creating draft
* Updating draft
* Marking as saved
* Deleting draft

### serviceLogsSlice

Handles:

* Creating service log
* Storing saved logs

Redux Persist ensures:

* Drafts remain after page reload
* Service logs remain stored locally

---

## Validation

Form validation powered by:

* React Hook Form
* Yup schema validation

Rules include:

* Required fields
* Numeric validation for odometer and engine hours
* Date validation

---



