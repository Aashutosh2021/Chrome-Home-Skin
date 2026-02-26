// 3D Scene Time-Based Animation
function update3DScene() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    const sun = document.getElementById('sun');
    const sky = document.getElementById('sky');
    const moon = document.getElementById('moon');
    const stars = document.getElementById('stars');
    
    if (!sun || !sky || !moon || !stars) return;
    
    // Calculate sun position (sunrise at 6am, sunset at 6pm)
    // Sun travels from left to right in an arc
    let sunProgress = 0;
    let skyGradient = '';
    
    if (totalMinutes >= 360 && totalMinutes <= 1080) { // 6am to 6pm
        sunProgress = (totalMinutes - 360) / 720; // 0 to 1
        
        // Sun arc position (parabolic path)
        const xPos = 10 + (sunProgress * 80); // 10% to 90%
        const yPos = 70 - Math.sin(sunProgress * Math.PI) * 50; // Arc path
        
        sun.style.left = `${xPos}%`;
        sun.style.top = `${yPos}%`;
        sun.style.opacity = '1';
        moon.style.opacity = '0';
        stars.style.opacity = '0';
        
        // Sky colors throughout the day
        if (totalMinutes < 420) { // 6am-7am: Dawn
            skyGradient = 'linear-gradient(to bottom, #FF6B6B 0%, #FFB88C 50%, #87CEEB 100%)';
        } else if (totalMinutes < 480) { // 7am-8am: Morning
            skyGradient = 'linear-gradient(to bottom, #FFB347 0%, #FFCC99 40%, #87CEEB 100%)';
        } else if (totalMinutes < 1020) { // 8am-5pm: Day
            skyGradient = 'linear-gradient(to bottom, #87CEEB 0%, #B0E2FF 50%, #E0F6FF 100%)';
        } else if (totalMinutes < 1080) { // 5pm-6pm: Dusk
            skyGradient = 'linear-gradient(to bottom, #FF6B6B 0%, #FF8E53 40%, #FFB347 70%, #87CEEB 100%)';
        }
    } else { // Night time
        sun.style.opacity = '0';
        moon.style.opacity = '1';
        stars.style.opacity = '1';
        
        // Moon arc position - complete arc from left to right
        let moonProgress = 0;
        if (totalMinutes < 360) { // Midnight to 6am
            moonProgress = 0.5 + (totalMinutes / 720); // 0.5 to 1.0 (continues from evening)
        } else { // 6pm to midnight
            moonProgress = (totalMinutes - 1080) / 720; // 0 to 0.5
        }
        
        // Moon travels from left (10%) to right (90%) in a parabolic arc
        const moonX = 10 + (moonProgress * 80); // 10% to 90%
        const moonY = 48 - Math.sin(moonProgress * Math.PI) * 45; // Arc path (moved 40px higher)
        moon.style.left = `${moonX}%`;
        moon.style.top = `${moonY}%`;
        
        if (totalMinutes < 360) { // Midnight to 6am
            const nightProgress = totalMinutes / 360;
            if (nightProgress < 0.5) { // Deep night
                skyGradient = 'linear-gradient(to bottom, #0B1026 0%, #1C2951 50%, #2C3E75 100%)';
            } else { // Pre-dawn
                skyGradient = 'linear-gradient(to bottom, #1C2951 0%, #3D4E7A 50%, #5A6FA8 100%)';
            }
        } else { // After 6pm
            skyGradient = 'linear-gradient(to bottom, #0B1026 0%, #1C2951 50%, #2C3E75 100%)';
        }
    }
    
    sky.style.background = skyGradient;
}

// Generate stars for night sky
function generateStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}

// Digital Clock
function updateDigitalClock() {
  const now = new Date();
  const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const period = now.getHours() >= 12 ? 'PM' : 'AM';
  
  document.getElementById('digital-clock').textContent = `${hours}:${minutes} ${period}`;
}

// Date Display
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('en-US', options);
}

// Analog Clock
function updateAnalogClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;
    
    document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
}

