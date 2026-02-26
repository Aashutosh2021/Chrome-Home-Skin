A feature-rich Chrome extension that transforms your new tab into a beautiful, interactive dashboard with 3D animations, real-time weather updates, and customizable shortcuts.

## 🌟 Features

### 🎨 Stunning 3D Visuals
- **3D Solar System Background**: Animated solar system with all 8 planets orbiting the sun
- **Dynamic Day/Night Cycle**: Sky changes color based on real-time (sunrise, day, dusk, night)
- **Twinkling Stars**: Animated starfield that appears during nighttime
- **Moving Sun & Moon**: Celestial bodies follow realistic arc paths across the sky
- **Mountain Landscape**: Beautiful layered mountain scenery
- <img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/5bb7d0b8-9b64-4ba3-bd8e-ed3a0ca85ee2" />
<img width="1918" height="919" alt="image" src="https://github.com/user-attachments/assets/39576c8d-1d10-41c8-ace8-d3609f5b714c" />



### 🕐 Time & Date Display
- **Analog Clock**: Beautiful gradient-styled clock with hour, minute, and second hands
- **Digital Clock**: Large, easy-to-read 12-hour format with AM/PM
- **Date Display**: Full date with day of week and formatted date

### 🌤️ Real-Time Weather Widget
- **Auto-Location Detection**: Automatically detects your location via IP geolocation
- **Manual City Selection**: Change to any city worldwide with autocomplete
- **Weather Information**: 
  - Current temperature
  - Feels-like temperature
  - Humidity percentage
  - Dynamic weather emoji icons
- **Auto Location Reset**: Easily switch back to automatic location detection
- **Beautiful UI**: Modern card-based design with gradient backgrounds

### 🚀 Google Apps Integration
- Quick access to 18+ Google services:
  - Gmail, Drive, Calendar, Meet
  - Docs, Sheets, Slides
  - YouTube, Photos, Maps
  - Gemini AI, Translate
  - And more!
- **Collapsible Menu**: Clean, space-saving dropdown interface
- **Custom Icons**: Each app has a unique gradient icon

### 🔖 Custom Shortcuts
- **Add Unlimited Shortcuts**: Create quick links to your favorite websites
- **Auto-Generated Icons**: Beautiful circular icons with initials
- **Easy Management**: Delete shortcuts with hover-to-reveal delete buttons
- **Persistent Storage**: Shortcuts saved to browser's local storage

### 🛸 Interactive Easter Egg
- **Alien UFO Animation**: Floating UFO with animated alien, lights, and antenna
- **Click Interaction**: Click the UFO for a surprise space journey!
- **Beam Effect**: Animated abduction beam with particles
- **Space Redirect**: Takes you on an adventure to NASA's Solar System page

### 🔍 Google Search Integration
- Full-width search bar with instant Google search
- Clean, minimalist design
- Auto-complete enabled

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Advanced animations, gradients, and 3D transforms
- **Vanilla JavaScript**: No frameworks, pure JS for optimal performance
- **Chrome Extension APIs**: Manifest V3 compliance
- **External APIs**:
  - Open-Meteo API (weather data)
  - OpenStreetMap Nominatim (geocoding)
  - ipapi.co & ip-api.com (IP geolocation)

## 📦 Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the extension folder
6. Open a new tab to see your new dashboard!

## 🎯 Key Files

- index.html - Main dashboard structure
- style.css - All styling and animations
- index.js - Core functionality and API integrations
- manifest.json - Chrome extension configuration
- photo_compressor.html - Bonus: Image compression tool

## 🌐 API Usage

This extension uses free, no-API-key-required services:
- **Weather**: Open-Meteo API (CC BY 4.0 License)
- **Geocoding**: OpenStreetMap Nominatim (ODbL License)
- **IP Location**: ipapi.co / ip-api.com (Free tier)

## 🎨 Customization

The dashboard is highly customizable:
- Add/remove shortcuts
- Change preferred city for weather
- All colors and gradients can be modified in style.css
- Time-based sky colors are configurable in index.js

## 📱 Responsive Design

- Adapts to different screen sizes
- Optimized for desktop browsers
- Fixed positioning for weather widget and apps menu

## 🔒 Privacy

- No data collection
- No external tracking
- All preferences stored locally in browser
- Weather APIs don't require personal information

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

---

**Note**: This extension overrides your new tab page. To revert, simply disable or uninstall the extension from `chrome://extensions/`.
