const { resolve } = require("path");
const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

// Router function to list all dishes
function list(req, res) {
  res.json({ data: dishes });
}

// Middleware function to check if dish exists
function dishExists(req, res, next) {
  const { dishId } = req.params;
  const foundDish = dishes.find((dish) => dish.id === dishId);
  if (foundDish) {
    res.locals.dish = foundDish;
    return next();
  }
  next({
    status: 404,
    message: `Dish id not found: ${dishId}`,
  });
}

// Router function to read one dish
function read(req, res) {
  res.json({ data: res.locals.dish });
}

// Middleware functions to validate creating valid dishes
// Middleware function to check if name property exists
function namePropertyExists(req, res, next) {
  const { data: { name } = {} } = req.body;
  if (name) {
    return next();
  }
  next({
    status: 400,
    message: `Dish must include a name.`,
  });
}

// Middleware function to check if name property is empty
function namePropertyIsEmpty(req, res, next) {
  const { data: { name } = {} } = req.body;
  if (name === "") {
    next({
      status: 400,
      message: `Dish must include a name.`,
    });
  }
  return next();
}

// Middleware function to check if description property exists
function descriptionPropertyExists(req, res, next) {
  const { data: { description } = {} } = req.body;
  if (description) {
    return next();
  }
  next({
    status: 400,
    message: `Dish must include a description.`,
  });
}

// Middleware function to check if description property is empty
function descriptionPropertyIsEmpty(req, res, next) {
  const { data: { description } = {} } = req.body;
  if (description === "") {
    next({
      status: 400,
      message: `Dish must include a description.`,
    });
  }
  return next();
}

// Middleware function to check if price property exists
function pricePropertyExists(req, res, next) {
  const { data: { price } = {} } = req.body;
  if (price) {
    return next();
  }
  next({
    status: 400,
    message: `dish must include a price.`,
  });
}

// Middleware function to check if price is greater than 0
function pricePropertyIsGreaterThanZero(req, res, next) {
  const { data: { price } = {} } = req.body;
  if (price > 0) {
    return next();
  }
  next({
    status: 400,
    message: `Dish must have a price that is an integer greater than 0.`,
  });
}

// Middleware function to check if price is an integer
function pricePropertyIsAnInteger(req, res, next) {
  const { data: { price } = {} } = req.body;
  if (Number.isInteger(price)) {
    return next();
  }
  next({
    status: 400,
    message: `Dish must have a price that is an integer greater than 0.`,
  });
}

// Middleware funciton to check if image_url exists
function imageUrlPropertyExists(req, res, next) {
  const { data: { image_url } = {} } = req.body;
  if (image_url) {
    return next();
  }
  next({
    status: 400,
    message: `Dish must include a image_url.`,
  });
}

// Middleware function to check if image_url is empty
function imageUrlPropertyIsEmpty(req, res, next) {
  const { data: { image_url } = {} } = req.body;
  if (image_url === "") {
    next({
      status: 400,
      message: `Dish must include a image_url.`,
    });
  }
  return next();
}

// Router function to create a new dish
function create(req, res) {
  const { data: { name, description, price, image_url } = {} } = req.body;
  const newId = new nextId;
  const newDish = {
    id: newId,
    name: name,
    description: description,
    price: price,
    image_url: image_url,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

// Middleware function to check if id === :dishId
function dishIdsMatch(req, res, next) {
  const { data: { id } = {} } = req.body;
  const { dishId } = req.params;
  if (id === dishId || !id) {
    return next();
  }
  next({
    status: 400,
    message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}.`,
  });
}

// Router function to update a dish
function update(req, res) {
  const dish = res.locals.dish;
  const { data: { name, description, price, image_url } = {} } = req.body;
  dish.name = name;
  dish.description = description;
  dish.price = price;
  dish.image_url = image_url;

  res.json({ data: dish });
}

module.exports = {
  list,
  read: [dishExists, read],
  create: [
    namePropertyExists,
    namePropertyIsEmpty,
    descriptionPropertyExists,
    descriptionPropertyIsEmpty,
    pricePropertyExists,
    pricePropertyIsGreaterThanZero,
    pricePropertyIsAnInteger,
    imageUrlPropertyExists,
    imageUrlPropertyIsEmpty,
    create,
  ],
  update: [
    dishExists,
    dishIdsMatch,
    namePropertyExists,
    namePropertyIsEmpty,
    descriptionPropertyExists,
    descriptionPropertyIsEmpty,
    pricePropertyExists,
    pricePropertyIsGreaterThanZero,
    pricePropertyIsAnInteger,
    imageUrlPropertyExists,
    imageUrlPropertyIsEmpty,
    update,
  ],
};
