// ── Submit Page Logic ─────────────────────────────────────────────────────

function toast(msg) {
  const el = document.getElementById('toast-el');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}

async function submitEntry() {
  const username = document.getElementById('f-user').value.trim();
  const pet_name = document.getElementById('f-pet').value.trim();
  const pet_type = document.getElementById('f-type').value;
  const score    = parseFloat(document.getElementById('f-score').value);
  const theme    = document.getElementById('f-theme').value;

  if (!username || !pet_name || isNaN(score)) {
    toast('⚠️ Fill in all fields');
    return;
  }

  const { ok, data } = await apiAddEntry(username, pet_name, pet_type, score, theme);
  document.getElementById('add-log').textContent = JSON.stringify(data, null, 2);

  if (ok) {
    toast(`✅ ${pet_name} ${data.status}!`);
    document.getElementById('f-user').value  = '';
    document.getElementById('f-pet').value   = '';
    document.getElementById('f-score').value = '';
  } else {
    toast('❌ ' + (data.detail || 'Error'));
  }
}

async function removeEntry() {
  const username = document.getElementById('r-user').value.trim();

  if (!username) {
    toast('⚠️ Enter a username');
    return;
  }

  const { ok, data } = await apiRemoveEntry(username);
  document.getElementById('add-log').textContent = JSON.stringify(data, null, 2);

  if (ok) {
    toast('🗑️ Removed successfully!');
    document.getElementById('r-user').value = '';
  } else {
    toast('❌ ' + (data.detail || 'Not found'));
  }
}