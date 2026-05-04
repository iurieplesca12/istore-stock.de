// ===== VISUAL EDITOR =====
// Editor vizual integrat — activat DOAR după autentificarea admin

(function() {
  // 🔒 Verifică autentificarea — doar după codul secret din admin
  if (!sessionStorage.getItem('visual-editor-auth')) {
    return; // Nu crea editorul dacă nu e activat din admin
  }

  let editMode = false;
  let editorPanel = null;
  let selectedElement = null;
  let originalContents = new Map();

  // ===== CREATE EDITOR UI =====
  function createEditorUI() {
    // Floating toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 've-toggle';
    toggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
    toggleBtn.title = 'Editor Vizual';
    toggleBtn.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%; border: none;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(59,130,246,0.5); transition: all 0.3s ease;
    `;
    toggleBtn.onmouseenter = () => { toggleBtn.style.transform = 'scale(1.1)'; };
    toggleBtn.onmouseleave = () => { toggleBtn.style.transform = 'scale(1)'; };
    toggleBtn.onclick = toggleEditMode;
    document.body.appendChild(toggleBtn);

    // Editor panel
    editorPanel = document.createElement('div');
    editorPanel.id = 've-panel';
    editorPanel.style.cssText = `
      position: fixed; top: 0; right: -380px; width: 360px; height: 100vh;
      background: #1a1a1e; border-left: 1px solid rgba(255,255,255,0.1);
      z-index: 9998; transition: right 0.4s cubic-bezier(0.23,1,0.32,1);
      display: flex; flex-direction: column; overflow: hidden;
    `;

    editorPanel.innerHTML = `
      <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: white; font-family: Inter, sans-serif;">Editor Vizual</div>
            <div style="font-size: 11px; color: #888; font-family: Inter, sans-serif;">Modifică direct pe pagină</div>
          </div>
        </div>
        <button id="ve-close-panel" style="width: 32px; height: 32px; border-radius: 50%; border: none; background: rgba(255,255,255,0.1); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div style="flex: 1; overflow-y: auto; padding: 16px;" id="ve-panel-content">
        <div id="ve-welcome" style="text-align: center; padding: 30px 10px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(59,130,246,0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          </div>
          <div style="font-weight: 600; font-size: 16px; color: white; margin-bottom: 8px; font-family: Inter, sans-serif;">Selectează un element</div>
          <div style="font-size: 13px; color: #888; line-height: 1.5; font-family: Inter, sans-serif;">Click pe orice text, imagine sau element de pe pagină pentru a-l edita</div>
        </div>

        <div id="ve-element-editor" style="display: none;"></div>
      </div>

      <div style="padding: 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px;">
        <button id="ve-save-btn" style="flex: 1; padding: 10px; border-radius: 10px; border: none; background: #3b82f6; color: white; font-weight: 600; font-size: 13px; cursor: pointer; font-family: Inter, sans-serif; transition: background 0.2s;">
          💾 Salvează
        </button>
        <button id="ve-reset-btn" style="flex: 1; padding: 10px; border-radius: 10px; border: none; background: rgba(255,255,255,0.1); color: #ccc; font-weight: 600; font-size: 13px; cursor: pointer; font-family: Inter, sans-serif; transition: background 0.2s;">
          ↩ Reset
        </button>
        <button id="ve-export-btn" style="padding: 10px 14px; border-radius: 10px; border: none; background: rgba(255,255,255,0.1); color: #ccc; font-weight: 600; font-size: 13px; cursor: pointer; font-family: Inter, sans-serif; transition: background 0.2s;" title="Descarcă HTML">
          📥
        </button>
      </div>
    `;

    document.body.appendChild(editorPanel);

    // Panel close button
    document.getElementById('ve-close-panel').onclick = () => {
      editorPanel.style.right = '-380px';
    };
    document.getElementById('ve-close-panel').onmouseenter = (e) => {
      e.target.style.background = 'rgba(255,255,255,0.2)';
    };
    document.getElementById('ve-close-panel').onmouseleave = (e) => {
      e.target.style.background = 'rgba(255,255,255,0.1)';
    };

    // Save button
    document.getElementById('ve-save-btn').onclick = saveChanges;
    document.getElementById('ve-save-btn').onmouseenter = (e) => {
      e.target.style.background = '#2563eb';
    };
    document.getElementById('ve-save-btn').onmouseleave = (e) => {
      e.target.style.background = '#3b82f6';
    };

    // Reset button
    document.getElementById('ve-reset-btn').onclick = resetChanges;
    document.getElementById('ve-reset-btn').onmouseenter = (e) => {
      e.target.style.background = 'rgba(255,255,255,0.15)';
    };
    document.getElementById('ve-reset-btn').onmouseleave = (e) => {
      e.target.style.background = 'rgba(255,255,255,0.1)';
    };

    // Export button
    document.getElementById('ve-export-btn').onclick = exportHTML;
    document.getElementById('ve-export-btn').onmouseenter = (e) => {
      e.target.style.background = 'rgba(255,255,255,0.15)';
    };
    document.getElementById('ve-export-btn').onmouseleave = (e) => {
      e.target.style.background = 'rgba(255,255,255,0.1)';
    };
  }

  // ===== TOGGLE EDIT MODE =====
  function toggleEditMode() {
    editMode = !editMode;
    const btn = document.getElementById('ve-toggle');

    if (editMode) {
      btn.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
      btn.title = 'Dezactivează Editor';
      editorPanel.style.right = '0';
      enableEditing();
      showEditBanner();
    } else {
      btn.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
      btn.title = 'Editor Vizual';
      editorPanel.style.right = '-380px';
      disableEditing();
      hideEditBanner();
    }
  }

  // ===== EDIT BANNER =====
  function showEditBanner() {
    if (document.getElementById('ve-banner')) return;
    const banner = document.createElement('div');
    banner.id = 've-banner';
    banner.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; z-index: 9997;
      height: 4px; background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
      background-size: 300% 100%; animation: veBannerGradient 3s linear infinite;
    `;
    document.body.appendChild(banner);

    const style = document.createElement('style');
    style.id = 've-banner-style';
    style.textContent = `
      @keyframes veBannerGradient { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
      [data-ve-editable]:hover { outline: 2px dashed rgba(59,130,246,0.6) !important; outline-offset: 2px !important; cursor: pointer !important; }
      [data-ve-selected] { outline: 2px solid #3b82f6 !important; outline-offset: 2px !important; }
    `;
    document.head.appendChild(style);
  }

  function hideEditBanner() {
    const banner = document.getElementById('ve-banner');
    if (banner) banner.remove();
    const style = document.getElementById('ve-banner-style');
    if (style) style.remove();
  }

  // ===== ENABLE EDITING =====
  function enableEditing() {
    // Make text elements editable
    const textSelectors = 'h1, h2, h3, h4, p, span, a, label, button, li, td, th, div.text-sm, div.text-xs, div.text-lg, div.text-xl';
    document.querySelectorAll(textSelectors).forEach(el => {
      if (el.closest('#ve-panel') || el.closest('#ve-toggle') || el.closest('#ve-banner') || el.closest('#toast-container') || el.closest('.cart-panel') || el.closest('#mobile-menu') || el.closest('#checkout-modal')) return;
      if (el.children.length > 5) return; // Skip complex containers
      el.setAttribute('data-ve-editable', 'text');
    });

    // Make images clickable
    document.querySelectorAll('img').forEach(img => {
      if (img.closest('#ve-panel') || img.closest('#ve-toggle')) return;
      img.setAttribute('data-ve-editable', 'image');
    });

    // Add click listeners
    document.addEventListener('click', handleEditClick, true);
    document.addEventListener('input', handleTextInput, true);
  }

  // ===== DISABLE EDITING =====
  function disableEditing() {
    document.querySelectorAll('[data-ve-editable]').forEach(el => {
      el.removeAttribute('data-ve-editable');
      el.removeAttribute('contenteditable');
      el.removeAttribute('data-ve-selected');
    });
    document.removeEventListener('click', handleEditClick, true);
    document.removeEventListener('input', handleTextInput, true);
    selectedElement = null;
  }

  // ===== HANDLE CLICK =====
  function handleEditClick(e) {
    if (!editMode) return;
    if (e.target.closest('#ve-panel') || e.target.closest('#ve-toggle') || e.target.closest('#ve-banner') || e.target.closest('#toast-container')) return;

    e.preventDefault();
    e.stopPropagation();

    // Deselect previous
    if (selectedElement) {
      selectedElement.removeAttribute('data-ve-selected');
      if (selectedElement.getAttribute('data-ve-editable') === 'text') {
        selectedElement.removeAttribute('contenteditable');
      }
    }

    const target = e.target.closest('[data-ve-editable]') || e.target;
    selectedElement = target;
    target.setAttribute('data-ve-selected', '');

    const editableType = target.getAttribute('data-ve-editable');

    if (editableType === 'text') {
      target.setAttribute('contenteditable', 'true');
      target.focus();
    }

    showElementEditor(target, editableType);
    editorPanel.style.right = '0';
  }

  // ===== HANDLE TEXT INPUT =====
  function handleTextInput(e) {
    if (!editMode || !selectedElement) return;
    // Live update — no action needed, contenteditable handles it
  }

  // ===== SHOW ELEMENT EDITOR =====
  function showElementEditor(el, type) {
    const welcome = document.getElementById('ve-welcome');
    const editorDiv = document.getElementById('ve-element-editor');
    welcome.style.display = 'none';
    editorDiv.style.display = 'block';

    const tagName = el.tagName.toLowerCase();
    const currentText = el.textContent?.trim() || '';
    const currentBg = getComputedStyle(el).backgroundColor;
    const currentColor = getComputedStyle(el).color;
    const currentFontSize = getComputedStyle(el).fontSize;
    const currentFontWeight = getComputedStyle(el).fontWeight;

    let html = `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; font-family: Inter, sans-serif;">Element selectat</div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: rgba(59,130,246,0.15); color: #3b82f6; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; font-family: monospace;">&lt;${tagName}&gt;</span>
          <span style="color: #888; font-size: 12px; font-family: Inter, sans-serif;">${type === 'image' ? 'Imagine' : 'Text'}</span>
        </div>
      </div>
    `;

    if (type === 'image') {
      const src = el.getAttribute('src') || '';
      const alt = el.getAttribute('alt') || '';
      html += `
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">🖼️ URL Imagine</label>
          <input id="ve-img-src" type="text" value="${src}" style="width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: white; font-size: 12px; outline: none; font-family: Inter, sans-serif;" oninput="document.querySelector('[data-ve-selected]')?.setAttribute('src', this.value)">
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">📝 Alt Text</label>
          <input id="ve-img-alt" type="text" value="${alt}" style="width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: white; font-size: 12px; outline: none; font-family: Inter, sans-serif;" oninput="document.querySelector('[data-ve-selected]')?.setAttribute('alt', this.value)">
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">📐 Lățime (%)</label>
          <input id="ve-img-width" type="range" min="10" max="100" value="${Math.round(el.offsetWidth / el.parentElement.offsetWidth * 100) || 100}" style="width: 100%;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.width = this.value + '%';">
        </div>
      `;
    }

    if (type === 'text') {
      html += `
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">✏️ Text (editează direct pe pagină)</label>
          <textarea id="ve-text-content" style="width: 100%; min-height: 60px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: white; font-size: 12px; outline: none; resize: vertical; font-family: Inter, sans-serif;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.textContent = this.value;">${currentText}</textarea>
        </div>
      `;
    }

    // Common style controls
    html += `
      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">🎨 Culoare Text</label>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input id="ve-color" type="color" value="${rgbToHex(currentColor)}" style="width: 36px; height: 36px; border: none; border-radius: 8px; cursor: pointer; background: transparent;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.color = this.value;">
          <input id="ve-color-hex" type="text" value="${rgbToHex(currentColor)}" style="flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: white; font-size: 12px; outline: none; font-family: monospace;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.color = this.value; document.getElementById('ve-color').value = this.value;">
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">🎨 Culoare Fundal</label>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input id="ve-bg-color" type="color" value="${rgbToHex(currentBg)}" style="width: 36px; height: 36px; border: none; border-radius: 8px; cursor: pointer; background: transparent;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.backgroundColor = this.value;">
          <input id="ve-bg-hex" type="text" value="${rgbToHex(currentBg)}" style="flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: white; font-size: 12px; outline: none; font-family: monospace;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.backgroundColor = this.value; document.getElementById('ve-bg-color').value = this.value;">
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">📏 Mărime Font: <span id="ve-fontsize-val">${currentFontSize}</span></label>
        <input id="ve-font-size" type="range" min="10" max="72" value="${parseInt(currentFontSize)}" style="width: 100%;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.fontSize = this.value + 'px'; document.getElementById('ve-fontsize-val').textContent = this.value + 'px';">
      </div>

      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">⚖️ Grosime Font</label>
        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
          ${['300','400','500','600','700','800','900'].map(w => `
            <button onclick="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.fontWeight = '${w}';" style="padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: ${currentFontWeight === w ? '#3b82f6' : 'rgba(255,255,255,0.06)'}; color: ${currentFontWeight === w ? 'white' : '#aaa'}; cursor: pointer; font-weight: ${w}; font-size: 11px; font-family: Inter, sans-serif;">${w}</button>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">↔️ Aliniere Text</label>
        <div style="display: flex; gap: 4px;">
          <button onclick="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.textAlign = 'left';" style="flex: 1; padding: 6px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.06); color: #aaa; cursor: pointer; font-size: 13px;">⬅</button>
          <button onclick="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.textAlign = 'center';" style="flex: 1; padding: 6px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.06); color: #aaa; cursor: pointer; font-size: 13px;">⬛</button>
          <button onclick="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.textAlign = 'right';" style="flex: 1; padding: 6px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.06); color: #aaa; cursor: pointer; font-size: 13px;">➡</button>
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">📦 Padding</label>
        <input id="ve-padding" type="range" min="0" max="60" value="${parseInt(getComputedStyle(el).padding) || 0}" style="width: 100%;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.padding = this.value + 'px';">
      </div>

      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">🔲 Border Radius</label>
        <input id="ve-radius" type="range" min="0" max="50" value="${parseInt(getComputedStyle(el).borderRadius) || 0}" style="width: 100%;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.borderRadius = this.value + 'px';">
      </div>

      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">🌫️ Opacitate: <span id="ve-opacity-val">100</span>%</label>
        <input id="ve-opacity" type="range" min="0" max="100" value="${Math.round(parseFloat(getComputedStyle(el).opacity) * 100)}" style="width: 100%;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.opacity = this.value / 100; document.getElementById('ve-opacity-val').textContent = this.value;">
      </div>
    `;

    // Custom CSS
    html += `
      <div style="margin-bottom: 14px;">
        <label style="display: block; font-size: 11px; color: #888; margin-bottom: 6px; font-family: Inter, sans-serif;">🔧 CSS Custom</label>
        <textarea id="ve-custom-css" placeholder="ex: border: 2px solid red;&#10;box-shadow: 0 0 20px blue;" style="width: 100%; min-height: 60px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: white; font-size: 11px; outline: none; resize: vertical; font-family: monospace;" oninput="const sel = document.querySelector('[data-ve-selected]'); if(sel) sel.style.cssText += this.value;"></textarea>
      </div>
    `;

    // Delete element button
    html += `
      <button onclick="const sel = document.querySelector('[data-ve-selected]'); if(sel) { sel.remove(); document.getElementById('ve-welcome').style.display = 'block'; document.getElementById('ve-element-editor').style.display = 'none'; }" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.1); color: #ef4444; cursor: pointer; font-size: 12px; font-family: Inter, sans-serif; transition: all 0.2s;" onmouseenter="this.style.background='rgba(239,68,68,0.2)'" onmouseleave="this.style.background='rgba(239,68,68,0.1)'">
        🗑️ Șterge element
      </button>
    `;

    editorDiv.innerHTML = html;
  }

  // ===== RGB TO HEX =====
  function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return '#000000';
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return '#000000';
    return '#' + match.slice(0, 3).map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  // ===== SAVE CHANGES =====
  function saveChanges() {
    // Save current page HTML to localStorage
    disableEditing();
    const html = document.documentElement.outerHTML;
    const changes = {};

    // Track all modified elements
    document.querySelectorAll('[style]').forEach((el, i) => {
      const key = el.tagName + '-' + i + '-' + (el.className || '').substring(0, 30);
      changes[key] = {
        style: el.getAttribute('style'),
        text: el.textContent?.trim()?.substring(0, 100),
        src: el.getAttribute('src') || undefined,
        alt: el.getAttribute('alt') || undefined,
      };
    });

    localStorage.setItem('ve-changes', JSON.stringify(changes));
    localStorage.setItem('ve-html', html);

    if (editMode) enableEditing();
    showVeToast('✅ Salvat cu succes!', 'success');
  }

  // ===== RESET CHANGES =====
  function resetChanges() {
    if (confirm('Sigur vrei să resetezi toate modificările?')) {
      localStorage.removeItem('ve-changes');
      localStorage.removeItem('ve-html');
      location.reload();
    }
  }

  // ===== EXPORT HTML =====
  function exportHTML() {
    disableEditing();
    const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'istore-stock-edited.html';
    a.click();
    URL.revokeObjectURL(url);
    if (editMode) enableEditing();
    showVeToast('📥 HTML descărcat!', 'success');
  }

  // ===== TOAST =====
  function showVeToast(message, type) {
    const existing = document.getElementById('ve-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 've-toast';
    toast.style.cssText = `
      position: fixed; bottom: 90px; right: 24px; z-index: 10000;
      padding: 12px 20px; border-radius: 12px; font-size: 13px; font-weight: 600;
      color: white; font-family: Inter, sans-serif;
      background: ${type === 'success' ? '#10b981' : '#3b82f6'};
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      animation: veToastIn 0.3s ease forwards;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes veToastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes veToastOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      toast.style.animation = 'veToastOut 0.3s ease forwards';
      setTimeout(() => { toast.remove(); style.remove(); }, 300);
    }, 2500);
  }

  // ===== LOAD SAVED CHANGES =====
  function loadSavedChanges() {
    const saved = localStorage.getItem('ve-html');
    if (saved) {
      // Changes were saved previously — they persist in the page
    }
  }

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener('keydown', (e) => {
    if (!editMode) return;

    // Ctrl+S = Save
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveChanges();
    }

    // Escape = Deselect
    if (e.key === 'Escape') {
      if (selectedElement) {
        selectedElement.removeAttribute('data-ve-selected');
        selectedElement.removeAttribute('contenteditable');
        selectedElement = null;
      }
      document.getElementById('ve-welcome').style.display = 'block';
      document.getElementById('ve-element-editor').style.display = 'none';
    }

    // Delete = Remove selected element
    if (e.key === 'Delete' && selectedElement && !selectedElement.getAttribute('contenteditable')) {
      selectedElement.remove();
      selectedElement = null;
      document.getElementById('ve-welcome').style.display = 'block';
      document.getElementById('ve-element-editor').style.display = 'none';
    }
  });

  // ===== INIT =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createEditorUI);
  } else {
    createEditorUI();
  }

})();