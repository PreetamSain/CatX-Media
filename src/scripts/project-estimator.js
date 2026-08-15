export function initProjectEstimator() {
  const scopeBtns = document.querySelectorAll('.js-scope-btn');
  const timelineBtns = document.querySelectorAll('.js-timeline-btn');
  const estTimelineSpan = document.querySelector('#est-timeline');
  const estScopeSpan = document.querySelector('#est-scope');
  const mailtoBtn = document.querySelector('#send-brief-btn');

  let selectedScopes = ['Brand Identity'];
  let selectedTimeline = 'Standard (4-6 Weeks)';

  function updateEstimate() {
    if (estScopeSpan) {
      estScopeSpan.textContent = selectedScopes.join(' + ') || 'Custom Scope';
    }
    if (estTimelineSpan) {
      estTimelineSpan.textContent = selectedTimeline;
    }

    // Pre-fill Mailto Link
    if (mailtoBtn) {
      const subject = encodeURIComponent('New Project Inquiry: ' + selectedScopes.join(', '));
      const body = encodeURIComponent(
        'Hi CATX Media Team,\n\n' +
        'I would like to collaborate on a new project.\n\n' +
        'Project Scope: ' + selectedScopes.join(', ') + '\n' +
        'Desired Timeline: ' + selectedTimeline + '\n\n' +
        'Looking forward to discussing further.\n\n' +
        'Best regards,\n[Your Name]'
      );
      mailtoBtn.setAttribute('href', 'mailto:contact@catx.media?subject=' + subject + '&body=' + body);
    }
  }

  // Scope Selection (Multi-select)
  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-scope');
      if (btn.classList.contains('is-active')) {
        if (selectedScopes.length > 1) {
          btn.classList.remove('is-active');
          selectedScopes = selectedScopes.filter(s => s !== val);
        }
      } else {
        btn.classList.add('is-active');
        selectedScopes.push(val);
      }
      updateEstimate();
    });
  });

  // Timeline Selection (Single-select)
  timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timelineBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedTimeline = btn.getAttribute('data-timeline') || 'Standard (4-6 Weeks)';
      updateEstimate();
    });
  });

  updateEstimate();
}
