const profile_details = async (url, retries = 10) => {
  const axios = require('axios');

  const options = {
      method: 'GET',
      url: 'https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile',
      params: {
          linkedin_url: `${url}`,
          include_skills: 'false',
      },
      headers: {
          'X-RapidAPI-Key': 'c58802e45emsh936daf7a2e5c580p16445djsn3489bb9ea377',
          'X-RapidAPI-Host': 'fresh-linkedin-profile-data.p.rapidapi.com',
      },
  };

  for (let attempt = 0; attempt < retries; attempt++) {
      try {
          const response = await axios.request(options);
          return { ...response.data };
      } catch (error) {
          console.error(`Attempt ${attempt + 1} failed. Retrying...`);
          if (attempt === retries - 1) {
              console.error('Max retries exceeded. Unable to fetch profile details.');
              throw error;
          }
          await delay(calculateBackoffDelay(attempt));
      }
  }
};

function calculateBackoffDelay(retries) {
  // Exponential backoff formula: initial_delay * 2^retries
  const initialDelay = 1000; // in milliseconds
  return initialDelay * Math.pow(2, retries);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = profile_details



// const getLocation = (json)=> {
//   const locationComponent = json?.included?.find(
//     (d) =>d?.entityUrn?.includes("EXPERIENCE")
//   );
//   return locationComponent?.topComponents[1]?.components?.fixedListComponent
//     ?.components?.[1]?.components?.entityComponent?.metadata?.text;
// }
// const getAbout = (json)=> {
//   const aboutComponent = json?.included?.find((d) =>
//     d.entityUrn?.includes("ABOUT")
//   );
//   return aboutComponent?.topComponents?.[1]?.components?.textComponent?.text
//     ?.text;
// }

// const getExperience = (json)=> {
//   const experienceEntity = json?.included?.find(
//     (d) =>
//       d?.entityUrn?.includes("EXPERIENCE")
//   );

//   return experienceEntity?.topComponents?.[1].components?.fixedListComponent?.components?.map(
//     (e) => {
//       const entity = e?.components?.entityComponent;
//       return {
//         title: entity?.title?.text,
//         companyName: entity?.subtitle?.text,
//         description:
//           entity?.subComponents?.components?.[0]?.components?.fixedListComponent
//             ?.components?.[0]?.components?.textComponent?.text?.text,
//         dates: entity?.caption?.text,
//         location: entity?.metadata?.text,
//         companyUrl: entity?.image?.actionTarget,
//       };
//     }
//   );
// }

// const getEducation = (json)=> {
//   const educationComponent = json?.included?.find((d) => {
//     return d?.entityUrn?.includes("EDUCATION");
//   });

//   if (educationComponent?.topComponents.length === 0) {
//     return [];
//   }

//   return educationComponent?.topComponents?.[1]?.components?.fixedListComponent?.components?.map(
//     (e) => {
//       const entity = e?.components?.entityComponent;
//       return {
//         schoolName: entity?.title?.text,
//         degree: entity?.subtitle?.text,
//         description:
//           entity?.subComponents?.components?.[0]?.components?.insightComponent
//             ?.text?.text?.text,
//         dates: entity?.caption?.text,
//         schoolUrl: entity?.image?.actionTarget,
//       };
//     }
//   );
// }


// // muhammad anas = ACoAAC8r_zMB2irDgFCw_BXPqfNfveT8-8e-A7k
// // rubab = ACoAADCsNC0BHgARQ-6_vNXhniTAb1Oms0q0Fmw
// // hira shahid = ACoAACww6hcB5dgTzN5zplr6oW2PhDSQsl5BXcQ
// const getMiddleProfile = async (profileId)=> {
//   try {
//     const res = await fetch("https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3AACoAACww6hcB5dgTzN5zplr6oW2PhDSQsl5BXcQ)&queryId=voyagerIdentityDashProfileCards.4294b09c676fc96597096571730df914", {
//       "headers": {
//         "accept": "application/vnd.linkedin.normalized+json+2.1",
//         "accept-language": "en-US,en;q=0.9,ur;q=0.8",
//         "csrf-token": "ajax:6488314523363074172",
//         "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"Windows\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-li-lang": "en_US",
//         "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;l/8ShuyEQAqKMLXCorGCYA==",
//         "x-li-pem-metadata": "Voyager - Profile=profile-tab-initial-cards",
//         "x-li-track": "{\"clientVersion\":\"1.13.7958\",\"mpVersion\":\"1.13.7958\",\"osName\":\"web\",\"timezoneOffset\":5,\"timezone\":\"Asia/Karachi\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1.5,\"displayWidth\":1920,\"displayHeight\":1080}",
//         "x-restli-protocol-version": "2.0.0",
//         "cookie": "bcookie=\"v=2&aca2d890-f19a-485f-8745-d4396fb73c00\"; li_sugr=f847c1c9-9e85-4e95-917d-9843040d2583; bscookie=\"v=1&20220719093026622c80dd-7c8f-4d57-8922-3330460f1a6fAQHnksRoGnJG_rHc2KYWPsFPeGEbwmE-\"; li_rm=AQFTiixTV2_JHgAAAYJDG-T7YwOARLDwQhN3WGEVwTr5gLY0HArBrCly50O7d5_G26lAukjwwltiBBNgmq8FTp5bMbRuxIX4OKtb-RCzFB_iXC5F59m3OBMs; JSESSIONID=\"ajax:6488314523363074172\"; G_ENABLED_IDPS=google; liap=true; li_theme=system; li_theme_set=app; _gcl_au=1.1.1114248415.1679994063; _guid=237a7e69-6777-4078-a646-e06ca435e82a; li_at=AQEDAS9o9QIAQUyJAAABiBPpy60AAAGMV8n7BU0AmyBactS1agZ0Oae8YzQdMlTyviAFLZfDhBGL6ABcvIMaRdfGYJH0Uqabc2pPzxwQYzt3dChN6OB6TfUoRpmmEU_5NNWNyFvBwWdjQQQenqier3Sq; s_fid=2B4EDC7AE6E75284-119000D305042F8D; aam_uuid=61874708117725032404056734938458471432; timezone=Asia/Karachi; lang=v=2&lang=en-us; AnalyticsSyncHistory=AQKmfzYPn9IcuQAAAYxIPPBdPw-x5-qoCEJ0WW3tWvhDGCY95sBHsQERcxbVJnBjmW3SO6MCclFni8yhEGV9lA; lms_ads=AQHKb5AIQ_CxYQAAAYxIPPYl8YK7gS6V34wPRkK4F61RAvQr4ZysoDME5zMIFCytn3IWMPzqwBlVfmoAXZJMK11k_37QaUvV; lms_analytics=AQHKb5AIQ_CxYQAAAYxIPPYl8YK7gS6V34wPRkK4F61RAvQr4ZysoDME5zMIFCytn3IWMPzqwBlVfmoAXZJMK11k_37QaUvV; at_check=true; gpv_pn=developer.linkedin.com%2Fproduct-catalog; s_plt=10.28; s_pltp=developer.linkedin.com%2Fproduct-catalog; s_ips=4653; s_tslv=1702018855064; s_cc=true; mbox=PC#6fe9cf31d6f646cf94480e93f53bead4.38_0#1717570857|session#b7ac7c170e0c472fb41ad9ee18b73d88#1702020717; s_tp=4996; s_ppv=developer.linkedin.com%2Fproduct-catalog%2C94%2C93%2C4673%2C8%2C8; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19700%7CMCMID%7C61297870445844047394072175258034589635%7CMCAAMLH-1702624025%7C3%7CMCAAMB-1702624025%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1702026425s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1440110900; UserMatchHistory=AQKP-4g_l8V1tQAAAYxIxzpeJWuwzGOLcw7QTejnh7QPgafZTTZwQdsKS6dXr9eph6tKr3PEOLBsdC-x-bQ_ga4W8rSdqswXEZJunyyjwX6SB9XzEOKHzrNjq64VE5YVcfEnkwCiJ-aE36NosuM3NluQYuO86FW08W0uGxUyMfU7E3pGsx02wayHaNIrOKqNBBnNzXGu9yquFlB65rTigkO1u_Fy910AACyFveXYgtP4qZzErtydEHDfRWZ8OpT1hdE4HdIjZwmHogtRg_qFZDQLOMspqn70KrSooMIRV5De9_cxB0i2KqPqa53Y61RMIcvlCn5dsHo_F6fIrznNufeHS6V6yxU; lidc=\"b=VB18:s=V:r=V:a=V:p=V:g=4704:u=432:x=1:i=1702028080:t=1702105376:v=2:sig=AQEwTQgXhmSZRDQF-C8tfP5jdbSvXAzh\"",
//         "Referer": "https://www.linkedin.com/in/masooma-rubab-9255841a9/",
//         "Referrer-Policy": "strict-origin-when-cross-origin"
//       },
//       "body": null,
//       "method": "GET"
//     });
//     const json = await res.json();
//     return {
//       location: getLocation(json),
//       about: getAbout(json),
//       experience: getExperience(json),
//       education: getEducation(json),
//     };
//   } catch (error) {
//     console.log("error at middleProfile", error.message);
//   }
// }
// const profile_details = async()=>{
//   const middle = await getMiddleProfile()
//   const profile = {
//     ...middle
//   }
//  return profile
// }
// module.exports = profile_details


