document.addEventListener('DOMContentLoaded', () => {
  fetch('/sidebar.html')
    .then((res) => res.text())
    .then((html) => {
      const container = document.getElementById('sidebar-container');
      if (!container) return;
      container.innerHTML = html;

      const sidebar = document.getElementById('sidebar');
      const toggle = document.getElementById('toggle-line');
      const body = document.body;
      const saved = localStorage.getItem('sidebarCollapsed');
      if (saved === 'true') {
        body.classList.add('sidebar-collapsed');
        if (sidebar) sidebar.style.left = '-220px';
      }
      if (toggle) {
        toggle.addEventListener('click', () => {
          const collapsed = body.classList.contains('sidebar-collapsed');
          body.classList.toggle('sidebar-collapsed', !collapsed);
          if (sidebar) sidebar.style.left = collapsed ? '0px' : '-220px';
          localStorage.setItem('sidebarCollapsed', String(!collapsed));
        });
      }

      const fab = document.createElement('button');
      fab.className = 'floating-menu-btn';
      fab.innerText = '☰';
      document.body.appendChild(fab);
      fab.addEventListener('click', () => {
        const collapsed = body.classList.contains('sidebar-collapsed');
        body.classList.toggle('sidebar-collapsed', !collapsed);
        if (sidebar) sidebar.style.left = collapsed ? '0px' : '-220px';
        localStorage.setItem('sidebarCollapsed', String(!collapsed));
      });
    })
    .catch(() => {});
});


