/* ============================================================
   CONFIG — your Cloudinary photos
   Your cloud name (oglpra1n) is already in the URL pattern below —
   just swap <file-name> for the actual public ID of each upload.
   Find it in Cloudinary: Media Library → click the photo → copy
   the "Public ID". Leave the list empty and placeholder tiles
   show instead of a broken page.
============================================================ */
const PHOTOS = [
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929528/IMG_20260713_132505_789_qxndu2.jpg",
  
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929528/IMG_20260713_132505_531_v6hnfs.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929528/IMG_20260713_132506_235_yt2f71.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929528/IMG_20260713_132505_769_i9e46o.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929528/IMG_20260713_132506_361_afvjuc.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929528/IMG_20260713_132506_476_dwvxvb.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929529/IMG_20260713_132506_306_xeazyl.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929529/IMG_20260713_132505_866_pxjqzj.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929624/Snapchat-921176396_wpfzuv.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929624/Snapchat-1474959809_kq6c0i.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929624/Snapchat-1993317126_llq0se.jpg",
   "https://res.cloudinary.com/oglpra1n/image/upload/v1783929625/Snapchat-109353678_nskfud.jpg",
   
];

const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let currentPhoto = 0;

function buildGallery(){
  if (PHOTOS.length === 0){
    for (let i = 0; i < 6; i++){
      const div = document.createElement('div');
      div.className = 'photo';
      div.innerHTML = `<div class="photo-placeholder">🤍</div>`;
      galleryGrid.appendChild(div);
    }
    return;
  }
  PHOTOS.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'photo';
    div.innerHTML = `<img src="${src}" alt="photo ${i+1}" loading="lazy">`;
    div.addEventListener('click', () => openLightbox(i));
    galleryGrid.appendChild(div);
  });
}
buildGallery();

function openLightbox(i){
  if (PHOTOS.length === 0) return;
  currentPhoto = i;
  lbImg.src = PHOTOS[currentPhoto];
  lightbox.classList.add('active');
}
document.getElementById('lbClose').addEventListener('click', () => lightbox.classList.remove('active'));
document.getElementById('lbPrev').addEventListener('click', () => {
  currentPhoto = (currentPhoto - 1 + PHOTOS.length) % PHOTOS.length;
  lbImg.src = PHOTOS[currentPhoto];
});
document.getElementById('lbNext').addEventListener('click', () => {
  currentPhoto = (currentPhoto + 1) % PHOTOS.length;
  lbImg.src = PHOTOS[currentPhoto];
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') lightbox.classList.remove('active');
  if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
});
