
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch("8Ga9w9uDLCUGxupyESKXr5f7rK908jE1");

const categories = async () => {
  try {
    const result = await gf.categories();
    console.log(`categories`, result);
  } catch (error) {
    console.error(`categories`, error);
  }
};
const gif = async () => {
  try {
    const result = await gf.gif("3oEjHGr1Fhz0kyv8Ig");
    console.log(`gif`, result);
  } catch (error) {
    console.error(`gif`, error);
  }
};

const gifs = async () => {
  try {
    const result = await gf.gifs(["3oEjHGr1Fhz0kyv8Ig"]);
    console.log(`gifs`, result);
  } catch (error) {
    console.error(`gifs`, error);
  }
};
const gifByCategory = async () => {
  try {
    const result = await gf.gifs("tv", "arrested-development");
    console.log(`gifByCategory`, result);
  } catch (error) {
    console.error(`gifByCategory`, error);
  }
};
const related = async () => {
  try {
    const result = await gf.related("3oEjHGr1Fhz0kyv8Ig");
    console.log(`related`, result);
  } catch (error) {
    console.error(`related`, error);
  }
};
const search = async () => {
  try {
    const result = await gf.search("dogs", { sort: "recent" });
    console.log(`search`, result);
  } catch (error) {
    console.error(`search`, error);
  }
};
const subcategories = async () => {
  try {
    const result = await gf.subcategories("tv");
    console.log(`subategories`, result);
  } catch (error) {
    console.error(`subcategories`, error);
  }
};

const trending = async () => {
  try {
    const result = await gf.trending();
    console.log(`trending`, result);
  } catch (error) {
    console.error(`trending`, error);
  }
};

const random = async () => {
  try {
    const result = await gf.random();
    console.log(`random`, result);
  } catch (error) {
    console.error(`random`, error);
  }
};

const emoji = async () => {
  try {
    const result = await gf.emoji({ limit: 2 });
    console.log(`emoji`, result);
  } catch (error) {
    console.error(`emoji`, error);
  }
};

const animate = async () => {
  try {
    const result = await gf.animate("hello");
    console.log("animate", result);
  } catch (error) {
    console.error("animate", error);
  }
};

categories();
search();
gif();
gifs();
gifByCategory();
categories();
subcategories();
trending();
random();
related();
emoji();
animate();
