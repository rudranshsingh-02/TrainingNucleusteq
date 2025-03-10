const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const difficulty = urlParams.get("difficulty");

const API_URL = `https://opentdb.com/api.php?amount=15&category=${category}&difficulty=${difficulty}&type=multiple`;

async function fetchQuestions() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
}
