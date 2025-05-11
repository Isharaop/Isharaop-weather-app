#  Technical Design

##  Architecture

This is a frontend-only Micro SaaS-style application.

### Components:
- **Frontend (HTML, CSS, JavaScript)**: Handles UI, weather display, and video updates.
- **Weather API**: OpenWeatherMap API used to fetch live weather using city IDs.
- **Video Assets**: Stored locally in `/videos/`, each matched with a weather type.

##  Why Frontend Only?
- Easy to deploy on platforms like Vercel or GitHub Pages
- Reduces complexity (no backend maintenance)
- API key stored client-side (can be moved to `.env` later)

##  Directory Structure

