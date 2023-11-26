import { sunglasses, sunglassesOptions } from "./data.js"

const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]

let sunglassesNew = sunglasses

function render(sunglassesNew) {

  const price = `$${sunglassesNew.model.price + sunglassesNew.lenses.price + sunglassesNew.frame.price}`

  productDetailsEl.innerHTML =
    `<h1>${sunglassesNew.model.name}</h1>
    <p>Custom: ${sunglassesNew.lenses.color} lenses, ${sunglassesNew.frame.color} frames</p>
    <p>${price}</p>`

  const currClass = productImage.classList[1]
  productImage.classList.replace(currClass, sunglassesNew.model.cssClass)

  const currFramesClass = productFrames.classList[1]
  productFrames.classList.replace(currFramesClass, sunglassesNew.frame.cssClass)

  const currLensesClass = productLenses.classList[1]
  productLenses.classList.replace(currLensesClass, sunglassesNew.lenses.cssClass)

}

// Highlight current selection
function addHighlight(clickedItem, itemType) {
  if (itemType === "product-thumb") {
    document.querySelector(".product-thumb.selected").classList.remove("selected")
  } else if (itemType === "product-color-swatch") {
    clickedItem.closest("ul").querySelector(".selected").classList.remove("selected")
  }
  clickedItem.classList.add("selected")
}


document.body.addEventListener("click", (event) => {
  const clickedItem = event.target

  // update model
  if (clickedItem.classList.contains("product-thumb")) {
    const itemType = "product-thumb"
    const currName = clickedItem.dataset.name

    const modelOptions = sunglassesOptions.models
      .filter((item) => {return item.name === currName})[0]

    const {name, price, thumbImg, cssClass} = modelOptions

    sunglassesNew = {
      ...sunglassesNew,
      model: {name, price, thumbImg, cssClass}
    }

    addHighlight(clickedItem, itemType)
    render(sunglassesNew)
  }

  // update colors for frames / lenses
  if (clickedItem.classList.contains("product-color-swatch")) {
    const itemType = "product-color-swatch"
    const currColor = clickedItem.dataset.color

    // check nearest parent div
    // lenses
    if (clickedItem.closest("div").classList[0] === "product-lenses") {
      const colorOptions = sunglassesOptions.lenses
        .filter((item) => {return item.color === currColor})[0]

      const {color, price, cssClass} = colorOptions

      sunglassesNew = {
        ...sunglassesNew,
        lenses: {color, price, cssClass}
      }
    }

    // frames
    else {
      const colorOptions = sunglassesOptions.frames
        .filter((item) => {return item.color === currColor})[0]

      const {color, price, cssClass} = colorOptions

      sunglassesNew = {
        ...sunglassesNew,
        frame: {color, price, cssClass}
      }
    }

    addHighlight(clickedItem, itemType)
    render(sunglassesNew)
  }
})

render(sunglassesNew)