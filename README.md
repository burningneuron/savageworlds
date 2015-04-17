# savageworlds
A character sheet app for Savage Worlds

This project is intended to be nothing more than a place to create, store, and edit Savage Worlds characters.
 		 
There are currently no plans to make this a rules-checked character sheet, this is just a way to manually create a good-looking character sheet.

Character objects (presently) look like this:
```javascript
{
  userId: String,
  name: String,
  setting: String,
  race: String,
  rank: String,
  xps: Number,
  money: String,
  baseStats: {
    agility: String,
    smarts: String,
    spirit: String,
    strength: String,
    vigor: String,
    charisma: String,
    charismaModifier: String,
    pace: String,
    sprintDie: String,
    parry: String,
    parryModifier: String,
    toughness: String,
    armor: String,
  },
  otherStats: [{
    name: String,
    value: String
  }],
  armor: {
    head: String,
    torso: String,
    arms: String,
    legs: String
  },
  encumbrance: {
    carried: Number,
    limit: Number,
    penalty: Number
  },
  skills: [{
    name: String,
    value: String
  }],
  edges: [{
    name: String,
    description: String
  }],
  hindrances: [{
    name: String,
    description: String
  }],
  powers: [{
    name: String,
    trappings: String,
    cost: String,
    range: String,
    damage: String,
    duration: String
  }],
  weapons: [{
    name: String,
    range: String,
    rof: String,
    damage: String,
    ap: String,
    weight: Number,
    notes: String
  }],
  equipment: [{
    name: String,
    description: String,
    weight: Number
  }]
}
```
