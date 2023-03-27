const temperatureFeild = document.querySelector(".weather1")
const cityFeild = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiFeild = document.querySelector(".weather3 img")
const weatherFeild = document.querySelector(".weather3 span")
const searchFeild = document.querySelector(".searchFeild")
const form = document.querySelector("form")

let target = "Bhilai";
const fetchData = async (target) => {

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=eb0a5dc2d8344e6298b140235231403&q=${target}`

        const response = await fetch(url);
        const data = await response.json()

        const {
            current: { temp_c, condition: {
                text, icon
            } },
            location: { name, localtime }
        } = data

        updateDom(temp_c, name, localtime, icon, text)
    } catch (error) {
        alert("Location not found")
    }

};

function updateDom(temperature, city, time, emoji, text) {
    temperatureFeild.innerText = temperature;
    cityFeild.innerText = city

    const exactDate = time.split(" ")[0];
    const exactTime = time.split(" ")[1];

    const exactDay = getDayfullName(new Date(exactDate).getDay());

    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate} `

    emojiFeild.src = emoji
    weatherFeild.innerText = text
}



fetchData(target)

function getDayfullName(num) {
    switch (num) {
        case 0:
            return "Sunday"
            break;
        case 1:
            return "Monday"
            break;
        case 2:
            return "Tuesday"
            break;
        case 3:
            return "Wednesday"
            break;
        case 4:
            return "Thrusday"
            break;
        case 5:
            return "Friday"
            break;
        case 6:
            return "Saturday"
            break;

        default:
            break;
    }
}

const search = (e) => {
    e.preventDefault();

    target = searchFeild.value;

    fetchData(target)

}
form.addEventListener("submit", search)