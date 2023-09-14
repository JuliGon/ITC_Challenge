const BOOKS_URL = import.meta.env.VITE_BOOKS_URL;

export default class BookModel {
	constructor() {}

	async getBooks(signal, name, description) {
		const url = new URL(BOOKS_URL);

		if (name) {
			url.searchParams.append("name", name);
		}

		if (description) {
			url.searchParams.append("description", description);
		}

		return new Promise((resolve, reject) => {
			fetch(url.toString(), { signal })
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		});
	}
}
