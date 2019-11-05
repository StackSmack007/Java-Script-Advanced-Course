function solve() {
   let searchField = document.getElementById("searchField");
   let searchBtn = document.getElementById("searchBtn");
   let rows = Array.from(document.querySelectorAll("body > table > tbody > tr"));

   searchBtn.addEventListener("click", function () {
      let searchPhrase = searchField.value.toLowerCase();
      rows.map(x => {
         if (x.classList.contains("select")) { x.classList.remove("select"); }
      });

      if (searchPhrase.length === 0) { return; }

      rows.map(x => {
         let matchFound = Array.from(x.getElementsByTagName("td"))
            .map(th => th.textContent).join("").toLowerCase().includes(searchPhrase);

         if (matchFound) { x.classList.add("select"); }
      });
   });
}