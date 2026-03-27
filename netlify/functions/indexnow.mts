// Netlify Function: runs after deploy to ping IndexNow (Bing + Yandex)
// Trigger via: POST https://hospital.vmdonline.cloud/.netlify/functions/indexnow

export default async () => {
  const KEY = process.env.INDEXNOW_KEY
  const HOST = 'hospital.vmdonline.cloud'

  const urlList = [
    `https://${HOST}/`,
    `https://${HOST}/login/`,
    `https://${HOST}/admin/dashboard/`,
    `https://${HOST}/admin/doctors/`,
    `https://${HOST}/admin/patients/`,
    `https://${HOST}/admin/reports/`,
    `https://${HOST}/doctor/dashboard/`,
    `https://${HOST}/doctor/appointments/`,
    `https://${HOST}/doctor/patients/`,
    `https://${HOST}/doctor/chat/`,
    `https://${HOST}/patient/dashboard/`,
    `https://${HOST}/patient/appointments/`,
    `https://${HOST}/patient/profile/`,
    `https://${HOST}/patient/chat/`,
  ]

  const body = JSON.stringify({ host: HOST, key: KEY, urlList })

  const [bing, yandex] = await Promise.all([
    fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    }),
    fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    }),
  ])

  return new Response(
    JSON.stringify({ bing: bing.status, yandex: yandex.status }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

export const config = { path: '/.netlify/functions/indexnow' }
