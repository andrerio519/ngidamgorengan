


// Menambahkan titik setiap tiga angka pada input dengan class "input-number"
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('input-number')) {
        // Menghilangkan karakter selain angka
        let formattedValue = e.target.value.replace(/[^0-9]/g, '');
        // Menambahkan titik setiap tiga angka
        e.target.value = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
});
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

modeToggle.addEventListener("click", () => {
	if (body.getAttribute("data-bs-theme") === "dark") {
		body.setAttribute("data-bs-theme", "light"); // Ganti ke mode terang
	} else {
		body.setAttribute("data-bs-theme", "dark"); // Ganti ke mode gelap
	}
});