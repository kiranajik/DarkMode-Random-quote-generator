const API_ENDPOINT = "https://type.fit/api/quotes";
let quotes = [];
var counter, color;
const init = async() => {
    try {
        const jsonRes = await fetch(API_ENDPOINT);
        quotes = await jsonRes.json();
        setMarkup();
        countDown();
    } catch (error) {
        // quotation.innerHTML = error.message;
    }
};

const randomIndexGenerator = (len) => {
    return Math.floor(Math.random() * (len + 1));
};

const checkbox = document.querySelector(".check-mode");

checkbox.addEventListener("change", (e) => {
    if (e.target.checked == true) {
        $(".container").css("background-color", "#f5f5f5")
        color = "black";
        $(".quote").css("color", color);
        $(".footer-most").hide();
    } else {
        $(".container").css("background-color", "#01131F")
        color = "white";
        $(".quote").css("color", color);
        $(".footer-most").show();
    }
});

init();

const setMarkup = () => {


    counter = 5;
    const { text, author } = quotes[randomIndexGenerator(quotes.length)];
    quotation.innerHTML = `
        <span class="quote" style="color:${color};">${text}</span>  
        <div class="footer">
            <span id="refresh" title="Refresh | click R">
                <i class="fas fa-sync"></i>
            </span>
            <div class="author">
                <span class="line"></span>&nbsp;
                <span>${author ? author : "Anonymous"}</span>
            </div>
        </div>
    `;
    refresh.addEventListener("click", () => {
        location.reload();
    });
};

document.onkeypress = (e) => {
    if (e.key === "r" || e.key === "R") location.reload();
};


function countDown() {
    counter = 5;
    var interval = setInterval(function() {
        counter--;
        $(".timer").text("New quote in " + counter + "....")
        if (counter == 0) {
            setMarkup();
            $(".timer").hide();
        } else {
            $(".timer").show();
        }
    }, 1000);
}