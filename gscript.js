document.addEventListener("DOMContentLoaded", function () {
	const scriptURL = "https://script.google.com/macros/s/AKfycbzclvH8p-TcoNTeDmiiXknN4rwBX4FVpMRDSar45UL57BUrFDUHsv7SHfOctH7Sakyg/exec";
	const formIncome = document.forms.income;
	const formExpense = document.forms.expense;
	const messageContainer = document.getElementById("message");

	function getQueryParam(param) {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(param);
	}

	const userValue = getQueryParam("user");

	function handleFormSubmit(form, type) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			messageContainer.innerHTML = '<div class="alert alert-info">Mengirim data...</div>';

			const formData = new FormData(form);
			formData.append("Outlet", userValue);
			formData.append("type", type);

			fetch(scriptURL, {
				mode: "no-cors",
				method: "POST",
				body: formData,
			})
				.then(() => {
					messageContainer.innerHTML = '<div class="alert alert-success">Data berhasil dikirim!</div>';
					form.reset();
					setTimeout(() => (messageContainer.innerHTML = ""), 3000);
				})
				.catch((error) => {
					messageContainer.innerHTML = '<div class="alert alert-danger">Terjadi kesalahan saat mengirim data</div>';
					console.error("Error!", error.message);
				});
		});
	}

	handleFormSubmit(formIncome, "pemasukan");
	handleFormSubmit(formExpense, "pengeluaran");
});
