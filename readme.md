# 🎬 Movie Recommendation System

A real-time TV series search engine that fetches data from Namava API and provides intelligent recommendations based on user input with a beautiful Persian interface.

## 🚀 Live Demo

- **Frontend**: [Live on Netlify](https://namava-search-engine.netlify.app/)
- **Backend API**: [Railway Deployment](https://namava-recommender-production.up.railway.app/)

## 📋 Project Overview

This project was developed as a technical assessment to demonstrate full-stack development capabilities, API integration, and deployment skills. The system consists of three main components:

1. **Data Collector** - Async web scraper for Namava API
2. **Flask API** - RESTful backend service
3. **Frontend Interface** - Real-time search UI

## 🏗️ Architecture & Development Flow

### Phase 1: Data Collection & Storage

**Challenge**: Efficiently scrape thousands of TV series from Namava API
**Solution**: Implemented async data collection with rate limiting

```
data_collector.py → Namava API → data.csv
```

- Used `aiohttp` for concurrent API requests
- Implemented semaphore-based rate limiting (30 concurrent requests)
- Async file writing to prevent I/O blocking
- Collected: series_id, name, hit rating, IMDB score, image URLs

### Phase 2: API Development

**Challenge**: Create efficient search algorithm with ranking
**Solution**: Prefix-based search with intelligent fallback

```
Flask API → pandas processing → JSON response
```

- Built RESTful endpoint `/api/v1/top_match`
- Implemented smart ranking (IMDB score priority, hit score fallback)
- Added CORS support for cross-origin requests
- Handled edge cases (NaN values, empty results)

### Phase 3: Frontend Development

**Challenge**: Real-time search with Persian language support
**Solution**: Event-driven UI with debounced API calls

```
User Input → API Request → Dynamic Rendering
```

- Real-time search as user types
- Persian RTL interface design
- Responsive card-based layout
- Rating display (IMDB + Hit scores)

### Phase 4: Deployment

**Challenge**: Deploy full-stack application with separate hosting
**Solution**: Split deployment strategy

- **Frontend**: Netlify (static hosting)
- **Backend**: Railway (Flask app hosting)
- **CORS Configuration**: Enabled cross-origin requests

## 🛠️ Technical Implementation

### Data Collection (`data_collector.py`)

```python
# Key features implemented:
- Async HTTP sessions with connection pooling
- Semaphore-based concurrency control
- Progressive data writing with flush operations
- Error handling and retry logic
```

### Search Algorithm (`utils.py`)

```python
# Intelligent ranking system:
- Primary: IMDB scores (0-10 scale)
- Fallback: Hit scores (normalized to 0-10)
- Prefix matching with progressive shortening
- Duplicate prevention with set tracking
```

### API Endpoints (`app.py`)

```
GET /api/v1/top_match?keyword={search_term}
Response: Array of top 5 matching series with metadata
```

## 🚀 Quick Start Guide

### Prerequisites

```bash
Python 3.8+
pip install -r requirements.txt
```

### 1. Data Collection

```bash
python data_collector.py
# Collects all TV series data from Namava API
# Outputs: data.csv with 5000+ series
```

### 2. Start Backend Server

```bash
python app.py
# Runs Flask server on localhost:5000
# API available at /api/v1/top_match
```

### 3. Launch Frontend

```bash
# Open index.html in browser
# Or deploy to Netlify for production
```

### 4. Test API Directly

```bash
curl "http://localhost:5000/api/v1/top_match?keyword=آخر"
```

## 📁 Project Structure

```
Movie Recomender System/
├── data_collector.py    # Async web scraper
├── app.py              # Flask API server
├── utils.py            # Search & ranking logic
├── data.csv            # Series database (5000+ entries)
├── index.html          # Frontend interface
├── index.js            # Client-side logic
├── styles.css          # Persian RTL styling
├── netlify.toml        # Deployment config
├── requirements.txt    # Python dependencies
└── images/             # UI assets
    ├── favicon.png
    ├── imdb.png
    └── star.png
```

## 🔧 Key Challenges Overcome

### 1. **Async Performance Optimization**

- **Problem**: Sequential API calls were too slow (1000+ requests)
- **Solution**: Implemented async/await with controlled concurrency
- **Result**: 10x faster data collection

### 2. **JSON Serialization Issues**

- **Problem**: NaN values breaking JSON responses
- **Solution**: Convert NaN to null for valid JSON
- **Code**: `item["imdb"] = None if math.isnan(item["imdb"]) else item["imdb"]`

### 3. **Cross-Origin Resource Sharing**

- **Problem**: Frontend couldn't access API from different domain
- **Solution**: Added Flask-CORS with proper configuration
- **Implementation**: `CORS(app)` for all domains

### 4. **Search Algorithm Efficiency**

- **Problem**: Need intelligent ranking with multiple criteria
- **Solution**: Hybrid scoring system with progressive prefix matching
- **Logic**: IMDB score priority → Hit score fallback → Prefix shortening

### 5. **Deployment Architecture**

- **Problem**: Single hosting solution limitations
- **Solution**: Split deployment (Netlify + Railway)
- **Benefit**: Optimized for static frontend + dynamic backend

## 🌐 Deployment Details

### Frontend (Netlify)

- **Platform**: Netlify Static Hosting
- **Build**: Direct HTML/CSS/JS deployment
- **Config**: `netlify.toml` with security headers
- **URL**: Auto-generated Netlify domain

### Backend (Railway)

- **Platform**: Railway Cloud Hosting
- **Runtime**: Python Flask application
- **URL**: `https://namava-recommender-production.up.railway.app/`
- **Features**: Auto-scaling, HTTPS, custom domain support

## 📝 API Documentation

### Search Endpoint

```
GET /api/v1/top_match?keyword={search_term}
```

**Parameters:**

- `keyword` (required): Search term for TV series

**Response:**

```json
[
  {
    "series_id": 12345,
    "series_name": "نام سریال",
    "hit": 85,
    "imdb": 8.2,
    "series_image_url": "https://www.namava.ir/image.jpg"
  }
]
```

## 🤝 Contributing

This project demonstrates full-stack development capabilities including:

- Async web scraping and data processing
- RESTful API design and implementation
- Modern frontend development with real-time features
- Cloud deployment and DevOps practices
- Persian language and RTL interface support

---

**Developed by Hassan Kalantari** | [GitHub](https://github.com/hassankalantari) | [LinkedIn](https://linkedin.com/in/hassankalantari)
