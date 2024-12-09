import { BASE_URL } from "../utils/constant";

async function httpClient() {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`Response status:${response.status}`);
        }

        const json = await response.json()
        console.log(json);
    } catch {
        console.error(error.message);
    }
}

export default httpClient;
