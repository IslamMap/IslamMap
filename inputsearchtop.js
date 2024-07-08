        // Change the placeholder value using JavaScript

console.log("hello");
        document.addEventListener('DOMContentLoaded', function() {
            var searchInput = document.getElementById('search-input-top');
            if (searchInput) {
                searchInput.placeholder = 'e.g. new placeholder value';
            }
        });
