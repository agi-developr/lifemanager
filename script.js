document.addEventListener('DOMContentLoaded', () => {
    fetch('sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            console.log('Sidebar HTML:', html); // Debugging line
            document.getElementById('sidebar-container').innerHTML = html;

            // Add functionality for the sidebar toggle
            const sidebar = document.getElementById('sidebar');
            const toggleLine = document.getElementById('toggle-line');

            if (sidebar && toggleLine) {
                toggleLine.addEventListener('click', () => {
                    if (sidebar.style.left === '0px') {
                        sidebar.style.left = '-140px'; // Hide the sidebar
                        sidebar.classList.remove('show');
                    } else {
                        sidebar.style.left = '0px'; // Show the sidebar
                        sidebar.classList.add('show');
                    }
                });
            } else {
                console.error('Sidebar or toggle line not found');
            }
        })
        .catch(error => console.error('Error loading sidebar:', error));
});