// Custom Shortcuts
function loadShortcuts() {
    const shortcuts = JSON.parse(localStorage.getItem('customShortcuts')) || [];
    const container = document.getElementById('custom-shortcuts');
    container.innerHTML = '';
    
    shortcuts.forEach((shortcut, index) => {
        const card = document.createElement('a');
        card.href = shortcut.url;
        card.target = '_blank';
        card.className = 'shortcut-card';
        
        // Get first letter or first two letters for the icon
        const initials = shortcut.name.substring(0, 2).toUpperCase();
        
        card.innerHTML = `
            <div class="shortcut-icon">
                <span class="shortcut-initials">${initials}</span>
            </div>
            <span class="shortcut-name">${shortcut.name}</span>
            <button class="delete-shortcut" data-index="${index}">×</button>
        `;
        container.appendChild(card);
    });
    
    // Add delete listeners
    document.querySelectorAll('.delete-shortcut').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteShortcut(e.target.dataset.index);
        });
    });
}

function saveShortcut(name, url) {
    const shortcuts = JSON.parse(localStorage.getItem('customShortcuts')) || [];
    shortcuts.push({ name, url });
    localStorage.setItem('customShortcuts', JSON.stringify(shortcuts));
    loadShortcuts();
}

function deleteShortcut(index) {
    const shortcuts = JSON.parse(localStorage.getItem('customShortcuts')) || [];
    shortcuts.splice(index, 1);
    localStorage.setItem('customShortcuts', JSON.stringify(shortcuts));
    loadShortcuts();
}

// Modal
const modal = document.getElementById('shortcut-modal');
const addBtn = document.getElementById('add-shortcut-btn');
const closeBtn = document.querySelector('.close-modal');
const form = document.getElementById('shortcut-form');

addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('shortcut-name').value;
    let url = document.getElementById('shortcut-url').value;
    
    // Add https:// if not present
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    saveShortcut(name, url);
    form.reset();
    modal.style.display = 'none';
});

// Google Profile Photo
function loadGoogleProfilePhoto() {
    const profileImg = document.getElementById('profile-photo');
    if (profileImg) {
        // Try to get profile photo from Google
        // Check if user is signed into Chrome/Google
        fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' })
            .then(() => {
                // User might be logged in, try to load actual profile photo
                // Using Google's profile photo URL pattern
                const possibleUrls = [
                    'https://accounts.google.com/ServiceLogin',
                ];
                // For now, keep the default Google profile placeholder
                // In a real implementation, you'd use Chrome Identity API
            })
            .catch(() => {
                // If fetch fails, fallback icon will show
            });
    }
}

// Apps Section Toggle
const appsHeader = document.getElementById('apps-header');
const appsSection = document.getElementById('apps-section');

if (appsHeader && appsSection) {
    appsHeader.addEventListener('click', () => {
        appsSection.classList.toggle('show');
        appsHeader.classList.toggle('open');
    });
}

// Weather Widget Functions
async function getLocationFromIP() {
    try {
        // Using ipapi.co for IP-based geolocation (free, no API key required)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        console.log('IP Location data:', data); // Debug log
        
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            city: data.city,
            region: data.region,
            country: data.country_name
        };
    } catch (error) {
        console.error('Error fetching IP location:', error);
        // Fallback to alternative IP API
        try {
            const response = await fetch('http://ip-api.com/json/');
            const data = await response.json();
            console.log('IP Location data (fallback):', data); // Debug log
            
            return {
                latitude: data.lat,
                longitude: data.lon,
                city: data.city,
                region: data.regionName,
                country: data.country
            };
        } catch (err) {
            console.error('Error with fallback IP API:', err);
            return null;
        }
    }
}

