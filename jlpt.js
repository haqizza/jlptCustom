// Read current URL
currentUrl = document.location.href.split('/')


// ##############################################
// Learning Place
// 1:SD; 2:SMP; 3:SMA; 4:PT; 5:Lembaga lain; 6:Tidak 1-5
// 
// Test Reason
// 1:Masuk PT dalneg; 2:Masuk PT jepang; 3:Masuk lembaga pend. dalneg;
// 4:Masuk lembaga pend. jepang; 5: pekerjaan dalneg; 
// 6: pekerjaan jepang; 7:Ukur kemampuan; 8:Lainnya
// 
// Work
// 1:SD; 2:SMP/SMA; 3:PT; 4:Institusi pend. lain; 5:Bekerja; 
// 6: Lainnya
// 
// Work Detail (if Bekerja), about japanese use at work
// 1:Guru; 2:PNS; 3:Pekerja manufaktur, bangunan, IT;
// 4:Pekerja jasa, parwis, hotel; 5:pekerja selain 1-4;
// 6:Tidak menggunakan japanese dalam pekerjaan

const data = {
  email: '',
  password: '',
  testLevel: 1, // 1 == N1, and so on
  testLocation: 'Bandung',
  birthday: '27/05/2000',
  gender: 'male',
  address: 'Jalan Sersan Bajuri Gg. Al Ikhlas RT 02 RW 04 no.11, Kel. Isola, Kec. Sukasari',
  postalCode: '40154',
  pin: '12345678', // PIN to see the online result later. 8 digit (bisa lebih atau kurangnya lupa, ambil aman)
  phone: '08968186191',
  learningPlace: 6, // Refer values above
  testReason: 6, 
  work: 5, 
  workDetail: 6,
  
  // Media Experience
  // value: TV, Drama, Anime, Koran/Majalah, Buku, Komik, Web/artikel, lainnya, tak ada
  mediaExp: [true, true, true, true, true, true, true, true, false],
  
  // Communication
  // Value: Bicara, dengar, baca, tulis, tak satupun
  comm_teacher: [true, true, true, true, false],
  comm_friend: [true, true, true, true, false],
  comm_family: [false, false, false, false, true],
  comm_boss: [false, false, false, false, true],
  comm_collague: [true, true, true, true, false],
  comm_customer: [false, false, false, false, true],

  // Pengalaman Ujian 
  // N1, N2, N3, N4, N5. Value: number (kali ikut ujian)
  testExp: [0,1,1,1,1], // Kali ujian
  // Lulus/tidak. Value: true/false
  testResult: [null, true, true, true, true], 
}

