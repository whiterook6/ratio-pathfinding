const electrolysis = {
  name: 'electrolysis',
  cl: 20/3,
  h2: 20/3,
};

const nitrogenCondensation = {
  name: 'nitrogen condensation',
  n2: 1,
};

const waterSeparation = {
  name: 'water separation',
  h2: 20/3,
  o2: 10
};

const ammonia = {
  name: "ammonia",
  h2: -10,
  n2: -10,
  nh3: 10,
}

const hydrogenChloride = {
  name: 'hydrogen chloride',
  hcl: 10,
  h2: -10,
  cl: -10
};

const rocketFuel1 = {
  name: 'rocket fuel - 1',
  hcl: -50 / 16,
  o2: -50 / 16,
  'rocket fuel': 1/16
};

const rocketFuel2 = {
  name: 'rocket fuel - 2',
  o2: -50 / 16,
  nh3: -50 / 16,
  'rocket fuel': 1/16
}

const ratios = [{
  recipe: electrolysis,
  count: 15
}, {
  recipe: waterSeparation,
  count: 20
}, {
  recipe: hydrogenChloride,
  count: 10
}, {
  recipe: rocketFuel1,
  count: 32
}, {
  recipe: rocketFuel2,
  count: 32
}, {
  recipe: ammonia,
  count: 14
}, {
  recipe: nitrogenCondensation,
  count: 140
}];

const run = () => {
  // get keyboard input, read one character at a time
  const readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
    
  });
}

run();

const results = ratios.reduce((acc, { recipe, count }) => {
  Object.keys(recipe).filter(ingredient => ingredient !== 'name').forEach((ingredient) => {
    if (ingredient in acc){
      acc[ingredient] += recipe[ingredient] * count;
    } else {
      acc[ingredient] = recipe[ingredient] * count;
    }
  });

  return acc;
}, {});

console.log("Ratios:", ratios.map(({ recipe, count }) => `\n- ${recipe.name} x ${count}`).join());
console.log("Results:", Object.entries(results).map(([ingredient, count]) => `\n- ${ingredient}: ${count.toFixed(2)}/s`).join());
