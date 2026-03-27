/**
 * Places Module
 * The Crown Palace
 * Handles places listing with filtering and directions
 */

(function () {
    'use strict';

    // Places data with categories
    const places = [
        // Ghats
        {
            id: 1,
            name: 'Dashashwamedh Ghat',
            category: 'ghat',
            lat: 25.3094,
            lng: 83.0126,
            description: 'The most famous ghat in Varanasi, known for the spectacular evening Ganga Aarti ceremony.',
            distance: '200 m',
            icon: '🛕'
        },
        {
            id: 2,
            name: 'Assi Ghat',
            category: 'ghat',
            lat: 25.2840,
            lng: 83.0057,
            description: 'A popular ghat for morning rituals and cultural activities, where Assi river meets the Ganges.',
            distance: '2.5 km',
            icon: '🛕'
        },
        {
            id: 3,
            name: 'Manikarnika Ghat',
            category: 'ghat',
            lat: 25.3114,
            lng: 83.0144,
            description: 'One of the oldest and most sacred cremation grounds in India.',
            distance: '400 m',
            icon: '🛕'
        },
        {
            id: 4,
            name: 'Harishchandra Ghat',
            category: 'ghat',
            lat: 25.2985,
            lng: 83.0082,
            description: 'Ancient cremation ghat named after the legendary King Harishchandra.',
            distance: '1.2 km',
            icon: '🛕'
        },
        {
            id: 5,
            name: 'Kedar Ghat',
            category: 'ghat',
            lat: 25.2956,
            lng: 83.0067,
            description: 'Beautiful ghat with South Indian style temple, popular for photography.',
            distance: '1.5 km',
            icon: '🛕'
        },
        {
            id: 6,
            name: 'Ahilyabai Ghat',
            category: 'ghat',
            lat: 25.3080,
            lng: 83.0105,
            description: 'Named after Queen Ahilyabai Holkar, known for its well-maintained steps.',
            distance: '350 m',
            icon: '🛕'
        },
        {
            id: 7,
            name: 'Panchganga Ghat',
            category: 'ghat',
            lat: 25.3132,
            lng: 83.0153,
            description: 'Where five rivers are believed to meet, home to the Great Mosque of Alamgir.',
            distance: '600 m',
            icon: '🛕'
        },

        // Temples
        {
            id: 8,
            name: 'Kashi Vishwanath Temple',
            category: 'temple',
            lat: 25.3109,
            lng: 83.0107,
            description: 'One of the most famous Hindu temples dedicated to Lord Shiva, a Jyotirlinga shrine.',
            distance: '500 m',
            icon: '🕉️'
        },
        {
            id: 9,
            name: 'Sankat Mochan Temple',
            category: 'temple',
            lat: 25.2896,
            lng: 82.9987,
            description: 'Popular temple dedicated to Lord Hanuman, known for its peaceful atmosphere.',
            distance: '3 km',
            icon: '🕉️'
        },
        {
            id: 10,
            name: 'Durga Temple',
            category: 'temple',
            lat: 25.2870,
            lng: 82.9969,
            description: 'Also known as the Monkey Temple, dedicated to Goddess Durga with striking red architecture.',
            distance: '3.2 km',
            icon: '🕉️'
        },
        {
            id: 11,
            name: 'Tulsi Manas Temple',
            category: 'temple',
            lat: 25.2867,
            lng: 82.9980,
            description: 'Modern marble temple where Tulsidas wrote the Hindu epic Ramcharitmanas.',
            distance: '3.3 km',
            icon: '🕉️'
        },
        {
            id: 12,
            name: 'New Vishwanath Temple (BHU)',
            category: 'temple',
            lat: 25.2680,
            lng: 82.9920,
            description: 'Grand temple within BHU campus, open to all faiths, modeled on the original.',
            distance: '5 km',
            icon: '🕉️'
        },
        {
            id: 13,
            name: 'Bharat Mata Temple',
            category: 'temple',
            lat: 25.2950,
            lng: 82.9940,
            description: 'Unique temple dedicated to Mother India featuring a marble map of undivided India.',
            distance: '2 km',
            icon: '🕉️'
        },

        // Shopping
        {
            id: 14,
            name: 'Vishwanath Gali',
            category: 'shopping',
            lat: 25.3106,
            lng: 83.0100,
            description: 'Famous lane leading to Kashi Vishwanath Temple, lined with shops selling silk, jewelry, and more.',
            distance: '450 m',
            icon: '🛍️'
        },
        {
            id: 15,
            name: 'Thatheri Bazaar',
            category: 'shopping',
            lat: 25.3036,
            lng: 83.0048,
            description: 'Historic market known for brass and copper utensils, UNESCO listed heritage site.',
            distance: '800 m',
            icon: '🛍️'
        },
        {
            id: 16,
            name: 'Chowk',
            category: 'shopping',
            lat: 25.3070,
            lng: 83.0070,
            description: 'The main market area for Banarasi silk sarees and traditional crafts.',
            distance: '600 m',
            icon: '🛍️'
        },
        {
            id: 17,
            name: 'Godowlia Market',
            category: 'shopping',
            lat: 25.3095,
            lng: 83.0075,
            description: 'Bustling central market for street food, clothing, and daily essentials.',
            distance: '300 m',
            icon: '🛍️'
        },
        {
            id: 18,
            name: 'Lahurabir',
            category: 'shopping',
            lat: 25.3180,
            lng: 83.0020,
            description: 'Commercial hub with modern shops, electronics, and branded stores.',
            distance: '1.2 km',
            icon: '🛍️'
        },

        // Restaurants
        {
            id: 19,
            name: 'Blue Lassi',
            category: 'restaurant',
            lat: 25.3098,
            lng: 83.0115,
            description: 'Legendary 100-year-old lassi shop serving thick, creamy lassi in clay pots.',
            distance: '250 m',
            icon: '🍽️'
        },
        {
            id: 20,
            name: 'Kashi Chat Bhandar',
            category: 'restaurant',
            lat: 25.3090,
            lng: 83.0080,
            description: 'Famous for authentic Banarasi chaat and street snacks since 1950.',
            distance: '200 m',
            icon: '🍽️'
        },
        {
            id: 21,
            name: 'Deena Chat Bhandar',
            category: 'restaurant',
            lat: 25.3100,
            lng: 83.0078,
            description: 'Iconic spot for tamatar chaat and aloo tikki, a local institution.',
            distance: '280 m',
            icon: '🍽️'
        },

        // Attractions
        {
            id: 22,
            name: 'Sarnath',
            category: 'attraction',
            lat: 25.3814,
            lng: 83.0229,
            description: 'Where Buddha gave his first sermon after attaining enlightenment. UNESCO World Heritage Site.',
            distance: '10 km',
            icon: '🏛️'
        },
        {
            id: 23,
            name: 'Ramnagar Fort',
            category: 'attraction',
            lat: 25.2858,
            lng: 83.0308,
            description: '18th-century fort and palace of the Maharaja of Banaras, now a museum.',
            distance: '4 km',
            icon: '🏰'
        },
        {
            id: 24,
            name: 'Banaras Hindu University',
            category: 'attraction',
            lat: 25.2677,
            lng: 82.9913,
            description: 'One of the largest residential universities in Asia with beautiful campus and Bharat Kala Bhavan museum.',
            distance: '5 km',
            icon: '🎓'
        },
        {
            id: 25,
            name: 'Man Mandir Observatory',
            category: 'attraction',
            lat: 25.3085,
            lng: 83.0118,
            description: 'Historic astronomical observatory built by Raja Man Singh with antique instruments.',
            distance: '300 m',
            icon: '🔭'
        },
        {
            id: 26,
            name: 'Chunar Fort',
            category: 'attraction',
            lat: 25.1300,
            lng: 82.8800,
            description: 'Ancient hilltop fort with panoramic views, 40 km from Varanasi with rich history.',
            distance: '40 km',
            icon: '🏰'
        }
    ];

    // Category labels
    const categories = {
        all: 'All Places',
        ghat: 'Ghats',
        temple: 'Temples',
        shopping: 'Shopping',
        restaurant: 'Dining',
        attraction: 'Attractions'
    };

    // Current filter
    let currentFilter = 'all';

    // DOM Elements
    const filterContainer = document.querySelector('.city-map__filters');
    const placesContainer = document.querySelector('.city-map__places');

    // Hotel location (starting point for directions)
    const hotelLocation = { lat: 25.319179983959174, lng: 83.01780559149609 };

    // Initialize
    function init() {
        if (!filterContainer || !placesContainer) return;

        renderFilters();
        renderPlaces();
        setupFilterListeners();
    }

    // Render category filters
    function renderFilters() {
        filterContainer.innerHTML = Object.entries(categories).map(([key, label]) => `
      <button 
        class="city-map__filter ${key === currentFilter ? 'city-map__filter--active' : ''}" 
        data-category="${key}"
        aria-pressed="${key === currentFilter}"
      >
        ${label}
      </button>
    `).join('');
    }

    // Render places list
    function renderPlaces() {
        const filteredPlaces = currentFilter === 'all'
            ? places
            : places.filter(place => place.category === currentFilter);

        if (filteredPlaces.length === 0) {
            placesContainer.innerHTML = '<p class="text-center text-gray">No places found in this category.</p>';
            return;
        }

        placesContainer.innerHTML = filteredPlaces.map(place => `
      <article class="place-card place-card--clickable" data-place-id="${place.id}" data-lat="${place.lat}" data-lng="${place.lng}" role="button" tabindex="0">
        <div class="place-card__icon">
          <span style="font-size: 24px;">${place.icon}</span>
        </div>
        <div class="place-card__content">
          <h3 class="place-card__name">${place.name}</h3>
          <p class="place-card__description">${place.description}</p>
          <span class="place-card__distance">${place.distance} from hotel</span>
        </div>
        <div class="place-card__arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </article>
    `).join('');

        // Add click handlers for place cards
        setupPlaceClickListeners();
    }

    // Setup place card click listeners
    function setupPlaceClickListeners() {
        const placeCards = placesContainer.querySelectorAll('.place-card');

        placeCards.forEach(card => {
            card.addEventListener('click', () => {
                const lat = card.dataset.lat;
                const lng = card.dataset.lng;
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${hotelLocation.lat},${hotelLocation.lng}&destination=${lat},${lng}&travelmode=two-wheeler`;
                window.open(mapsUrl, '_blank');
            });

            // Keyboard accessibility
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    // Setup filter click listeners
    function setupFilterListeners() {
        filterContainer.addEventListener('click', (e) => {
            const filterButton = e.target.closest('.city-map__filter');
            if (!filterButton) return;

            const category = filterButton.dataset.category;
            if (category === currentFilter) return;

            // Update current filter
            currentFilter = category;

            // Update UI
            document.querySelectorAll('.city-map__filter').forEach(btn => {
                const isActive = btn.dataset.category === currentFilter;
                btn.classList.toggle('city-map__filter--active', isActive);
                btn.setAttribute('aria-pressed', isActive);
            });

            // Re-render places
            renderPlaces();
        });
    }

    // Expose for external use
    window.CityMap = {
        getPlaces: () => places,
        getCategories: () => categories,
        setFilter: (category) => {
            currentFilter = category;
            renderFilters();
            renderPlaces();
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
