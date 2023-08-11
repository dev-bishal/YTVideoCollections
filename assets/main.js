function indexPageFunctions() {
    var modalCloseBtn = document.querySelector(".closeBtn");
    var allVideoElements = document.querySelectorAll(".vid");

    allVideoElements.forEach(VideoElement => {
        VideoElement.addEventListener("click", () => {
            triggerModal();
            videoURL = VideoElement.getAttribute("data-vidvalue");
            document.querySelector("#modal .content").insertAdjacentHTML("afterbegin", 
            `<iframe class="w-full lg:w-[560px]" width="560" height="315" src="https://www.youtube.com/embed/${videoURL}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>`);
        })
    });

    modalCloseBtn.addEventListener("click", () => {
        triggerModal();
        document.querySelector("#modal .content").innerHTML = "";
    })
}

var modalElement;
const triggerModal = () => {
    document.querySelector("#modal").classList.toggle("hidden");
    document.querySelector("#modal").classList.toggle("flex");
}

//Triggered when Page is loaded with URL Paramter
function IndexStarterFunctions() {
    const readParameter = () => {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        var videoType;
        try {
            videoType = params.get('vType');
            videoURL = params.get('vURL');
        } catch (error) { }

        if (videoType == "Self") {
            showSelfImprovementVids = true;
        }
        if (videoURL == "" || videoURL == null) { }
        else {
            triggerModal();
            document.querySelector("#modal .content").insertAdjacentHTML("afterbegin", 
            `<iframe class="w-full lg:w-[560px]" width="560" height="315" src="https://www.youtube.com/embed/${videoURL}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>`);
        }
    }
    readParameter();

    document.getElementById("scrollToTop").addEventListener("click", () => {
        window.scrollTo(0, 0);
    })
}

var maximizeButton = document.querySelector("#maxiBtn");
maximizeButton.addEventListener("click", () => {
    document.querySelector("#modal .content").classList.toggle("zoom");
    document.querySelector("#modal .content iframe").classList.toggle("zoom");
})

function adminPageFunctions() {
    var fetchBtn = document.querySelector("#fetchBtn");
    var previewElement = document.querySelector(".highlight .vid");


    const fetchYoutubeVideo = () => {
        var vidTitle = document.querySelector("#vidTitle").value;
        var vidUrl = document.querySelector("#vidUrl").value; // https://www.youtube.com/watch?v=rLgGw4J3Fi8 , https://www.youtube.com/shorts/rLgGw4J3Fi8 , 
        var vidcategory = document.querySelector("#vidcategory").value;

        console.log(vidTitle);
        console.log(vidUrl);
        console.log(vidcategory);

        if (vidUrl.includes("https://youtu.be/"))
            vidUrl = vidUrl.replace("https://youtu.be/", "");
        else if (vidUrl.includes("https://www.youtube.com/watch?v="))
            vidUrl = vidUrl.replace("https://www.youtube.com/watch?v=", "");
        else if (vidUrl.includes("https://youtube.com/watch?v="))
            vidUrl = vidUrl.replace("https://youtube.com/watch?v=", "");
        else if (vidUrl.includes("https://youtube.com/shorts/"))
            vidUrl = vidUrl.replace("https://youtube.com/shorts/", "");
        else if (vidUrl.includes("https://www.youtube.com/shorts/"))
            vidUrl = vidUrl.replace("https://www.youtube.com/shorts/", "");

        if (vidUrl.includes("?feature=share"))
            vidUrl = vidUrl.replace("?feature=share", "");

        var iframeElement = `
        <iframe class="w-full lg:w-[560px]" width="560" height="315" src="https://www.youtube.com/embed/${vidUrl}"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>`;

        var categoryElement = `<div class="flex gap-2 flex-wrap ml-3">`;
        var tempArray = vidcategory.split(",")
        for (let index = 0; index < tempArray.length; index++) {
            categoryElement += `<span class="p-3 text-[10px] bg-[#4552a1] rounded-md py-[3px] px-[5px]">${tempArray[index].trim()}</span>`;
            //console.log(tempArray[index].trim());
        }
        categoryElement += `</div>`;
        previewElement.innerHTML = "";
        previewElement.insertAdjacentHTML("beforeend", iframeElement);
        previewElement.insertAdjacentHTML("beforeend", `<p class="p- 3 text - [12px]" > ${vidTitle}</p >`);
        previewElement.insertAdjacentHTML("beforeend", categoryElement);

    }

    fetchBtn.addEventListener("click", fetchYoutubeVideo);
}