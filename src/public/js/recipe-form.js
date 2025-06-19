document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('image');
  const preview = document.getElementById('preview');
  const cameraIcon = document.getElementById('camera-icon');

  input.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      cameraIcon.style.display = 'none'
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      cameraIcon.style = "block";
      preview.style.display = 'none';
      preview.src = '';
    }
  });
});