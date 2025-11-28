

# ⚡ EV Locator — Find Nearby EV Charging Stations

EV Locator is a web application that helps electric-vehicle users find the **nearest charging stations in real time**.
The app detects the user's current location, fetches nearby EV charging points using the **Open Charge Map API**, and displays them on an interactive map.

🚗 Built for EV users who want a **quick, intuitive and map-based interface** instead of navigating multiple apps.

---

## 🚀 Features

| Feature                                                                    | Status |
| -------------------------------------------------------------------------- | ------ |
| Detect user location using geolocation                                     | ✔️     |
| Show nearby charging stations on map                                       | ✔️     |
| Show user's current location marker                                        | ✔️     |
| Highlight the nearest charging station                                     | ✔️     |
| Display station details (address, distance, connectors, cost if available) | ✔️     |
| Fully responsive UI                                                        | ✔️     |
| Modern Leaflet + OpenStreetMap map                                         | ✔️     |
| Designed for multi-country usage                                           | ✔️     |
| Filters & rating support                                                   | 🔜     |
| Routing directions to charging point                                       | 🔜     |
| User accounts & favorite stations                                          | 🔜     |

---

## 🧠 Tech Stack

| Tech                        | Purpose                       |
| --------------------------- | ----------------------------- |
| **Next.js** (App Router)    | Frontend & backend API routes |
| **React-Leaflet + Leaflet** | Interactive map               |
| **Open Charge Map API**     | EV station data               |
| **Geolocation API**         | Detect user coordinates       |
| **TypeScript (optional)**   | Type-safe improvements        |
| **Vercel**                  | Hosting (recommended)         |

---

## 📸 Screenshot (add later)

```
[ Add screenshots of landing page & map view here ]
```

---

## 🗺️ How It Works

1. Browser asks permission to access user location
2. App calls `/api/stations?lat=…&lon=…`
3. Backend hits the **Open Charge Map API**
4. Results are processed, sorted by distance, and rendered on the map
5. The nearest charging station gets a **special highlighted marker**

---

## 🔧 Environment Variables

Create a `.env.local` file in the root:

```bash
OCM_API_KEY=your_open_charge_map_api_key
```

---

## ▶️ Getting Started

```bash
git clone https://github.com/yourname/yourrepo.git
cd yourrepo
npm install
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🔗 API Used

**Open Charge Map API**
[https://openchargemap.org/site/develop/api](https://openchargemap.org/site/develop/api)

The project strictly follows their usage requirements and licensing terms.

---

## 🗂️ Folder Structure

```
📦 project-root
 ┣ 📁 app
 ┃ ┣ 📁 charge-map      → Map page
 ┃ ┣ 📁 api/stations    → Backend route for OCM API
 ┃ ┣ layout.tsx         → Global navbar layout
 ┃ ┗ page.tsx           → Landing page
 ┣ 📁 components
 ┃ ┗ Navbar.tsx         → Navigation bar
 ┣ 📁 public
 ┣ package.json
 ┣ .env.local (ignored)
```

---

## 💡 Future Enhancements (Ideas)

* Filters → cost / connector type / fast charging only
* Live charger availability (TomTom API / ChargeZone API if available)
* User profiles + saved chargers
* Offline cache for last-searched region
* Mobile PWA mode for quick launch

---

## 🤝 Contributing

PRs are welcome.
If you’d like to improve station coverage, you can contribute new charger locations directly to the **Open Charge Map project** — the entire EV community benefits ❤️

---

## 📜 License

This project is released under the **MIT License**.
EV charging data © *Open Charge Map* (See their licensing & usage guidelines).

---

## ⭐ Support the Project

If you like this project:

```
⭐ Star the repo — it motivates me!
```


