/* eslint-disable no-useless-catch */
const BOOKS_URL = import.meta.env.VITE_BOOKS_URL;

export async function getBooks(signal, name, description) {
	const url = new URL(BOOKS_URL);

	if (name) {
		url.searchParams.append("name", name);
	}

	if (description) {
		url.searchParams.append("description", description);
	}

	try {
		const response = await fetch(url.toString(), { signal });

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function getBook(id) {
	try {
		const response = await fetch(`${BOOKS_URL}/${id}`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function createBook(bookData) {
	try {
		const response = await fetch(BOOKS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bookData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function updateBook(id, updatedData) {
	try {
		const response = await fetch(`${BOOKS_URL}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function deleteBook(id) {
	try {
		await fetch(`${BOOKS_URL}/${id}`, {
			method: "DELETE",
		});
	} catch (error) {
		throw error;
	}
}
