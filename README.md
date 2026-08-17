# ✈️ United Careers Website Clone

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Web Scraping](https://img.shields.io/badge/Web%20Scraping-Enabled-FF6B6B?style=for-the-badge&logo=web&logoColor=white)](https://www.crummy.com/software/BeautifulSoup/)
[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Responsive](https://img.shields.io/badge/Responsive-Design-00D9FF?style=for-the-badge&logo=responsive&logoColor=white)](https://www.w3schools.com/css/css_rwd_intro.asp)

A complete mirrored clone of the **United Airlines Careers website** built with Python web scraping & local server hosting. Includes job listings, career portal functionality, and company information with offline access.

---

## ✨ Features

- **🌐 Full Website Mirror** – Complete HTML/CSS/JS snapshot of United careers portal
- **🔍 Web Scraping** – Automated data fetching using Python scripts
- **💾 Offline Access** – Serve entire website locally without internet dependency
- **📊 Data Extraction** – Parse & extract job listings, company info, and career paths
- **⚡ Fast Local Server** – Python Flask/HTTP server for instant access
- **🔄 Auto-Update** – Scripts to refresh mirrored content periodically
- **📱 Responsive UI** – Mobile-friendly design across all devices

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Python 3.8+ |
| **Web Server** | Flask / HTTP Server |
| **Scraping** | BeautifulSoup4, Requests |
| **Frontend** | HTML5, CSS3, JavaScript |
| **Storage** | Local File System |
| **Verification** | Custom Python validators |

---

## 📁 Project Structure

```
united-careers-website-clone/
├── mirror/                     # Mirrored website files
│   ├── index.html             # Homepage
│   ├── careers/               # Career section pages
│   │   ├── index.html
│   │   ├── jobs/
│   │   └── company-info/
│   ├── css/                   # Stylesheets
│   ├── js/                    # JavaScript assets
│   ├── images/                # Media assets
│   └── assets/                # Fonts, icons, etc.
│
├── .claude/                   # Claude AI configuration
├── fetch_chunks.py           # Download website chunks
├── mirror_site.py            # Main mirroring script
├── serve.py                  # Local HTTP server
├── verify.py                 # Validation & integrity check
├── readme.txt                # Quick start guide
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Terminal/Command Prompt

### 1. Clone Repository

```bash
git clone https://github.com/SanaullahTareen/united-careers-website-clone.git
cd united-careers-website-clone
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
# or manually:
pip install requests beautifulsoup4 flask lxml
```

### 3. Create Mirror (First Time)

```bash
python mirror_site.py
```

This script will:
- ✅ Scrape United careers website
- ✅ Download all HTML, CSS, JS, images
- ✅ Store in `mirror/` folder
- ✅ Create local file structure

### 4. Verify Integrity

```bash
python verify.py
```

Checks:
- All files downloaded correctly
- No broken links
- Data completeness

### 5. Start Local Server

```bash
python serve.py
```

Server will start at: **`http://localhost:8000`**

Or use Python's built-in server:
```bash
python -m http.server 8000 --directory mirror/
```

Then open browser: `http://localhost:8000`

---

## 📖 Usage Guide

### Serve Website Locally
```bash
python serve.py
# Visit http://localhost:8000 in browser
```

### Update Mirror Content
```bash
python fetch_chunks.py
python mirror_site.py
python verify.py
```

### View Specific Jobs
Navigate to `/mirror/careers/jobs/` folder to browse job listings by department.

### Extract Data
```python
# Example: Parse job data from mirror
from bs4 import BeautifulSoup

with open('mirror/careers/jobs/index.html') as f:
    soup = BeautifulSoup(f, 'html.parser')
    jobs = soup.find_all('div', class_='job-listing')
    for job in jobs:
        print(job.get_text())
```

---

## 🔧 Script Reference

### `mirror_site.py` – Main Scraper
```bash
python mirror_site.py [--update] [--force]
```
- Downloads entire United careers website
- Creates local mirror in `mirror/` folder
- Handles redirects, dynamic content, media assets

### `fetch_chunks.py` – Chunk Downloader
```bash
python fetch_chunks.py [--chunk-size 10]
```
- Downloads website in chunks (faster, more reliable)
- Useful for large websites or slow connections
- Can resume interrupted downloads

### `serve.py` – Local Server
```bash
python serve.py [--port 8000] [--host localhost]
```
- Starts local HTTP server
- Serves mirrored website
- Auto-reload on file changes

### `verify.py` – Integrity Validator
```bash
python verify.py [--deep]
```
- Verifies all files downloaded
- Checks for broken links
- Reports missing assets
- Deep scan option: validates HTML structure

---

## 📊 Mirrored Content

### Pages Included
| Section | URL | Status |
|---------|-----|--------|
| Homepage | `/` | ✅ Complete |
| Careers Portal | `/careers/` | ✅ Complete |
| Job Listings | `/careers/jobs/` | ✅ Complete |
| Company Info | `/careers/company/` | ✅ Complete |
| Benefits | `/careers/benefits/` | ✅ Complete |
| Contact | `/careers/contact/` | ✅ Complete |

### Job Categories
- 🏢 Corporate & Management
- ✈️ Flight Operations
- 🛠️ Maintenance & Engineering
- 🎫 Customer Service
- 💼 Corporate Functions
- 🌍 International Positions

---

## ⚙️ Configuration

### Customize Scraping

Edit `mirror_site.py`:
```python
# Set target URL
BASE_URL = "https://careers.united.com"

# Exclude paths (skip downloading)
EXCLUDE_PATHS = [
    '/admin',
    '/api',
    '/cdn-cgi'
]

# Custom headers (bypass blocks)
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

# Timeout & retries
TIMEOUT = 10
MAX_RETRIES = 3
```

### Server Settings

Edit `serve.py`:
```python
HOST = "localhost"
PORT = 8000
DEBUG = True
MIRROR_PATH = "./mirror"
```

---

## 🔒 Legal Notice

⚠️ **Educational Purposes Only**

This project is created for:
- ✅ Learning web scraping techniques
- ✅ Understanding website architecture
- ✅ Personal offline reference
- ❌ **NOT for redistribution or commercial use**

United Airlines® is a registered trademark. This is an educational mirror, not affiliated with United Airlines.

---

## 🐛 Troubleshooting

### Issue: "Connection timeout"
```bash
# Increase timeout in mirror_site.py
TIMEOUT = 30  # Increase from 10
python mirror_site.py
```

### Issue: "Missing CSS/Images"
```bash
# Re-verify and re-download assets
python fetch_chunks.py --force
python verify.py --deep
```

### Issue: "Port 8000 already in use"
```bash
# Use different port
python serve.py --port 8080
```

### Issue: "403 Forbidden" errors
```bash
# Update User-Agent in mirror_site.py
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}
python mirror_site.py --force
```

---

## 📈 Performance Tips

1. **First Run**: Expect 10-15 minutes for full mirror
2. **Incremental Updates**: Run `fetch_chunks.py` for faster updates
3. **Local Server**: Instant access—no internet needed
4. **Cache**: Browser caches assets—subsequent loads are instant

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/improve-scraper`
3. Make changes & test
4. Commit: `git commit -m 'Improve scraping efficiency'`
5. Push: `git push origin feature/improve-scraper`
6. Open Pull Request

---

## 📝 Requirements

Create `requirements.txt`:
```
requests>=2.28.0
beautifulsoup4>=4.11.0
lxml>=4.9.0
flask>=2.3.0
```

Install all:
```bash
pip install -r requirements.txt
```

---

## 📄 License

MIT License – Free to use for educational purposes.

**Note**: Mirrored content is property of United Airlines. This tool is for learning only.

---

## 🔗 Resources

- [BeautifulSoup4 Docs](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [Requests Library](https://requests.readthedocs.io/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Python Web Scraping Guide](https://realpython.com/beautiful-soup-web-scraper-python/)
- [United Airlines Careers](https://careers.united.com/)

---

## 📧 Support & Issues

Found a bug? [Open an issue](https://github.com/SanaullahTareen/united-careers-website-clone/issues)

---

## 🌟 Acknowledgments

- **BeautifulSoup** – HTML parsing
- **Requests** – HTTP client
- **Flask** – Web framework
- **United Airlines** – Original website design

---

<div align="center">

### 🎯 Crafted by **Sanaullah Tareen** 

<sub>
  
  **Full-Stack Developer** | **AI/ML Engineer** | **Computer Vision Specialist**
  
  *Building production-ready applications with modern web technologies*
  
  [![GitHub](https://img.shields.io/badge/GitHub-@SanaullahTareen-181717?style=flat-square&logo=github)](https://github.com/SanaullahTareen)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Sanaullah%20Tareen-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/sanaullah-tareen)
  [![HuggingFace](https://img.shields.io/badge/HuggingFace-@SanaullahTareen07-FFD21E?style=flat-square&logo=huggingface)](https://huggingface.co/SanaullahTareen07)
  [![Portfolio](https://img.shields.io/badge/Portfolio-sanaullahtareen.me-000000?style=flat-square&logo=web)](https://sanaullahtareen.me)

</sub>

</div>
