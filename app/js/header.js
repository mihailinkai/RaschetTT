
function headerHandler(header, popup) {
	const loginBtn = header.querySelector(".js-lk-btn");
	const helpBtn = header.querySelector(".js-help-btn");
	const helpList = header.querySelector(".js-help-list");

	helpBtn.addEventListener("click", () => {
		helpList.classList.toggle("active");
	});

	document.addEventListener("click", (event) => {
		if (!event.target.closest(".js-help-list") && !event.target.closest(".js-help-btn")) {
			helpList.classList.remove("active");
		}
	})

	loginBtn.addEventListener("click", () => {
		popup.classList.add("popup_active");
	})
}