// ############################
// LANDING PAGE
// ############################
setTimeout(() => {
// Check is it landing page
if(currentUrl[3] == '') {
  // Check is logged in
  let matchString = null
  try {
    matchString = document.getElementsByClassName('offcanvas-body custom-navbar__body')[0].firstChild.lastElementChild.firstChild.firstChild.lastChild.textContent.replaceAll(' ','').match(' Masuk ')
  }
  catch{}
  
  if(matchString){
    // If not, login first
    document.location.href = 'https://jlptonline.or.id/signin'
  }
  else {
    // [1]
    // Go to level & location selection page
    // Location 2010201 is Bandung. 2010101 for Jakarta, 2010301 for Surabaya
    // Grade is N level. N1 is grade=1
    const location = {
      Jakarta: 101,
      Bandung: 201,
      Surabaya: 301
    }
    document.location.href = `https://jlptonline.or.id/test?location=2010${(location[data.testLocation])}&grade=${data.testLevel}`
  }
}

// ############################
// LOGIN PAGE
// ############################
// Check is it login page
else if(currentUrl[3] == 'signin') {
  // document.getElementById('rememberMe').click()
  document.getElementById('email').value = data.email
  document.getElementById('email').dispatchEvent(new Event('input'))
  document.getElementById('password').value = data.password
  document.getElementById('password').dispatchEvent(new Event('input'))

  setTimeout(() => document.querySelectorAll('button[type="submit"]')[0].click(), 500)
}

// ############################
// DAFTAR UJIAN PAGE
// ############################
// If you know in what number is the registration page you want,
// you can skip the process in this page with directly go to the
// registration page with line below to replace [1] part.
// 11 is Surabaya N1, according from the exam site order,
// maybe 1 is Jakarta N1 and 6 is Bandung N1. But I can't
// confirming it now, the quota is already full.
// 
// document.location.href = https://jlptonline.or.id/test/6

else if(currentUrl[3].match('test\\?')) {
  if(document.location.href.split('/')[3].match('test?')) {
    // Select the top option, go to the registration page
    document.getElementsByTagName('tbody')[0].firstChild.lastChild.firstChild.click()
  }
}

// ############################
// FORM PENDAFTARAN PAGE
// ############################

else if(currentUrl[3] == 'test' && currentUrl[4] != null) {
  // There will popup a modal when opening the page
  setTimeout(() => {
    document.getElementById('modal-alert').click()
  }, 300)
  
  // Filling Birthday
  let [date, month, year] = data.birthday.split('/')
  let viewSwitch = document.getElementsByClassName('view-switch')[0]
  viewSwitch.click() // View this year
  viewSwitch.click() // View this decade
  viewSwitch.click() // View this century
  
  // Set decade
  let decade = year.slice(0,-1) + '0'

  document.querySelector(`span[data-year="${decade}"]`).click() // Select decade
  document.querySelector(`span[data-year="${year}"]`).click() // Select year
  document.querySelector(`span[data-month="${(parseInt(month) - 1)}"]`).click() // Select month

  // Set date, get microseconds
  let dateInMicrosecond = new Date(parseInt(year), parseInt(month - 1), parseInt(date)).getTime()
  // Select date
  document.querySelectorAll(`span[data-date="${dateInMicrosecond}"]`)[0].click() 

  // Selecting Option must be with mousedown event, not click
  let genderValue = data.gender == 'male' ? 1 : 2
  document.getElementById(`choices--jenis_kelamin-item-choice-${genderValue}`).dispatchEvent(new Event('mousedown'))

  // Select main language
  // 10: Indonesian
  document.getElementById('choices--bahasa-item-choice-10').dispatchEvent(new Event('mousedown'))
  
  let alamat = document.getElementById('alamat')
  alamat.value = data.address
  alamat.dispatchEvent(new Event('input'))

  let kodePos = document.getElementById('postal_code')
  kodePos.value = data.postalCode
  kodePos.dispatchEvent(new Event('input'))

  let passcode = document.getElementById('passcode')
  passcode.value = data.pin
  passcode.dispatchEvent(new Event('input'))

  let telephone = document.getElementById('telephone')
  telephone.value = data.phone
  telephone.dispatchEvent(new Event('input'))

  // Province: Jabar
  document.getElementById('choices--provinsi-item-choice-9').dispatchEvent(new Event('mousedown'))
  
  // City: Bandung
  setTimeout(() => {
    document.getElementById('choices--city-item-choice-22').dispatchEvent(new Event('mousedown'))
  }, 2000)

  // Learning place
  document.getElementById(`choices--course_place-item-choice-${data.learningPlace}`).dispatchEvent(new Event('mousedown'))

  // Test Reason
  document.getElementById(`choices--reason-item-choice-${data.testReason}`).dispatchEvent(new Event('mousedown'))
  
  // Work
  document.getElementById(`choices--profession-item-choice-${data.work}`).dispatchEvent(new Event('mousedown'))
  
  // Japanese use on work
  setTimeout(() => {
    document.getElementById(`choices--use-item-choice-${data.workDetail}`).dispatchEvent(new Event('mousedown'))
  }, 2000)

  // Media Experience
  for (let i = 27; i < 36; i++){
    if(data.mediaExp[i-27]){
      setTimeout(()=>{
        document.getElementById(i.toString()).click()
      }, 100)
    }
  }
  
  // Communications
  for (let i = 36; i < 41; i++){
    if(data.comm_teacher[i-36]){
      setTimeout(()=>{
        document.getElementById(`with_teacher_${i}`).click()
      }, 100)
    }
  }

  for (let i = 41; i < 46; i++){
    if(data.comm_friend[i-41]){
      setTimeout(()=>{
        document.getElementById(`with_friend_${i}`).click()
      }, 100)
    }
  }

  for (let i = 46; i < 51; i++){
    if(data.comm_family[i-46]){
      setTimeout(()=>{
        document.getElementById(`with_family_${i}`).click()
      }, 100)
    }
  }

  for (let i = 51; i < 56; i++){
    if(data.comm_boss[i-51]){
      setTimeout(()=>{
        document.getElementById(`with_boss_${i}`).click()
      }, 100)
    }
  }

  for (let i = 56; i < 61; i++){
    if(data.comm_collague[i-56]){
      setTimeout(()=>{
        document.getElementById(`with_colleague_${i}`).click()
      }, 100)
    }
  }

  for (let i = 61; i < 66; i++){
    if(data.comm_customer[i-61]){
      setTimeout(()=>{
        document.getElementById(`with_customer_${i}`).click()
      }, 100)
    }
  }

  // Test Experiences
  let testElem = null
  for (let i = 0; i < 5; i++){
    testElem = document.getElementById(`jumlah_ikut_test-${i}`)
    if(data.testExp[i] != 0){
      testElem.value = data.testExp[i]
    }
    testElem.dispatchEvent(new Event('input'))
    if (data.testResult[i]){
      document.getElementById(`lulus-${i}`).click()
    }
    else if (data.testResult[i] == false) {
      document.getElementById(`gagal-${i}`).click()
    }
  }
  

  document.getElementById('saya-setuju').click()

  //TODO:
  // - 

  // Click Menuju Pembayaran
  // Can' go further, photo must be updated manually
  // document.getElementById('saya-setuju').parentElement.parentElement.parentElement.lastChild.firstChild.firstChild.click()
  
}
},1000)