/* eslint-disable no-useless-catch */
const EDITORIALS_URL = import.meta.env.VITE_EDITORIALS_URL;

export async function getEditorials() {
	try {
		const response = await fetch(EDITORIALS_URL);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function getEditorial(id) {
	try {
		const response = await fetch(`${EDITORIALS_URL}/${id}`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function createEditorial(editorialData) {
	try {
		const response = await fetch(EDITORIALS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editorialData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function deleteEditorial(id) {
	try {
		await fetch(`${EDITORIALS_URL}/${id}`, {
			method: "DELETE",
		});
	} catch (error) {
		throw error;
	}
}
