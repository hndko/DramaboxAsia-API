# 🎬 DramaBox Asia

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**🌏 Stream Asian Dramas Online • K-Drama • C-Drama • Thai Drama**

[Live Demo](https://dramabox-asia.vercel.app) • [Report Bug](https://github.com/yourusername/dramabox-asia/issues) • [Request Feature](https://github.com/yourusername/dramabox-asia/issues)

</div>

---

## ✨ Features

| Feature               | Description                                |
| --------------------- | ------------------------------------------ |
| 🔥 **Trending**       | Discover the hottest dramas this week      |
| 🆕 **Latest Updates** | Browse newly added dramas with pagination  |
| 🔍 **Smart Search**   | Instant search with debounced autocomplete |
| 📺 **HD Streaming**   | Watch dramas in high quality (MP4/HLS)     |
| ❤️ **My List**        | Save favorites to watchlist (localStorage) |
| 📱 **Responsive**     | Optimized for all devices                  |
| 🎨 **Modern UI**      | Glassmorphism, gradients, animations       |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/dramabox-asia.git

# Navigate to directory
cd dramabox-asia

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

---

## 📁 Project Structure

```
src/
├── 📂 components/       # Reusable UI components
│   ├── DramaCard.vue    # Drama card with heart button
│   ├── Navbar.vue       # Navigation with search
│   ├── Hero.vue         # Homepage hero section
│   └── Footer.vue       # Site footer
├── 📂 pages/            # Route pages
│   ├── Home.vue         # Homepage
│   ├── Trending.vue     # Trending dramas
│   ├── Latest.vue       # Latest updates
│   ├── Search.vue       # Search results
│   ├── Detail.vue       # Drama details
│   ├── Watch.vue        # Video player
│   └── MyList.vue       # Saved dramas
├── 📂 composables/      # Vue composables
│   ├── useDrama.js      # API data fetching
│   └── useWatchlist.js  # Watchlist management
├── 📂 services/         # API layer
│   └── api.js           # Fetch with caching
└── 📂 router/           # Vue Router config
```

---

## 🔌 API Endpoints

| Method | Endpoint                           | Description                   |
| ------ | ---------------------------------- | ----------------------------- |
| `GET`  | `/api/trending`                    | Get trending dramas           |
| `GET`  | `/api/latest?page=1`               | Get latest dramas (paginated) |
| `GET`  | `/api/search?q=keyword`            | Search dramas                 |
| `GET`  | `/api/detail?bookId=xxx`           | Get drama details             |
| `GET`  | `/api/stream?bookId=xxx&episode=1` | Get stream URL                |

---

## ⚙️ Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=https://dramabox-asia.vercel.app/api
VITE_APP_NAME=DramaBox Asia
VITE_APP_URL=http://localhost:5173
```

---

## 🛠️ Built With

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript Framework
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Vite](https://vitejs.dev/)** - Next Generation Build Tool
- **[Vue Router](https://router.vuejs.org/)** - Official Router for Vue.js

---

## 📸 Screenshots

<div align="center">
<table>
<tr>
<td><img src="docs/screenshot-home.png" alt="Home" width="400"/></td>
<td><img src="docs/screenshot-detail.png" alt="Detail" width="400"/></td>
</tr>
<tr>
<td align="center"><b>🏠 Homepage</b></td>
<td align="center"><b>📺 Drama Detail</b></td>
</tr>
</table>
</div>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for Asian Drama Lovers**

⭐ Star this repo if you find it helpful!

</div>
