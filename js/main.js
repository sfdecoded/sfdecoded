/* ============================================
   Salesforce Decoded — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSearch();
  initMobileNav();
  initCopyButtons();
  initBackToTop();
  initPageTransition();
});

/* --- Page Load Animation --- */
function initPageTransition() {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s cubic-bezier(0.2, 0, 0, 1)';
    document.body.style.opacity = '1';
  });
}

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const check = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', check, { passive: true });
  check();
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Search Modal --- */
function initSearch() {
  const searchBtn = document.querySelector('.navbar-search');
  const overlay = document.querySelector('.search-overlay');
  if (!searchBtn || !overlay) return;

  const input = overlay.querySelector('input');
  const resultsContainer = overlay.querySelector('.search-results');

  // Search data
  const searchData = [
    // Main Pages
    { title: 'Home', type: 'Page', url: 'index.html', icon: 'home' },
    { title: 'Tools', type: 'Page', url: 'tools.html', icon: 'build' },
    { title: 'Errors', type: 'Page', url: 'errors.html', icon: 'bug_report' },
    { title: 'Guides', type: 'Page', url: 'guides.html', icon: 'menu_book' },
    { title: 'Tips', type: 'Page', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Extensions', type: 'Page', url: 'extensions.html', icon: 'extension' },
    { title: 'Resources', type: 'Page', url: 'resources.html', icon: 'folder_open' },
    { title: 'About', type: 'Page', url: 'about.html', icon: 'info' },

    // Tools
    { title: 'SOQL Formatter', type: 'Tool', url: 'tools/soql-formatter.html', icon: 'code' },
    { title: 'Salesforce ID Converter', type: 'Tool', url: 'tools/salesforce-id-converter.html', icon: 'swap_horiz' },
    { title: 'Apex Code Generator', type: 'Tool', url: 'tools/apex-code-generator.html', icon: 'auto_fix_high' },
    { title: 'JSON to Apex Converter', type: 'Tool', url: 'tools/json-to-apex.html', icon: 'transform' },
    { title: 'Salesforce Icon Explorer', type: 'Tool', url: 'tools/salesforce-icon-explorer.html', icon: 'palette' },
    { title: 'SOQL Query Analyzer', type: 'Tool', url: 'tools/soql-query-analyzer.html', icon: 'analytics' },
    { title: 'Cron Expression Builder', type: 'Tool', url: 'tools/cron-expression-builder.html', icon: 'schedule' },
    { title: 'Security Audit Checker', type: 'Tool', url: 'tools/security-audit-checker.html', icon: 'security' },
    { title: 'LWC Component Builder', type: 'Tool', url: 'tools/lwc-component-builder.html', icon: 'widgets' },

    // Error Pages - Query Syntax
    { title: 'Aggregate Query Does Not Support queryMore()', type: 'Error', url: 'errors/aggregate-query-does-not-support-querymore.html', icon: 'error' },
    { title: 'Aggregate Query Too Many Rows For Loop', type: 'Error', url: 'errors/aggregate-query-too-many-rows-for-loop.html', icon: 'error' },
    { title: 'Invalid Cross Join Query', type: 'Error', url: 'errors/invalid-cross-join-query.html', icon: 'error' },
    { title: 'Invalid Query Filter Operator', type: 'Error', url: 'errors/invalid-query-filter-operator.html', icon: 'error' },
    { title: 'Malformed Query Unexpected Token', type: 'Error', url: 'errors/malformed-query-unexpected-token.html', icon: 'error' },
    { title: 'Max/Min Not Supported With Rollup', type: 'Error', url: 'errors/max-min-not-supported-with-rollup.html', icon: 'error' },
    { title: 'No Such Column', type: 'Error', url: 'errors/no-such-column.html', icon: 'error' },
    { title: 'Non-Selective Query 200k', type: 'Error', url: 'errors/non-selective-query-200k.html', icon: 'error' },
    { title: 'Non-Selective Query', type: 'Error', url: 'errors/non-selective-query.html', icon: 'error' },
    { title: 'Only Variable References Allowed', type: 'Error', url: 'errors/only-variable-references-allowed.html', icon: 'error' },
    { title: 'Query Timeout', type: 'Error', url: 'errors/query-timeout.html', icon: 'error' },
    { title: 'Semijoins Only In WHERE Clause', type: 'Error', url: 'errors/semijoins-only-in-where-clause.html', icon: 'error' },
    { title: 'SOQL Query No Filter Warning', type: 'Error', url: 'errors/soql-query-no-filter-warning.html', icon: 'error' },
    { title: 'Too Many Query Rows 50001', type: 'Error', url: 'errors/too-many-query-rows-50001.html', icon: 'error' },

    // Error Pages - Governor Limits
    { title: 'Apex CPU Time Limit Exceeded', type: 'Error', url: 'errors/apex-cpu-time-limit-exceeded.html', icon: 'error' },
    { title: 'Apex Heap Size Too Large', type: 'Error', url: 'errors/apex-heap-size-too-large.html', icon: 'error' },
    { title: 'Maximum Trigger Depth Exceeded', type: 'Error', url: 'errors/maximum-trigger-depth-exceeded.html', icon: 'error' },
    { title: 'Request Limit Exceeded', type: 'Error', url: 'errors/request-limit-exceeded.html', icon: 'error' },
    { title: 'Too Many Aggregate Queries 301', type: 'Error', url: 'errors/too-many-aggregate-queries-301.html', icon: 'error' },
    { title: 'Too Many Callouts 101', type: 'Error', url: 'errors/too-many-callouts-101.html', icon: 'error' },
    { title: 'Too Many DML Statements 150', type: 'Error', url: 'errors/too-many-dml-statements-150.html', icon: 'error' },
    { title: 'Too Many Future Calls 51', type: 'Error', url: 'errors/too-many-future-calls-51.html', icon: 'error' },
    { title: 'Too Many Query Rows Batch Apex', type: 'Error', url: 'errors/too-many-query-rows-batch-apex.html', icon: 'error' },
    { title: 'Too Many Queueable Jobs 51', type: 'Error', url: 'errors/too-many-queueable-jobs-51.html', icon: 'error' },
    { title: 'Too Many SOQL Queries 101', type: 'Error', url: 'errors/too-many-soql-queries-101.html', icon: 'error' },

    // Error Pages - DML Errors
    { title: 'Field Custom Validation Exception', type: 'Error', url: 'errors/field-custom-validation-exception.html', icon: 'error' },
    { title: 'Insufficient Access', type: 'Error', url: 'errors/insufficient-access.html', icon: 'error' },
    { title: 'Unable to Lock Row', type: 'Error', url: 'errors/unable-to-lock-row.html', icon: 'error' },

    // Error Pages - Runtime Errors
    { title: 'List Has No Rows', type: 'Error', url: 'errors/list-has-no-rows.html', icon: 'error' },
    { title: 'List Index Out Of Bounds', type: 'Error', url: 'errors/list-index-out-of-bounds.html', icon: 'error' },
    { title: 'Math Exception Divide By Zero', type: 'Error', url: 'errors/math-exception-divide-by-zero.html', icon: 'error' },
    { title: 'Null Pointer Exception', type: 'Error', url: 'errors/null-pointer-exception.html', icon: 'error' },
    { title: 'SObject Field Not Queried', type: 'Error', url: 'errors/sobject-field-not-queried.html', icon: 'error' },

    // Error Pages - Syntax Errors
    { title: 'Field Not Relationship Includes', type: 'Error', url: 'errors/field-not-relationship-includes.html', icon: 'error' },
    { title: 'Invalid Date Format', type: 'Error', url: 'errors/invalid-date-format.html', icon: 'error' },
    { title: 'Invalid Replication Date', type: 'Error', url: 'errors/invalid-replication-date.html', icon: 'error' },
    { title: 'Invalid Type SObject', type: 'Error', url: 'errors/invalid-type-sobject.html', icon: 'error' },
    { title: 'Unexpected Token EOF', type: 'Error', url: 'errors/unexpected-token-eof.html', icon: 'error' },

    // Error Pages - Deployment
    { title: 'Code Coverage Below 75%', type: 'Error', url: 'errors/code-coverage-below-75.html', icon: 'error' },

    // Guides
    { title: 'Apex Best Practices', type: 'Guide', url: 'guides/apex-best-practices.html', icon: 'menu_book' },
    { title: 'SOQL Optimization Guide', type: 'Guide', url: 'guides/soql-optimization.html', icon: 'menu_book' },
    { title: 'LWC Guide', type: 'Guide', url: 'guides/lwc-guide.html', icon: 'menu_book' },
    { title: 'Governor Limits Explained', type: 'Guide', url: 'guides/governor-limits.html', icon: 'menu_book' },
    { title: 'REST API Integration Patterns', type: 'Guide', url: 'guides/rest-api-integration.html', icon: 'menu_book' },
    { title: 'Apex Testing Complete Guide', type: 'Guide', url: 'guides/apex-testing.html', icon: 'menu_book' },
    { title: 'Agentforce Guide', type: 'Guide', url: 'guides/agentforce.html', icon: 'menu_book' },

    // Tips
    { title: 'VS Code Tips for Salesforce', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Salesforce Shortcuts', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Debugging Apex Code', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Keyboard Shortcuts for Developer Console', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Optimizing SOQL Performance', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Using Batch Apex Efficiently', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Test Coverage Best Practices', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Leverage Salesforce CLI', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Lightning Web Components Tips', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Governor Limit Awareness', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Code Review Checklist', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },
    { title: 'Salesforce API Integration Tips', type: 'Tip', url: 'tips.html', icon: 'lightbulb' },

    // Prompts - Main Hub
    { title: 'AI Prompts Hub', type: 'Prompt', url: 'prompts.html', icon: 'smart_toy' },

    // Prompts - Claude
    { title: 'Claude Prompts', type: 'Prompt', url: 'prompts/claude.html', icon: 'smart_toy' },
    { title: 'Claude - Apex Code Generation', type: 'Prompt', url: 'prompts/claude.html', icon: 'smart_toy' },
    { title: 'Claude - Debug Salesforce Errors', type: 'Prompt', url: 'prompts/claude.html', icon: 'smart_toy' },
    { title: 'Claude - SOQL Query Optimization', type: 'Prompt', url: 'prompts/claude.html', icon: 'smart_toy' },
    { title: 'Claude - Code Review', type: 'Prompt', url: 'prompts/claude.html', icon: 'smart_toy' },

    // Prompts - ChatGPT
    { title: 'ChatGPT Prompts', type: 'Prompt', url: 'prompts/chatgpt.html', icon: 'smart_toy' },
    { title: 'ChatGPT - Salesforce Concept Explanation', type: 'Prompt', url: 'prompts/chatgpt.html', icon: 'smart_toy' },

    // Prompts - Gemini
    { title: 'Gemini Prompts', type: 'Prompt', url: 'prompts/gemini.html', icon: 'smart_toy' },
    { title: 'Gemini - Governor Limits Analysis', type: 'Prompt', url: 'prompts/gemini.html', icon: 'smart_toy' },
    { title: 'Gemini - Test Case Generator', type: 'Prompt', url: 'prompts/gemini.html', icon: 'smart_toy' },

    // Prompts - DeepSeek
    { title: 'DeepSeek Prompts', type: 'Prompt', url: 'prompts/deepseek.html', icon: 'smart_toy' },
    { title: 'DeepSeek - Integration Strategy', type: 'Prompt', url: 'prompts/deepseek.html', icon: 'smart_toy' },

    // Prompts - Perplexity
    { title: 'Perplexity Prompts', type: 'Prompt', url: 'prompts/perplexity.html', icon: 'smart_toy' },
    { title: 'Perplexity - Research & Knowledge', type: 'Prompt', url: 'prompts/perplexity.html', icon: 'smart_toy' },
    { title: 'Perplexity - Latest Salesforce Features', type: 'Prompt', url: 'prompts/perplexity.html', icon: 'smart_toy' },

    // Prompts - Microsoft Copilot
    { title: 'Microsoft Copilot Prompts', type: 'Prompt', url: 'prompts/microsoft-copilot.html', icon: 'smart_toy' },

    // Prompts - GitHub Copilot
    { title: 'GitHub Copilot Prompts', type: 'Prompt', url: 'prompts/github-copilot.html', icon: 'smart_toy' },
    { title: 'GitHub Copilot - IDE Code Completion', type: 'Prompt', url: 'prompts/github-copilot.html', icon: 'smart_toy' },
    { title: 'GitHub Copilot - Unit Test Generation', type: 'Prompt', url: 'prompts/github-copilot.html', icon: 'smart_toy' },
    { title: 'GitHub Copilot - Code Documentation', type: 'Prompt', url: 'prompts/github-copilot.html', icon: 'smart_toy' },
    { title: 'GitHub Copilot - Refactoring Suggestions', type: 'Prompt', url: 'prompts/github-copilot.html', icon: 'smart_toy' },

    // Prompts - Agentforce
    { title: 'Agentforce Prompts', type: 'Prompt', url: 'prompts/agentforce.html', icon: 'smart_toy' },
    { title: 'Agentforce - Customer Service Agent', type: 'Prompt', url: 'prompts/agentforce.html', icon: 'smart_toy' },
    { title: 'Agentforce - Lead Qualification Flow', type: 'Prompt', url: 'prompts/agentforce.html', icon: 'smart_toy' },
    { title: 'Agentforce - Order Processing Automation', type: 'Prompt', url: 'prompts/agentforce.html', icon: 'smart_toy' },
    { title: 'Agentforce - Multi-turn Conversations', type: 'Prompt', url: 'prompts/agentforce.html', icon: 'smart_toy' },

    // Prompts - Cursor
    { title: 'Cursor AI Editor Prompts', type: 'Prompt', url: 'prompts/cursor.html', icon: 'smart_toy' },
    { title: 'Cursor - Inline Code Edits', type: 'Prompt', url: 'prompts/cursor.html', icon: 'smart_toy' },
    { title: 'Cursor - Chat with Codebase', type: 'Prompt', url: 'prompts/cursor.html', icon: 'smart_toy' },
    { title: 'Cursor - Terminal Commands', type: 'Prompt', url: 'prompts/cursor.html', icon: 'smart_toy' },
    { title: 'Cursor - VSCode Integration', type: 'Prompt', url: 'prompts/cursor.html', icon: 'smart_toy' },

    // Extensions
    { title: 'Salesforce Revamp Extension', type: 'Extension', url: 'extensions.html', icon: 'extension' },
  ];

  function openSearch() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 100);
    renderResults(searchData);
  }

  function closeSearch() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    input.value = '';
  }

  function renderResults(items) {
    resultsContainer.innerHTML = items.map(item => `
      <a href="${getBaseUrl()}${item.url}" class="search-result-item">
        <span class="material-symbols-rounded">${item.icon}</span>
        <div>
          <div class="result-title">${item.title}</div>
          <div class="result-type">${item.type}</div>
        </div>
      </a>
    `).join('');
  }

  searchBtn.addEventListener('click', openSearch);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeSearch();
    }
  });

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderResults(searchData);
      return;
    }
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggle = document.querySelector('.navbar-mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('active');
    toggle.querySelector('.material-symbols-rounded').textContent = isOpen ? 'close' : 'menu';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

/* --- Copy to Clipboard --- */
function initCopyButtons() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('code') || codeBlock.querySelector('pre');
      if (!code) return;

      navigator.clipboard.writeText(code.textContent).then(() => {
        showToast('Copied to clipboard!');
        btn.innerHTML = '<span class="material-symbols-rounded">check</span> Copied';
        setTimeout(() => {
          btn.innerHTML = '<span class="material-symbols-rounded">content_copy</span> Copy';
        }, 2000);
      });
    });
  });
}

/* --- Toast Notification --- */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="material-symbols-rounded" style="font-size:18px">check_circle</span> ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* --- Back to Top Button --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Counter Animation --- */
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      counter.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// Trigger counters when they scroll into view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-bar');
if (statsSection) counterObserver.observe(statsSection);

/* --- Utility: Get base URL for relative links --- */
function getBaseUrl() {
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length - 1;
  if (path.endsWith('/') || path.endsWith('index.html')) {
    return '';
  }
  const parts = path.split('/').filter(Boolean);
  if (parts.length <= 1) return '';
  return '../';
}

/* --- Chip filter functionality --- */
function initChipFilter(containerSelector, itemSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;
      document.querySelectorAll(itemSelector).forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.3s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --- Newsletter form handler --- */
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input.value.trim()) {
      showToast('Thanks for subscribing! 🎉');
      input.value = '';
    }
  });
});
