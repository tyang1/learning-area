// create a variable to store the products 'database' in
var products;

// use fetch to retrieve it, and report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
fetch("products.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    products = json;
    initialize();
  })
  .catch(function(err) {
    console.log("Fetch problem: " + err.message);
  });

let finalProduct = [];
let categoryProduct = [];
let lastCategory = "All";

// sets up the app logic, declares required variables, contains all the other functions
function initialize() {
  console.log("inside initialize");
  // grab the UI elements that we need to manipulate
  let category = document.getElementById("category");
  let search = document.getElementById("searchTerm");
  let main = document.querySelector("main");
  let filterbtn = document.querySelector("button");

  finalProduct = products;
  categoryProduct = products;
  updateDisplay();

  filterbtn.onclick = filterProduct;

  function filterProduct(e) {
    e.preventDefault();
    //case 1: if the same category
    if (category.value === lastCategory) {
      //   products.forEach(product => {
      //     if (
      //       product.type.toLowerCase().indexOf(lastCategory.toLowerCase()) !==
      //       -1
      //     ) {
      //       categoryProduct.push(product);
      //   };
      // });
      if(search.value.trim() === ''){
        //? here the finalProduct is empty;
        finalProduct = categoryProduct;
        updateDisplay();
      } else{
        searchCategory();
      }
    } else {
      //if the category is different:
      lastCategory = category.value;
      console.log("new lastCategory", lastCategory);
      categoryProduct = [];
      products.forEach(product => {
        if(product.type.toLowerCase().indexOf(lastCategory.toLowerCase()) !==
        -1){
          categoryProduct.push(product);
        }
      });
      if(search.value.trim() === ''){
        finalProduct = categoryProduct;
        updateDisplay();
      } else{
        searchCategory();
      }
    }
  }

  function searchCategory() {
      finalProduct = [];
      categoryProduct.forEach( product => {
        if(product.name.trim().toLowerCase().indexOf(search.value.trim().toLowerCase()) !== -1){
          console.log("inside searchCategory", product);
          finalProduct.push(product);
        }
      })
      console.log("here is finalProduct", finalProduct);
      updateDisplay();
    }

  function updateDisplay() {
    //when searched, update the finalProduct.
    console.log("inside updateDisplay");
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    if (finalProduct.length === 0) {
      console.log(
        "finalGroup.length === 0; if no products match the search term, display a 'No results to display' message"
      );
      var para = document.createElement("p");
      para.textContent = "No results to display!";
      main.appendChild(para);
      // for each product we want to display, pass its product object to fetchBlob()
    } else {
      for (var i = 0; i < finalProduct.length; i++) {
        fetchBlob(finalProduct[i]);
      }
    }
  }

  function resultsNotFound() {
    let message = "No results are found";
    let h2 = document.createElement("h2");
    h2.textContent = message;
  }

  function fetchBlob(product) {
    let url = "images/" + product.image;
    fetch(url)
      .then(response => response.blob())
      .then(picture => {
        let objUrl = URL.createObjectURL(picture);
        showPicture(objUrl, product);
      });
  }

  function showPicture(url, product) {
    var section = document.createElement("section");
    var heading = document.createElement("h2");
    var para = document.createElement("p");
    var image = document.createElement("img");

    section.setAttribute("class", product.type);
    heading.textContent = product.name.replace(
      product.name.charAt(0),
      product.name.charAt(0).toUpperCase()
    );
    image.setAttribute("src", url);
    section.appendChild(heading);
    section.appendChild(image);
    main.appendChild(section);
  }
}
