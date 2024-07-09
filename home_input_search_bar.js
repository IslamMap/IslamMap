document.addEventListener('DOMContentLoaded', function() {
    // Array of placeholder options
    const placeholders = [
        'e.g. Prayer',
        'e.g. Fasting',
        'e.g. Zakat',
        'e.g. Hajj',
        'e.g. Prophets',
        'e.g. Sunnah',
        'e.g. Islam',
        'e.g. Quran',
        'e.g. Hadith',
        'e.g. Sirah',
        'e.g. Books',
        'e.g. Eid',
        'e.g. Ramadan',
        'e.g. Arafah',
        'e.g. Lailatul Qadr',
        'e.g. Adhkar',
        'e.g. Sahaba'
        // Add more placeholder options as needed
    ];

    // Get the input element by its ID
    const input = document.getElementById('home-search-bar');

    // Generate a random index to select a placeholder from the array
    const randomIndex = Math.floor(Math.random() * placeholders.length);

    // Set the placeholder text of the input field
    input.placeholder = placeholders[randomIndex];
});
