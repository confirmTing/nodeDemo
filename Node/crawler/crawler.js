const http = require("http");
const cheerio = require("cheerio");
const baseUrl = "http://www.imooc.com/learn/";
const courseIds = [637,500,400,300];

const result = [];

let fetchCourseArray = [];

courseIds.forEach( id => {
    let url = baseUrl + id;
    fetchCourseArray.push(getPageSync(url));
})

Promise.all(fetchCourseArray).then(function(pages){
    let courseArray = [];
    pages.forEach(page => {
        courseArray.push(filterCourse(page));
    })

    printCourses(courseArray);
})

function getPageSync(url){
    return new Promise( (resolve, reject) => {
        console.log("正在爬取..." + url)
        http.get(url,function(res){
            // const statusCode = res.statusCode;
            // console.log(statusCode);
            let html = "";
            res.on("data",function(data){
                html += data;
            })
            res.on("end",function(){
                resolve(html);
            }).on("error",(e)=>{
                // console.log(e.message);
                reject(e.message);
            })
        })
    })
}

function filterCourse(html){
    let courseData = {};
    let $ = cheerio.load(html.toString());
    let chapterEls = $(".mod-chapters .chapter");
    let courseName = $(".course-infos .pr .hd .l").text();
    courseData.Name = courseName;
    courseData.number = +$(".js-learn-num").text().trim();
    courseData.Content = [];
    chapterEls.each((index,ele) => {
        let chapterData = {};
        $(ele).find("h3 strong .icon-chapter").remove();
        chapterData.chapterTitle = $(ele).find("h3 strong").text().trim().replace(/\r[\s\S]+/,"");
        chapterData.videos = [];
        $(ele).find(".video li").each((index,value) => {
            let video = {};
            video.id = $(value).find(".J-media-item").attr("href").split("video/")[1];
            video.title = $(value).find(".J-media-item").text().trim().replace(/[ \r\n]/g,"");
            chapterData.videos.push(video);
        })
        courseData.Content.push(chapterData);
    })
    return courseData
    // result.push(courseData);
}

function printCourses(courses){
    courses.forEach((course) => {
        console.log(course.Name);
        course.Content.forEach((chapter) => {
            console.log("  " + chapter.chapterTitle)
            chapter.videos.forEach(video => {
                console.log("    " + video.title +","+ video.id);
            })
        })
    })
}