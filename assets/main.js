function indexPageFunctions() {
    var modalElement = document.querySelector("#modal");
    var modalCloseBtn = document.querySelector(".closeBtn");
    var allVideoElements = document.querySelectorAll(".vid");

    allVideoElements.forEach(VideoElement => {
        VideoElement.addEventListener("click", () => {
            hideModal();
            document.querySelector("#modal .content").innerHTML = "";
            document.querySelector("#modal .content").innerHTML = `
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${VideoElement.getAttribute("data-vidValue")}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>`;
        })
    });

    modalCloseBtn.addEventListener("click", () => {
        hideModal();
    })

    const hideModal = () => {
        if (modalElement.classList.contains("flex")) {
            modalElement.classList.add("hidden");
            modalElement.classList.remove("flex");
        }
        else {
            modalElement.classList.remove("hidden");
            modalElement.classList.add("flex");
        }
    }
}

function IndexStarterFunctions() {
    const readParameter = () => {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        try {
            const userType = params.get('admin');
            const vid = params.get('age');
        } catch (error) { }

        if (userType == "true") {

        }
    }
}

function adminPageFunctions() {
    var fetchBtn = document.querySelector("#fetchBtn");
    var saveBtn = document.querySelector("#saveBtn");
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
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${vidUrl}"
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