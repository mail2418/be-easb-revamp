/**
 * Smoke-test Jalan/Saluran workflow endpoints (no token output).
 * Usage: node scripts/smoke-usulan-workflow.mjs
 */
const API = process.env.E2E_API_URL ?? 'http://localhost:3001/api/dev/v1';
const YEAR = new Date().getFullYear();
const MARKER = `smoke-${Date.now()}`;

const USERS = {
  opd: { username: 'UserDPUDPR', password: '12345678' },
  adbang: { username: 'VerifikatorAdbang1', password: '12345678' },
  bpkad: { username: 'VerifikatorBpkad1', password: '12345678' },
  bappeda: { username: 'VerifikatorBappeda1', password: '12345678' },
  superadmin: { username: 'superadmin', password: 'SuperAdminPass123!' },
};

async function login({ username, password }) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok || json.status !== 'success') {
    throw new Error(`Login failed for ${username}: ${json.message ?? res.status}`);
  }
  return json.data.accessToken;
}

async function api(token, path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

async function discoverLocation(token) {
  const idKabkota = 62;
  const kec = await api(token, `/kecamatans?idKabkota=${idKabkota}&page=1&amount=100`);
  const kecList = kec.json.data?.data ?? kec.json.data ?? [];
  const kecamatan = kecList[0];
  if (!kecamatan?.id) throw new Error('No kecamatan found');

  const kel = await api(token, `/kelurahans?idKecamatan=${kecamatan.id}&page=1&amount=100`);
  const kelList = kel.json.data?.data ?? kel.json.data ?? [];
  const kelurahan = kelList[0];
  if (!kelurahan?.id) throw new Error('No kelurahan found');

  return { idKabkota, idKecamatan: kecamatan.id, idKelurahan: kelurahan.id };
}

async function discoverRekening(token) {
  const res = await api(token, '/rekenings?page=1&amount=20');
  const list = res.json.data?.data ?? res.json.data ?? [];
  const row = list[0];
  if (!row?.id) throw new Error('No rekening found');
  return row.id;
}

async function discoverJalanPerkerasan(adminToken) {
  const res = await api(adminToken, '/jalan-jenis-perkerasan?page=1&amount=10');
  const list = res.json.data?.data ?? res.json.data ?? [];
  const row = list[0];
  if (!row?.id) throw new Error('No jalan jenis perkerasan');
  return row.id;
}

async function discoverRuangLingkupHspk(adminToken) {
  const hspk = await api(adminToken, '/hspks?page=1&amount=10');
  const hspkList = hspk.json.data?.data ?? hspk.json.data ?? [];
  const item = hspkList[0];
  if (!item?.id) return null;
  const ruangId = item.id_ruang_lingkup ?? item.idRuangLingkup;
  if (!ruangId) return null;
  return { ruangId, hspkId: item.id };
}

async function smokeJalan() {
  const opd = await login(USERS.opd);
  const admin = await login(USERS.superadmin);
  const loc = await discoverLocation(opd);
  const perkerasan = await discoverJalanPerkerasan(admin);
  const rekening = await discoverRekening(opd);
  const rh = await discoverRuangLingkupHspk(admin);
  if (!rh) throw new Error('No HSPK seed data — run superadmin E2E Saluran Ruang Lingkup → HSPK first');
  const { ruangId, hspkId } = rh;

  const index = await api(opd, '/usulan-jalan/store-index', {
    method: 'POST',
    body: JSON.stringify({
      idAsbJenis: 1,
      idJalanJenisPerkerasan: perkerasan,
      ...loc,
      tahunAnggaran: YEAR,
      namaUsulan: `Jalan ${MARKER}`,
      alamat: 'Jl. Smoke Test',
    }),
  });
  if (!index.ok) throw new Error(`jalan store-index: ${index.json.message ?? index.status}`);
  const jalanId = index.json.data?.id ?? index.json.data?.data?.id;
  if (!jalanId) throw new Error('jalan store-index: no id');

  const info = await api(opd, '/usulan-jalan/store-informasi', {
    method: 'PUT',
    body: JSON.stringify({
      idUsulanJalan: jalanId,
      idRekening: rekening,
      lebar: 6,
      data_ruang_lingkup: [{ id: ruangId, data_hspk: [{ id_hspk: hspkId, spasi: 1, tinggi: 100 }] }],
      data_smkk: [],
    }),
  });
  if (!info.ok) throw new Error(`jalan store-informasi: ${info.json.message ?? info.status}`);

  const adbang = await login(USERS.adbang);
  for (const [path, body] of [
    ['/usulan-jalan/verify-index', {
      idUsulanJalan: jalanId,
      idAsbJenis: 1,
      idJalanJenisPerkerasan: perkerasan,
      ...loc,
      tahunAnggaran: YEAR,
      namaUsulan: `Jalan ${MARKER}`,
      alamat: 'Jl. Smoke Test',
    }],
    ['/usulan-jalan/verify-informasi', {
      idUsulanJalan: jalanId,
      lebar: 6,
      data_ruang_lingkup: [{ id: ruangId, data_hspk: [{ id_hspk: hspkId, spasi: 1, tinggi: 100 }] }],
      data_smkk: [],
    }],
    ['/usulan-jalan/verify-adbang', { idUsulanJalan: jalanId }],
  ]) {
    const r = await api(adbang, path, { method: 'PUT', body: JSON.stringify(body) });
    if (!r.ok) throw new Error(`${path}: ${r.json.message ?? r.status}`);
  }

  const bpkad = await login(USERS.bpkad);
  const bpkadRes = await api(bpkad, '/usulan-jalan/verify-bpkad', {
    method: 'PUT',
    body: JSON.stringify({ idUsulanJalan: jalanId }),
  });
  if (!bpkadRes.ok) throw new Error(`jalan verify-bpkad: ${bpkadRes.json.message ?? bpkadRes.status}`);

  const bappeda = await login(USERS.bappeda);
  const bappedaRes = await api(bappeda, '/usulan-jalan/verify-bappeda', {
    method: 'PUT',
    body: JSON.stringify({ idUsulanJalan: jalanId }),
  });
  if (!bappedaRes.ok) throw new Error(`jalan verify-bappeda: ${bappedaRes.json.message ?? bappedaRes.status}`);

  return jalanId;
}

async function smokeSaluran() {
  const opd = await login(USERS.opd);
  const admin = await login(USERS.superadmin);
  const loc = await discoverLocation(opd);
  const rekening = await discoverRekening(opd);
  const rh = await discoverRuangLingkupHspk(admin);
  if (!rh) throw new Error('No HSPK seed data — run superadmin E2E Saluran Ruang Lingkup → HSPK first');
  const { ruangId, hspkId } = rh;

  const index = await api(opd, '/usulan-saluran/store-index', {
    method: 'POST',
    body: JSON.stringify({
      idAsbJenis: 1,
      idTipeSaluran: 1,
      ...loc,
      tahunAnggaran: YEAR,
      namaUsulanSaluran: `Saluran ${MARKER}`,
      alamat: 'Jl. Smoke Saluran',
    }),
  });
  if (!index.ok) throw new Error(`saluran store-index: ${index.json.message ?? index.status}`);
  const saluranId = index.json.data?.id ?? index.json.data?.data?.id;
  if (!saluranId) throw new Error('saluran store-index: no id');

  const info = await api(opd, '/usulan-saluran/store-informasi', {
    method: 'PUT',
    body: JSON.stringify({
      idUsulanSaluran: saluranId,
      idRekening: rekening,
      lebar: 1,
      data_ruang_lingkup: [{ id: ruangId, data_hspk: [{ id_hspk: hspkId, spasi: 5, tinggi: 1 }] }],
      data_smkk: [],
    }),
  });
  if (!info.ok) throw new Error(`saluran store-informasi: ${info.json.message ?? info.status}`);

  const adbang = await login(USERS.adbang);
  for (const [path, body] of [
    ['/usulan-saluran/verify-index', {
      idUsulanSaluran: saluranId,
      idAsbJenis: 1,
      idTipeSaluran: 1,
      ...loc,
      tahunAnggaran: YEAR,
      namaUsulanSaluran: `Saluran ${MARKER}`,
      alamat: 'Jl. Smoke Saluran',
    }],
    ['/usulan-saluran/verify-informasi', {
      idUsulanSaluran: saluranId,
      lebar: 1,
      data_ruang_lingkup: [{ id: ruangId, data_hspk: [{ id_hspk: hspkId, spasi: 5, tinggi: 1 }] }],
      data_smkk: [],
    }],
    ['/usulan-saluran/verify-adbang', { idUsulanSaluran: saluranId }],
  ]) {
    const r = await api(adbang, path, { method: 'PUT', body: JSON.stringify(body) });
    if (!r.ok) throw new Error(`${path}: ${r.json.message ?? r.status}`);
  }

  const bpkad = await login(USERS.bpkad);
  const bpkadRes = await api(bpkad, '/usulan-saluran/verify-bpkad', {
    method: 'PUT',
    body: JSON.stringify({ idUsulanSaluran: saluranId }),
  });
  if (!bpkadRes.ok) throw new Error(`saluran verify-bpkad: ${bpkadRes.json.message ?? bpkadRes.status}`);

  const bappeda = await login(USERS.bappeda);
  const bappedaRes = await api(bappeda, '/usulan-saluran/verify-bappeda', {
    method: 'PUT',
    body: JSON.stringify({ idUsulanSaluran: saluranId }),
  });
  if (!bappedaRes.ok) throw new Error(`saluran verify-bappeda: ${bappedaRes.json.message ?? bappedaRes.status}`);

  return saluranId;
}

async function main() {
  const results = [];
  try {
    const jalanId = await smokeJalan();
    results.push(`PASS jalan workflow (id=${jalanId})`);
  } catch (e) {
    results.push(`FAIL jalan: ${e.message}`);
  }

  try {
    const saluranId = await smokeSaluran();
    results.push(`PASS saluran workflow (id=${saluranId})`);
  } catch (e) {
    results.push(`FAIL saluran: ${e.message}`);
  }

  for (const line of results) console.log(line);
  if (results.some((r) => r.startsWith('FAIL'))) process.exit(1);
}

main();
