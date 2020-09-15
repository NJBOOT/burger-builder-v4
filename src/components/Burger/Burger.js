import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  let ingredientArray = Object.keys(props.ingredients)
    .map(el => {
      return [...Array(props.ingredients[el])].map((_, i) => {
        return <BurgerIngredient key={el + i} type={el} />;
      });
    })
    .reduce((arr, el) => {
      return (arr = [...arr, ...el]);
    }, []);

  if (ingredientArray.length === 0) {
    ingredientArray = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;

// const keyArray = Object.keys(props.ingredients);
// console.log(keyArray);
// const countArray = keyArray.map(el => [...Array(props.ingredients[el])]);
// console.log(countArray);
// const transformedArray = countArray.map((el, index) =>
//   el.map((_, i) => (
//     <BurgerIngredient key={keyArray[index] + i} type={keyArray[index]} />
//   ))
// );
// console.log(transformedArray);
// let ingredientArray = transformedArray.reduce((arr, el) => {
//   return (arr = [...arr, ...el]);
// }, []);
// console.log(ingredientArray);
