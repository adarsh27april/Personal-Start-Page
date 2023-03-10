// Favourite Site List

// Retrieve fav list from local storage
let favList = JSON.parse(localStorage.getItem("favList")) || [];
/**
 [{title, url},]
 */
const favourite_item_list = document.getElementById("favourite-item-list");

function renderFavList() {
   favourite_item_list.innerHTML = "";
   for (let i = 0; i < favList.length; i++) {
      favourite_item_list.innerHTML += `
      <tr>
         <th scope="row">${i + 1}</th>
         <td> ${favList[i].title} </td>
         <td> <a href="http://${favList[i].url}" target="_blank">${favList[i].url} </a></td>
         <td><h4><i id="edit-favourite" class="bi bi-pencil-square" data-index="${i}" style="color:rgb(78 255 125);"></i></h4></td>
         <td><h4><i id="delete-favourite" class="bi bi-trash" data-index="${i}" style="color:rgb(255 52 52);"></i></h4></td>
      </tr>
      `
   }
}

function addFav(item) {
   console.log('item to be added: ', item);
   favList.push(item);
   localStorage.setItem("favList", JSON.stringify(favList));
   renderList();
}

// Handle form submission
const favTitle = document.getElementById("fav-title");
const favUrl = document.getElementById("fav-url");
document.getElementById("add-favourite").addEventListener("click", function () {
   let fav_title_value = favTitle.value;
   let fav_url_value = favUrl.value;
   document.getElementById("fav-close-modal").click()

   addFav({ title: `${fav_title_value}`, url: `${fav_url_value}` });
   favTitle.value = ''
   favUrl.value = ''
   renderFavList()
});

//handling delete/edit operations
favourite_item_list.addEventListener('click', (e) => {
   const target = e.target;

   if (target.id == "edit-favourite") {
      let index = target.getAttribute("data-index");
      let newTitle = prompt("Enter New Title", favList[index].title)
      let newUrl = prompt("Enter New URL", favList[index].url)
      favList[index].title = newTitle ? newTitle.trim() : null;
      favList[index].url = newUrl ? newUrl.trim() : null;
      localStorage.setItem('favList', favList)
      renderFavList()
   }
   else if (target.id == 'delete-favourite') {
      let index = target.getAttribute("data-index");
      let yes_no = confirm(`Do you want to delete the favourite ${favList[index].title}`)
      if (yes_no) {
         favList.splice(index, 1);
         localStorage.setItem('favList', JSON.stringify(favList))
         renderFavList()
      }
   }
})

renderFavList()