async function getWeatherData(latitude, longitude) {
    try {
        // Using Open-Meteo API (no API key required)
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&timezone=auto`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

async function geocodeCityName(cityName) {
    try {
        // Using OpenStreetMap Nominatim for geocoding
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`,
            {
                headers: {
                    'User-Agent': 'ChromeWeatherWidget/1.0'
                }
            }
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
            return {
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
                displayName: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Error geocoding city:', error);
        return null;
    }
}

async function getCityName(latitude, longitude) {
    try {
        // Using OpenStreetMap Nominatim for reverse geocoding (no API key required)
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`,
            {
                headers: {
                    'User-Agent': 'ChromeWeatherWidget/1.0'
                }
            }
        );
        const data = await response.json();
        console.log('Location data:', data); // Debug log
        console.log('Coordinates:', latitude, longitude); // Debug log
        
        // Better handling for Indian addresses
        const address = data.address;
        const cityName = address.city || 
                        address.town || 
                        address.village || 
                        address.county ||
                        address.state_district ||
                        address.state || 
                        'Unknown Location';
        
        console.log('Detected city:', cityName); // Debug log
        return cityName;
    } catch (error) {
        console.error('Error fetching location:', error);
        return 'Unknown Location';
    }
}

function getWeatherEmoji(weatherCode) {
    // WMO Weather interpretation codes
    const weatherCodes = {
        0: '☀️', // Clear sky
        1: '🌤️', 2: '⛅', 3: '☁️', // Partly cloudy
        45: '🌫️', 48: '🌫️', // Fog
        51: '🌦️', 53: '🌦️', 55: '🌦️', // Drizzle
        61: '🌧️', 63: '🌧️', 65: '🌧️', // Rain
        71: '🌨️', 73: '🌨️', 75: '🌨️', // Snow
        77: '❄️', // Snow grains
        80: '🌦️', 81: '🌧️', 82: '⛈️', // Rain showers
        85: '🌨️', 86: '🌨️', // Snow showers
        95: '⛈️', // Thunderstorm
        96: '⛈️', 99: '⛈️' // Thunderstorm with hail
    };
    return weatherCodes[weatherCode] || '🌡️';
}

async function updateWeatherWidget() {
    try {
        // First, check if user has saved a preferred city
        const savedCity = localStorage.getItem('userPreferredCity');
        
        if (savedCity) {
            console.log('Loading saved city:', savedCity);
            await updateWeatherByCity(savedCity, false); // false = don't save again
            return;
        }
        
        // If no saved city, try to get location from IP address
        console.log('Fetching location from IP address...');
        const ipLocation = await getLocationFromIP();
        
        if (ipLocation) {
            const { latitude, longitude, city, region } = ipLocation;
            console.log('IP-based location:', city, region);
            console.log('Coordinates:', latitude, longitude);
            
            // Fetch weather data using IP-based coordinates
            const weatherData = await getWeatherData(latitude, longitude);
            
            if (weatherData && weatherData.current) {
                const temp = Math.round(weatherData.current.temperature_2m);
                const humidity = weatherData.current.relative_humidity_2m;
                const feelsLike = Math.round(weatherData.current.apparent_temperature);
                const weatherCode = weatherData.current.weather_code;
                const emoji = getWeatherEmoji(weatherCode);
                
                // Display city from IP geolocation
                const displayCity = city || region || 'Unknown Location';
                
                console.log('Weather data:', { temp, humidity, feelsLike, displayCity }); // Debug log
                
                // Update the HTML elements
                document.querySelector('.location span:last-child').textContent = displayCity;
                document.querySelector('.feels-like span:last-child').textContent = `Feels ${feelsLike}°C`;
                document.querySelector('.humidity-label').textContent = `Humidity ${humidity}%`;
                document.querySelector('.temperature').textContent = `${temp}°`;
                document.querySelector('.weather-icon').textContent = emoji;
                
                return; // Successfully updated, exit function
            }
        }
        
        // Fallback to GPS-based geolocation if IP method fails
        if ('geolocation' in navigator) {
            console.log('Falling back to GPS geolocation...');
            const geoOptions = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };
            
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('GPS position:', latitude, longitude);
                    
                    // Fetch weather and location data
                    const [weatherData, cityName] = await Promise.all([
                        getWeatherData(latitude, longitude),
                        getCityName(latitude, longitude)
                    ]);
                    
                    if (weatherData && weatherData.current) {
                        const temp = Math.round(weatherData.current.temperature_2m);
                        const humidity = weatherData.current.relative_humidity_2m;
                        const feelsLike = Math.round(weatherData.current.apparent_temperature);
                        const weatherCode = weatherData.current.weather_code;
                        const emoji = getWeatherEmoji(weatherCode);
                        
                        console.log('Weather data:', { temp, humidity, feelsLike, cityName });
                        
                        // Update the HTML elements
                        document.querySelector('.location span:last-child').textContent = cityName;
                        document.querySelector('.feels-like span:last-child').textContent = `Feels ${feelsLike}°C`;
                        document.querySelector('.humidity-label').textContent = `Humidity ${humidity}%`;
                        document.querySelector('.temperature').textContent = `${temp}°`;
                        document.querySelector('.weather-icon').textContent = emoji;
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    console.error('Error code:', error.code, 'Message:', error.message);
                    // Keep default values if geolocation fails
                },
                geoOptions
            );
        }
    } catch (error) {
        console.error('Error updating weather widget:', error);
    }
}

async function updateWeatherByCity(cityName, saveCity = true) {
    try {
        console.log('Searching for city:', cityName);
        
        // Geocode the city name to get coordinates
        const location = await geocodeCityName(cityName);
        
        if (!location) {
            // alert('City not found. Please try another city name.');
            return;
        }
        
        console.log('Found location:', location);
        
        // Fetch weather data for the coordinates
        const weatherData = await getWeatherData(location.latitude, location.longitude);
        
        if (weatherData && weatherData.current) {
            const temp = Math.round(weatherData.current.temperature_2m);
            const humidity = weatherData.current.relative_humidity_2m;
            const feelsLike = Math.round(weatherData.current.apparent_temperature);
            const weatherCode = weatherData.current.weather_code;
            const emoji = getWeatherEmoji(weatherCode);
            
            // Extract city name from display name
            const cityDisplayName = location.displayName.split(',')[0];
            
            console.log('Weather data:', { temp, humidity, feelsLike, cityDisplayName });
            
            // Save the city to localStorage if saveCity is true (user changed it manually)
            if (saveCity) {
                localStorage.setItem('userPreferredCity', cityName);
                console.log('Saved preferred city:', cityName);
            }
            
            // Update the HTML elements
            document.querySelector('.location span:last-child').textContent = cityDisplayName;
            document.querySelector('.feels-like span:last-child').textContent = `Feels ${feelsLike}°C`;
            document.querySelector('.humidity-label').textContent = `Humidity ${humidity}%`;
            document.querySelector('.temperature').textContent = `${temp}°`;
            document.querySelector('.weather-icon').textContent = emoji;
        }
    } catch (error) {
        console.error('Error updating weather by city:', error);
        alert('Failed to update weather. Please try again.');
    }
}

// Alien UFO Click Handler
let ufoClickCount = 0;
let isCrazyMode = false;

function activateUFOCrazyMode(event) {
    console.log('UFO clicked!'); // Debug log
    event.preventDefault();
    event.stopPropagation();
    
    const ufo = document.getElementById('alien-ufo');
    const beam = document.getElementById('ufo-beam');
    const body = document.body;
    
    if (!ufo || !beam) {
        console.error('UFO elements not found');
        return;
    }
    
    ufoClickCount++;
    console.log('UFO click count:', ufoClickCount);
    
    // Play UFO sound effect (simple beep using Web Audio API)
    playUFOSound();
    
    if (ufoClickCount === 1) {
        // Third+ click: UFO ABDUCTS YOU TO SPACE!
        console.log('UFO ABDUCTION MODE - Taking you to space!');
        if (!isCrazyMode) {
            isCrazyMode = true;
            
            // Activate beam
            beam.classList.add('active');
            
            // Create overlay for dramatic effect
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            overlay.style.transition = 'background-color 2s ease';
            overlay.style.zIndex = '9998';
            overlay.style.pointerEvents = 'none';
            document.body.appendChild(overlay);
            
            // Move UFO to center and zoom in
            ufo.style.transition = 'all 2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            ufo.style.left = '50%';
            ufo.style.bottom = 'auto';
            ufo.style.top = '50%';
            ufo.style.transform = 'translate(-50%, -50%) scale(5)';
            ufo.style.zIndex = '9999';
            
            // Fade overlay to dark
            setTimeout(() => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            }, 100);
            
            // Create space particles effect
            const particleInterval = setInterval(() => {
                createSpaceParticle();
            }, 50);
            
            // After 2 seconds, zoom out and redirect
            setTimeout(() => {
                clearInterval(particleInterval);
                
                // Zoom out super fast (flying away effect)
                ufo.style.transition = 'all 1s ease-in';
                ufo.style.transform = 'translate(-50%, -50%) scale(20)';
                overlay.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                
                // Redirect to space page after zoom out
                setTimeout(() => {
                    // Redirect to NASA's Solar System Exploration page
                    window.location.href = 'https://science.nasa.gov/solar-system/';
                }, 1000);
            }, 2000);
        }
    }
}

function createSpaceParticle() {
    const particle = document.createElement('div');
    particle.className = 'space-particle';
    particle.textContent = ['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)];
    particle.style.position = 'fixed';
    particle.style.fontSize = Math.random() * 30 + 10 + 'px';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.zIndex = '9997';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0';
    particle.style.animation = 'particleFadeIn 0.5s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 3000);
}

function playUFOSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            console.log('AudioContext not supported');
            return;
        }
        
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        
        // Wobble effect
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        
        console.log('UFO sound played');
    } catch (error) {
        console.log('Audio error:', error.message);
    }
}

function createFlyingEmoji(emoji) {
    console.log('Creating flying emoji:', emoji);
    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'flying-emoji';
    emojiDiv.textContent = emoji;
    emojiDiv.style.position = 'fixed';
    emojiDiv.style.fontSize = '40px';
    emojiDiv.style.left = Math.random() * window.innerWidth + 'px';
    emojiDiv.style.top = '-50px';
    emojiDiv.style.zIndex = '9999';
    emojiDiv.style.pointerEvents = 'none';
    emojiDiv.style.animation = 'emojiFloat 3s ease-in forwards';
    
    document.body.appendChild(emojiDiv);
    
    setTimeout(() => {
        emojiDiv.remove();
        console.log('Flying emoji removed');
    }, 3000);
}

// Initialize
function init() {
    updateDigitalClock();
    updateDate();
    updateAnalogClock();
    loadShortcuts();
    loadGoogleProfilePhoto();
    generateStars();
    updateWeatherWidget();
    
    // Change City Button functionality
    const changeCityBtn = document.getElementById('change-city-btn');
    const cityPopup = document.getElementById('city-input-popup');
    const cityForm = document.getElementById('city-form');
    const cityInput = document.getElementById('city-input');
    
    if (changeCityBtn && cityPopup) {
        changeCityBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cityPopup.classList.toggle('show');
            if (cityPopup.classList.contains('show')) {
                cityInput.focus();
            }
        });
        
        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!cityPopup.contains(e.target) && e.target !== changeCityBtn) {
                cityPopup.classList.remove('show');
            }
        });
    }
    
    if (cityForm) {
        cityForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const city = cityInput.value.trim();
            
            if (city) {
                await updateWeatherByCity(city);
                cityInput.value = '';
                cityPopup.classList.remove('show');
            }
        });
    }
    
    // Reset City Button functionality
    const resetCityBtn = document.getElementById('reset-city-btn');
    if (resetCityBtn) {
        resetCityBtn.addEventListener('click', async () => {
            // Clear the saved city preference
            localStorage.removeItem('userPreferredCity');
            console.log('Cleared saved city preference');
            
            // Close the popup
            cityPopup.classList.remove('show');
            cityInput.value = '';
            
            // Reload weather with automatic IP-based location
            await updateWeatherWidget();
        });
    }
    
    // Update clocks every second
    setInterval(() => {
        updateDigitalClock();
        updateAnalogClock();
    }, 1000);
    
    // Update 3D scene every minute
    update3DScene();
    setInterval(update3DScene, 60000);
    
    // Update date every minute
    setInterval(updateDate, 60000);
    
    // Update weather every 10 minutes
    setInterval(updateWeatherWidget, 600000);
    
    // Alien UFO Click Event
    console.log('Setting up UFO click handler...');
    const alienUFO = document.getElementById('alien-ufo');
    console.log('UFO element found:', alienUFO);
    
    if (alienUFO) {
        alienUFO.addEventListener('click', activateUFOCrazyMode);
        console.log('UFO click handler attached successfully');
        
        // Also add touch support for better compatibility
        alienUFO.addEventListener('touchstart', (e) => {
            e.preventDefault();
            activateUFOCrazyMode(e);
        });
    } else {
        console.error('UFO element not found!');
    }
}

// Wait for DOM to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}