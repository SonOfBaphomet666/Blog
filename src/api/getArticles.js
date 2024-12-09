import { API_ROUTES } from "../utils/constant";
import httpClient from "./httpclient";

const limit = 10;
const offset = 0;

async function getArtilces() {
    try {
        const response = await httpClient.get(
            `${API_ROUTES.ARTICLE_LIST_URL}?limit=${limit}&offset${offset}`
        )
        return response.data;
    } catch (error) {
        console.error("Error fetching articles:", error.message);
        throw error;

    }
};

export default getArtilces;