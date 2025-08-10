document.addEventListener('DOMContentLoaded', () => {
    fetch('sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('sidebar-container').innerHTML = html;

            // Add functionality for the sidebar toggle
            const sidebar = document.getElementById('sidebar');
            const toggleLine = document.getElementById('toggle-line');
            const body = document.body;

            // Restore collapsed state from localStorage
            const saved = localStorage.getItem('sidebarCollapsed');
            if (saved === 'true') {
                body.classList.add('sidebar-collapsed');
                if (sidebar) sidebar.style.left = '-220px';
            } else {
                body.classList.remove('sidebar-collapsed');
                if (sidebar) sidebar.style.left = '0px';
            }

            if (sidebar && toggleLine) {
                toggleLine.addEventListener('click', () => {
                    const isCollapsed = body.classList.contains('sidebar-collapsed');
                    if (isCollapsed) {
                        body.classList.remove('sidebar-collapsed');
                        sidebar.style.left = '0px';
                        localStorage.setItem('sidebarCollapsed', 'false');
                    } else {
                        body.classList.add('sidebar-collapsed');
                        sidebar.style.left = '-220px';
                        localStorage.setItem('sidebarCollapsed', 'true');
                    }
                });
            } else {
                console.error('Sidebar or toggle line not found');
            }

            // Floating menu button to reopen when collapsed
            const fab = document.createElement('button');
            fab.id = 'floating-menu-button';
            fab.className = 'floating-menu-btn';
            fab.setAttribute('aria-label', 'Toggle menu');
            fab.innerText = '☰';
            document.body.appendChild(fab);
            fab.addEventListener('click', () => {
                const isCollapsed = body.classList.contains('sidebar-collapsed');
                if (isCollapsed) {
                    body.classList.remove('sidebar-collapsed');
                    sidebar.style.left = '0px';
                    localStorage.setItem('sidebarCollapsed', 'false');
                } else {
                    body.classList.add('sidebar-collapsed');
                    sidebar.style.left = '-220px';
                    localStorage.setItem('sidebarCollapsed', 'true');
                }
            });
        })
        .catch(error => console.error('Error loading sidebar:', error));
});