// function createMenuListItem(liData) {
//     let classes = ''
//     if (liData.type === "button") {
//         classes = "btn btn-primary text-white fw-bold border-0 px-3";
//     } else if (liData.type === "sub-menu-item") {
//         classes = "dropdown-item";
//     } else {
//         classes = "nav-link active";
//     }
//
//     let liClass = "";
//     let available = false;
//     let hasLogin = localStorage.hasOwnProperty("nextbid_login");
//     let extra = "";
//
//     if (hasLogin && liData.hasOwnProperty("available")) {
//         let userType = JSON.parse(localStorage.getItem("nextbid_login")).type;
//         available = hasLogin && userType === liData.available || "all" === liData.available;
//
//         if (liData.url === "user-seller-register.html") {
//             available = false;
//         }
//
//         if (liData.url === "user-login.html") {
//             extra = (userType === "customer") ? "Selling" : "Buying";
//         }
//
//     } else {
//         available = "customer" === liData.available || "all" === liData.available;
//     }
//
//     liClass = available ? liClass + "" : liClass + " d-none";
//
//     let url = liData.hasOwnProperty("callback") ? 'javascript:' + liData.callback + '' : liData.url;
//
//     return `<li class="${liClass} ${!(liData.type === "sub-menu-item") ? "nav-item m-sm-1 m-md-1 m-lg-3" : ""}">
//                 <a class="${classes}" aria-current="page" href="${url}">${liData.title} ${extra}</a>
//             </li>`;
// }
//
// function getInnerSubMenu(subMenuData) {
//     let userName = "";
//     let subMenuTitle = "";
//     if (localStorage.hasOwnProperty("nextbid_login")) {
//         userName = JSON.parse(localStorage.getItem("nextbid_login")).username;
//     } else {
//         userName = subMenuData.title;
//     }
//
//     let subMenuHeader = `<li class="nav-item dropdown m-sm-1 m-md-1 m-lg-3 ${subMenuData.auth ? '' : ' d-none'}">
//                         <a class="nav-link dropdown-toggle" href="${subMenuData.url}" id="navbarDropdown" role="button"
//                            data-bs-toggle="dropdown" aria-expanded="false">
//                             ${userName}
//                         </a>
//                         <ul class="dropdown-menu" aria-labelledby="navbarDropdown">`;
//     let subMenuFooter = `</ul>
//                     </li>`;
//     let subMenuItems = '';
//
//     subMenuData.sub_menu.forEach((element, index) => {
//         subMenuItems += createMenuListItem(element);
//     });
//
//     return subMenuHeader + subMenuItems + subMenuFooter;
// }
//
// $(document).ready(function () {
//     const headerEle = $('header #topMenuWrapper');
//
//     headerEle.empty();
//
//     menu['menu_items'].forEach((element, index) => {
//         if (element.sub_menu) {
//             headerEle.append(getInnerSubMenu(element));
//         } else {
//             headerEle.append(createMenuListItem(element));
//         }
//     });
//
//
//     // fetch("./js/menu-config.json")
//     //     .then(response => {
//     //         if (!response.ok) {
//     //             throw new Error()
//     //         }
//     //         return response.json();
//     //     })
//     //     .then(json => {
//     //         json['menu_items'].forEach((element, index) => {
//     //             if (element.sub_menu) {
//     //                 headerEle.append(getInnerSubMenu(element));
//     //             } else {
//     //                 headerEle.append(createMenuListItem(element));
//     //             }
//     //         });
//     //     })
//     //     .catch(reason => {
//     //         Toast.fire({
//     //             icon: 'error',
//     //             title: 'Something went wrong! Please try again.'
//     //         })
//     //     });
// });