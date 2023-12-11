const engineersListModel = require('../models/engineers');
require('../db/conn');
const profile_details = require('../../profile');
const getLinkedinProfileUrl=(navigationUrl)=> {
    navigationUrl = navigationUrl?.split("?")?.[0];
    return navigationUrl
  }
const searchPeople = async (search,page)=>{
    try {
        const start = page *10;
        const res = await fetch(`https://www.linkedin.com/voyager/api/graphql?variables=(start:${start},origin:SWITCH_SEARCH_VERTICAL,query:(keywords:${encodeURI(search)},flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:resultType,value:List(PEOPLE)),(key:searchId,value:List(706e2dc8-7113-4f3d-951b-03fd32117a61))),includeFiltersInResponse:false))&queryId=voyagerSearchDashClusters.db27fdf668579076f437e3f93ab5206f`, {
  "headers": {
    "accept": "application/vnd.linkedin.normalized+json+2.1",
    "accept-language": "en-US,en;q=0.9,ur;q=0.8",
    "csrf-token": "ajax:3451020968269350516",
    "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-li-lang": "en_US",
    "x-li-page-instance": "urn:li:page:d_flagship3_search_srp_people;mhZe0btLRja/6Pl3s9bLHg==",
    "x-li-track": "{\"clientVersion\":\"1.13.7958\",\"mpVersion\":\"1.13.7958\",\"osName\":\"web\",\"timezoneOffset\":5,\"timezone\":\"Asia/Karachi\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1.5,\"displayWidth\":1920,\"displayHeight\":1080}",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "bcookie=\"v=2&aca2d890-f19a-485f-8745-d4396fb73c00\"; li_sugr=f847c1c9-9e85-4e95-917d-9843040d2583; bscookie=\"v=1&20220719093026622c80dd-7c8f-4d57-8922-3330460f1a6fAQHnksRoGnJG_rHc2KYWPsFPeGEbwmE-\"; li_rm=AQFTiixTV2_JHgAAAYJDG-T7YwOARLDwQhN3WGEVwTr5gLY0HArBrCly50O7d5_G26lAukjwwltiBBNgmq8FTp5bMbRuxIX4OKtb-RCzFB_iXC5F59m3OBMs; G_ENABLED_IDPS=google; li_theme=system; li_theme_set=app; _gcl_au=1.1.1114248415.1679994063; _guid=237a7e69-6777-4078-a646-e06ca435e82a; s_fid=2B4EDC7AE6E75284-119000D305042F8D; aam_uuid=61874708117725032404056734938458471432; timezone=Asia/Karachi; AnalyticsSyncHistory=AQKmfzYPn9IcuQAAAYxIPPBdPw-x5-qoCEJ0WW3tWvhDGCY95sBHsQERcxbVJnBjmW3SO6MCclFni8yhEGV9lA; lms_ads=AQHKb5AIQ_CxYQAAAYxIPPYl8YK7gS6V34wPRkK4F61RAvQr4ZysoDME5zMIFCytn3IWMPzqwBlVfmoAXZJMK11k_37QaUvV; lms_analytics=AQHKb5AIQ_CxYQAAAYxIPPYl8YK7gS6V34wPRkK4F61RAvQr4ZysoDME5zMIFCytn3IWMPzqwBlVfmoAXZJMK11k_37QaUvV; g_state={\"i_l\":0}; VID=V_2023_12_10_10_2853; mbox=PC#6fe9cf31d6f646cf94480e93f53bead4.38_0#1717757219|session#edc0ca7936d1431fa99efaa235ffb571#1702207079; gpv_pn=developer.linkedin.com%2Fproduct-catalog; s_tslv=1702205218707; s_ips=4673; s_tp=4996; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19702%7CMCMID%7C61297870445844047394072175258034589635%7CMCAAMLH-1702879437%7C3%7CMCAAMB-1702879437%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1702281837s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1440110900; li_g_recent_logout=v=1&true; visit=v=1&M; lang=v=2&lang=en-us; JSESSIONID=\"ajax:3451020968269350516\"; li_at=AQEDAS9o9QIB_bvjAAABjFeNYewAAAGMe5nl7E0AHUvveR3FQdWWuYy7b-SKLhCTM9Be3DV4soitGp5vMC7ymLrrJe_AavIPGP_8pvqKoAZ16tE2dVs5DJ0hfbRwMrcc_dTR1Tg_R0OkegXWIppnFZA_; liap=true; UserMatchHistory=AQLM0gshT_1CrgAAAYxXjYogdbwbWD48RiUz_rAg7sJiewXKwuFEyTOvwB5zXk1caXQzuYtMXpDvkvWiNDtDCNHDUxSddYgY_6QfWHspYYkbFJa6WlgGu5FJnqrqzkXoP0NI5ekFyXgncp5DXwwWaOQGCQliCS2TwtoSyAKMIM5yo9uSEaHp6gyP9iC3hBXHX4xE5i0B7mX0LruQWVXJqqDGRtZRnOyj5lSnZxvyKJbQiPUl8H8J4xZRHJ-VBlaCJamvBKPElI9xxhnpLQshmKrjiwGXoqGvr77tU0W_CWtpgs57qJvM2768g21m7eZW9YBi3DTAxuSSWYQkDAhm8whXsPkiKM0; lidc=\"b=VB18:s=V:r=V:a=V:p=V:g=4704:u=432:x=1:i=1702275955:t=1702276844:v=2:sig=AQFRrxq-qO37E8CakG3mgXDk6MNjE1fE\"",
    "Referer": "https://www.linkedin.com/search/results/all/?keywords=software%20engineers&origin=GLOBAL_SEARCH_HEADER&searchId=706e2dc8-7113-4f3d-951b-03fd32117a61&sid=8ek&spellCorrectionEnabled=true",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});
const json = await res.json()
const errors = await json?.data?.error
errors ? console.log(errors):null
return json

    } catch (error) {
        console.log(error)
    }
}
const storeDatainDb = async (list)=>{
    const {name,jobTitle,summary,location,image,profile_link}= list
    const profile_detail = await profile_details(profile_link)
    try {
        
            const result = new engineersListModel({
                name: name,
                jobTitle: jobTitle,
                summary: summary,
                location: location,
                image: image,
                profileDetails: profile_detail,
            }) 
            // console.log(result)
            await result.save()
        
    } catch (error) {
        console.log("db values error", error)
    }
    
    
}
(async function(){
    const search = await searchPeople("software engineers",2)
    const peopleProfiles = await search?.included?.filter(s=> s?.template === "UNIVERSAL")
    const readableForm = await peopleProfiles?.map((p)=>{
        return {
            name: p?.title?.text ?? "default value",
            jobTitle: p?.primarySubtitle?.text ?? "default value",
            summary: p?.summary?.text ?? "default value",
            location: p?.secondarySubtitle?.text ?? "default value",
            image:
            p?.image?.attributes[0]?.detailData?.nonEntityProfilePicture?.vectorImage?.artifacts[0]?.fileIdentifyingUrlPathSegment ?? "default value",
            profile_link: getLinkedinProfileUrl(p?.navigationUrl) ?? "default value",
        }
    })
    await readableForm.map((data)=>{
        storeDatainDb(data)
    })
})();
    

        
    

// module.exports = searchPeople