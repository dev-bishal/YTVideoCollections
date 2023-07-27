/*
https://img.youtube.com/vi/rLgGw4J3Fi8/default.jpg
https://img.youtube.com/vi/rLgGw4J3Fi8/mqdefault.jpg
https://img.youtube.com/vi/rLgGw4J3Fi8/hqdefault.jpg
https://img.youtube.com/vi/rLgGw4J3Fi8/sddefault.jpg
https://img.youtube.com/vi/rLgGw4J3Fi8/maxresdefault.jpg
*/
var showSelfImprovementVids = false;
class GSheetAPICall {

    constructor() {
        this.API_URL = "https://script.google.com/macros/s/AKfycby7Nv5nfKtoXwkSF6eHF5c-hZ6FeghxyA0YZ9fM8mkaXmOnd4L04Jp5a8-dDtKIduA3/exec";
    }

    GSheetAPICall_GetAll() {
        var InsertDataResponse = "";
        fetch(this.API_URL + `?getFullData=true`)
            .then(response => response.json())
            .then(data => {
                InsertDataResponse = data.Data;
                //return InsertDataResponse;
                BEIndexPageFunctions(InsertDataResponse);
            })
    }

    GSheetAPICall_Insert(data1, data2, data3) {
        var InsertDataResponse = "";
        fetch(this.API_URL + `?addRowData=true&dt1=${data1}&dt2=${data2}&dt3=${data3}`)
            .then(response => response.json())
            .then(data => {
                InsertDataResponse = data.Data;
                document.querySelector("#vidTitle").value = "";
                document.querySelector("#vidUrl").value = "";
                document.querySelector("#vidcategory").value = "";
            })
        return InsertDataResponse;
    }

    GSheetAPICall_Update(id, data1, data2, data3) {
        var InsertDataResponse = "";
        fetch(this.API_URL + `?updateRowData=${id}&dt1=${data1}&dt2=${data2}&dt3=${data3}`)
            .then(response => response.json())
            .then(data => {
                InsertDataResponse = data.Data;
            })
        return InsertDataResponse;
    }

    GSheetAPICall_Delete(id) {
        var InsertDataResponse = "";
        fetch(this.API_URL + `?deleteRowData=${id}`)
            .then(response => response.json())
            .then(data => {
                InsertDataResponse = data.Data;
            })
        return InsertDataResponse;
    }
}

