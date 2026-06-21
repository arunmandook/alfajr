// ============================================================
// Supabase <-> Google Sheets Two-Way Sync
// Table: customers | Project: WebsiteDB
//
// SETUP (one time):
//   1. Open your Google Sheet
//   2. Extensions > Apps Script > paste this entire file > Save
//   3. Run onOpen() once to create the menu
//   4. In the sheet: Supabase Sync > Setup service key
//      (get the key from supabase.com > Project Settings > API > service_role)
//   5. Supabase Sync > Pull from Supabase to populate the sheet
// ============================================================

const SUPABASE_URL = 'https://uqwkftkmoosfhnuzolfj.supabase.co';
const TABLE = 'Patient_Master';
const SHEET_NAME = 'Patient_Master';
const COLUMNS = ['id', 'created_at', 'name', 'phone', 'email', 'service', 'appointment_date', 'appointment_time', 'message', 'status'];

function getKey() {
  const key = PropertiesService.getScriptProperties().getProperty('SUPABASE_SERVICE_KEY');
  if (!key) throw new Error('Service key not set. Use Supabase Sync > Setup service key.');
  return key;
}

function headers(extra) {
  const key = getKey();
  return Object.assign({
    'apikey': key,
    'Authorization': 'Bearer ' + key,
    'Content-Type': 'application/json'
  }, extra || {});
}

// ── Pull Supabase → Sheet ─────────────────────────────────────
function supabaseToSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  const res = UrlFetchApp.fetch(
    `${SUPABASE_URL}/rest/v1/${TABLE}?select=*&order=id.asc`,
    { headers: headers() }
  );
  const rows = JSON.parse(res.getContentText());

  sheet.clearContents();
  sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]).setFontWeight('bold');

  if (rows.length > 0) {
    const data = rows.map(r => COLUMNS.map(c => r[c] ?? ''));
    sheet.getRange(2, 1, data.length, COLUMNS.length).setValues(data);
  }

  ss.toast(`✅ Pulled ${rows.length} rows from Supabase`, 'Sync complete', 4);
}

// ── Push Sheet → Supabase ─────────────────────────────────────
function sheetToSupabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    SpreadsheetApp.getUi().alert('Sheet "Customers" not found. Run Pull first.');
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ss.toast('No data rows to push.', 'Nothing to sync', 3);
    return;
  }

  const values = sheet.getRange(2, 1, lastRow - 1, COLUMNS.length).getValues();

  // Rows with an id → upsert (update or insert by primary key)
  const existing = values
    .filter(r => r[0] !== '')
    .map(r => {
      const obj = {};
      COLUMNS.forEach((c, i) => { if (r[i] !== '') obj[c] = r[i]; });
      return obj;
    });

  // Rows without an id → insert only (Supabase assigns the id)
  const newRows = values
    .filter(r => r[0] === '')
    .map(r => {
      const obj = {};
      COLUMNS.forEach((c, i) => {
        if (c !== 'id' && c !== 'created_at' && r[i] !== '') obj[c] = r[i];
      });
      return obj;
    });

  let pushed = 0;

  if (existing.length > 0) {
    UrlFetchApp.fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
      method: 'post',
      headers: headers({ 'Prefer': 'resolution=merge-duplicates,return=representation' }),
      payload: JSON.stringify(existing)
    });
    pushed += existing.length;
  }

  if (newRows.length > 0) {
    UrlFetchApp.fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
      method: 'post',
      headers: headers({ 'Prefer': 'return=representation' }),
      payload: JSON.stringify(newRows)
    });
    pushed += newRows.length;
  }

  ss.toast(`✅ Pushed ${pushed} rows to Supabase`, 'Sync complete', 4);

  // Refresh the sheet so new IDs appear
  Utilities.sleep(600);
  supabaseToSheet();
}

// ── Auto-trigger: run a full pull every hour ──────────────────
function setupHourlyTrigger() {
  // Delete any existing triggers for this function first
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'supabaseToSheet')
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('supabaseToSheet')
    .timeBased()
    .everyHours(1)
    .create();

  SpreadsheetApp.getUi().alert('✅ Hourly auto-pull from Supabase enabled.');
}

function removeHourlyTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'supabaseToSheet')
    .forEach(t => ScriptApp.deleteTrigger(t));
  SpreadsheetApp.getUi().alert('Hourly trigger removed.');
}

// ── One-time setup dialog ─────────────────────────────────────
function setupServiceKey() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    'Supabase Service Role Key',
    'Paste your service_role key (Project Settings > API in Supabase dashboard):',
    ui.ButtonSet.OK_CANCEL
  );
  if (result.getSelectedButton() === ui.Button.OK) {
    PropertiesService.getScriptProperties()
      .setProperty('SUPABASE_SERVICE_KEY', result.getResponseText().trim());
    ui.alert('✅ Key saved securely in Script Properties.');
  }
}

// ── Custom menu (runs automatically when sheet opens) ─────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🔄 Supabase Sync')
    .addItem('⬇️  Pull from Supabase → Sheet', 'supabaseToSheet')
    .addItem('⬆️  Push Sheet → Supabase', 'sheetToSupabase')
    .addSeparator()
    .addItem('⏱  Enable hourly auto-pull', 'setupHourlyTrigger')
    .addItem('⏹  Remove hourly auto-pull', 'removeHourlyTrigger')
    .addSeparator()
    .addItem('🔑  Setup service key', 'setupServiceKey')
    .addToUi();
}
