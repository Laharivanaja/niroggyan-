# 🏥 NirogGyan Frontend - Doctor Appointment Booking App

This is a frontend application for NirogGyan, a platform that allows users to find doctors, view profiles, and book appointments. The app is built using **React with TypeScript** and uses **class-based components** for stateful logic and routing.

---

## 🚀 Features

- 🔍 Search and browse doctors
- 👩‍⚕️ View detailed doctor profiles
- 📅 Book an appointment with a selected doctor
- ✅ Success confirmation screen post-booking
- 📱 Responsive UI with clean and modern styling

---

## 🛠 Tools & Libraries Used

| Tool / Library         | Purpose                                      |
|------------------------|----------------------------------------------|
| React + TypeScript     | Frontend framework with type safety          |
| React Router DOM       | Routing between pages                        |
| Class Components       | Component structure without React Hooks      |
| CSS (custom)           | Component-level styling                      |
| JSON file (`doctors.json`) | Static data for doctor listings        |

---

## 🧩 Folder Structure
src/
│
├── components/ # Reusable components (DoctorCard, etc.)
├── pages/ # Route-based views (LandingPage, Profile, Booking, etc.)
├── styles/ # CSS files for components
├── types/ # TypeScript interfaces (Doctor, etc.)
├── App.tsx # Routes and layout
└── index.tsx # Entry point

---

## 💡 Improvements (If More Time Allowed)

- 🔐 Form validation using libraries like `Formik` or `Yup`
- 🔄 Integration with a backend API for dynamic data
- 👤 User authentication and login page
- 📆 Appointment calendar picker (instead of manual input)
- 🌐 Filter by speciality/hospital in search
- 📱 Better mobile optimizations and dark mode

---

## 🧠 Challenges Faced & Solutions

| Challenge                                      | Solution |
|-----------------------------------------------|----------|
| Aligning doctor cards consistently             | Used `grid` layout (`.doctors-grid`) with responsive breakpoints |
| Unwanted visual artifacts (blue arrows below) | Identified and removed extraneous SVGs from parent JSX |
| Maintaining clean CSS across components       | Used component-scoped class names and utility structure |
| Keeping TypeScript types strict yet usable     | Defined clear interfaces in `types/Doctor.ts` and used props typing in all components |

---

## 🔗 Live Demo (Optional)

[View deployed site](https://your-vercel-url.vercel.app)

---

## 👩‍💻 Developed By

**Lahari Prasanna Yarlagadda**