function BEIndexPageFunctions(videoLists) {
    console.log(videoLists);
    if (videoLists.length == 0) {
        videoLists = [
            ["id1", "1 Direction aware hover effect | Jquery Plugin Tutorial", "rLgGw4J3Fi8", "Tutorials, , Alpha"],
            ["id2", "2 Bishal Biswas a Full Stack Developer", "rLgGw4J3Fi8", "Funny"],
            ["id3", "3 Dev Gadhvi Millionaire", "rLgGw4J3Fi8", "Alpha"],
            ["id4", "4 Cricket Tutorials", "rLgGw4J3Fi8", "Inspirtional"],
            ["id5", "5 Mahatma Gandhi", "rLgGw4J3Fi8", "Songs"],
            ["id6", "6 Mobile Phone", "rLgGw4J3Fi8", "Technology"],
            ["id7", "7 Pencil Box", "rLgGw4J3Fi8", "Others"],
            ["id8", "8 Artificial Hands", "rLgGw4J3Fi8", "Others"],
            ["id9", "9 Pipe", "rLgGw4J3Fi8", "Others"],
            ["id10", "10 Color Box", "rLgGw4J3Fi8", "Songs"],
            ["id11", "11 Keyboard", "rLgGw4J3Fi8", "Technology"],
            ["id12", "12 Laptop", "rLgGw4J3Fi8", "Technology"],
        ];
    }
    var loadMoreBtn = document.querySelector("#loadMore");

    var vid_category = document.querySelector("#vid-category");

    const loadCategories = () => {
        allCategoriesText = "";
        vidElements = document.querySelectorAll(".wrapper .vid");

        vidElements.forEach(element => {
            //console.log(element.children[2].innerText);
            allCategoriesText += element.children[2].innerText.trim().replaceAll("\n", ",") + ",";
        });

        allCategoriesText = allCategoriesText.substr(0, allCategoriesText.length - 1);

        List = makeUniqueArary(allCategoriesText.split(","));

        List = List.sort();
        vid_category.innerHTML = "";
        vid_category.insertAdjacentHTML("beforeend", `<span class="bg-[--vidBgColor] shadow-xl cursor-pointer rounded p-1">All</span>`);

        for (let index = 0; index < List.length; index++) {
            vid_category.insertAdjacentHTML("beforeend", `<span class="bg-[--vidBgColor] shadow-xl cursor-pointer rounded p-1">${List[index].trim()}</span>`);
        }

        var AllCategories = document.querySelectorAll("#vid-category span");
        var allVideoElements = document.querySelectorAll(".wrapper .vid");
        AllCategories.forEach(category => {
            category.addEventListener("click", () => {
                //console.log(`Showing only ${category.innerText}`);

                allVideoElements.forEach(VideoEle => {
                    if (category.innerText == "All") {
                        VideoEle.classList.remove("hidden");
                        VideoEle.classList.add("flex");
                    }
                    else {
                        if (!VideoEle.children[2].innerHTML.includes(category.innerText)) {
                            VideoEle.classList.add("hidden");
                            VideoEle.classList.remove("flex");
                        }
                        else {
                            VideoEle.classList.remove("hidden");
                            VideoEle.classList.add("flex");
                        }
                    }

                });
            })
        });


    }
    const getSingleTagElement = (arr) => {
        //<span class="p-3 text-[10px] bg-[#4552a1] rounded-md py-[3px] px-[5px]">Alpha</span>
        var result = "";
        for (let index = 0; index < arr.length; index++) {
            if (arr[index].trim() != "")
                result += `<span class="p-3 text-[10px] bg-[#4552a1] rounded-md py-[3px] px-[5px]">${arr[index].trim()}</span>`;
        }
        return result;
    }
    const makeUniqueArary = (arr) => {
        //console.log(arr);
        for (let index = 0; index < arr.length; index++) {
            if (arr[index].trim() == "") arr.splice(index, 1);
            else {
                for (let Jindex = 1; Jindex < arr.length; Jindex++) {
                    //console.log(`${arr[index]} at ${index} ${arr[Jindex]} at ${Jindex}`);
                    try {
                        if (arr[index].trim() == arr[Jindex].trim() && index != Jindex) {
                            arr.splice(Jindex, 1);
                            Jindex--;
                        }
                    } catch (error) { console.log(error) }
                }
            }
        }
        return arr;
    }
    const loadVideos = (Vid_Lists, startingPos) => {
        var video_Holder = document.querySelector("#video_Holder");
        var count = 0;
        for (let index = startingPos; index < Vid_Lists.length; index++) {
            if (count == 10) {
                break;
            }
            var VideoEle = `
                <div id="${Vid_Lists[index][0]}" data-vidValue="${Vid_Lists[index][2]}"
                    class="vid cursor-pointer w-[45%] md:w-[30%] lg:w-[20%] rounded-lg border flex justify-center flex-col bg-[--vidBgColor] pb-3">
                    <img src="https://img.youtube.com/vi/${Vid_Lists[index][2]}/maxresdefault.jpg" class="thumb h-[180px] object-cover w-full rounded-tl-lg rounded-tr-lg">
                    <p class="p-3 text-[12px]">${Vid_Lists[index][1]}</p>
                    <div class="flex gap-2 flex-wrap ml-3">
                        ${getSingleTagElement(Vid_Lists[index][3].split(","))}
                    </div>
                </div>`;

            video_Holder.insertAdjacentHTML("beforeend", VideoEle);
            count++;
            startingPos = index + 1;
        }
        // categoriesList = categoriesList.trim(); //removing any spaces in between
        // categoriesList = categoriesList.substr(0, categoriesList.length - 1); //removing the last ','
        indexPageFunctions();
        loadCategories();

        //console.log("Stopped at - " + startingPos);
        if (startingPos == Vid_Lists.length)
            loadMoreBtn.classList.add("hidden");
        return startingPos;
    }

    const randomSelector = (arr) => {
        var ModifiedArr = new Array();
        var tempArr2 = arr;


        while (tempArr2.length != 0) {
            var randIndex = Math.floor(Math.random() * (0 - tempArr2.length) + tempArr2.length);
            if (showSelfImprovementVids == false) {
                if (!tempArr2[randIndex][3].toLowerCase().includes("self improvement"))
                    ModifiedArr.push(tempArr2[randIndex]);
            }
            else {
                if (tempArr2[randIndex][3].toLowerCase().includes("self improvement"))
                    ModifiedArr.push(tempArr2[randIndex]);
            }
            tempArr2.splice(randIndex, 1);
        }
        console.log(ModifiedArr);

        var randHighlight = Math.floor(Math.random() * (0 - ModifiedArr.length) + ModifiedArr.length);
        var highLightHolder = document.querySelector(".highlight");
        highLightHolder.insertAdjacentHTML("beforeend", `
            <div id="${ModifiedArr[randHighlight][0]}" data-vidValue="${ModifiedArr[randHighlight][2]}"
                class="vid cursor-pointer w-[100%] rounded-lg border flex justify-center flex-col bg-[--vidBgColor] pb-3">
                <img src="https://img.youtube.com/vi/${ModifiedArr[randHighlight][2]}/maxresdefault.jpg" class="thumb h-[250px] object-cover w-full rounded-tl-lg rounded-tr-lg">
                <p class="p-3 text-[12px]">${ModifiedArr[randHighlight][1]}</p>
                <div class="flex gap-2 flex-wrap ml-3">
                    ${getSingleTagElement(ModifiedArr[randHighlight][3].split(","))}
                </div>
            </div>`);

        return ModifiedArr;
    }
    var MainvideoLists = randomSelector(videoLists);
    var currentIndex = loadVideos(MainvideoLists, 0);
    loadMoreBtn.addEventListener("click", () => {
        currentIndex = loadVideos(MainvideoLists, currentIndex);
    })

}