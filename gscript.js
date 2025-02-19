document.addEventListener("DOMContentLoaded", function () {
	const scriptURL = "https://script.google.com/macros/s/AKfycbzclvH8p-TcoNTeDmiiXknN4rwBX4FVpMRDSar45UL57BUrFDUHsv7SHfOctH7Sakyg/exec";
	const pemasukan = document.forms["submit-to-google-sheet"];
	const pengeluaran = document.forms["submit-to-google-sheet2"];
	const notif = document.querySelector(".notif");
	const progressBar = document.querySelector(".sendProgress");

	// Get URL parameters
	const urlParams = new URLSearchParams(window.location.search);
	const userValue = urlParams.get("user");
	const outletValue = urlParams.get("outlet");
	// Get the current date
	var today = new Date();

	// Get the day of the month
	var dd = today.getDate();

	// Get the month (adding 1 because months are zero-based)
	var mm = today.getMonth() + 1;

	// Get the year
	var yyyy = today.getFullYear();

	// Add leading zero if the day is less than 10
	if (dd < 10) {
		dd = "0" + dd;
	}

	// Add leading zero if the month is less than 10
	if (mm < 10) {
		mm = "0" + mm;
	}
	// Format the date as mm/dd/yyyy and log it
	tanggal = dd + "/" + mm + "/" + yyyy;
	const perDate = document.getElementsByClassName("perDate");
	perDate[0].innerHTML = "Input Tanggal " + tanggal;
	// Generic submit handler
	async function handleFormSubmit(form, formType) {
		try {
			progressBar.style.display = "block";
			const formData = new FormData(form);

			// Add additional parameters
			formData.append("User", userValue);
			formData.append("Outlet", outletValue);
			formData.append("Tanggal", tanggal);
			formData.append("type", formType); // Untuk membedakan form di GAS

			const response = await fetch(scriptURL, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const result = await response.json();

			if (result.result === "success") {
				alert(`Data ${formType} berhasil disimpan!`);
				form.reset();
			} else {
				throw new Error(result.error || "Unknown error");
			}
		} catch (error) {
			console.error("Error:", error);
			alert(`Gagal mengirim data: ${error.message}`);
		} finally {
			progressBar.style.display = "none";
			setTimeout(() => (progressBar.style.display = "none"), 5000); // Fallback timeout
		}
	}

	// Form 1 handler
	pemasukan.addEventListener("submit", async (e) => {
		e.preventDefault();
		await handleFormSubmit(pemasukan, "pemasukan");
	});

	// Form 2 handler
	pengeluaran.addEventListener("submit", async (e) => {
		e.preventDefault();
		await handleFormSubmit(pengeluaran, "pengeluaran");
	});
});
