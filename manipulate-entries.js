const filterEntries = (obj, func) => {
  return Object.fromEntries(
    Object.entries(obj).filter(entry => func(entry))
  );
};

const mapEntries = (obj, func) => {
  return Object.fromEntries(
    Object.entries(obj).map(entry => func(entry))
  );
};

const reduceEntries = (obj, func, initialValue) => {
  return Object.entries(obj).reduce((acc, entry) => func(acc, entry), initialValue);
};

const totalCalories = (cart) => {
  return reduceEntries(cart, (total, [item, grams]) => {
    return total + (nutritionDB[item].calories * grams / 100);
  }, 0);
};

const lowCarbs = (cart) => {
  return filterEntries(cart, ([item, grams]) => {
    return (nutritionDB[item].carbs * grams / 100) < 50;
  });
};

const cartTotal = (cart) => {
  return mapEntries(cart, ([item, grams]) => {
    const itemNutrition = nutritionDB[item];
    const scaledNutrition = Object.fromEntries(
      Object.entries(itemNutrition).map(([nutrient, value]) => [
        nutrient,
        (value * grams / 100)
      ])
    );
    return [item, scaledNutrition];
  });
};
