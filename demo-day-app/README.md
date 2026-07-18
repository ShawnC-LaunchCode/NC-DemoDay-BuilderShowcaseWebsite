# Next Chapter Demo Day Showcase

A dynamic, fully automated portfolio showcase built for Next Chapter's Demo Day. This Next.js web application is designed to ingest data directly from a Google Form, allowing future cohorts to easily deploy a stunning portfolio gallery with zero code changes.

## 🏗 Architecture & Reusability

This project was intentionally designed with **cohort reusability** at its core:
- **Zero-Touch Content Pipeline**: You never have to manually edit JSON or code to add new builders. The `importPresenters.ts` script automatically transforms Google Sheet rows into static data.
- **Automated Image Optimization**: The pipeline automatically downloads heavy Google Drive images (headshots, desktop screenshots, mobile screenshots) and uses `sharp` to resize and compress them into `.webp` format for blazing-fast load times.
- **Fail-Safe UI**: The Next.js components gracefully handle missing data. If a builder forgets to provide a screenshot or a portfolio link, the UI automatically falls back to clean placeholders without breaking.
- **Static Generation**: The site is fully statically generated based on the imported JSON, meaning it costs virtually nothing to host and scales infinitely on Vercel.

---

## 🚀 Setup Guide: From Form to Website

Follow these steps to set up the data pipeline for a new cohort.

### 1. Create the Google Form
Create a new Google Form to collect submissions from the builders. The form should ask for the following information. **Ensure the question order matches this structure so the script can map columns correctly:**

1. Email Address
2. Full Name
3. Preferred Email Address
4. **Headshot** (File Upload - PNG/JPG)
5. Short Bio
6. Project Name
7. One-Line Project Pitch
8. Project Category
9. Intended Users
10. What Problem Does Your Project Solve?
11. Key Feature 1
12. Key Feature 2
13. Key Feature 3
14. Biggest Technical Challenge
15. Future Plans (Optional)
16. AI Usage Checkboxes
17. AI Help Details (Optional)
18. Technologies Used Checkboxes
19. Proudest Accomplishment
20. Lesson Learned
21. Does your application require login?
22. Demo Username - Demo Password
23. Live Application URL
24. Project Repository URL
25. GitHub Profile URL
26. LinkedIn Profile URL
27. Portfolio URL
28. **Desktop Screenshot** (File Upload)
29. **Mobile Screenshot** (File Upload)

> **Important**: For the File Upload questions (Headshot, Screenshots), the form will automatically save the files to the Form Owner's Google Drive.

### 2. Link Form to Google Sheet
In your Google Form, go to the "Responses" tab and click **"Link to Sheets"**. This will generate a Google Sheet containing all the live responses.

Copy the **Sheet ID** from the URL. 
*(e.g., if the URL is `https://docs.google.com/spreadsheets/d/1x4QaHMilQBOH4qOyYtbvH9_RGVIOuArxFqfQ114td54/edit`, the ID is `1x4QaHMilQBOH4qOyYtbvH9_RGVIOuArxFqfQ114td54`)*

### 3. Google Cloud Configuration
To allow the script to read the Google Sheet and download the images from Google Drive, you need to set up a Google Cloud Project:

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new Project.
3. Go to **APIs & Services > Library** and **Enable** both:
   - **Google Sheets API**
   - **Google Drive API** (Crucial for downloading the images!)
4. Go to **OAuth consent screen** and configure it for "External" use, adding yourself as a Test User.
5. Go to **Credentials**, create an **OAuth 2.0 Client ID** (Desktop Application type).
6. Download the JSON credentials file and rename it to `credentials.json`.
7. Place `credentials.json` in the root of this repository (it is gitignored by default).

### 4. Local Project Setup

Clone the repository and install dependencies:
```bash
npm install
```

Create a `.env.local` file in the root of the project and add your Google Sheet ID:
```env
GOOGLE_SHEET_ID=your_google_sheet_id_here
```

### 5. Run the Import Pipeline

Run the import script to pull the live data:
```bash
npm run import
# OR manually run: npx tsx scripts/importPresenters.ts
```

The first time you run this, a browser window will open asking you to authenticate with your Google Account. **Make sure to check the boxes to grant access to both Google Sheets and Google Drive**.

The script will:
- Parse the spreadsheet
- Download and compress all images to `public/presenters/[slug]/`
- Generate `src/data/presenters.json`

### 6. Run the Site
Start the Next.js development server:
```bash
npm run dev
```

Visit `http://localhost:3000`. You should now see the fully populated Demo Day Showcase!

---

## 🎨 Customizing the Design
To re-theme the showcase for future cohorts, simply update the CSS variables in `src/app/globals.css`. 

You can easily change the primary brand colors, border radiuses, and fonts without touching the React components.
