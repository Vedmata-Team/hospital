export const doctors = [
  { id: 1, name: 'Dr. Priya Sharma', specialty: 'Cardiologist', rating: 4.9, patients: 1240, available: true, avatar: 'PS', exp: '12 yrs', fee: 'Rs.800' },
  { id: 2, name: 'Dr. Arjun Mehta', specialty: 'Neurologist', rating: 4.8, patients: 980, available: true, avatar: 'AM', exp: '9 yrs', fee: 'Rs.900' },
  { id: 3, name: 'Dr. Sunita Rao', specialty: 'Orthopedic', rating: 4.7, patients: 1100, available: false, avatar: 'SR', exp: '15 yrs', fee: 'Rs.750' },
  { id: 4, name: 'Dr. Kiran Desai', specialty: 'Pediatrician', rating: 4.9, patients: 2100, available: true, avatar: 'KD', exp: '11 yrs', fee: 'Rs.600' },
  { id: 5, name: 'Dr. Neha Gupta', specialty: 'Dermatologist', rating: 4.6, patients: 870, available: true, avatar: 'NG', exp: '7 yrs', fee: 'Rs.700' },
  { id: 6, name: 'Dr. Rahul Bose', specialty: 'Psychiatrist', rating: 4.8, patients: 540, available: false, avatar: 'RB', exp: '10 yrs', fee: 'Rs.1000' },
]

export const appointments = [
  { id: 1, patient: 'Ananya Singh', doctor: 'Dr. Priya Sharma', date: '2026-03-27', time: '10:00 AM', status: 'confirmed', type: 'Cardiology', initials: 'AS' },
  { id: 2, patient: 'Rohan Kumar', doctor: 'Dr. Arjun Mehta', date: '2026-03-27', time: '11:30 AM', status: 'pending', type: 'Neurology', initials: 'RK' },
  { id: 3, patient: 'Meera Patel', doctor: 'Dr. Sunita Rao', date: '2026-03-28', time: '09:00 AM', status: 'confirmed', type: 'Orthopedic', initials: 'MP' },
  { id: 4, patient: 'Vijay Nair', doctor: 'Dr. Kiran Desai', date: '2026-03-28', time: '02:00 PM', status: 'completed', type: 'Pediatrics', initials: 'VN' },
  { id: 5, patient: 'Kavita Shah', doctor: 'Dr. Neha Gupta', date: '2026-03-29', time: '03:30 PM', status: 'cancelled', type: 'Dermatology', initials: 'KS' },
]

export const chatMessages = [
  { id: 1, from: 'doctor', text: 'Hello! How are you feeling today?', time: '10:02 AM' },
  { id: 2, from: 'patient', text: 'I have been experiencing chest pain since yesterday.', time: '10:03 AM' },
  { id: 3, from: 'doctor', text: 'I see. Can you describe the pain? Is it sharp or dull?', time: '10:04 AM' },
  { id: 4, from: 'patient', text: 'It is more of a dull ache, especially when I breathe deeply.', time: '10:05 AM' },
  { id: 5, from: 'doctor', text: 'Understood. I would like you to get an ECG done today. I will send the prescription now.', time: '10:06 AM' },
  { id: 6, from: 'patient', text: 'Okay doctor, thank you!', time: '10:07 AM' },
]

export const medicalHistory = [
  { id: 1, date: '2025-12-10', condition: 'Hypertension', doctor: 'Dr. Priya Sharma', notes: 'Blood pressure 145/92. Prescribed Amlodipine 5mg.', status: 'Ongoing' },
  { id: 2, date: '2025-10-05', condition: 'Seasonal Flu', doctor: 'Dr. Kiran Desai', notes: 'Fever and body ache for 3 days. Prescribed Paracetamol.', status: 'Resolved' },
  { id: 3, date: '2025-07-22', condition: 'Knee Pain', doctor: 'Dr. Sunita Rao', notes: 'X-ray normal. Physiotherapy recommended.', status: 'Resolved' },
  { id: 4, date: '2025-03-14', condition: 'Diabetes Screening', doctor: 'Dr. Rahul Bose', notes: 'HbA1c 6.1 pre-diabetic. Diet plan advised.', status: 'Monitoring' },
]

export const adminStats = {
  totalPatients: 3847,
  totalDoctors: 42,
  todayAppointments: 128,
  revenue: 'Rs.12.4L',
  bedOccupancy: 78,
  satisfaction: 96,
  monthlyRevenue: [
    { month: 'Oct', value: 820000 },
    { month: 'Nov', value: 940000 },
    { month: 'Dec', value: 1100000 },
    { month: 'Jan', value: 980000 },
    { month: 'Feb', value: 1050000 },
    { month: 'Mar', value: 1240000 },
  ],
  appointmentsByType: [
    { name: 'Cardiology', value: 28 },
    { name: 'Neurology', value: 18 },
    { name: 'Orthopedic', value: 22 },
    { name: 'Pediatrics', value: 15 },
    { name: 'Dermatology', value: 17 },
  ],
}

export const notifications = [
  { id: 1, text: 'Your appointment with Dr. Priya is confirmed', time: '5 min ago', type: 'success', read: false },
  { id: 2, text: 'New lab report is ready to download', time: '1 hr ago', type: 'info', read: false },
  { id: 3, text: 'Reminder: Take your Amlodipine at 8 PM', time: '3 hrs ago', type: 'warning', read: true },
  { id: 4, text: 'Dr. Arjun sent you a message', time: '1 day ago', type: 'info', read: true },
]

export const testimonials = [
  { name: 'Dr. Ramesh Joshi', role: 'Medical Director, Apollo Clinic', text: 'MediCare Pro transformed our operations. Patient wait times dropped by 60% in just 2 months.', stars: 5 },
  { name: 'Priya Tiwari', role: 'Head Nurse, City Hospital', text: 'The appointment system is so smooth. Our team loves it and patients are much happier.', stars: 5 },
  { name: 'Suresh Agarwal', role: 'CEO, HealthFirst Network', text: 'Best investment we made. ROI was visible within the first quarter. Highly recommended.', stars: 5 },
  { name: 'Dr. Anita Kapoor', role: 'Cardiologist, Max Hospital', text: 'The chat and video consultation feature is a game-changer for follow-up appointments.', stars: 5 },
]

export const pricing = [
  { name: 'Starter', price: 'Rs.4,999', period: '/mo', desc: 'Perfect for small clinics', features: ['Up to 5 Doctors', '500 Patients/mo', 'Appointments', 'Basic Reports', 'Email Support'], highlight: false },
  { name: 'Professional', price: 'Rs.12,999', period: '/mo', desc: 'Most popular for hospitals', features: ['Up to 25 Doctors', 'Unlimited Patients', 'Appointments + Video', 'Advanced Analytics', 'Chat System', 'Priority Support'], highlight: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For large hospital chains', features: ['Unlimited Doctors', 'Unlimited Patients', 'All Features', 'Custom Integrations', 'Dedicated Manager', '24/7 SLA Support'], highlight: false },
]
